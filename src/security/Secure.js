import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import securityStore from './SecurityStore'

/**
 * Componente para aplicar um controle de permissões em relação ao desenho de componentes filhas.
 */
@observer
export default class Secure extends React.Component {

    static propTypes = {
        /**
         * fallback
         */
        fallback: PropTypes.any,
        /**
         * checa se existe ao menos um usuario autenticado
         */
        authenticated: PropTypes.bool,
        /**
         * Checa se o usuário tem a role especificada
         */
        hasRole: PropTypes.string,
        /**
         * Checa se o usuário tem todas as roles especificadas
         */
        hasRoles: PropTypes.arrayOf(PropTypes.string),
        /**
         * Checa se o usuário uma das roles especificadas
         */
        hasAnyRole: PropTypes.arrayOf(PropTypes.string),
    }

    static defaultProps = {
        fallback: <span/>
    }

    render() {
        const {
            fallback,
            authenticated,
            hasRole,
            hasRoles,
            hasAnyRole,
            children
        } = this.props
        const loaded = securityStore.loaded
        if (authenticated && !loaded) return fallback;
        if (hasRole && !securityStore.hasRole(hasRole)) return fallback;
        if (hasRoles && !securityStore.hasRoles(hasRoles)) return fallback;
        if (hasAnyRole && !securityStore.hasAnyRole(hasAnyRole)) return fallback;
        return <React.Fragment>{children}</React.Fragment>
    }

}