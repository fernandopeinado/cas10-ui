import React, { Component } from 'react';
import PropTypes from 'prop-types';
import introspector from '../Core/Introspector'

/* Private */

function treatUpperCaseValue(value, upperCase) {
  if (value && upperCase) {
    value = value.toUpperCase();
  }
  return value;
}

/**
 * Caixa de Texto que armazena o dado preenchido em um Objeto raiz em uma determinada propriedade.
 * 
 * Uso básico:
 * ~~~js
 * <TextInput bean={data} name="user.name"></TextInput>
 * ~~~
 */
export default class TextInput extends Component {

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
     * O tipo de input: text, password, email...
     */
    type: PropTypes.string,
    /**
     * O valor padrão para o campo quando ele for iniciado vazio
     */
    defaultValue: PropTypes.string,
    /**
     * Informa se o campo está habilitado ou não
     */
    disabled: PropTypes.bool,
    /**
     * Denota se este componente deve converter as informações digitadas para caixa alta
     */
    upperCase: PropTypes.bool,
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
     * Tratador usado para tratar a tecla ENTER
     * ```function(event, thisComponent) { }```
     */
    onKeyEnter: PropTypes.func
  };

  static defaultProps = {
    type: "text",
    upperCase: false,
    defaultValue: "",
    disabled: false
  };
  
  /**
   * Recupera o valor preenchido
   */
  getValue = () => {
    let {
      bean,
      name,
      defaultValue
    } = this.props;
    let value = introspector.getValue(bean, name, defaultValue);
    return treatUpperCaseValue(value, this.props.upperCase);
  }

  /**
   * Define um novo valor preenchido
   */
  setValue = (value) => {
    let {
      bean,
      name,
      onChange,
      upperCase
    } = this.props;
    introspector.setValue(bean, name, treatUpperCaseValue(value, this.props.upperCase));
  }

  onChangeHandler = (e) => {
    this.setValue(e.target.value);
    this.props.onChange ? this.props.onChange(e, this) : null;
    this.forceUpdate();
  }
  
  onKeyDownHandler = (e) => {
    if (this.props.onKeyEnter) {
      if (e.key === 'Enter' && e.shiftKey === false) {
        e.preventDefault();
        this.props.onKeyEnter(e, this);
      }
    }
  }

  onKeyPressHandler = (e) => {
    this.props.onKeyPress ? this.props.onKeyPress(e, this) : null;
  }
  
  render() {
    let {
      bean,
      name,
      type,
      defaultValue,
      upperCase,
      onChange,
      onKeyPress,
      onKeyEnter,
      disabled,
      ...otherProps
    } = this.props;
    let dynprops = {}
    if (disabled) {
      dynprops.disabled = "disabled";
    }
    return (
      <input type={type}
          className="form-control"
          value={this.getValue()}
          onChange={this.onChangeHandler}
          onKeyDown={this.onKeyDownHandler}
          onKeyPress={this.onKeyPressHandler} 
          {...dynprops}
          {...otherProps}
          />
    )
  }
}