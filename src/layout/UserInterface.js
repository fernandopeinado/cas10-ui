import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './UserInterface.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';

import MessageToastr from './MessageToastr';
import theme from '../theme/defaultTheme';
import Theme from '../theme/Theme';
import color from 'color';

var IconBox = (props) => {
  return (
    <div style={{padding: "15px 10px", fontSize: "18px", lineHeight: "20px", textAlign: "center"}}>
      <i className={"fa fa-" + props.icon}></i>
    </div>
  );
}

@observer
export default class UserInterface extends Component {

  static propTypes = {
    /** 
     * Raiz para os dados: estado, formulário, dto
     */
    brand: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /**
     * 
     */
    uiStore: PropTypes.object,
    /**
     * 
     */
    theme: PropTypes.object
  }

  static defaultProps = {
    brand: "CAS10",
    uiStore: {},
    theme: theme
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      brand,
      theme
    } = this.props;

    const {
      menu,
      user
    } = this.props.uiStore;


    return (
      <Theme theme={theme}>
        <Provider uiStore={this.props.store}>
          <div className="user-interface-window" style={{position: "relative", height: "100%"}}>
            <nav className="navbar navbar-default user-interface-bar" style={{position:"absolute", top: "0", left: "50px", right: "0", borderRadius: "0px", zIndex: 20}}>
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">{brand}</a>
                </div>
              </div>
            </nav>
              <div className="user-interface-menu" style={{position:"absolute", top: "0", left: "0p", width: "50px", height: "100%", borderRadius: "0px", zIndex: 30, color: theme.textOnPrimaryColor, backgroundColor: theme.primaryColor}}>
              <IconBox icon="bars"/>
              <div style={{height: "calc(100% - 100px)", overflowY: "auto"}}>
                {menu ? [
                  <IconBox icon="file-text-o"/>,
                  <IconBox icon="gears" />,
                  <IconBox icon="area-chart"/>,
                  <IconBox icon="users"/>,
                  <IconBox icon="gear" />
                ] : null}
              </div>
              {user ? 
                <IconBox icon="user-circle-o"/>
              :
                <IconBox icon="sign-in"/>
              }
            </div>
            <div className="user-interface-content" style={{position:"absolute", top: "52px", left: "50px", right: "0", bottom: "0", overflow: "auto"}}>
              <MessageToastr/>
              {this.props.children}
            </div>
          </div>
        </Provider>
      </Theme>
    );
  }
}
