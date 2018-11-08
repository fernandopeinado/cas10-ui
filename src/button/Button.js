import 'font-awesome/css/font-awesome.min.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import RBButton from 'react-bootstrap/lib/Button';

const styles = {
  container: {
    position: 'relative'
  },
  spinnerContainer: {
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0  
  },
  spinnerIcon: {
    composes: ['fa', 'fa-spinner', 'fa-spin', 'fa-fw']
  }
}

/**
 * Botão com suporte a trava de duplo clique e informação visual de carregando.
 * 
 * Uso básico:
 * ~~~js
 * <Button>Label</Button>
 * ~~~
 */
@injectSheet(styles)
export default class Button extends Component {

  static propTypes = {
    /** 
     * Estilo do botão
     */
    bsStyle: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger', 'link']),
    /** 
     * Tamanho do botão
     */
    bsSize: PropTypes.oneOf(['large', 'small', 'xsmall']),
    /**
     * se o botão está ou não habilitado
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
    onClick: (event) => event && event.stopPropagation() && null
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.umounted = false;    
  }
  
  componentWillUnmount() {
    this.umounted = true;
  }

  /**
   * Ativa o clique do botão, sem um evento específico
   */
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
    const {
      children,
      disabled,
      onClick,
      bsSize,
      bsStyle,
      classes,
      ...otherProps
    } = this.props;
    
    const { isLoading } = this.state;
    const styleChildren = isLoading ? { visibility: "hidden" } : {}

    return (
      <RBButton {...otherProps}
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={disabled || isLoading}
          onClick={!isLoading ? this.onClickHandler : null} >
        <div className={classes.container}>
          <div style={styleChildren}>{children}</div>
          <div className={classes.spinnerContainer}>
            {isLoading && <i className={classes.spinnerIcon}></i>}
          </div>
        </div>
      </RBButton>
    );
  }
}
