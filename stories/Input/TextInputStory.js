import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DocsContainer from '../doc/DocsContainer';
import UseCase from '../doc/UseCase';
import TextInput from '../../src/Input/TextInput';

export default {};

console.log(TextInput.__docgenInfo);

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  nome: "Fernando",
  sobrenome: null,
}

storiesOf('Input', module)
  .add('TextInput', () => 
    <DocsContainer component={TextInput}>
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
    </DocsContainer>
  );