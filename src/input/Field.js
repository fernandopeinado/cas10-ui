import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormGroup, HelpBlock } from "react-bootstrap";
import { observer } from 'mobx-react';

/**
 * Campo com input
 * 
 * Uso básico:
 * ~~~js
 * <Field label="Nome">
 *    <TextInput ...>
 * </Field>
 * ~~~
 */
@observer
export default class Field extends Component {
    static propTypes = {
        /**
         * Label texto ou elemento
         */
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        /**
         * Help texto ou elemento
         */
        help: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        /**
         * Mensagens de erro
         */
        errors: PropTypes.array,
    };
  
    static defaultProps = { 
    };

    constructor(props) {
        super(props);
    }

    changedEventListener = () => {
        this.forceUpdate();
    }

    render() {
        let {
            label,
            help,
            errors,
            children
        } = this.props;

        let validationState = null;
        if (errors != null && errors.length > 0) {
            validationState = 'error';
        }

        return (
            <FormGroup key={name} validationState={validationState}>
                <ControlLabel>{label}</ControlLabel>
                {children}
                {help && <HelpBlock>{help}</HelpBlock>}
                {errors && <HelpBlock>{errors.join('; ')}</HelpBlock>}
            </FormGroup>
        );
    }
}
