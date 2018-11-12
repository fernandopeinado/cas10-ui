import 'font-awesome/css/font-awesome.min.css'

import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renderiza um icon do font-awesome.
 * ~~~
 * <Icon fa="close" />
 * ~~~
 */
export default class Icon extends React.Component {

    static propTypes = {
        /**
         * Icone do font awesome (somente o nome final)
         */
        fa: PropTypes.string.isRequired
    }

    render() {
        const { fa, ...otherProps } = this.props;
        return <i {...otherProps} className={'fa fa-' + fa}></i>
    }

}