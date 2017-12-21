import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends Component {

    static propTypes = {
        checked: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            checked: nextProps.checked
        });
    }

    render() {
        const { checked } = this.state;
        const { label, onChange } = this.props;
        return (
            <div>
                <input type="checkbox" 
                    checked={checked}
                    onChange={onChange} />
                {label}
            </div>
        );
    }
}