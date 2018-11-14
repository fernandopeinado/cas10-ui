import 'font-awesome/css/font-awesome.min.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Output from './Output';
import introspector from '../core/Introspector';

/**
 * Componente para escrever um valor na tela
 * 
 * Uso básico:
 * ~~~js
 * <OutputProperty bean={dto} name="prop" />
 * ~~~
 */
export default class OutputProperty extends Component {

  static propTypes = {
    /** 
     * O valor a ser desenhado
     */
    bean: PropTypes.object,
    /** 
     * O valor a ser desenhado
     */
    name: PropTypes.string,
    /**
     * O valor do locale: pt-BR é o valor padrão
     */
    locale: PropTypes.string,
    /**
     * icone: v verde ou x vermelho em icones (default)
     * sim_nao: para Sim ou Não
     */
    booleanFormat: PropTypes.string,
    /**
     * true se for para mostrar a data. 
     * Se dateFormat e timeFormat forem null ou true a data completa será mostrada
     */
    date: PropTypes.bool,
    /**
     * true se for mostrar o horário. 
     * Se dateFormat e timeFormat forem null ou true a data completa será mostrada
     */
    time: PropTypes.bool,
  };

  render() {
    let {
      bean,
      name,
      ...otherProps
    } = this.props;
    var value = introspector.getValue(bean, name, "");
    return (
      <Output value={value} {...otherProps} />
    );
  }
}
