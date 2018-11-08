import React from 'react';
import Button from "../button/Button";
import BaseCrudView from './BaseCrudView';
import { observer } from 'mobx-react';

@observer
export default class BaseCrudAtivavelView extends BaseCrudView {

    constructor(props, crudConfig) {
        super(props, crudConfig);
    }
    
    getListToolbarButtons() {
        var buttons = super.getListToolbarButtons();
        buttons.push(<Button key={'ativar'} onClick={(e) => this.crudStore.activateCommand()}><i className="fa fa-power-off"/> Ativar</Button>);
        buttons.push(<Button key={'inativar'} onClick={(e) => this.crudStore.inactivateCommand()}><i className="fa fa-power-off"/> Inativar</Button>);
        return buttons;
    }

}