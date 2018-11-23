import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import Theme from '../src/theme/Theme';
import Panel from '../src/layout/Panel';
import docs from './_docs/layout/Panel.json';

storiesOf('layout', module)
.add('Panel', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
    <Theme>
      <Panel>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
      </Panel>
    </Theme>`}>
      <Theme>
        <Panel>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
        </Panel>
      </Theme>
    </UseCase>
    <UseCase title="Com titulo" description={`
    <Theme>
      <Panel title="Titulo do Painel">
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
      </Panel>
    </Theme>    
    `}>
      <Theme>
        <Panel title="Titulo do Painel">
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
        </Panel>
      </Theme>
    </UseCase>
    <UseCase title="Com rodapé" description={`    
    <Theme>
      <Panel footer="Com rodapé">
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
      </Panel>
    </Theme>
    `}>
      <Theme>
        <Panel footer="Com rodapé">
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
        </Panel>
      </Theme>
    </UseCase>
    <UseCase title="Com titulo sem cor" description={`    
    <Theme>
      <Panel title="Titulo do Painel" collapsible footer="Com rodapé">
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
        <p>Texto aqui</p>
      </Panel>
    </Theme>
    `}>
      <Theme>
        <Panel title="Titulo do Painel" noColor collapsible footer="Com rodapé">
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
          <p>Texto aqui</p>
        </Panel>
      </Theme>
    </UseCase>
  </DocsContainer>
);