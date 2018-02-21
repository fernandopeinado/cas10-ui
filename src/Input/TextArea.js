import React, { Component } from 'react';
import PropTypes from 'prop-types';
import introspector from '../Core/Introspector';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/jinja2/jinja2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/css/css';
import 'codemirror/mode/groovy/groovy';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlmixed/htmlmixed';

import 'codemirror/lib/codemirror.css';

/**
 * Caixa de Texto multilinha, que armazena o dado preenchido em um Objeto raiz em uma determinada propriedade, baseado no
 * CodeMirror.
 * 
 * Uso básico:
 * ~~~js
 * <TextArea bean={data} name="user.name"></TextArea>
 * ~~~
 */
export default class TextArea extends Component {

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
     * O valor padrão para o campo quando ele for iniciado vazio
     */
    defaultValue: PropTypes.string,
    /**
     * Informa se o campo está habilitado ou não
     */
    disabled: PropTypes.bool,
    /**
     * Denota se este componente deve converter as informações digitadas para caixa alta
     */
    upperCase: PropTypes.bool,
    /**
     * Tratador de eventos padrão
     * ```function(event, thisComponent) { }```
     */
    onChange: PropTypes.func,
    /**
     * Modo indica a sintaxe, caso haja uma a ser usada para efeito de colorização do texto. São os modos
     * do Codemirror, usado como base para essa componente. Pré carregados, disponíveis inicialmente são:
     * ```css, groovy, htmlmixed, javascript, jinja2, markdown, shell, sql, yaml, xml```
     */
    mode: PropTypes.string,
    /**
     * Se deve ou não mostrar o número da linha no editor
     */
    showLineNumbers: PropTypes.bool
  };

  static defaultProps = {
    upperCase: false,
    defaultValue: "",
    disabled: false,
    mode: "",
    showLineNumbers: false,
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
      mode,
      showLineNumbers
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
            options={{mode: mode, lineNumbers: showLineNumbers }}          
            {...dynprops}
            />
      </div>
    )
  }
}