import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DocsContainer from '../doc/DocsContainer';
import UseCase from '../doc/UseCase';
import UserInterface from '../../src/Layout/UserInterface';
import TextInput from '../../src/Input/TextInput';
import Button from '../../src/Button/Button';
import messages from "../../src/Core/Messages";

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  nome: "Fernando",
  sobrenome: null,
}

storiesOf('Layout', module)
  .add('UserInterface', () => 
    <DocsContainer component={TextInput}>
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