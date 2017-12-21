import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import MarkdownViewer from '../../src/Display/Markdown';

export default class DocsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var meta = this.props.component.__docgenInfo;
    return (
      <div style={{padding:"10px"}}>
        <h1>{meta.displayName}</h1>
        <hr/>
        <MarkdownViewer content={meta.description} />
        <h3>Props</h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Propriedade</th>
                    <th>Tipo</th>
                    <th>Obrigatório</th>
                    <th>Default</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
            {Object.keys(meta.props).map(prop => 
                <tr>
                    <td>{prop}</td>
                    <td>{meta.props[prop].type.name}</td>
                    <td style={{textAlign:"center"}}>{meta.props[prop].required ? 'sim' : ''}</td>
                    <td>{meta.props[prop].defaultValue && meta.props[prop].defaultValue.value}</td>
                    <td><MarkdownViewer content={meta.props[prop].description} /></td>
                </tr>
            )}
            </tbody>
        </table>
        <hr />
        <h2>Exemplos e Usos</h2>
        {this.props.children}
      </div>
    );
  }
}
