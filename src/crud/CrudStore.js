import { observable, computed, action, reaction, autorun } from 'mobx';
import ValidationService from '../input/Validation';
import messages from '../core/Messages';

export default class CrudStore {
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

    constructor(crudService) {
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

    initSearch(dto) {}

    preSearch(dto) {}

    loadList = () => {
        var _self = this;
        var dto = this.crudService.newDto();
        if (this.searchDto != null) {
            Object.assign(dto, this.searchDto);
        }
        this.preSearch(dto);
        this.crudService.page(this.page.size, this.page.number, dto)
            .then(action(page => {
                _self.page = page;
                _self.view = 'search';
                _self.radioChoice();
            }))
            .catch(_self.errorHandler);
    }

    @action searchCommand = () => {
        this.page.number = 0;
        this.loadList();
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

    preCreateCommand() {}

    postCreateCommand() {}

    createCommand = async () => {
        try {
            var _self = this;
            var dto = this.crudService.newDto();
            Object.assign(dto, this.dto);
            this.preCreate(dto);
            await this.preCreateCommand();
            return this.crudService.create(dto)
                .then(action(dto => {
                    _self.view = 'search';
                    _self.loadList();
                    _self.dto = null;
                    _self.postCreateCommand();
                }))
                .catch(_self.errorHandler);
        } catch (error) {
            this.errorHandler(error);
        }
    }

    preDisplay(dto) {}

    preDisplayCommand(listItem) {}

    postDisplayCommand(listItem) {}

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
                        console.log('displayDTO');
                        _self.view = 'display';
                        _self.dto = dto;
                        _self.postDisplayCommand(listItem);
                        console.log(_self.dto);
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

    preEditCommand(listItem) {}

    postEditCommand(listItem) {}

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

    preUpdateCommand() {}

    postUpdateCommand() {}

    updateCommand = async () => {
        try {
            var _self = this;
            var dto = this.crudService.newDto();
            Object.assign(dto, this.dto);
            this.preUpdate(dto);
            await this.preUpdateCommand();
            return this.crudService.update(dto)
                .then(action(dto => {
                    _self.view = 'search';
                    _self.loadList();
                    _self.dto = null;
                    _self.postUpdateCommand();
                }))
                .catch(_self.errorHandler);
        } catch (error) {
            this.errorHandler(error);
        }                
    }

    preDelete(dto) {}

    preDeleteCommand() {}

    postDeleteCommand() {}

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
                await this.preDeleteCommand();
                return this.crudService.delete(id)
                    .then(action(dto => {
                        _self.view = 'search';
                        _self.loadList();
                        _self.dto = null;
                        _self.postDeleteCommand();
                    }))
                    .catch(_self.errorHandler);
            }
            else {
                messages.warningMessageOnly("Escolha pelo menos um item para remover");
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

    preActivateCommand(listItem) {}

    postActivateCommand(listItem) {}
    
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
                await this.preActivateCommand(listItem);
                return this.crudService.activate(id)
                    .then(action(dto => {
                        _self.loadList();
                        _self.postActivateCommand(listItem);
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

    preInactivateCommand(listItem) {}

    postInactivateCommand(listItem) {}

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
                await this.preInactivateCommand(listItem);
                return this.crudService.inactivate(id)
                    .then(action(dto => {
                        _self.loadList();
                        _self.postInactivateCommand(listItem);
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