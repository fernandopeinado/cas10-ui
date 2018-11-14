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
    booleanFormat: PropTypes.oneOf(['icone', 'sim_nao']),
    /**
     * true se for para mostrar a data. 
     * Se date e time forem null ou true a data completa será mostrada, se valor for uma data
     */
    date: PropTypes.bool,
    /**
     * true se for mostrar o horário. 
     * Se date e time forem null ou true a data completa será mostrada, se valor for uma data
     */
    time: PropTypes.bool,
  };

  static defaultProps = {
      locale: "pt-BR"
  };

  render() {
    let {
      value,
      locale,
      booleanFormat,
      date,
      time
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
        else if (value.constructor === Date || date || time) {
            printedValue = value.toString();
            if (typeof value === 'string' && value) {
                value = new Date(value);
            }
            if (value.constructor === Date) {
                if ((date == null && time == null) || (date && time)) {
                    printedValue = value.toLocaleString(locale);
                }
                else if (date) {
                    printedValue = value.toLocaleDateString(locale);
                }
                else if (time) {
                    printedValue = value.toLocaleTimeString(locale);
                }
            }
        }
        else if (typeof value === 'string') {
            printedValue = value;
        }
        else if (Array.isArray(value)) {
            printedValue = value.map(item => <div key={value}>{value}</div>);
        }
    }

    return (
      <span>{printedValue}</span>
    );
  }
}
