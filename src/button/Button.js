import 'font-awesome/css/font-awesome.min.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RBButton from 'react-bootstrap/lib/Button';

/**
 * Botão com suporte a trava de duplo clique e informação visual de carregando.
 * 
 * Uso básico:
 * ~~~js
 * <Button>Label</Button>
 * ~~~
 */
export default class Button extends Component {

  static propTypes = {
    /** 
     * Estilo bootstrap do botão: *default*, *primary*, *success*, *info*, *warning*, *danger*, *link*
     */
    bsStyle: PropTypes.string,
    /** 
     * Tamanho bootstrap do botão: *large*, *small*, *xsmall*
     */
    bsSize: PropTypes.string,
    /**
     * se o botão está ou não habilitado: *true*, *false*
     */
    disabled: PropTypes.bool,
    /** 
     * função chamada quando o botão é clicado. Recebe o evendo de clique. 
     * ```function(nullableEvent, thisComponent) { }```
     */
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    bsStyle: "default",
    disabled: false,
    onClick: (event) => {
      if (event != null) {
        event.stopPropagation();
      }
    },
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.umounted = false;    
  }
  
  componentWillUnmount() {
    this.umounted = true;
  }

  click = () => {
    this.onClickHandler(null);
  }

  onClickHandler = (e) => {
    this.setState({ isLoading: true });
    var promise = this.props.onClick(e, this);
    if (promise != null && promise.then != undefined) {
      promise.then(
        () => { if (!this.umounted) { this.setState({isLoading: false}); } },
        () => { if (!this.umounted) { this.setState({isLoading: false}); } }
      );
    }
    else if (!this.umounted) { 
      this.setState({ isLoading: false });
    }
  }

  render() {
    let {
      children,
      disabled,
      onClick,
      bsSize,
      bsStyle,
      ...otherProps
    } = this.props;
    let isLoading = this.state.isLoading;

    let styleChildren = {}
    if (isLoading) {
      styleChildren = { visibility: "hidden" }
    }

    return (
      <RBButton
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={disabled || isLoading}              
          onClick={!isLoading ? this.onClickHandler : null}
          {...otherProps} >
            <div style={{position: "relative"}}>
              <div style={styleChildren}>{children}</div>
              <div style={{position: "absolute", top: "0", bottom: "0", left: "0", right: "0" }}>
                {isLoading && <i className="fa fa-spinner fa-spin fa-fw"></i>}
              </div>
            </div>
      </RBButton>
    );
  }
}
