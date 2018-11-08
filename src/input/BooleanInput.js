import React, { Component } from 'react';
import PropTypes from 'prop-types';
import introspector from '../core/Introspector'

/**
 * Input para valores booleanos de 2 ou 3 estados
 * 
 * Uso básico:
 * ~~~js
 * <BooleanInput bean={data} name="user.name"></BooleanInput>
 * ~~~
 */
export default class BooleanInput extends Component {

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
     * O tipo de input: bistate (default) ou tristate
     */
    type: PropTypes.string,
    /**
     * O valor padrão para o campo quando ele for iniciado vazio
     */
    defaultValue: PropTypes.bool,
    /**
     * Informa se o campo está habilitado ou não
     */
    disabled: PropTypes.bool,
    /**
     * TabIndex
     */
    tabIndex: PropTypes.number,
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
    type: "bistate",
    tabIndex: 0,
    defaultValue: null,
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
    return value;
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
    introspector.setValue(bean, name, value);
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
    if (e.keyCode == 32) { //Espaço
      e.preventDefault();
      this.onClickHandler(e);
    }
  }

  onKeyPressHandler = (e) => {
    this.props.onKeyPress ? this.props.onKeyPress(e, this) : null;
  }

  onClickHandler = (e) => {
    var value = this.getValue();
    var type = this.props.type;
    if (type == 'tristate') {
      if (value == null) {
        value = true;
      }
      else if (value == true) {
        value = false;
      }
      else {
        value = null;
      }
      this.setValue(value);
    }
    else {
      this.setValue(!value);
    }
    this.props.onChange ? this.props.onChange(e, this) : null;
    this.forceUpdate();
  }
  
  render() {
    let {
      bean,
      name,
      type,
      tabIndex,
      defaultValue,
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
    var value = this.getValue();
    return (
      <div className="form-control" 
          tabIndex={tabIndex}
          style={{ padding: "0px", width: "18px", height: "18px", lineHeight: "16px", margin: "8px 0px", textAlign: "center", borderRadius: "0px" }} 
          onClick={this.onClickHandler}
          onKeyDown={this.onKeyDownHandler}>
          {(type == "tristate" && value == null) ? null : 
            value ? 
              <i className="fa fa-check" style={{color: "green", fontSize: "14px"}}/> 
              :
              <i className="fa fa-close" style={{color: "red", fontSize: "14px"}}/>
          }    
      </div>      
    )
  }
}