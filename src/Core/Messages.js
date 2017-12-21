import EventEmitter from './EventEmitter'

class Messages extends EventEmitter {

  constructor() {
    super();
  }

  successMessage = (message) => {
    this.emit('message', { message:message, type:"success" });
  }
  
  errorMessage = (message) => {
    this.emit('message', { message:message, type:"error" });
  }
  
  infoMessage = (message) => {
    this.emit('message', { message:message, type:"info" });
  }
  
  warningMessage = (message) => {
    this.emit('message', { message:message, type:"warning" });
  }
  
  clearMessages = (message) => {
    this.emit('clear');
  }
  
}

const messages = new Messages();

export default messages;
