import EventEmitter from './EventEmitter'

/**
 * Repositorio de mensagens, centraliza a forma de envio de avisos e mensagens de forma desacoplada
 * com a implementação real de como elas são mostradas.
 * Veja componente Layout/MessageToastr.js
 * 
 * Esta classe é exportada como um serviço singleton
 */
class Messages extends EventEmitter {

  constructor() {
    super();
  }

  /**
   * Envia mensagem de sucesso
   * @param message a mensagem a ser mostrada
   */
  successMessage = (message) => {
    this.emit('message', { message:message, type:"success" });
  }
  
  /**
   * Envia mensagem de erro
   * @param message a mensagem a ser mostrada
   */
  errorMessage = (message) => {
    this.emit('message', { message:message, type:"error" });
  }
  
  /**
   * Envia mensagem informativa
   * @param message a mensagem a ser mostrada
   */
  infoMessage = (message) => {
    this.emit('message', { message:message, type:"info" });
  }
  
  /**
   * Envia mensagem de alerta
   * @param message a mensagem a ser mostrada
   */
  warningMessage = (message) => {
    this.emit('message', { message:message, type:"warning" });
  }
  
  /**
   * Limpa as mensagens abertas
   */
  clearMessages = () => {
    this.emit('clear');
  }
  
}

const messages = new Messages();

export default messages;
