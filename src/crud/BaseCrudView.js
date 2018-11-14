import React, { Component } from 'react';
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
import { observer } from 'mobx-react';

export const defaultLabels = {
    searchTitle: 'Busca',
    listTitle: 'Lista',
    newTitle: 'Criação',
    editTitle: 'Edição',
    displayTitle: 'Consulta',
    searchButton: 'Procurar',
    newButton: 'Criar',
    editButton: 'Editar',
    displayButton: 'Consultar',
    deleteButton: 'Excluir',
    createButton: 'Criar',
    updateButton: 'Salvar',
    cloneButton: 'Clonar',
    cancelButton: 'Cancelar',
    backButton: 'Voltar'
}

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
     *          components: [
     *              "inputLogin",
     *              {"inputName": 8},
     *              {"inputPassword": 6, "inputTrocaSenhaProximoLogin": 6},
     *              (dto, view) => <div>Teste</div>,
     *              {"plantas": {xs: 6, sm: 10, md:9, lg: 8}, "depositos": {xs:6, sm:2, md:3, lg:4}},
     *          ]
     *          commands,
     *          toolbarExtra,
     *          toolbarPosition (null ou 0 - Em baixo; 1 - Em cima; 2 Em baixo e Em Cima )
     *      },
     *      displayView {
     *          components
     *      },
     *      labels {
     *          searchTitle: 'Busca',
     *          listTitle: 'Lista',
     *          newTitle: 'Criação',
     *          editTitle: 'Edição',
     *          displayTitle: 'Consulta',
     *          searchButton: 'Procurar',
     *          newButton: 'Criar',
     *          editButton: 'Editar',
     *          displayButton: 'Consultar',
     *          deleteButton: 'Excluir',
     *          activateButton: 'Ativar',
     *          inactivateButton: 'Inativar',
     *          createButton: 'Criar',
     *          updateButton: 'Salvar',
     *          cloneButton: 'Clonar',
     *          cancelButton: 'Cancelar',
     *          backButton: 'Voltar'
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
        this.labels = {...defaultLabels, ...crudConfig.labels};
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
        listToolbarButtons.push(<Button key={'novo'} onClick={this.crudStore.newCommand}><i className="fa fa-file-o"/> {this.labels.newButton}</Button>);
        listToolbarButtons.push(<ButtonToolbarSeparator key={'separador'} />);        
        listToolbarButtons.push(<Button key={'editar'} onClick={(e) => this.crudStore.editCommand()}><i className="fa fa-pencil"/> {this.labels.editButton}</Button>);
        if (this.crudConfig.displayView) {
            listToolbarButtons.push(<Button key={'consultar'} onClick={(e) => this.crudStore.displayCommand()}><i className="fa fa-file-text-o"/> {this.labels.displayButton}</Button>);
        }
        listToolbarButtons.push(<Button key={'remover'} onClick={this.crudStore.deleteCommand}><i className="fa fa-close" /> {this.labels.deleteButton}</Button>);
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
            editButtons.push(<Button key={'salvar'} onClick={crudStore.updateCommand} bsStyle="primary" disabled={crudStore.hasErrors}><i className="fa fa-save"/> {this.labels.updateButton}</Button>);
        }
        else {
            editButtons.push(<Button key={'criar'} onClick={crudStore.createCommand} bsStyle="primary" disabled={crudStore.hasErrors}><i className="fa fa-save"/> {this.labels.createButton}</Button>);
            editButtons.push(
                <div style={{float: "right"}} >
                    <Button onClick={crudStore.deleteCommand} bsStyle="danger"><i className="fa fa-close" /> {this.labels.deleteButton}</Button>
                </div>);
        }
        if (this.crudConfig.cloneOptionEnabled && dto.id) {
            editButtons.push(<Button key={'clonar'} onClick={crudStore.cloneCommand}><i className="fa fa-copy" /> {this.labels.cloneButton}</Button>);
        }
        editButtons.push(<Button key={'cancelar'} onClick={crudStore.cancelCommand} bsStyle="link">{this.labels.cancelButton}</Button>);
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
                <Button key={'voltar'} onClick={this.crudStore.cancelCommand} bsStyle="link"><i className="fa fa-arrow-left"></i> {this.labels.backButton}</Button>
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

        var doComponents = (line, view) => {
            if (typeof line == 'string') {
                return this[line](dto, view);
            }
            else if (typeof line == 'function') {
                return line(dto, view);
            }
            else if (typeof line == 'object') {
                return (
                    <Grid fluid={true} style={{padding: "0px"}}>
                        <Row>
                        {Object.keys(line).map( key => {
                            let gridConfig = line[key];
                            let xs = 12;
                            let sm = 12;
                            let md = 12;
                            let lg = 12;
                            if (typeof gridConfig == 'number') {
                                sm = gridConfig;
                                md = gridConfig;
                                lg = gridConfig;
                            }
                            else {
                                xs = gridConfig.xs ? gridConfig.xs : xs;
                                sm = gridConfig.sm ? gridConfig.sm : xs;
                                md = gridConfig.md ? gridConfig.md : sm;
                                lg = gridConfig.lg ? gridConfig.lg : md;
                            }
                            return (
                                <Col xs={xs} sm={sm} md={md} lg={lg}>
                                    {this[key](dto, view)}
                                </Col>
                            );
                        })}   
                        </Row>
                    </Grid>
                );
            }
            return null;
        };

        return (
            <div className={"crud"}>
                {view == 'search' ? 
                    <div className="crud_list">
                        {crudListTitle ? <PageHeader>{crudListTitle}</PageHeader> : null }
                        <Grid fluid={true}>
                            <Row>
                                <Col md={searchView.gridSizeMd} lg={searchView.gridSizeLg}>
                                    <Panel header={this.labels.searchTitle} onKeyDown={this.searchOnEnter}>
                                        {searchViewComponents ? (
                                            <div>
                                                {searchViewComponents.map(comp => this[comp](searchDto, 'search'))}
                                            </div>)
                                        : null }
                                        <div style={{marginTop: toolbarMargin}}>
                                            <ButtonToolbar>
                                                <Button ref={(el) => this.searchButtonRef = el} onClick={this.crudStore.searchCommand} bsStyle="primary"><i className="fa fa-search"/> {this.labels.searchButton}</Button>
                                                {!selectionType ? <Button onClick={this.crudStore.newCommand}>{this.labels.newButton}</Button> : null}
                                            </ButtonToolbar>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col md={12 - searchView.gridSizeMd} lg={12 - searchView.gridSizeLg}>
                                    <Panel header={this.labels.listTitle}>
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
                                    <Panel header={dto.id == null ? this.labels.newTitle : this.labels.editTitle}>
                                        {editView && editView.components && editView.components.map(line => doComponents(line, dto.id == null ? 'create' : 'edit'))}
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
                                    <Panel header={this.labels.displayTitle}>
                                        {displayView && displayView.components && displayView.components.map(line => doComponents(line, dto.id == null ? 'create' : 'display'))}
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