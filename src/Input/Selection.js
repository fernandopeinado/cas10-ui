import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import introspector from '../Core/Introspector';
import messages from '../Core/Messages';
import "react-select/dist/react-select.css";

export default class Selection extends Component {
  static propTypes = {
    bean: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    delay: PropTypes.number,
    disabled: PropTypes.bool,
    threshold: PropTypes.number,
    autoload: PropTypes.bool,
    loadOptions: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }
  
  static defaultProps = {
    delay: 500,
    autoload: false,
    threshold: 3,
    defaultValue: "",
    disabled: false,
    onChange: () => {},
    onKeyPress: () => {}
  };

  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.autoloadInitialized = false;
    this.options = [];
    this.inputTrigger = undefined;
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
  
  loadOptionsHandler = (input, callback) => {
    let {
      threshold,
      delay,
      autoload,
      loadOptions,
      optionLabel,
      optionValue
    } = this.props;

    if (this.timeoutId != undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (!autoload && input != undefined && input.length >= threshold && !(this.inputTrigger && input.indexOf(this.inputTrigger) == 0)) {
      this.timeoutId = setTimeout(() => { 
        let promise = loadOptions(input);
        if (promise != undefined) {
          promise.then((data) => {
            if (optionLabel != undefined || optionValue != undefined) {
              for (let o of data) {
                this.toOption(o);
              }
            }
            this.inputTrigger = input;
            this.options = data;
            callback(null, { options: this.options, complete: true });
          }).catch((err) => {
            if (err && err.message) {
              messages.errorMessage(err.message);
            }
            callback(null, { options: this.options, complete: true });
          });
        }
      }, delay);
    }
    else if (autoload && !this.autoloadInitialized) {
      this.autoloadInitialized = true;
      let promise = loadOptions(input);
      if (promise != undefined) {
        promise.then((data) => {
          if (optionLabel != undefined || optionValue != undefined) {
            for (let o of data) {
              this.toOption(o);
            }
          }
          this.inputTrigger = input;
          this.options = data;          
          callback(null, { options: this.options, complete: true });
        }).catch((err) => {
          if (err && err.message) {
            messages.errorMessage(err.message);
          }
          callback(null, { options: this.options, complete: true });
        });
      }
    }
    else {
      callback(null, { options: this.options, complete: true });
    }
  }
  
  render() {
    let {
      bean,
      name,
      autoload,
      disabled
    } = this.props;
    let selected = this.toOption(introspector.getValue(bean, name, {value: "", label: "Selecione..."}));
    let options = this.options;
    if (options == undefined || options.length == 0) {
      options = [selected];
    }
    return (
      <Select.Async
           autoload={autoload}
           disabled={disabled}
           value={selected.value}
           options={options}
           onChange={this.onChangeHandler}
           loadOptions={this.loadOptionsHandler} 
           onKeyPress={this.onKeyPressHandler}      
           loadingPlaceholder="Carregando..."
           searchPromptText="Digite para Procurar"  
           placeholder="Selecione..."
           noResultsText="Sem Resultados"
           matchProp="label"
         />
    )
  }
}
