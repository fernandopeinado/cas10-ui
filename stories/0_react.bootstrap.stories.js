import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';

export default {};

storiesOf('react-boostrap', module)
.add('External Components', () => 
  <DocsContainer>
    <UseCase title="React Bootstrap 3">
      <a href="https://react-bootstrap-v3.netlify.com/components/alerts/">React Bootstrap Components Docs</a>
    </UseCase>
  </DocsContainer>
);