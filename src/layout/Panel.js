import React from 'react';
import PropTypes from 'prop-types';
import shadows from '../theme/shadows';
import { theming } from '../theme/Theme';
import injectSheet from 'react-jss';

import BPanel from 'react-bootstrap/lib/Panel';

const styles = theme => ({
    panel: {
        composes: ['panel', 'panel-default'],
        backgroundColor: theme.backgroundLight,
        border: 'none',
        color: theme.textOnBackgroundLight,
        '& a[aria-expanded=true] $toogleDown': {
            display: 'none'
        },
        '& a[aria-expanded=false] $toogleUp': {
            display: 'none'
        }
    },
    header: {
        composes: 'panel-heading',
        backgroundColor: theme.primaryColor + ' !important',
        border: 'none !important',
        color: theme.textOnPrimaryColor + ' !important',
    },
    headerNoColor: {
        composes: 'panel-heading',
        backgroundColor: theme.backgroundLight + ' !important',
        border: 'none !important',
        color: theme.textOnBackgroundLight + ' !important',
        '& + .collapse .panel-body': {
            borderTop: '1px solid ' + theme.primaryColor + ' !important',
        }
    },
    footer: {
        composes: 'panel-footer',
        background: theme.backgroundLight + ' !important',
        color: theme.textOnBackgroundLight + ' !important'  
    },
    toogleUp: {
        float: 'right',
        composes: ['fa', 'fa-chevron-up']
    },
    toogleDown: {
        float: 'right',
        composes: ['fa', 'fa-chevron-down']
    }
})

@injectSheet(styles, { theming })
export default class Panel extends React.Component {

    static propTypes = {
        /**
         * o conteudo
         */
        children: PropTypes.node,
        /**
         * titulo
         */
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /**
         * Desabilita a cor do titulo
         */
        noColor: PropTypes.bool,
        /**
         * Rodapé
         */
        footer: PropTypes.PropTypes.node,
        /**
         * 
         */
        collapsible: PropTypes.bool,
        /**
         * 
         */
        defaultExpanded: PropTypes.bool
    }

    static defaultProps = {
        collapsible: false,
        defaultExpanded: true
    }

    render() {
        const {
            title,
            noColor,
            footer,
            children,
            collapsible,
            defaultExpanded,
            style,
            classes,
            ...otherProps
        } = this.props;
    
        var internalStyle = {
            ...style            
        }
        const boxShadow = shadows(2)
        if (boxShadow) internalStyle.boxShadow = boxShadow;
    
        const doBodyAndFooter = () => (
            <React.Fragment>
                <BPanel.Body>
                    {children}
                </BPanel.Body>
                {footer && <BPanel.Footer className={classes.footer}>{footer}</BPanel.Footer>}
            </React.Fragment>)

        return (
            <BPanel defaultExpanded={defaultExpanded} className={classes.panel} style={internalStyle} {...otherProps}>
                {title && 
                <BPanel.Heading className={noColor ? classes.headerNoColor : classes.header}>
                    <BPanel.Title componentClass="h3" toggle={collapsible}>
                        {title}
                        {collapsible && <i className={classes.toogleUp}></i>}
                        {collapsible && <i className={classes.toogleDown}></i>}
                    </BPanel.Title>
                </BPanel.Heading>}
                {collapsible ? <BPanel.Collapse> {doBodyAndFooter()} </BPanel.Collapse>
                : doBodyAndFooter() }
            </BPanel>
        )
    }

}