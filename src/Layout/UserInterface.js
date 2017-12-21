import React, { Component } from 'react';
import * as Bootstrap from 'react-toastr';
import messages from "../Core/Messages"
import 'bootstrap/dist/css/bootstrap.min.css';

export default class UserInterface extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{padding:"10px"}}>{this.props.children}</div>
    );
  }
}
