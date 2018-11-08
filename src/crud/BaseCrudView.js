import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    ButtonToolbar,
    PageHeader,
    Grid, 
    Row, 
    Col, 
    Panel
} from "react-bootstrap";
import Button from "../button/Button";
import ButtonToolbarSeparator from "../button/ButtonToolbarSeparator";
import PagedTable from "../table/PagedTable";

@observer
export default class BaseCrudView extends Component {

    /**
     * @param crudConfig {
     *      crudStore,
     *      selectionType, (0 - Click na Linha; 1 - Single Selection)
     *      cloneOptionEnabled, (true por default) 
     *      crudListTitle,
     *      crudEditTitle,
     *      searchView {
     *          gridSizeMd, (5 default)
     *          gridSizeLg, (4 default)
     *          components
     *      },
     *      listView {
     *          titles,
     *          sizes,
     *          properties,
     *          toolbarExtra,
     *          toolbarPosition (null ou 0 - Em baixo; 1 - Em cima; 2 Em baixo e Em Cima )
     *      },
     *      editView {
     *          components
     *          commands,
     *          toolbarExtra,
     *          toolbarPosition (null ou 0 - Em baixo; 1 - Em cima; 2 Em baixo e Em Cima )
     *      },
     *      displayView {
     *          components
     *      }
     * }
     */
    constructor(props, crudConfig) {
        super(props);
        this.crudStore = crudConfig.crudStore;
        this.crudConfig = crudConfig;
        if (this.crudConfig.selectionType == null) {
            this.crudConfig.selectionType = 0;
        }
        if (this.crudConfig.cloneOptionEnabled == null) {
            this.crudConfig.cloneOptionEnabled = true;
        }
        if (this.crudConfig.searchView != null) {
            if (!this.crudConfig.searchView.gridSizeMd) {
                this.crudConfig.searchView.gridSizeMd = 4;
            }
            if (!this.crudConfig.searchView.gridSizeLg) {
                this.crudConfig.searchView.gridSizeLg = 3;
            }
        }
        this.searchButtonRef = null;
    }

    componentDidMount = () => {
        this.crudStore.loadList();
    }

    searchOnEnter = (e) => {
        if (this.searchButtonRef && e.key === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            this.searchButtonRef.click();
        }
    }

    getListToolbarButtons() {
        var listToolbarButtons = [];
        listToolbarButtons.push(<Button key={'novo'} onClick={this.crudStore.newCommand}><i className="fa fa-file-o"/> Novo</Button>);
        listToolbarButtons.push(<ButtonToolbarSeparator key={'separador'} />);        
        listToolbarButtons.push(<Button key={'editar'} onClick={(e) => this.crudStore.editCommand()}><i className="fa fa-pencil"/> Editar</Button>);
        if (this.crudConfig.displayView) {
            listToolbarButtons.push(<Button key={'consultar'} onClick={(e) => this.crudStore.displayCommand()}><i className="fa fa-file-text-o"/> Consultar</Button>);
        }
        listToolbarButtons.push(<Button key={'remover'} onClick={this.crudStore.deleteCommand}><i className="fa fa-close" /> Remover</Button>);
        return listToolbarButtons;
    }

    getListToolbar() {
        return (
            <ButtonToolbar>
                {this.getListToolbarButtons()}
                {this.crudConfig.listView.toolbarExtra}
            </ButtonToolbar>
        );
    }

    getEditToolbarButtons() {
        var crudStore = this.crudStore;
        var editButtons = [];
        if (crudStore.dto.id) {
            editButtons.push(<Button key={'salvar'} onClick={crudStore.updateCommand} bsStyle="primary" disabled={crudStore.hasErrors}>Salvar</Button>);
        }
        else {
            editButtons.push(<Button key={'criar'} onClick={crudStore.createCommand} bsStyle="primary" disabled={crudStore.hasErrors}>Criar</Button>);
            editButtons.push(
                <div style={{float: "right"}} >
                    <Button onClick={crudStore.deleteCommand} bsStyle="danger">Remover</Button>
                </div>);
        }
        if (this.crudConfig.cloneOptionEnabled && dto.id) {
            editButtons.push(<Button key={'clonar'} onClick={crudStore.cloneCommand}>Clonar</Button>);
        }
        editButtons.push(<Button key={'cancelar'} onClick={crudStore.cancelCommand} bsStyle="link">Cancelar</Button>);
        this.crudConfig.editView.commands && this.crudConfig.editView.commands.map(command => 
            editButtons.push(<Button onClick={crudStore[command.action].bind(crudStore, dto)} key={command.id}>{command.label}</Button>)
        );
        return editButtons;
    }

    getEditToolbar() {
        return (
            <ButtonToolbar>
                {this.getEditToolbarButtons()}
                {this.crudConfig.editView.toolbarExtra}
            </ButtonToolbar>
        );
    }

    getViewToolbar() {
        return (
            <ButtonToolbar>
                <Button key={'cancelar'} onClick={this.crudStore.cancelCommand} bsStyle="link">Cancelar</Button>
            </ButtonToolbar>
        );
    }

