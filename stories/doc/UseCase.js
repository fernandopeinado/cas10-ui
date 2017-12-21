import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkdownViewer from '../../src/Display/Markdown';

export default class UseCase extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
  };

  static defaultProps = {
    title: "Use Case",
    description: ""
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        {this.props.description && <MarkdownViewer content={this.props.description} style={{padding: "10px 0px 10px 0px"}} />}
        <div style={{padding: "10px 0px 10px 0px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
