import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import introspector from '../core/Introspector'
import messages from '../core/Messages';
import "react-select/dist/react-select.css";
import "./Selection.css";

/**
 * Caixa de Seleção com autocomplete.
 * 
 * Uso básico:
 * ~~~js
 * <MultipleSelection bean={bean} name="sexo" loadOptions={sexos} autoload={true}></MultipleSelection>
 * ~~~
 */
export default class MultipleSelection extends Component {
  static propTypes = {
    /** 
     * Raiz para os dados: estado, formulário, dto
     */
    bean: PropTypes.object.isRequired,
    /**
     * O caminho para propriedade: nome, usuario.nome, usuario.permissoes[0].nome
     */
    name: PropTypes.string.isRequired,
    /**
     * O valor padrão para o campo quando ele for iniciado vazio
     */
    defaultValue: PropTypes.array,
    /**
     * Estipula a duração do intervalo de espera, relativo ao ultimo caracter modificado, para realizar uma nova busca.
     * Esse tempo é medido em milisegundos.
     */
    delay: PropTypes.number,
    /**
     * Se fecha automaticamente ao selecionar uma opção
     */
    closeOnSelect: PropTypes.bool,
    /**
     * Informa se o campo está habilitado ou não
     */
    disabled: PropTypes.bool,
    /**
     * Estipula o tamanho mínimo do texto digitado em caracteres, para que a busca seja disparada.
     */
    threshold: PropTypes.number,
    /**
     * Define se as opções devem ser carregadas inicialmente mesmo que não haja digitação de texto. Essa opção não é
     * recomendada para caixas de seleção com muitas opções, e que o carregamento possa vir a ser pesado.
     */
    autoload: PropTypes.bool,
    /**
     * Função que define como as opções serão carregadas.
     * ~~~js
     * function loadOptions() {
     *   return Promise.resolve([
     *      { label: "MASCULINO", value: "M" },
     *      { label: "FEMININO", value: "F" },
     *      { label: "INDETERMINADO", value: "I" } 
     *    ]);
     * }
     * 
     * function loadOptionsInput(input) {
     *   // Chama uma url com querystring param input, e que devolve um json array com as opções
     *   return axios.get(url, {
     *      params: {
     *        input: input
     *      }
     *   }).then(response => response.data);
     * }
     * ~~~
     */
    loadOptions: PropTypes.func.isRequired,
    /**
     * Se a procura deve ignorar a caixa da letra. Se sim, que é o defaul, o input será passado sempre em minusculo para 
     * a função loadOptions.
     */
    ignoreCase: PropTypes.bool,
    /**
     * Se a procura deve ignorar acentos. Se sim, que é o defaul, o input será passado sempre sem acentos para 
     * a função loadOptions.
     */
    ignoreAccents: PropTypes.bool,
    /**
     * Tratador de eventos padrão
     * ```function(event, thisComponent) { }```
     */
    onChange: PropTypes.func,
    /**
     * Tratador de eventos padrão
     * ```function(event, thisComponent) { }```
     */
    onKeyPress: PropTypes.func,
    /**
     * Define qual propriedade ou qual função deve ser usada sobre as opções listadas para extrair o label.
     * Default: ```(option) => option.label```
     */
    optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * Define qual propriedade ou qual função deve ser usada sobre as opções listadas para extrair o valor.
     * Default: ```(option) => option.value```
     */
    optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }
  
  static defaultProps = {
    delay: 500,
    autoload: false,
    threshold: 3,
    defaultValue: [],
    closeOnSelect: false,
    disabled: false,
    ignoreCase: true,
    ignoreAccents: true,
    onChange: () => {},
    onKeyPress: () => {}
  };

  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.autoloadInitialized = false;
    this.options = [];
    this.inputTrigger = undefined;
  }

  onChangeHandler = (options) => {
    let { bean, name, onChange } = this.props;
    introspector.setValue(bean, name, options);
    onChange(options, this);
    this.forceUpdate();
  }
  
  onKeyPressHandler = (e) => {
    this.onKeyPress(e, this);
  }
  
  toOption = (option) => {
    let { optionLabel, optionValue } = this.props;

    if (typeof optionLabel === 'string') {
      if (option[optionLabel] != undefined) {
        option.label = option[optionLabel];
      }
    }
    else if (typeof optionLabel === 'function') {
      let label = optionLabel(option);
      if (label) {
        option.label = label;
      }
    }   
    if (typeof optionValue === 'string') {
      if (option[optionValue] != undefined) {
        option.value = option[optionValue];
      }
    }
    else if (typeof optionValue === 'function') {
      let value = optionValue(option);
      if (value) {
        option.value = value;
      }
    }
    return option;
  }
  
  loadOptionsHandler = (input, callback) => {
    let {
      threshold,
      delay,
      autoload,
      loadOptions,
      optionLabel,
      optionValue
    } = this.props;

    if (this.timeoutId != undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (!autoload && input != undefined && input.length >= threshold && !(this.inputTrigger && input.indexOf(this.inputTrigger) == 0)) {
      this.timeoutId = setTimeout(() => { 
        let promise = loadOptions(input);
        if (promise != undefined) {
          promise.then((data) => {
            if (optionLabel != undefined || optionValue != undefined) {
              for (let o of data) {
                this.toOption(o);
              }
            }
            this.inputTrigger = input;
            this.options = data;
            callback(null, { options: this.options, complete: true });
          }).catch((err) => {
            if (err && err.message) {
              messages.errorMessage(err.message);
            }
            callback(null, { options: this.options, complete: true });
          });
        }
      }, delay);
    }
    else if (autoload && !this.autoloadInitialized) {
      this.autoloadInitialized = true;
      let promise = loadOptions(input);
      if (promise != undefined) {
        promise.then((data) => {
          if (optionLabel != undefined || optionValue != undefined) {
            for (let o of data) {
              this.toOption(o);
            }
          }
          this.inputTrigger = input;
          this.options = data;          
          callback(null, { options: this.options, complete: true });
        }).catch((err) => {
          if (err && err.message) {
            messages.errorMessage(err.message);
          }
          callback(null, { options: this.options, complete: true });
        });
      }
    }
    else {
      callback(null, { options: this.options, complete: true });
    }
  }
  
  render() {
    let {
      bean,
      name,
      autoload,
      closeOnSelect,
      disabled,
      threshold,
      ignoreCase,
      ignoreAccents
    } = this.props;

    let placeholder = "Selecione...";
    if (!autoload && threshold > 1) {
      placeholder = placeholder + " (digite pelo menos " + threshold + " caracteres para iniciar a busca)"
    }

    let selected = this.toOption(introspector.getValue(bean, name, []));
    let options = this.options;
    if (options == undefined || options.length == 0) {
      options = selected;
    }
    return (
      <Select.Async
          className="MultipleSelection form-control"
           multi
           autoload={autoload}
           closeOnSelect={closeOnSelect}
           disabled={disabled}
           value={selected}
           cache={false}
           options={options}
           onChange={this.onChangeHandler}
           loadOptions={this.loadOptionsHandler} 
           onKeyPress={this.onKeyPressHandler}      
           loadingPlaceholder="Carregando..."
           searchPromptText="Digite para Procurar"  
           placeholder={placeholder}
           noResultsText="Sem Resultados"
           matchProp="label"
           ignoreCase={ignoreCase}
           ignoreAccents={ignoreAccents}
         />
    )
  }
}
