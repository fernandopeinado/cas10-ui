import React, { Component } from 'react';

/**
 * Separador de botões em uma toolbar
 * 
 * Uso básico:
 * ~~~js
 * <ButtonToolbarSeparator/>
 * ~~~
 */
export default class ButtonToolbarSeparator extends Component {

  render() {
    var text = this.props.children || "\u0020";
    var style = {
      padding: "6px 0px",
      marginLeft: "10px",
      marginRight: "5px"
    }
    return <div className="btn-group toolbar-separator" style={style}>{text}</div>;
  }
}
