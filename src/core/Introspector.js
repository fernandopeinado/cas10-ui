import EventEmitter from "./EventEmitter";

/**
 * Utilitário para navegar em propriedades de objetos de uma forma mais fácil, usando expressão texto do caminho:
 * ```obj.pessoa.nome``` ou ```obj.pessoa.telefone[0].numero``` e etc.
 * 
 * Esta classe é exportada como um serviço singleton
 */
class Introspector {
  
  getValue(object, path, defaultValue) {    
    if (object == undefined) { 
      return defaultValue; 
    }
    path = path.replace(/\[([^\[]+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, '');           // strip a leading dot
    var propsArray = path.split('.');
    for (var i = 0, n = propsArray.length; i < n; ++i) {
      if (object == undefined) { 
        return defaultValue; 
      }
      var key = propsArray[i];
      if (key in object) {
          object = object[key];
      } else {
          return defaultValue;
      }
    }
    if (object == undefined) { 
      return defaultValue; 
    }
    return object;
  }
  
  setValue(object, path, value) {
    var originalObject = object;
    if (object != undefined) { 
      path = path.replace(/\[([^\[]+)\]/g, '.$1'); // convert indexes to properties
      path = path.replace(/^\./, '');           // strip a leading dot
      var propsArray = path.split('.');
      for (var i = 0, n = propsArray.length - 1; i < n; ++i) {
        var key = propsArray[i];
        if (key in object) {
          object = object[key];
        } else {
          object[key] = {}
          object = object[key];
        }
      }
      var lastKey = propsArray[propsArray.length - 1];
      var oldValue = object[lastKey];
      object[lastKey] = value;
      if (originalObject instanceof EventEmitter) {
        if (oldValue !== value) {
          originalObject.emit('changed:' + path);
        }
      }
    }
  }

}

const introspector = new Introspector();

export default introspector;
