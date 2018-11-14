import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import TextInput from '../src/input/TextInput';
import SearchMode from '../src/input/SearchMode';
import docs from './_docs/input/SearchMode';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  nome: "Fernando",
}

storiesOf('input', module)
.add('SearchMode', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
    `}>
      <div style={{padding: "10px"}}>
        <SearchMode bean={bean} name="nomeSearchMode">
          <TextInput bean={bean} name="nome"></TextInput>
        </SearchMode>
      </div>
    </UseCase>
  </DocsContainer>
);