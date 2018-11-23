import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import BooleanInput from '../src/input/BooleanInput';
import docs from './_docs/input/BooleanInput.json';

const bean = {
  ativo: true,
  vendido: false,
  opcional: null
}

const bean2 = {
  ativo: true,
  vendido: false,
  opcional: null
}

storiesOf('input', module)
.add('BooleanInput', () => 
  <DocsContainer docs={docs}>
    <UseCase title="bistate" description={`
    const bean = {
      ativo: true,
      vendido: false,
      opcional: null
    }

    <BooleanInput bean={bean} name="ativo"></BooleanInput>
    <BooleanInput bean={bean} name="vendido"></BooleanInput>
    <BooleanInput bean={bean} name="opcional"></BooleanInput>
    `}>
      <div style={{padding: "10px"}}>
        <BooleanInput bean={bean} name="ativo"></BooleanInput>
        <BooleanInput bean={bean} name="vendido"></BooleanInput>
        <BooleanInput bean={bean} name="opcional"></BooleanInput>
      </div>
    </UseCase>
    <UseCase title="tristate" description={`
    const bean = {
      ativo: true,
      vendido: false,
      opcional: null
    }

    <BooleanInput type="tristate" bean={bean} name="ativo"></BooleanInput>
    <BooleanInput type="tristate" bean={bean} name="vendido"></BooleanInput>
    <BooleanInput type="tristate" bean={bean} name="opcional"></BooleanInput>
    `}>
      <div style={{padding: "10px"}}>
        <BooleanInput type="tristate" bean={bean2} name="ativo"></BooleanInput>
        <BooleanInput type="tristate" bean={bean2} name="vendido"></BooleanInput>
        <BooleanInput type="tristate" bean={bean2} name="opcional"></BooleanInput>
      </div>
    </UseCase>
  </DocsContainer>
);