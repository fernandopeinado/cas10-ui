import React from 'react';
import { storiesOf } from '@storybook/react';
import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';

export default {};

var description = `
\`introspector\` é um serviço singleton, exportado por \`core.Introspector\` e que oferece uma forma de 
recuperar e definir propriedades em objetos de forma facil, segura e estruturada, usando expressão texto 
do caminho:

\`obj.pessoa.nome\` 

\`obj.pessoa.telefone[0].numero\` 

e etc.
`

var getValueDescription = `
Recupera o valor da propriedade ou retorna um valor default. Percorre o caminho de forma nullsafe.

Parametro | Descrição
--------- | ---------
object | o objeto base de onde extrairemos a propriedade
path | a expressão do caminho
defaultValue | valor padrão caso a propriedade não seja encontrada
`

var setValueDescription = `
Define o valor da propriedade de forma nullsafe, preenchendo objetos intermediarios que não existam.

Parametro | Descrição
--------- | ---------
object | o objeto base de onde extrairemos a propriedade
path | a expressão do caminho
value | valor a ser definido
`

storiesOf('core', module)
.add('Introspector', () => 
  <DocsContainer>
    <UseCase title="Iniciando" description={description} />
    <UseCase title="getValue(object, path, defaultValue)" description={getValueDescription} />
    <UseCase title="setValue(object, path, value)" description={setValueDescription} />
  </DocsContainer>
  );