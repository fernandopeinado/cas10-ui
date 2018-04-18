import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DocsContainer from '../doc/DocsContainer';
import UseCase from '../doc/UseCase';
import TextArea from '../../src/Input/TextArea';

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

storiesOf('Input', module)
  .add('TextArea', () => 
    <DocsContainer component={TextArea}>
      <UseCase title="Basico" description={`
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
        <TextArea bean={bean} name="texto2" upperCase={true}></TextArea>

        bean = {
          texto2: "lala lele lili lolo lulu",
        }
        `}>
        <div style={{padding: "10px"}}>
          <TextArea bean={bean} name="texto2" upperCase={true}></TextArea>
        </div>
      </UseCase>
      <UseCase title="Javascript" description={`
        <TextArea bean={bean} name="javascript" mode="javascript" showLineNumbers={true}></TextArea>

        bean = {
          javascript: "function(a, b) {\\n\\treturn a + b;\\n}",
        }
        `}>
        <div style={{padding: "10px"}}>
          <TextArea bean={bean} name="javascript" mode="javascript" showLineNumbers={true}></TextArea>
        </div>
      </UseCase>
      <UseCase title="Html" description={`
        <TextArea bean={bean} name="html" mode="htmlmixed" showLineNumbers={false}></TextArea>

        bean = {
          html: "<div class=\\"classeaqui\\">Meu Texto</div>",
        }
        `}>
        <div style={{padding: "10px"}}>
          <TextArea bean={bean} name="html" mode="htmlmixed" showLineNumbers={false}></TextArea>
        </div>
      </UseCase>
    </DocsContainer>
  );