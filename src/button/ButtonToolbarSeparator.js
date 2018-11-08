import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  separator: {
    composes: ['btn-group', 'toolbar-separator'],
    padding: [6, 0],
    marginLeft: [10, "!important"],
    marginRight: 5
  }
}

/**
 * Separador de botões em uma toolbar
 * 
 * Uso básico:
 * ~~~js
 * <ButtonToolbarSeparator/>
 * ~~~
 */
@injectSheet(styles)
export default class ButtonToolbarSeparator extends React.Component {
  render() {
    const text = this.props.children || "\u0020";
    return <div className={this.props.classes.separator}>{text}</div>
  }
}
