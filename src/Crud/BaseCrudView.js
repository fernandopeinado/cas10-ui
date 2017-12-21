import { Component } from 'react';
import CrudService from "./CrudService";
import messages from "../Core/Messages";
import * as Bootstrap from 'react-bootstrap';
import Button from "../Button/Button";
import PagedTable from "../Table/PagedTable";

export default class BaseCrudView extends Component {

    /**
     * @param crudConfig {
     *      baseUrl,
     *      crudName,
     *      idProperty,
     *      crudListTitle,
     *      crudEditTitle,
     *      listView {
     *          titles,
     *          properties
     *      },
     *      editView {
     *          components
     *      }
     * }
     */
    constructor(props, crudConfig) {
        super(props);
        this.crudService = new CrudService(crudConfig);
        this.crudConfig = crudConfig;
        this.intializeState();
    }

    intializeState() {
        this.state = this.state || {};
        this.state.page = null;
        this.state.dto = null;
    }

    componentDidMount = () => {
        this.loadList();
    }

    loadList = () => {
        var _self = this;
        this.crudService.page(10, 0)
            .then(page => _self.setState({ page: page }))
            .catch(error => messages.errorMessage(error.message));
    }

    newCommand = () => {
        this.setState({ dto: {} });
    }    

    createCommand = () => {
        var _self = this;
        this.crudService.create(this.state.dto)
            .then(dto => {
                _self.loadList();
                _self.setState({ dto: null });
            })
            .catch(error => messages.errorMessage(error.message));
    }

    editCommand = (listItem) => {
        var dto = {};
        Object.assign(dto, listItem);
        this.setState({ dto: dto });
    }

    updateCommand = () => {
        var _self = this;
        this.crudService.update(this.state.dto)
            .then(dto => {
                _self.loadList();
                _self.setState({ dto: null });
            })
            .catch(error => messages.errorMessage(error.message));
    }

    deleteCommand = () => {
        var _self = this;
        this.crudService.delete(this.crudService.getId(this.state.dto)) 
            .then(dto => {
                _self.loadList();
                _self.setState({ dto: null });
            })
            .catch(error => messages.errorMessage(error.message));
    }

    cancelCommand = () => {
        this.setState({ dto: null });
    }

    cloneCommand = () => {
        var newValue = {};
        Object.assign(newValue, this.state.dto);
        this.crudService.setId(newValue, null);
        this.setState({ dto: newValue });
    }

    navigateCommand = (pageSize, page) => {
        var _self = this;
        this.crudService.page(pageSize, page)
            .then(page => {                
                _self.setState({ page: page });
            })
            .catch(error => messages.errorMessage(error.message));
    }

    render() {
        const { page, dto } = this.state;
        const {
            crudName,
            crudListTitle,
            crudEditTitle,
            listView,
            editView
        } = this.crudConfig;

        console.log(editView);

        return (
            <div className={"crud " + crudName}>
                {!dto ? 
                    <div className="crud_list">
                        <Bootstrap.PageHeader>{crudListTitle}</Bootstrap.PageHeader>
                        <PagedTable
                            titles={listView.titles}
                            properties={listView.properties}
                            navigate={this.navigateCommand}
                            page={page} 
                            onClick={this.editCommand} />
                        <Bootstrap.ButtonToolbar>
                            <Button onClick={this.newCommand} label="Novo" />
                        </Bootstrap.ButtonToolbar>
                    </div>
                :                    
                    <div className="crud_edit">
                        <Bootstrap.PageHeader>{crudEditTitle}</Bootstrap.PageHeader>
                        {editView.components.map(comp => this[comp](dto))}
                        <Bootstrap.ButtonToolbar>
                            {this.crudService.getId(dto) ? 
                                <Button onClick={this.updateCommand} label="Salvar" primary/>
                            :
                                <Button onClick={this.createCommand} label="Criar" primary/>
                            }
                            {this.crudService.getId(dto) &&  <Button onClick={this.cloneCommand} label="Clonar" />}
                            <Button onClick={this.cancelCommand} label="Cancelar" bsStyle="link"/>
                            {editView.commands && editView.commands.map(command => 
                                <Button onClick={this[command.action].bind(this, dto)} label={command.label} key={command.id}/> 
                            )}
                            <div style={{float: "right"}} >
                                {this.crudService.getId(dto) ? 
                                    <Button onClick={this.deleteCommand} label="Remover" bsStyle="danger"/>
                                : null}
                            </div>
                        </Bootstrap.ButtonToolbar>
                    </div>
                }
            </div>
        );
    }
}