import React from 'react';
import Button from "../button/Button";
import BaseCrudView, { defaultLabels as baseLabels } from './BaseCrudView';
import { observer } from 'mobx-react';

export const defaultLabels = {
    ...baseLabels,
    activateButton: 'Ativar',
    inactivateButton: 'Inativar'
}

@observer
export default class BaseCrudAtivavelView extends BaseCrudView {

    constructor(props, crudConfig) {
        super(props, crudConfig);
        this.labels = {...defaultLabels, ...crudConfig.labels};
    }
    
    getListToolbarButtons() {
        var buttons = super.getListToolbarButtons();
        buttons.push(<Button key={'ativar'} onClick={(e) => this.crudStore.activateCommand()}><i className="fa fa-power-off"/> {this.labels.activateButton}</Button>);
        buttons.push(<Button key={'inativar'} onClick={(e) => this.crudStore.inactivateCommand()}><i className="fa fa-power-off"/> {this.labels.inactivateButton}</Button>);
        return buttons;
    }

}