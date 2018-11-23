import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import Icon from '../src/display/Icon';
import docs from './_docs/display/Icon.json';

storiesOf('display', module)
.add('Icon', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Básico" description={`
    <Icon fa="close" style={{margin: 10}} />
    <Icon fa="bars" style={{margin: 10}}/>
    <Icon fa="calendar" style={{margin: 10}}/>
    `}>
      <div style={{padding: "10px"}}>
        <Icon fa="close" style={{margin: 10}}/>
        <Icon fa="bars" style={{margin: 10}}/>
        <Icon fa="calendar" style={{margin: 10}}/>
      </div>
      <div style={{padding: "10px"}}>
        <a href="https://fontawesome.com/v4.7.0/icons/">Lista de Ícones Aqui</a>
      </div>
    </UseCase>
  </DocsContainer>
);