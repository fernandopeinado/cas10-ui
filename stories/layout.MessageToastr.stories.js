import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import MessageToastr from '../src/layout/MessageToastr';
import messages from '../src/core/Messages';
import Button from '../src/button/Button';
import docs from './_docs/layout/MessageToastr.json';

storiesOf('layout', module)
.add('MessageToastr', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
      <MessageToastr />
    `}>
      <MessageToastr />
      <Button onClick={() => messages.infoMessageOnly('Mensagem')}>Mensagem</Button>
    </UseCase>
  </DocsContainer>
);