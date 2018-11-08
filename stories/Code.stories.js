import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import Code from '../src/input/Code';
import docs from './_docs/input/Code.json';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  texto: null,
  texto2: "lala lele lili lolo lulu",
  javascript: "function(a, b) {\n\treturn a + b;\n}",
  html: "<div class=\"classeaqui\">Meu Texto</div>",
}

storiesOf('input', module)
.add('Code', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
    <Code bean={bean} name="texto" rows={10}></Code>

    bean = {
      texto: null
    }
    `}>
      <div style={{padding: "10px"}}>
        <Code bean={bean} name="texto" rows={10}></Code>
      </div>
    </UseCase>
    <UseCase title="Upper Case" description={`
    <Code bean={bean} name="texto2" upperCase={true}></Code>

    bean = {
      texto2: "lala lele lili lolo lulu",
    }
    `}>
      <div style={{padding: "10px"}}>
        <Code bean={bean} name="texto2" upperCase={true}></Code>
      </div>
    </UseCase>
    <UseCase title="Javascript" description={`
    <Code bean={bean} name="javascript" mode="javascript" showLineNumbers={true}></Code>

    bean = {
      javascript: "function(a, b) {\\n\\treturn a + b;\\n}",
    }
    `}>
      <div style={{padding: "10px"}}>
        <Code bean={bean} name="javascript" mode="javascript" showLineNumbers={true}></Code>
      </div>
    </UseCase>
    <UseCase title="Html" description={`
    <Code bean={bean} name="html" mode="htmlmixed" showLineNumbers={false}></Code>

    bean = {
      html: "<div class=\\"classeaqui\\">Meu Texto</div>",
    }
    `}>
      <div style={{padding: "10px"}}>
        <Code bean={bean} name="html" mode="htmlmixed" showLineNumbers={false}></Code>
      </div>
    </UseCase>
  </DocsContainer>
);