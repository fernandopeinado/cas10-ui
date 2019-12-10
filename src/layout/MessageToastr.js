import 'toastr/build/toastr.min.css';
import 'animate.css/animate.min.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import messages from "../core/Messages"

const ToastMessageFactory = React.createFactory(ToastMessageAnimated);

/**
 * Message Toaster é o container de mensagens, e deve ser colocado apenas uma vez em cada pagina.
 * Esse componente deve ser usado em conjunto com o serviço ```message``` em ```core.Message```.
 * 
 * Uso básico:
 * ~~~js
 * <MessageToastr/>
 * ~~~
 */
export default class MessageToastr extends Component {

  static propTypes = {
    /** 
     * habilita o botão de dispensar a mensagem. Default true.
     */
    closeButton: PropTypes.bool,
    /**
     * tempo em milisegundos em que a mensagem é apresentada antes de desaparecer automaticamente,
     * quando o usuário não interage com a mensagem.
     */
    timeOut: PropTypes.number,
    /**
     * tempo em milisegundos em que a mensagem é apresentada antes de desaparecer automaticamente, 
     * quando o usuário passa o mouse em cima da mensagem.
     */
    extendedTimeOut: PropTypes.number,
    /**
     * Define a posição onde a mensagem irá aparecer.
     */
    position: PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'top-full-width', 
                               'bottom-right', 'bottom-center', 'bottom-left', 'bottom-full-width'])
  }
  
  static defaultProps = {
    closeButton: true,
    timeOut: 15000,
    extendedTimeOut: 15000,
    position: 'top-right'    
  };

  toastr = React.createRef();

  componentDidMount() {
    messages.addListener('message', this.showMessage);
    messages.addListener('clear', this.clearMessages);
  }

  componentWillUnmount() {
    messages.removeListener('message', this.showMessage);
    messages.removeListener('clear', this.clearMessages);
  }

  showMessage = (msg) => {
    if (msg.type == "success") {
      this.toastr.current.success(
        msg.message,
        "Sucesso", {
          closeButton: this.props.closeButton,
          timeOut: this.props.timeOut,
          extendedTimeOut: this.props.extendedTimeOut
        });
    }
    else if (msg.type == "error") {
      this.toastr.current.error(
        msg.message,
        "Erro", {
          closeButton: this.props.closeButton,
          timeOut: this.props.timeOut,
          extendedTimeOut: this.props.extendedTimeOut
        });
    }
    else if (msg.type == "info") {
      this.toastr.current.info(
        msg.message,
        "Informação", {
          closeButton: this.props.closeButton,
          timeOut: this.props.timeOut,
          extendedTimeOut: this.props.extendedTimeOut
        });
    }
    else if (msg.type == "warning") {
      this.toastr.current.warning(
        msg.message,
        "Alerta", {
          closeButton: this.props.closeButton,
          timeOut: this.props.timeOut,
          extendedTimeOut: this.props.extendedTimeOut
        });
    }
  }

  clearMessages = () => {
    this.toastr.current.clear();
  }
  
  render() {
    const {
      position
    } = this.props;
    
    return (
      <ToastContainer ref={this.toastr} 
          toastMessageFactory={ToastMessageFactory} 
          className={'toast-' + position} />
    );
  }
}
