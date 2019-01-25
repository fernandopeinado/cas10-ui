import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class PagedTable extends Component {

  static propTypes = {
    striped: PropTypes.bool,
    condensed: PropTypes.bool,
    /**
     * Os tamanhos das colunas. Se preenchido força o tamanho, caso contrário fica automático.
     */
    sizes: PropTypes.array,
    titles: PropTypes.array.isRequired,
    properties: PropTypes.array.isRequired,
    /**
     * função para realizar a navegação, recebe o tamanho da pagina e a pagina desejada em base 0, e 
     * deve atualizar a tabela com uma nova pagina (page).
     * navigate(pageSize:int, page:int)
     */
    navigate: PropTypes.func.isRequired,
    page: PropTypes.object,
    onClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.onClick = (props.onClick ? props.onClick : () => {});
    this.state = {
      page: props.page
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.onClick = (nextProps.onClick ? nextProps.onClick : () => {});
    this.setState({
      page: nextProps.page
    });
  }
  
  render() {
    const {
      baseUrl,
      page,
      navigate,
      ...otherProps
    } = this.props;
    
    var footer = null;
    var list = [];

    if (page) {
      var itemInicial = (page.number * page.size)  + 1
      var itemFinal = itemInicial + page.numberOfElements - 1;
      var totalItems = page.totalElements;
      var numeroPagina = page.number + 1;
      list = page.content;

      var backClassName = page.first ? "disabled" : "";
      var nextClassName = page.last ? "disabled" : "";

      footer = (
        <div className="pagination-toolbar clearfix" style={{marginTop: "-20px"}}>
          <div className="pagination" style={{float:"left", lineHeight:"34px"}}>Itens {itemInicial} a {itemFinal} de {totalItems}</div>
          <div className="pagination" style={{float:"left", lineHeight:"34px", marginLeft: "10px"}}>
            <DropdownButton id="page-size-dropdown" title={page.size}>
              <MenuItem eventKey="10" onSelect={() => navigate(10, 0)}>10</MenuItem>
              <MenuItem eventKey="25" onSelect={() => navigate(25, 0)}>25</MenuItem>
              <MenuItem eventKey="50" onSelect={() => navigate(50, 0)}>50</MenuItem>
              <MenuItem eventKey="100" onSelect={() => navigate(100, 0)}>100</MenuItem>
              <MenuItem eventKey="500" onSelect={() => navigate(500, 0)}>500</MenuItem>
              <MenuItem eventKey="1000" onSelect={() => navigate(1000, 0)}>1000</MenuItem>
            </DropdownButton>
          </div>
          <div className="pagination" style={{float:"left", lineHeight:"34px", marginLeft:"10px"}}>por Página</div>
          <ul className="pagination" style={{float:"right"}}>
            <li className={backClassName}><a onClick={() => !page.first ? navigate(page.size, 0) : null}><span className="glyphicon glyphicon-fast-backward"></span></a></li>
            <li className={backClassName}><a onClick={() => !page.first ? navigate(page.size, page.number - 1) : null}><span className="glyphicon glyphicon-backward"></span></a></li>
            <li ><a onClick={() => navigate(page.size, page.number)}>{numeroPagina}</a></li>
            <li className={nextClassName}><a onClick={() => !page.last ? navigate(page.size, page.number + 1) : null}><span className="glyphicon glyphicon-forward"></span></a></li>
            <li className={nextClassName}><a onClick={() => !page.last ? navigate(page.size, page.totalPages - 1) : null}><span  className="glyphicon glyphicon-fast-forward"></span></a></li>
          </ul>
          <div></div>
        </div>
      )
    }

    return (
      <div>
        <Table list={list} {...otherProps} />
        {footer}
      </div>
    );
 
  }
}
