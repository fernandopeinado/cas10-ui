import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Bootstrap from 'react-bootstrap';
import introspector from '../core/Introspector';
import Output from '../output/Output';

export default class Table extends Component {

  static propTypes = {
    striped: PropTypes.bool,
    condensed: PropTypes.bool,
    sizes: PropTypes.array,
    aligns: PropTypes.array,
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
      sizes,
      aligns,
      titles,
      properties,
      footer,
      striped,
      condensed
    } = this.props;
    const {
      list
    } = this.state;

    const onClick = this.onClick;

    function buildHeader(titles) {
      var style = {}
      return (
        <thead>
          <tr>
            {titles.map((title, i) => {
                var style = {};
                if (sizes != null && sizes.length > i) {
                  style.width = sizes[i];
                }
                if (aligns != null && aligns.length > i) {
                  style.textAlign = aligns[i];
                }
                return (<th key={i} style={style}>{title}</th>);
              }
            )}
          </tr>
        </thead>
      )
    }

    function buildRow(properties, row, idx) {
      return (
        <tr key={idx} onClick={ e => onClick(row, idx) }>
          {properties.map((property, i) => {
            try {
              var value = null;
              if (typeof property === 'function') {
                value = property(row, idx, i);
              }
              else if (typeof property === 'string') {
                value = introspector.getValue(row, property, "");
              }
            } catch (ex) { console.log(ex); }        
            var style = {};
            if (sizes != null && sizes.length > i) {
              style.width = sizes[i];
            }
            if (aligns != null && aligns.length > i) {
              style.textAlign = aligns[i];
            }
            return <td key={i} style={style}><Output value={value} /></td>
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
        return null;
    }
    
    return (
      <Bootstrap.Table responsive hover striped={striped} condensed={condensed}>
        {buildHeader(titles)}
        {buildBody(properties, list)}
        {buildFooter(titles, footer)}
      </Bootstrap.Table>
    )
  }
}
