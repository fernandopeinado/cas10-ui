import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import Field from '../src/input/Field';
import TextInput from '../src/input/TextInput';
import docs from './_docs/input/Field.json';

const bean = {
  nome: null
}

storiesOf('input', module)
.add('Field', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Basico" description={`
~~~
<Field label="Nome">
  <TextInput bean={bean} name="nome" />
</Field>
~~~`}>
      <div style={{padding: "10px"}}>
        <Field label="Nome">
          <TextInput bean={bean} name="nome" />
        </Field>
      </div>
    </UseCase>
    <UseCase title="Com ajuda" description={`
~~~
<Field label="Nome" help="Texto de Ajuda">
  <TextInput bean={bean} name="nome" />
</Field>
~~~`}>
      <div style={{padding: "10px"}}>
        <Field label="Nome" help="Texto de Ajuda">
          <TextInput bean={bean} name="nome2" />
        </Field>
      </div>
    </UseCase>
    <UseCase title="Com erros" description={`
~~~
<Field label="Nome" errors={["Erro aqui, faça isso pra corrigir"]}>
  <TextInput bean={bean} name="nome" />
</Field>
~~~`}>
      <div style={{padding: "10px"}}>
        <Field label="Nome" errors={["Erro aqui, faça isso pra corrigir"]}>
          <TextInput bean={bean} name="nome3" />
        </Field>
      </div>
    </UseCase>
    <UseCase title="Com ajuda e erros" description={`
~~~
<Field label="Nome" help="Texto de Ajuda" errors={["Erro aqui, faça isso pra corrigir"]}>
  <TextInput bean={bean} name="nome" />
</Field>
~~~`}>
      <div style={{padding: "10px"}}>
        <Field label="Nome" help="Texto de Ajuda" errors={["Erro aqui, faça isso pra corrigir"]}>
          <TextInput bean={bean} name="nome4" />
        </Field>
      </div>
    </UseCase>
  </DocsContainer>
);