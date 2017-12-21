import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Bootstrap from 'react-bootstrap';
import introspector from '../Core/Introspector';

export default class Table extends Component {

  static propTypes = {
    titles: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
    list: PropTypes.array,
    onClick: PropTypes.func,
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  constructor(props) {
    super(props);
    this.onClick = (props.onClick ? props.onClick : () => {});
    this.state = {
      list: props.list
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.onClick = (nextProps.onClick ? nextProps.onClick : () => {});
    this.setState({
      list: nextProps.list
    });
  }
  
  render() {
    const {
      titles,
      properties,
      footer
    } = this.props;
    const {
      list
    } = this.state;

    const onClick = this.onClick;

    function buildHeader(titles) {
      return (
        <thead>
          <tr>
            {titles.map((title, i) => <th key={i}>{title}</th>)}
          </tr>
        </thead>
      )
    }

    function buildRow(properties, row, idx) {
      return (
        <tr key={idx} onClick={ e => onClick(row) }>
          {properties.map((property, i) => {
            try {
              if (typeof property === 'function') {
                  return <td key={i}>{property(row, idx, i)}</td>
              }
              else if (typeof property === 'string') {
                return <td key={i}>{introspector.getValue(row, property, "")}</td>
              }
            } catch (ex) { console.log(ex); }
            return <td key={i}></td>
          })}
        </tr>
      )
    }
    
    function buildBody(properties, list) {
      if (!list) {
        list = [];
      }
      return (
        <tbody>
          {list.map((row, idx) => buildRow(properties, row, idx))}
        </tbody>
      )
    }
    
    function buildFooter(titles, footer) {
        if (footer) {
          if (typeof footer === 'function') {
            footer = footer();
          }
          return (
            <tfoot>
              <tr>
                <td colSpan={titles.length}>
                  {footer}
                </td>
              </tr>
            </tfoot>
          );
        }
        return "";
    }
    
    return (
      <Bootstrap.Table responsive hover>
        {buildHeader(titles)}
        {buildBody(properties, list)}
        {buildFooter(titles, footer)}
      </Bootstrap.Table>
    )
  }
}
