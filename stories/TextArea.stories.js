import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import TextArea from '../src/input/TextArea';
import docs from './_docs/input/TextArea.json';

var bean = {
  texto: null,
  texto2: "lala lele lili lolo lulu",
  javascript: "function(a, b) {\n\treturn a + b;\n}",
  html: "<div class=\"classeaqui\">Meu Texto</div>",
}

storiesOf('input', module)
.add('TextArea', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
    <TextArea bean={bean} name="texto"></TextArea>

    bean = {
      texto: null
    }
    `}>
      <div style={{padding: "10px"}}>
        <TextArea bean={bean} name="texto"></TextArea>
      </div>
    </UseCase>
    <UseCase title="Com mais linhas" description={`
    <TextArea bean={bean} name="texto" rows={10}></TextArea>

    bean = {
      texto: null
    }
    `}>
      <div style={{padding: "10px"}}>
        <TextArea bean={bean} name="texto" rows={10}></TextArea>
      </div>
    </UseCase>
    <UseCase title="Upper Case" description={`
    <TextArea bean={bean} name="texto2" upperCase></TextArea>

    bean = {
      texto2: "lala lele lili lolo lulu",
    }
    `}>
      <div style={{padding: "10px"}}>
        <TextArea bean={bean} name="texto2" upperCase></TextArea>
      </div>
    </UseCase>
  </DocsContainer>
);