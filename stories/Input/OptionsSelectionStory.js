import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DocsContainer from '../doc/DocsContainer';
import UseCase from '../doc/UseCase';
import OptionsSelection from '../../src/Input/OptionsSelection';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  sexos: [
    { label: "MASCULINO", value: "M" },
    { label: "FEMININO", value: "F" },
    { label: "INDETERMINADO", value: "I" } 
  ],
  sexo: "M",
  paises: [
    { nome: "ALEMANHA", sigla: "A" },
    { nome: "BRASIL", sigla: "B" },
    { nome: "COSTA RICA", sigla: "C" },
    { nome: "DINAMARCA", sigla: "D" },
    { nome: "ESPANHA", sigla: "E" },
    { nome: "FINLANDIA", sigla: "F" },
    { nome: "GRECIA", sigla: "G" },
    { nome: "HOLANDA", sigla: "H" },
    { nome: "INGLATERRA", sigla: "I" },
  ],
  nacionalidade: null,
}

storiesOf('Input', module)
  .add('OptionsSelection', () => 
    <DocsContainer component={OptionsSelection}>
      <UseCase title="Basico" description={`
        <OptionsSelection bean={bean} name="sexo" options={bean.sexos}></OptionsSelection>

        var bean = {
          sexos: [
            { label: "MASCULINO", value: "M" },
            { label: "FEMININO", value: "F" },
            { label: "INDETERMINADO", value: "I" } 
          ],
          sexo: "M"
        }

        `}>
        <div style={{padding: "10px"}}>
          <OptionsSelection bean={bean} name="sexo" options={bean.sexos}></OptionsSelection>
        </div>
      </UseCase>
      <UseCase title="Com opções não padrão ou complexas" description={`
        <OptionsSelection bean={bean} name="nacionalidade" options={bean.paises} optionLabel="nome" optionValue="sigla"></OptionsSelection>
        <OptionsSelection bean={bean} name="nacionalidade" options={bean.paises} optionLabel={op => op.nome + " - " + op.sigla} optionValue={op => op.sigla}></OptionsSelection>
        
        var bean = {
          paises: [
            { nome: "ALEMANHA", sigla: "A" },
            { nome: "BRASIL", sigla: "B" },
            { nome: "COSTA RICA", sigla: "C" },
            { nome: "DINAMARCA", sigla: "D" },
            { nome: "ESPANHA", sigla: "E" },
            { nome: "FINLANDIA", sigla: "F" },
            { nome: "GRECIA", sigla: "G" },
            { nome: "HOLANDA", sigla: "H" },
            { nome: "INGLATERRA", sigla: "I" },
          ],
          nacionalidade: null,
        }

        `}>
        <div style={{padding: "10px"}}>
          <OptionsSelection bean={bean} name="nacionalidade" options={bean.paises} optionLabel="nome" optionValue="sigla"></OptionsSelection>
        </div>
        <div style={{padding: "10px"}}>
          <OptionsSelection bean={bean} name="nacionalidade" options={bean.paises} optionLabel={op => op.nome + " - " + op.sigla} optionValue={op => op.sigla}></OptionsSelection>
        </div>
      </UseCase>
    </DocsContainer>
  );