import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import introspector from '../Core/Introspector'

export default class PagedTable extends Component {

  static propTypes = {
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
        <div>
          <div className="pagination" style={{float:"left", lineHeight:"34px"}}>Itens {itemInicial} a {itemFinal} de {totalItems}</div>                    
          <ul className="pagination" style={{float:"left", marginLeft:"40px"}}>
            <li className={page.size == 10 ? "active" : null}><a onClick={() => navigate(10, 0)}><span>10</span></a></li>
            <li className={page.size == 25 ? "active" : null}><a onClick={() => navigate(25, 0)}><span>25</span></a></li>
            <li className={page.size == 100 ? "active" : null}><a onClick={() => navigate(100, 0)}><span>100</span></a></li>
          </ul>
          <div className="pagination" style={{float:"left", lineHeight:"34px", marginLeft:"10px"}}>por Página</div>
          <ul className="pagination" style={{float:"right"}}>
            <li className={backClassName}><a onClick={() => !page.first ? navigate(page.size, 0) : null}><span className="glyphicon glyphicon-fast-backward"></span></a></li>
            <li className={backClassName}><a onClick={() => !page.first ? navigate(page.size, page.number - 1) : null}><span className="glyphicon glyphicon-backward"></span></a></li>
            <li ><a onClick={() => navigate(page.size, page.number)}>{numeroPagina}</a></li>
            <li className={nextClassName}><a onClick={() => !page.last ? navigate(page.size, page.number + 1) : null}><span className="glyphicon glyphicon-forward"></span></a></li>
            <li className={nextClassName}><a onClick={() => !page.last ? navigate(page.size, page.totalPages - 1) : null}><span  className="glyphicon glyphicon-fast-forward"></span></a></li>
          </ul>
        </div>
      )
    }

    return (
        <Table list={list} {...otherProps} footer={footer}/>
    )
  }
}
