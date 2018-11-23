import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import Spinner from '../src/layout/Spinner';
import docs from './_docs/layout/Spinner.json';

storiesOf('layout', module)
.add('Spinner', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
    <Spinner />
    `}>
      <Spinner />
    </UseCase>
    <UseCase title="Diametro diferente" description={`
    <Spinner diameter="24px" />
    `}>
      <Spinner diameter="24px"/>
    </UseCase>
  </DocsContainer>
);