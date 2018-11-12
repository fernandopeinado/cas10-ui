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
  checkedIcon: {
    composes: ['fa', 'fa-check'],
    fontSize: 14
  }
}

/**
 * Componente de check, normalmente atrelada a um valor quando selecionada como um ID e muitos casos.
 * Pode ser uma seleção simples, ou uma seleção de lista, que guarda todos os itens selecionados.
 */
@injectSheet(styles)
export default class Checkbox extends Component {

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
        type: PropTypes.oneOf(['single', 'list']),
        /**
         * O valor a ser definido na propriedade quando este for checado
         */
        value: PropTypes.any.isRequired,
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
         * ```function(newValue, thisComponent) { }```
         */
        onChange: PropTypes.func,
        /**
         * Tratador usado para tratar a tecla ENTER
         * ```function(event, thisComponent) { }```
         */
        onKeyEnter: PropTypes.func
    }

    static defaultProps = {
        type: 'single',
        tabIndex: 0,
        disabled: false
    };

    /**
     * Recupera se está marcado ou não
     */
    getChecked = () => {
        let { bean, name, value, type } = this.props;
        if (type == 'single') {
            let propValue = introspector.getValue(bean, name);
            return propValue && propValue == value;
        }
        else {
            let propValue = introspector.getValue(bean, name, []);
            return propValue.indexOf(value) >= 0;
        }
    }

    /**
     * Se define como marcado
     */
    setChecked = (isChecked) => {
        let { bean, name, value, type, onChange } = this.props;
        let newValue = null;
        if (type == 'single') {
            newValue = value;
            introspector.setValue(bean, name, isChecked ? value : null);
        }
        else {
            let propValue = introspector.getValue(bean, name, []);
            if (isChecked) {
                propValue.push(value);
            }
            else {
                let idx = propValue.indexOf(value);
                if (idx >= 0) {
                    propValue.splice(idx, 1);
                }
            }
            introspector.setValue(bean, name, propValue);
            newValue = propValue;
        }
        onChange && this.props.onChange(newValue, this);
        this.forceUpdate();
    }

    /**
     * Alterna o estado atual
     */
    toogleChecked = () => {
        this.setChecked(!this.getChecked());
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
            this.toogleChecked();
        }
    }
       
    render() {
        const {
            classes,
            tabIndex,
            bean, 
            name, 
            type, 
            value,
            disabled,
            onChange,
            onKeyEnter,
            ...otherProps
        } = this.props;
        return (
            <div className={classes.formControl}
                tabIndex={tabIndex}          
                onClick={this.toogleChecked}
                onKeyDown={this.onKeyDownHandler}
                {...otherProps} >
                {this.getChecked() && <i className={classes.checkedIcon} />}
            </div>      
        );
    }
}