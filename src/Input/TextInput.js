import React, { Component } from 'react';
import PropTypes from 'prop-types';
import introspector from '../Core/Introspector'

export default class TextInput extends Component {

  static propTypes = {
    bean: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    upperCase: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func
  };

  static defaultProps = {
    upperCase: false,
    defaultValue: "",
    disabled: false,
    onChange: () => {},
    onKeyPress: () => {}
  };
  
  treatUpperCaseValue = (value) => {
    if (value && this.props.upperCase) {
      value = value.toUpperCase();
    }
    return value;
  }

  getValue = () => {
    let {
      bean,
      name,
      defaultValue
    } = this.props;
    let value = introspector.getValue(bean, name, defaultValue);
    return this.treatUpperCaseValue(value);
  }

  setValue = (value) => {
    let {
      bean,
      name,
      onChange,
      upperCase
    } = this.props;
    introspector.setValue(bean, name, this.treatUpperCaseValue(value));
  }

  onChangeHandler = (e) => {
    this.setValue(e.target.value);
    this.props.onChange(e, this);
    this.forceUpdate();
  }
  
  onKeyPressHandler = (e) => {
    this.props.onKeyPress(e, this);
  }
  
  render() {
    let {
      onChange,
      onKeyPress,
      disabled,
      ...otherProps
    } = this.props;
    let dynprops = {}
    if (disabled) {
      dynprops.disabled = "disabled";
    }
    return (
      <input type="text" 
          className="form-control"
          value={this.getValue()}
          onChange={this.onChangeHandler}
          onKeyPress={this.onKeyPressHandler} 
          {...dynprops}
          {...otherProps}
          />
    )
  }
}