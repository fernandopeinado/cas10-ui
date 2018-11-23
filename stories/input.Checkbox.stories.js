import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';

import Checkbox from '../src/input/Checkbox';
import docs from './_docs/input/Checkbox.json';

const bean = {
  simpleCheck: null,
  simpleCheckInitialized: 1,
  simpleCheckInitializedWrong: 2,
  listCheck: null,
  listCheckInitialized: [1, 2]
}

storiesOf('input', module)
.add('Checkbox', () => 
  <DocsContainer docs={docs}>
    <UseCase title="simples não checado" description={
`     bean = {
        simpleCheck: null
      }
      
      <Checkbox bean={bean} name="simpleCheck" value={1} />`}>
      <div style={{padding: "10px"}}>
        <Checkbox bean={bean} name="simpleCheck" value={1} />
      </div>
    </UseCase>
    <UseCase title="simples checado" description={
`     bean = {
        simpleCheckInitialized: 1
      }

      <Checkbox bean={bean} name="simpleCheckInitialized" value={1} />`}>
      <div style={{padding: "10px"}}>
        <Checkbox bean={bean} name="simpleCheckInitialized" value={1} />
      </div>
    </UseCase>
    <UseCase title="simples outro valor" description={
`     bean = {
        simpleCheckInitializedWrong: 2
      }
      
      <Checkbox bean={bean} name="simpleCheckInitializedWrong" value={1} />`}>
      <div style={{padding: "10px"}}>
        <Checkbox bean={bean} name="simpleCheckInitializedWrong" value={1} />
      </div>
    </UseCase>
    <UseCase title="lista sem nenhum valor" description={
`     bean = {
        listCheck: null
      }

      <table className="table">
        <thead>
          <tr><th width="10ch">Selecione</th><th>Item</th></tr>
        </thead>
        <tbody>
          <tr><td><Checkbox type="list" bean={bean} name="listCheck" value={1} /></td><td>Valor 1</td></tr>
          <tr><td><Checkbox type="list" bean={bean} name="listCheck" value={2} /></td><td>Valor 2</td></tr>
        </tbody>
      </table>`}>
      <div style={{padding: "10px"}}>
        <table className="table">
          <thead>
            <tr><th width="10ch">Selecione</th><th>Item</th></tr>
          </thead>
          <tbody>
            <tr><td><Checkbox type="list" bean={bean} name="listCheck" value={1} /></td><td>Valor 1</td></tr>
            <tr><td><Checkbox type="list" bean={bean} name="listCheck" value={2} /></td><td>Valor 2</td></tr>
          </tbody>
        </table>
      </div>
    </UseCase>
    <UseCase title="lista com valores" description={
`     bean = {
        listCheckInitialized: [1, 2]
      }

      <table className="table">
        <thead>
          <tr><th width="10ch">Selecione</th><th>Item</th></tr>
        </thead>
        <tbody>
          <tr><td><Checkbox type="list" bean={bean} name="listCheckInitialized" value={1} /></td><td>Valor 1</td></tr>
          <tr><td><Checkbox type="list" bean={bean} name="listCheckInitialized" value={2} /></td><td>Valor 2</td></tr>
        </tbody>
      </table>`}>
      <div style={{padding: "10px"}}>
        <table className="table">
          <thead>
            <tr><th width="10ch">Selecione</th><th>Item</th></tr>
          </thead>
          <tbody>
            <tr><td><Checkbox type="list" bean={bean} name="listCheckInitialized" value={1} /></td><td>Valor 1</td></tr>
            <tr><td><Checkbox type="list" bean={bean} name="listCheckInitialized" value={2} /></td><td>Valor 2</td></tr>
          </tbody>
        </table>
      </div>
    </UseCase>
</DocsContainer>
);