import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import introspector from '../core/Introspector';

const styles = {
  btnSearchMode: {
    composes: ['btn', 'btn-default'],
    width: "30px",
    padding: "6px"
  },
  btnSearchModeActive: {
    composes: ['btn', 'btn-success'],
    width: "30px",
    padding: "6px"
  }
}

/**
 * Caixa de Texto que armazena o dado preenchido em um Objeto raiz em uma determinada propriedade.
 * 
 * Uso básico:
 * ~~~js
 * <TextInput bean={data} name="user.name"></TextInput>
 * ~~~
 */
@injectSheet(styles)
export default class SearchMode extends Component {

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
     * O valor default
     */
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    defaultValue: 'STARTS_WITH'
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
    var value = introspector.getValue(bean, name, null);
    if (value == null) {
      value = defaultValue;
      this.setValue(value);      
    }
    return value
  }

  /**
   * Define um novo valor preenchido
   */
  setValue = (value) => {
    let {
      bean,
      name,
    } = this.props;
    introspector.setValue(bean, name, value);
  }

  selectOption = (option) => {
    this.setValue(option);    
    this.forceUpdate();
  }

  onKeyDownHandler = (e) => {
    if (e.altKey) {
      if (e.key == 'e' || e.key == 'E' || e.key == '1') { 
        e.preventDefault();  
        e.stopPropagation();
        this.selectOption('EQUALS');
      }
      else if (e.key == 'i' || e.key == 'I' || e.key == '2') { 
        e.preventDefault();
        e.stopPropagation();
        this.selectOption('STARTS_WITH');
      }
      else if (e.key == 'm' || e.key == 'M' || e.key == '3') { 
        e.preventDefault();
        e.stopPropagation();
        this.selectOption('CONTAINS');
      }
    }
  }
    
  render() {
    let {
      bean,
      name,
      defaultValue,
      children,
      classes,
      ...otherProps
    } = this.props;

    var eClassName = classes.btnSearchMode;
    var iClassName = classes.btnSearchMode;
    var mClassName = classes.btnSearchMode;
    var searchModeValue = this.getValue();
    if (searchModeValue == 'EQUALS') {
      eClassName = classes.btnSearchModeActive;
    }
    else if (searchModeValue == 'STARTS_WITH') {
      iClassName = classes.btnSearchModeActive;
    }
    else if (searchModeValue == 'CONTAINS') {
      mClassName = classes.btnSearchModeActive;
    }

    return (
      <div className="input-group" onKeyDown={this.onKeyDownHandler}>
        {children}
        <span className="input-group-btn">
          <button key='E' className={eClassName} tabIndex={-1} type="button" onClick={() => this.selectOption('EQUALS')}>E</button>
          <button key='I' className={iClassName} tabIndex={-1} type="button" onClick={() => this.selectOption('STARTS_WITH')}>I</button>
          <button key='M' className={mClassName} tabIndex={-1} type="button" onClick={() => this.selectOption('CONTAINS')}>M</button>
        </span>
      </div>
    )
  }
}