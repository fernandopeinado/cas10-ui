import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import UserInterface from '../src/layout/UserInterface';
import TextInput from '../src/input/TextInput';
import Button from '../src/button/Button';
import messages from "../src/core/Messages";
import docs from './_docs/layout/UserInterface.json';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  nome: "Fernando",
  sobrenome: null,
}

storiesOf('layout', module)
.add('UserInterface', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
    <TextInput bean={bean} name="nome"></TextInput>

    bean = {
      nome: "Fernando",
      sobrenome: null,
    }
    `}>
      <div style={{border: "1px solid gray", height: "360px"}}>
        <UserInterface>
          <div className="container">
            <Button onClick={() => messages.successMessage('Nova Mensagem pra vc!')}>Mensagem</Button>
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
            <TextInput bean={bean} name="sobrenome"></TextInput>  
          </div>
        </UserInterface>
      </div>
    </UseCase>
  </DocsContainer>
);