    /* ********************************************************************
     * selectionType: 1 
     * ********************************************************************/

    onRadioChoiceChanged = (e) => {
        var { idx, id } = e.target.dataset;
        this.crudStore.radioChoice(idx, id);        
    }

    selectRadioChoice = (listItem, idx) => {        
        if (this.crudStore.radioChoiceIdx != idx) {
            this.crudStore.radioChoice(idx, listItem.id);
        } else {
            this.crudStore.radioChoice(null, null);
        }
    }

    render() {
        const { page, dto, searchDto, radioChoiceId, view } = this.crudStore;
        const {
            crudListTitle,
            crudEditTitle,
            searchView,
            listView,
            editView,
            displayView,
            selectionType,
        } = this.crudConfig;

        var searchViewComponents = null;
        if (searchView != undefined && searchView.components != undefined) {
            searchViewComponents = searchView.components;
        }

        var selectionOnClickHandler = this.crudStore.editCommand;
        var listViewTitles = listView.titles;
        var listViewSizes = listView.sizes;
        var listViewAligns = listView.aligns;
        var listViewProperties = listView.properties;
        var listToolbarUp = (listView.toolbarPosition == 1 || listView.toolbarPosition == 2);
        var listToolbarDown = (!listView.toolbarPosition || listView.toolbarPosition == 2);
        var listToolbar = this.getListToolbar();
        var toolbarMargin = "34px";
        if (selectionType == 1) {
            listViewTitles = ['', ...listView.titles];
            if (listViewSizes != null) {
                listViewSizes = ['30px', ...listViewSizes];
            }
            if (listViewAligns != null) {
                listViewAligns = ['', ...listViewAligns];
            }
            listViewProperties = [
                (row, idx) => {
                    var rowId = row.id;
                    return (<input type='radio' name='searchRadio' value={rowId} 
                        onChange={this.onRadioChoiceChanged}
                        checked={radioChoiceId == rowId}
                        data-idx={idx} data-id={rowId} />)
                }, 
                ...listView.properties
            ];
            selectionOnClickHandler = this.selectRadioChoice;
        }

        console.log(view);
        console.log(dto);

        return (
            <div className={"crud"}>
                {view == 'search' ? 
                    <div className="crud_list">
                        {crudListTitle ? <PageHeader>{crudListTitle}</PageHeader> : null }
                        <Grid fluid={true}>
                            <Row>
                                <Col md={searchView.gridSizeMd} lg={searchView.gridSizeLg}>
                                    <Panel header={'Busca'} onKeyDown={this.searchOnEnter}>
                                        {searchViewComponents ? (
                                            <div>
                                                {searchViewComponents.map(comp => this[comp](searchDto, 'search'))}
                                            </div>)
                                        : null }
                                        <div style={{marginTop: toolbarMargin}}>
                                            <ButtonToolbar>
                                                <Button ref={(el) => this.searchButtonRef = el} onClick={this.crudStore.searchCommand} bsStyle="primary">Buscar</Button>
                                                {!selectionType ? <Button onClick={this.crudStore.newCommand}>Novo</Button> : null}
                                            </ButtonToolbar>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col md={12 - searchView.gridSizeMd} lg={12 - searchView.gridSizeLg}>
                                    <Panel header={'Lista'}>
                                        {listToolbarUp ?    
                                            <div style={{marginBottom: toolbarMargin}}>
                                                {listToolbar} 
                                            </div>
                                        : null}
                                        <PagedTable
                                            striped
                                            sizes={listViewSizes}
                                            aligns={listViewAligns}
                                            titles={listViewTitles}
                                            properties={listViewProperties}
                                            navigate={this.crudStore.navigateCommand}
                                            page={page} 
                                            onClick={selectionOnClickHandler} />
                                        {listToolbarDown ? 
                                            <div style={{marginTop: toolbarMargin}}>
                                                {listToolbar}
                                            </div>
                                        : null}
                                    </Panel>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                : view == 'edit' ?                      
                    <div className="crud_edit">
                        {crudEditTitle ? <PageHeader>{crudEditTitle}</PageHeader> : null }
                        <Grid fluid={true}>
                            <Row>
                                <Col md={12}>
                                    <Panel header="Edição">
                                        {editView && editView.components && editView.components.map(comp => this[comp](dto, dto.id == null ? 'create' : 'edit'))}
                                        <div style={{marginTop: toolbarMargin}}>
                                            {this.getEditToolbar()}
                                        </div>
                                    </Panel>
                                </Col>
                            </Row>
                        </Grid>                        
                    </div>
                : 
                    <div className="crud_display">
                        {crudEditTitle ? <PageHeader>{crudEditTitle}</PageHeader> : null }
                        <Grid fluid={true}>
                            <Row>
                                <Col md={12}>
                                    <Panel header="Consulta">
                                        {displayView && displayView.components && displayView.components.map(comp => this[comp](dto, 'display'))}
                                        <div style={{marginTop: toolbarMargin}}>
                                            {this.getViewToolbar()}
                                        </div>
                                    </Panel>
                                </Col>
                            </Row>
                        </Grid>                        
                    </div>
                }
            </div>
        );
    }
}