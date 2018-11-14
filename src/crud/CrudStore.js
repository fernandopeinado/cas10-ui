import { observable, computed, action, reaction, autorun } from 'mobx';
import ValidationService from '../input/Validation';
import messages from '../core/Messages';

export default class CrudStore {
    entityName;
    @observable view;
    @observable searchDto;
    @observable page;
    @observable radioChoiceIdx;    
    @observable radioChoiceId;
    @observable dto;
    @observable errorsMap = new Map();
    validations = [];
    validationReactions = [];

    @computed get hasErrors() {
        return this.errorsMap.size > 0;
    }

    getErrors(path) {
        var errors = this.errorsMap.get(path);
        return errors;
    }

    @action setErrors(path, errors) {
        if (errors == null) {
            this.errorsMap.delete(path);    
        }
        else {
            this.errorsMap.set(path, errors);
        }
    }

    constructor(crudService, entityName) {
        this.entityName = entityName;
        this.crudService = crudService;
        this.validationService = new ValidationService(this.errorsMap);
        this.view = 'search';
        var searchDto = crudService.newDto();
        this.initSearch(searchDto);
        this.searchDto = searchDto;
        this.page = {
            size: 10,
            number: 0
        }
    }

    preErrorHandler(error) {
        return true;
    }

    errorHandler = (error) => {
        if (error.response && error.response.data && error.response.data.message) {
            if (this.preErrorHandler(error.response.data)) {
                messages.errorMessageOnly(error.response.data.message);
                if (error.response.data.validationErrors) {
                    let valErrors = error.response.data.validationErrors;
                    if (Array.isArray(valErrors)) {
                        valErrors.map(error => {
                            if (error.name && error.messages) {
                                this.setErrors(error.name, error.messages);
                            } 
                        });
                    }
                }
            }
        }
        else {
            if (this.preErrorHandler(error)) {
                messages.errorMessageOnly(error.message);
            }
        }
    }

    toStringDto(dto) {}

    initSearch(dto) {}

    preSearch(dto) {}

    loadList = () => {
        var _self = this;
        var dto = this.crudService.newDto();
        if (this.searchDto != null) {
            Object.assign(dto, this.searchDto);
        }
        this.preSearch(dto);
        return this.crudService.page(this.page.size, this.page.number, dto)
            .then(action(page => {
                _self.page = page;
                _self.view = 'search';
                _self.radioChoice();
            }))
            .catch(_self.errorHandler);
    }

    @action searchCommand = () => {
        this.page.number = 0;
        return this.loadList();
    }

    preNew(dto) {}

    newCommand = action(() => {
        try {
            var dto = this.crudService.newDto();
            this.preNew(dto);
            this.view = 'edit';
            this.dto = dto;
        } catch (error) {
            this.errorHandler(error);
        }
    });

    preCreate(dto) {}

    preCreateCommand(dto) {}

    postCreateCommand(dto) {   
        messages.successMessageOnly(`${this.entityName} ${this.toStringDto(dto)} criado(a) com sucesso`);
    }

    createCommand = async () => {
        try {
            var _self = this;
            var dto = this.crudService.newDto();
            Object.assign(dto, this.dto);
            this.preCreate(dto);
            await this.preCreateCommand(dto);
            return this.crudService.create(dto)
                .then(action(dto => {
                    _self.view = 'search';
                    _self.loadList();
                    _self.dto = null;
                    _self.postCreateCommand(dto);
                }))
                .catch(_self.errorHandler);
        } catch (error) {
            this.errorHandler(error);
        }
    }

    preDisplay(dto) {}

    preDisplayCommand(dto) {}

    postDisplayCommand(dto) {}

    displayCommand = async (listItem) => {
        try {
            var _self = this;
            var id = this.radioChoiceId;
            if (listItem != null) {
                id = listItem.id;
            }
            if (id != null) {
                await this.preDisplayCommand(listItem);
                return this.crudService.getById(id)
                    .then(action((dto) => {
                        this.preDisplay(dto);
                        _self.view = 'display';
                        _self.dto = dto;
                        _self.postDisplayCommand(listItem);
                }));
            }
            else {
                messages.warningMessageOnly("Escolha pelo menos um item para visualizar");
            }
        } catch (error) {
            this.errorHandler(error);
        }
    }

    preEdit(dto) {}

    preEditCommand(dto) {}

    postEditCommand(dto) {}

    editCommand = async (listItem) => {
        try {
            var _self = this;
            var id = this.radioChoiceId;
            if (listItem != null) {
                id = listItem.id;
            }
            if (id != null) {
                await this.preEditCommand(listItem);
                return this.crudService.getById(id)
                    .then(action((dto) => {
                        this.preEdit(dto);
                        _self.view = 'edit';
                        _self.dto = dto;
                        _self.postEditCommand(listItem);
                }));
            }
            else {
                messages.warningMessageOnly("Escolha pelo menos um item para editar");
            }
        } catch (error) {
            this.errorHandler(error);
        }
    }
    
    preUpdate(dto) {}

    preUpdateCommand(dto) {}

    postUpdateCommand(dto) {
        messages.successMessageOnly(`${this.entityName} ${this.toStringDto(dto)} atualizado(a) com sucesso`);
    }

