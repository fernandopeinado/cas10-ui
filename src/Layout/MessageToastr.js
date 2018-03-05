import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, ToastMessage } from 'react-toastr';
import messages from "../Core/Messages"
import 'toastr/build/toastr.min.css';

var ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class MessageToastr extends Component {

  static propTypes = {
    closeButton: PropTypes.bool,
    timeOut: PropTypes.number,
    extendedTimeOut: PropTypes.number,
    toastrClassName: PropTypes.string
  }
  
  static defaultProps = {
    closeButton: true,
    timeOut: 15000,
    extendedTimeOut: 15000,
    toastrClassName: 'toast-top-right'
  };

  componentDidMount() {
    messages.addListener('message', (msg) => {
      if (msg.type == "success") {
        this.toastr.success(
          msg.message,
          "Sucesso", {
            closeButton: this.props.closeButton,
            timeOut: this.props.timeOut,
            extendedTimeOut: this.props.extendedTimeOut
          });
      }
      else if (msg.type == "error") {
        this.toastr.error(
          msg.message,
          "Erro", {
            closeButton: this.props.closeButton,
            timeOut: this.props.timeOut,
            extendedTimeOut: this.props.extendedTimeOut
          });
      }
      else if (msg.type == "info") {
        this.toastr.info(
          msg.message,
          "Informação", {
            closeButton: this.props.closeButton,
            timeOut: this.props.timeOut,
            extendedTimeOut: this.props.extendedTimeOut
          });
      }
      else if (msg.type == "warning") {
        this.toastr.warning(
          msg.message,
          "Alerta", {
            closeButton: this.props.closeButton,
            timeOut: this.props.timeOut,
            extendedTimeOut: this.props.extendedTimeOut
          });
      }
    });
    messages.addListener('clear', () => this.toastrContainer.clear());
  }
  
  render() {
    const {
      toastrClassName
    } = this.props;
    return (
      <ToastContainer ref={(toastr) => { this.toastr = toastr; }} 
          toastMessageFactory={ToastMessageFactory} 
          className={toastrClassName} />
    );
  }
}
