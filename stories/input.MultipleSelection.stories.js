import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import MultipleSelection from '../src/input/MultipleSelection';
import docs from './_docs/input/MultipleSelection.json';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

var bean = {
  sexo: [ "M" ],
  nacionalidade: [],
}

function sexos(input) {
  return Promise.resolve([
    { label: "MASCULINO", value: "M" },
    { label: "FEMININO", value: "F" },
    { label: "INDETERMINADO", value: "I" } 
  ]);
}

function paisesComplexos(input) {

  return Promise.resolve([
    { nome: "ALEMANHA", sigla: "A" },
    { nome: "BRASIL", sigla: "B" },
    { nome: "COSTA RICA", sigla: "C" },
    { nome: "DINAMARCA", sigla: "D" },
    { nome: "ESPANHA", sigla: "E" },
    { nome: "FINLANDIA", sigla: "F" },
    { nome: "GRECIA", sigla: "G" },
    { nome: "HOLANDA", sigla: "H" },
    { nome: "INGLATERRA", sigla: "I" },
  ]);

}

function paises(input) {

  var paises = [
    { label: "ALEMANHA", value: "A" },
    { label: "BRASIL", value: "B" },
    { label: "COSTA RICA", value: "C" },
    { label: "DINAMARCA", value: "D" },
    { label: "ESPANHA", value: "E" },
    { label: "FINLANDIA", value: "F" },
    { label: "GRECIA", value: "G" },
    { label: "HOLANDA", value: "H" },
    { label: "INGLATERRA", value: "I" },
  ]

  return new Promise(resolve => {       
      window.setTimeout(
        function() {
          resolve(paises.filter((op) => {
            return input ? op.label.toLowerCase().startsWith(input) : true 
          }));
        }, 1000);
    });
}

function paisesCaseSensitive(input) {

  var paises = [
    { label: "Alemanha", value: "A" },
    { label: "Brasil", value: "B" },
    { label: "COSTA RICA", value: "C" },
    { label: "Dinamarca", value: "D" },
    { label: "Espanha", value: "E" },
    { label: "Finlândia", value: "F" },
    { label: "Grécia", value: "G" },
    { label: "Holanda", value: "H" },
    { label: "Inglaterra", value: "I" },
  ]

  return new Promise(resolve => {       
      window.setTimeout(
        function() {
          resolve(paises.filter((op) => {
            return input ? op.label.startsWith(input) : true 
          }));
        }, 1000);
    });
}

storiesOf('input', module)
.add('MultipleSelection', () => 
  <DocsContainer docs={docs}>
    <UseCase title="Com opções definidas" description={`
    <MultipleSelection bean={bean} name="sexo" loadOptions={sexos} autoload={true}></MultipleSelection>

    var bean = {
      sexo: [ "M" ],
    }

    function sexos(input) {
      return Promise.resolve([
        { label: "MASCULINO", value: "M" },
        { label: "FEMININO", value: "F" },
        { label: "INDETERMINADO", value: "I" } 
      ]);
    }
    `}>
      <div style={{padding: "10px"}}>
        <MultipleSelection bean={bean} name="sexo" loadOptions={sexos} autoload={true}></MultipleSelection>
      </div>
    </UseCase>
    <UseCase title="Com opções não padrão ou complexas" description={`
    <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paisesComplexos} autoload={true} optionLabel="nome" optionValue="sigla"></MultipleSelection>
    <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paisesComplexos} autoload={true} optionLabel={op => op.nome + " - " + op.sigla} optionValue={op => op.sigla}></MultipleSelection>
    
    var bean = {
      nacionalidade: [],
    }   

    function paisesComplexos(input) {

      return Promise.resolve([
        { nome: "ALEMANHA", sigla: "A" },
        { nome: "BRASIL", sigla: "B" },
        { nome: "COSTA RICA", sigla: "C" },
        { nome: "DINAMARCA", sigla: "D" },
        { nome: "ESPANHA", sigla: "E" },
        { nome: "FINLANDIA", sigla: "F" },
        { nome: "GRECIA", sigla: "G" },
        { nome: "HOLANDA", sigla: "H" },
        { nome: "INGLATERRA", sigla: "I" },
      ]);
    
    }
    `}>
      <div style={{padding: "10px"}}>
        <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paisesComplexos} autoload={true} optionLabel="nome" optionValue="sigla"></MultipleSelection>
      </div>
      <div style={{padding: "10px"}}>
        <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paisesComplexos} autoload={true} optionLabel={op => op.nome + " - " + op.sigla} optionValue={op => op.sigla}></MultipleSelection>
      </div>
    </UseCase>
    <UseCase title="Com opções Carregadas" description={`
    <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paises} threshold={1}></MultipleSelection>

    var bean = {
      nacionalidade: [],
    }   

    function paises(input) {

      var paises = [
        { label: "ALEMANHA", value: "A" },
        { label: "BRASIL", value: "B" },
        { label: "COSTA RICA", value: "C" },
        { label: "DINAMARCA", value: "D" },
        { label: "ESPANHA", value: "E" },
        { label: "FINLANDIA", value: "F" },
        { label: "GRECIA", value: "G" },
        { label: "HOLANDA", value: "H" },
        { label: "INGLATERRA", value: "I" },
      ]
    
      return new Promise(resolve => {       
          window.setTimeout(
            function() {
              resolve(paises.filter((op) => {
                return input ? op.label.toLowerCase().startsWith(input) : true 
              }));
            }, 1000);
        });
    }
    `}>
      <div style={{padding: "10px"}}>
        <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paises} threshold={1}></MultipleSelection>
      </div>
    </UseCase>
    <UseCase title="Com opções Carregadas Sensível a caixa e acentos" description={`
    <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paisesCaseSensitive} ignoreCase={false} ignoreAccents={false} threshold={1}></MultipleSelection>

    var bean = {
      nacionalidade: [],
    }  

    function paisesCaseSensitive(input) {

      var paises = [
        { label: "Alemanha", value: "A" },
        { label: "Brasil", value: "B" },
        { label: "COSTA RICA", value: "C" },
        { label: "Dinamarca", value: "D" },
        { label: "Espanha", value: "E" },
        { label: "Finlândia", value: "F" },
        { label: "Grécia", value: "G" },
        { label: "Holanda", value: "H" },
        { label: "Inglaterra", value: "I" },
      ]
    
      return new Promise(resolve => {       
          window.setTimeout(
            function() {
              resolve(paises.filter((op) => {
                return input ? op.label.startsWith(input) : true 
              }));
            }, 1000);
        });
    }
    `}>
      <div style={{padding: "10px"}}>
        <MultipleSelection bean={bean} name="nacionalidade" loadOptions={paisesCaseSensitive} ignoreCase={false} ignoreAccents={false} threshold={1}></MultipleSelection>
      </div>
    </UseCase>
  </DocsContainer>
);