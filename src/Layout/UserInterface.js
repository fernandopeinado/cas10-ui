import React, { Component } from 'react';
import * as Bootstrap from 'react-toastr';
import messages from "../Core/Messages"
import MessageToastr from "./MessageToastr";
import 'bootstrap/dist/css/bootstrap.min.css';

var IconBox = (props) => {
  return (
    <div style={{padding: "15px 10px", fontSize: "18px", lineHeight: "20px", textAlign: "center"}}>
      <i className={"fa fa-" + props.icon}></i>
    </div>
  );
}

export default class UserInterface extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-interface-window" style={{position: "relative", height: "100%"}}>
        <nav className="navbar navbar-default user-interface-bar" style={{position:"absolute", top: "0", left: "50px", right: "0", borderRadius: "0px", zIndex: 20}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">CAS10</a>
            </div>
          </div>
        </nav>
          <div className="user-interface-menu" style={{position:"absolute", top: "0", left: "0p", width: "50px", height: "100%", borderRadius: "0px", zIndex: 30, backgroundColor: "black", color: "white"}}>          
          <IconBox icon="bars"/>
          <div style={{height: "calc(100% - 100px)", overflowY: "auto"}}>
            <IconBox icon="file-text-o"/>
            <IconBox icon="gears" />
            <IconBox icon="area-chart"/>
            <IconBox icon="users"/>
            <IconBox icon="gear" />
          </div>
          <IconBox icon="user-circle-o"/>
        </div>
        <div className="user-interface-content" style={{position:"absolute", top: "52px", left: "50px", right: "0", bottom: "0", overflow: "auto"}}>
          <MessageToastr/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