    updateCommand = async () => {
        try {
            var _self = this;
            var dto = this.crudService.newDto();
            Object.assign(dto, this.dto);
            this.preUpdate(dto);
            await this.preUpdateCommand(dto);
            return this.crudService.update(dto)
                .then(action(dto => {
                    _self.view = 'search';
                    _self.loadList();
                    _self.dto = null;
                    _self.postUpdateCommand(dto);
                }))
                .catch(_self.errorHandler);
        } catch (error) {
            this.errorHandler(error);
        }                
    }

    preDelete(id) {}

    preDeleteCommand(dto) {}

	postDeleteCommand(dto) {
        messages.successMessageOnly(`${this.entityName} ${this.toStringDto(dto)} excluido(a) com sucesso`);
    }

    deleteCommand = async () => {
        try {
            var _self = this;
            var id = null;
            if (this.dto != null) {
                id = this.dto.id;
            }
            else if (this.radioChoiceId != null) {
                id = this.radioChoiceId;
            }

            if (id != null) {            
                this.preDelete(id);
                var deletedListItem = this.getSelectedListItem()
                await this.preDeleteCommand(deletedListItem);
                return this.crudService.delete(id)
                    .then(action(dto => {
                        _self.view = 'search';
                        _self.loadList();
                        _self.dto = null;
                        _self.postDeleteCommand(deletedListItem);
                    }))
                    .catch(_self.errorHandler);
            }
            else {
                messages.warningMessageOnly("Escolha pelo menos um item para excluir");
            }
        } catch (error) {
            this.errorHandler(error);
        }
    }

    @action cancelCommand = () => {
        this.view = 'search';
        this.dto = null;
    };

    @action cloneCommand = () => {
        try {
            var newValue = this.crudService.newDto();
            Object.assign(newValue, this.dto);
            newValue.id = null;        
            this.dto = newValue;
        } catch (error) {
            this.errorHandler(error);
        }
    }

    navigateCommand = (pageSize, page) => {
        try {
            var _self = this;
            var dto = this.crudService.newDto();
            if (this.searchDto != null) {
                Object.assign(dto, this.searchDto);
            }
            this.preSearch(dto);
            return this.crudService.page(pageSize, page, dto)
                .then(action (page => {                
                    _self.page = page;
                }))
                .catch(_self.errorHandler);
        } catch (error) {
            this.errorHandler(error);
        }
    }

    preActivate(id) {}

    preActivateCommand(dto) {}

    postActivateCommand(dto) {
        messages.successMessageOnly(`${this.entityName} ${this.toStringDto(dto)} ativado(a) com sucesso`);
    }
    
    activateCommand = async (listItem) => {
        try {
            var _self = this;
            var id = null;
            if (this.dto != null) {
                id = this.dto.id;
            }
            else if (this.radioChoiceId != null) {
                id = this.radioChoiceId;
            }
            if (id != null) {            
                this.preActivate(id)
                var activatedListItem = this.getSelectedListItem()
                await this.preActivateCommand(activatedListItem);
                return this.crudService.activate(id)
                    .then(action(dto => {
                        _self.loadList();
                        _self.postActivateCommand(activatedListItem);
                    }))
                    .catch(_self.errorHandler);
            }
            else {
                messages.warningMessageOnly("Escolha pelo menos um item para ativar");
            }
        } catch (error) {
            this.errorHandler(error);
        }
    }

    preInactivate(id) {}

    preInactivateCommand(dto) {}

    postInactivateCommand(dto) {
        messages.successMessageOnly(`${this.entityName} ${this.toStringDto(dto)} inativado(a) com sucesso`);
    }

    inactivateCommand = async (listItem) => {
        try {
            var _self = this;
            var id = null;
            if (this.dto != null) {
                id = this.dto.id;
            }
            else if (this.radioChoiceId != null) {
                id = this.radioChoiceId;
            }
            if (id != null) {            
                this.preInactivate(id)
                var inactivatedListItem = this.getSelectedListItem()
                await this.preInactivateCommand(inactivatedListItem);
                return this.crudService.inactivate(id)
                    .then(action(dto => {
                        _self.loadList();
                        _self.postInactivateCommand(inactivatedListItem);
                    }))
                    .catch(_self.errorHandler);
            }
            else {
                messages.warningMessageOnly("Escolha pelo menos um item para inativar");
            }
        } catch (error) {
            this.errorHandler(error);
        }
    }

    @action radioChoice = (idx, id) => {
        this.radioChoiceIdx = idx;
        this.radioChoiceId = id;
    }

    getSelectedListItem() {
        if (this.radioChoiceIdx != null) {
            return this.page.content[this.radioChoiceIdx];
        }
        return null;
    }

    // Validação //
    _validationReactionConfig = reaction(
        () => this.dto,
        (dto) => {
            if (dto == null) {
                for (let i = 0; i < this.validationReactions.length; i++) {
                    this.validationReactions[i]();
                }
                this.validationReactions = [];
                this.errorsMap.clear();
            }
            else {
                for (let i = 0; i < this.validations.length; i++) {
                    let config = this.validations[i];
                    this.validationReactions.push(
                        reaction(
                            config.value
                            , action((value) => {
                                if (config.condition == null || config.condition()) {
                                    this.validationService.validate(config.validations, config.name, value, config.messages)
                                }
                                else {
                                    this.validationService.validate([], config.name, value)
                                }
                            })
                            , { fireImmediately: true, equals: () => false }
                        )
                    );
                }
            }
        }
    );
}