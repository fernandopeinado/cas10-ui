import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import introspector from '../Core/Introspector';
import messages from '../Core/Messages';

export default class OptionsSelection extends Component {
  static propTypes = {
    bean: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }

  static defaultProps = {
    defaultValue: "",
    disabled: false,
    onChange: () => {},
    onKeyPress: () => {}
  };

  constructor(props) {
    super(props);
    let {
      optionLabel,
      optionValue,
      options
    } = this.props;
    let intenalOptions = [...options];
    if (optionLabel != undefined || optionValue != undefined) {
      for (let o of intenalOptions) {
        this.toOption(o);
      }
    }
    this.state = {
      options: intenalOptions
    }
  }

  componentWillReceiveProps(nextProps) {
    let intenalOptions = [...nextProps.options];
    let {
      optionLabel,
      optionValue
    } = nextProps;
    if (optionLabel != undefined || optionValue != undefined) {
      for (let o of intenalOptions) {
        this.toOption(o);
      }
    }
    this.setState({
      options: intenalOptions
    });
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
  
  render() {
    let {
      bean,
      name,
      disabled
    } = this.props;
    let {
      options
    } = this.state;
    let selected = this.toOption(introspector.getValue(bean, name, {value: "", label: "Selecione..."}));
    return (
      <Select disabled={disabled}
           value={selected.value}
           options={options}
           onChange={this.onChangeHandler}
           onKeyPress={this.onKeyPressHandler}      
           placeholder="Selecione..."
         />
    )
  }
}
