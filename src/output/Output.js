import 'font-awesome/css/font-awesome.min.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
     * true se for para mostrar a data padrão (dd/MM/yyyy). 
     * Se date e time forem null ou true a data completa será mostrada, se valor for uma data
     */
    date: PropTypes.bool,
    /**
     * true se for mostrar o horário padrão (HH:mm). 
     * Se date e time forem null ou true a data completa será mostrada, se valor for uma data
     */
    time: PropTypes.bool,
    /**
     * o formato para parsear a data (ver moment.js)      
     */
    dateParseFormat: PropTypes.string,    
    /**
     * o formato para customizar a exibição da data 
     * deve seguir a formatação do moment.js (ver moment.js)           
     */
    dateDisplayFormat: PropTypes.string,        
  };

  static defaultProps = {
      locale: "pt-BR"
  };

  render() {
    let {
      value,      
      booleanFormat,
      date,      
      time,
      dateDisplayFormat,
      ...otherProps    
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
        else if (value.constructor === Date || date || time || dateDisplayFormat !== undefined) {
            printedValue = this.convertDate()
        }
        else if (typeof value === 'string') {
            printedValue = value;
        }
        else if (Array.isArray(value)) {
            printedValue = value.map(item => <div key={value}>{value}</div>);
        }
    }

    return (
      <span {...otherProps}>{printedValue}</span>
    );
  }

  convertDate() {
    let {
        value,                    
        date,        
        time,
        dateParseFormat,
        dateDisplayFormat        
      } = this.props;
        
    let printedValue = value.toString();
    if (typeof value === 'string' && value) {        
        value = moment(value, dateParseFormat)
    }
    if (value.constructor === Date) {
        value = moment(value)
    }

    if (value instanceof moment) {
        if(dateDisplayFormat) {
            printedValue = value.format(dateDisplayFormat)
        }
        else if ((date == null && time == null) || (date && time)) {
            printedValue = value.format("DD/MM/YYYY HH:mm")
        }
        else if (date) {
            printedValue = value.format("DD/MM/YYYY")
        }
        else if (time) {
            printedValue = value.format("HH:mm")
        }
    }
    return printedValue
  }


}
