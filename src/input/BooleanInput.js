import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import introspector from '../core/Introspector'

const styles = {
  formControl: {
    composes: ['form-control'],
    padding: 0, 
    width: 18, 
    height: 18, 
    lineHeight: '16px', 
    margin: [8, 0], 
    textAlign: "center", 
    borderRadius: 0,
    'table &': {
      margin: [0]
    }
  },
  yesIcon: {
    composes: ['fa', 'fa-check'],
    color: 'green', 
    fontSize: 14
  },
  noIcon: {
    composes: ['fa', 'fa-close'],
    color: 'red', 
    fontSize: 14
  }
}
/**
 * Input para valores booleanos de 2 ou 3 estados
 * 
 * Uso básico:
 * ~~~js
 * <BooleanInput bean={data} name="user.name"></BooleanInput>
 * ~~~
 */
@injectSheet(styles)
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
     * O tipo de input
     */
    type: PropTypes.oneOf(['bistate', 'tristate']),
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
      classes,
      ...otherProps
    } = this.props;
    let dynprops = {}
    if (disabled) {
      dynprops.disabled = "disabled";
    }
    var value = this.getValue();
    return (
      <div {...otherProps} 
          className={classes.formControl}
          tabIndex={tabIndex}          
          onClick={this.onClickHandler}
          onKeyDown={this.onKeyDownHandler}>
          {(type == "tristate" && value == null) ? null : 
            value ? <i className={classes.yesIcon} /> :<i className={classes.noIcon}/>
          }
      </div>      
    )
  }
}