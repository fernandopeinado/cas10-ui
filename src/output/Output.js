import 'font-awesome/css/font-awesome.min.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para escrever um valor na tela
 * 
 * Uso básico:
 * ~~~js
 * <Output value={value} />
 * ~~~
 */
export default class Output extends Component {

  static propTypes = {
    /** 
     * O valor a ser desenhado
     */
    value: PropTypes.any,
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
    dateFormat: PropTypes.bool,
    /**
     * true se for mostrar o horário. 
     * Se dateFormat e timeFormat forem null ou true a data completa será mostrada
     */
    timeFormat: PropTypes.bool,
  };

  static defaultProps = {
      locale: "pt-BR"
  };

  render() {
    let {
      value,
      locale,
      booleanFormat,
      dateFormat,
      timeFormat
    } = this.props;

    var printedValue = value || "";
    
    if (value != null) {
        if (typeof value === 'boolean') {
            if (booleanFormat == "sim_nao") {
                printedValue = value ? "Sim" : "Não";
            }
            else {
                printedValue = value ? <i className="fa fa-check" style={{color: "green"}} /> : <i className="fa fa-close" style={{color: "red"}} />
            }
        }
        else if (value.constructor === 'Date') {
            if ((dateFormat == null && timeFormat == null) || (dateFormat && timeFormat)) {
                printedValue = value.toLocaleString(locale);
            }
            else if (dateFormat) {
                printedValue = value.toLocaleDateString(locale);
            }
            else if (timeFormat) {
                printedValue = value.toLocaleTimeString(locale);
            }
        }
    }

    return (
      <span>{printedValue}</span>
    );
  }
}
