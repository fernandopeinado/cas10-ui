import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import TextInput from '../src/input/TextInput';
import docs from './_docs/input/TextInput';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  nome: "Fernando",
  sobrenome: null,
}

storiesOf('input', module)
.add('TextInput', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
    <TextInput bean={bean} name="nome"></TextInput>

    bean = {
      nome: "Fernando",
      sobrenome: null,
    }
    `}>
      <div style={{padding: "10px"}}>
        <TextInput bean={bean} name="nome"></TextInput>
      </div>
      <div style={{padding: "10px"}}>
        <TextInput bean={bean} name="sobrenome"></TextInput>
      </div>
    </UseCase>
    <UseCase title="Types" description={`
    <TextInput bean={bean} name="nome" type="password"></TextInput>

    bean = {
      senha: "teste10",
    }
    `}>
      <div style={{padding: "10px"}}>
        <TextInput bean={bean} name="senha" type="password"></TextInput>
      </div>
    </UseCase>
    <UseCase title="Upper Case" description={`
    <TextInput bean={bean} name="nome" upperCase={true}></TextInput>

    bean = {
      nome: "Fernando",
      sobrenome: null,
    }
    `}>
      <div style={{padding: "10px"}}>
        <TextInput bean={bean} name="nome" upperCase={true}></TextInput>
      </div>
      <div style={{padding: "10px"}}>
        <TextInput bean={bean} name="sobrenome" upperCase={true}></TextInput>
      </div>
    </UseCase>
    <UseCase title="onKeyEnter" description={`
    <TextInput bean={bean} name="nome" onKeyEnter={(key, comp) => { /*...*/ }}></TextInput>
    `}>
      <div style={{padding: "10px"}}>
        <TextInput bean={bean} name="nome" onKeyEnter={ action('onKeyEnter') }></TextInput>
      </div>
    </UseCase>
  </DocsContainer>
);