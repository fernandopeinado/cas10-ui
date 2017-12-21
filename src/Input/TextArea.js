import React, { Component } from 'react';
import PropTypes from 'prop-types';
import introspector from '../Core/Introspector';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/jinja2/jinja2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

export default class TextArea extends Component {

  static propTypes = {
    bean: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    upperCase: PropTypes.bool,
    onChange: PropTypes.func,
    mode: PropTypes.string
  };

  static defaultProps = {
    upperCase: false,
    defaultValue: "",
    disabled: false,
    mode: "",
    onChange: () => {}
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

  onChangeHandler = (text) => {
    this.setValue(text);
    this.props.onChange(text, this);
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
      mode
    } = this.props;
    let dynprops = {}
    if (disabled) {
      dynprops.disabled = "disabled";
    }
    return (
      <div className="form-control" style={{height: "initial"}}>
        <CodeMirror
            value={this.getValue()}
            onChange={this.onChangeHandler}
            options={{mode: mode}}          
            {...dynprops}
            />
      </div>
    )
  }
}