import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import Markdown from '../src/display/Markdown';
import docs from './_docs/display/Markdown.json';

const markdown = `
# Titulo 1
## Tilulo 2

Texto de introdução aqui

1. Lista Ordenada
1. Lista Ordenada
1. Lista Ordenada
`

storiesOf('display', module)
.add('Markdown', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Básico" description={`
    const markdown = \`
    # Titulo 1
    ## Tilulo 2
    
    Texto de introdução aqui
    
    1. Lista Ordenada
    1. Lista Ordenada
    1. Lista Ordenada
    \`
    
    <Markdown content={markdown} />
    `}>
      <div style={{padding: "10px"}}>
        <Markdown content={markdown}/>
      </div>
      <div style={{padding: "10px"}}>
        <a href="https://www.markdownguide.org/cheat-sheet">Referencia de Markdown</a>
      </div>
    </UseCase>
  </DocsContainer>
);