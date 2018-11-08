/**
 * Interface para validação, devolve uma mensagem de erro ou null caso esteja validado.
 *
 * Construtor recebe a mensagem padrão como argumento
 */
export class Validator {

    constructor(defaultMessage) {
        this.defaultMessage = defaultMessage;
    }

    /**
     * @param value o valor a ser validado
     */
    validate(value) {
        return null;
    }
}

export class Required extends Validator {
    
    constructor() {
        super("Preenchimento obrigatório");
    }

    validate(value, message) {
        if (value == null 
            || (typeof value == 'string' && !value)
            || (Array.isArray(value) && !value.length) ) {
            return message ? message : this.defaultMessage;
        }
        return null;
    }
}

export const required = new Required();

export class Length extends Validator {
    
    constructor(min, max) {
        super(min && max ? `O tamanho deve ser entre ${min} e ${max}` : ( min ? `O tamanho deve ser no mínimo ${min}` : `O tamanho deve ser no máximo ${max}`));
        this.min = min;
        this.max = max;
    }

    validate(value, message) {
        if (value != null && typeof value == 'string') {
            if ((this.min != null && value.length < this.min)  
                    || (this.max != null && value.length > this.max)) {
                return message ? message : this.defaultMessage;
            }
        }
        return null;
    }
}

export class EqualsTo extends Validator {

    constructor(otherValue) {
        super("Não é igual ao outro valor");
        this.otherValue = otherValue;
    }

    validate(value, message) {
        let other = this.otherValue;
        if (typeof this.otherValue === 'function') {
            other = this.otherValue();
        }
        if (value != other) {
            return message ? message : this.defaultMessage;
        }
        return null;
    }
}

export class Regex extends Validator {

    constructor(regexp) {
        super("Não é se encaixa no padrão especificado");        
        if (regexp instanceof RegExp) {
            this.regexp = regexp;
        }
        else {
            this.regexp = new RegExp(regexp);
        }
    }

    validate(value, message) {
        if (value != null && !this.regexp.test(value)) {
            return message ? message : this.defaultMessage;
        }
        return null;
    }
}

/**
 * Executa validações em beans e names
 */
export default class ValidationService {

    constructor(errorsMap) {
        this.errorsMap = errorsMap;
    }

    /**
     * Valida a propriedade do bean e devolve null se Ok ou um array de mensagens de erro
     * @param {Validator or Array of Validator} validations 
     * @param {string} name o nome ou caminho da propriedade
     * @param {Object} value o valor
     * @param {string} message uma mensagem de erro ou null
     */
    executeValidator(validator, name, value, message) {
        let errorMsg = validator.validate(value, message);
        if (errorMsg) {
            var errors = this.errorsMap.get(name);
            if (errors == null) {
                errors = [ errorMsg ];
                this.errorsMap.set(name, errors);
            }
            else {
                errors.push(errorMsg);
            }
        }
    }

    /**
     * Valida a propriedade do bean e devolve null se Ok ou um array de mensagens de erro
     * @param validations um Validator ou um Array de Validators
     * @param name o nome ou caminho da propriedade
     * @param value o valor
     * @param messages uma mensagem para cada validador ou null para mensagem padrão
     */
    validate(validations, name, value, messages) {
        this.errorsMap.delete(name);
        if (validations != null) {
            if (validations instanceof Validator) {
                this.executeValidator(validations, name, value, messages);
            }
            else if (Array.isArray(validations)) {
                for (let i = 0; i < validations.length; i++) {
                    if (validations[i] instanceof Validator) {
                        var message = messages ? messages[i] : null;
                        this.executeValidator(validations[i], name, value, message);
                    }
                }
            }
        }
    }
}