import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from '../src/button/Button';

import ButtonToolbarSeparator from '../src/button/ButtonToolbarSeparator';
import docs from './_docs/button/ButtonToolbarSeparator.json';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

storiesOf('button', module)
.add('ButtonToolbarSeparator', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Separador" description={`
    <ButtonToolbar>
      <Button>Novo</Button>
      <ButtonToolbarSeparator />
      <Button>Editar</Button>
      <Button>Consultar</Button>
      <Button>Remover</Button>
      <ButtonToolbarSeparator>|</ButtonToolbarSeparator>
      <Button>Ativar</Button>
      <Button>Inativar</Button>
    </ButtonToolbar>
    `}>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <ButtonToolbar>
          <Button onClick={sleepWait}>Novo</Button>
          <ButtonToolbarSeparator />
          <Button onClick={sleepWait}>Editar</Button>
          <Button onClick={sleepWait}>Consultar</Button>
          <Button onClick={sleepWait}>Remover</Button>
          <ButtonToolbarSeparator>|</ButtonToolbarSeparator>
          <Button onClick={sleepWait}>Ativar</Button>
          <Button onClick={sleepWait}>Inativar</Button>
        </ButtonToolbar>
      </div>
    </UseCase>
  </DocsContainer>
  );