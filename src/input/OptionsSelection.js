import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import introspector from '../core/Introspector';
import "react-select/dist/react-select.css";
import "./Selection.css";

/**
 * Caixa de Seleção simples.
 * 
 * Uso básico:
 * ~~~js
 * <OptionsSelection bean={bean} name="sexo" options={sexos}></OptionsSelection>
 * ~~~
 */
export default class OptionsSelection extends Component {

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
    defaultValue: PropTypes.string,
    /**
     * Informa se o campo está habilitado ou não
     */
    disabled: PropTypes.bool,
    /**
     * As opções fixas que serão mostradas
     */
    options: PropTypes.array.isRequired,
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
    defaultValue: "",
    disabled: false,
    onChange: () => {},
    onKeyPress: () => {}
  };

  constructor(props) {
    super(props);
    let {
      optionLabel,
      optionValue,
      options
    } = this.props;
    let intenalOptions = [...options];
    if (optionLabel != undefined || optionValue != undefined) {
      for (let o of intenalOptions) {
        this.toOption(o);
      }
    }
    this.state = {
      options: intenalOptions
    }
  }

  componentWillReceiveProps(nextProps) {
    let intenalOptions = [...nextProps.options];
    let {
      optionLabel,
      optionValue
    } = nextProps;
    if (optionLabel != undefined || optionValue != undefined) {
      for (let o of intenalOptions) {
        this.toOption(o);
      }
    }
    this.setState({
      options: intenalOptions
    });
  }

  onChangeHandler = (option) => {
    let { bean, name, onChange } = this.props;
    introspector.setValue(bean, name, option);
    onChange(option, this);
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
  
  render() {
    let {
      bean,
      name,
      disabled
    } = this.props;
    let {
      options
    } = this.state;
    let selected = this.toOption(introspector.getValue(bean, name, {value: "", label: "Selecione..."}));
    return (
      <Select className="Selection form-control" 
            disabled={disabled}
            value={selected.value}
            options={options}
            onChange={this.onChangeHandler}
            onKeyPress={this.onKeyPressHandler}      
            placeholder="Selecione..."
         />
    )
  }
}
