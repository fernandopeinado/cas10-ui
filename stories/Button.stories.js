import React from 'react';

import { storiesOf } from '@storybook/react';

import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import Button from '../src/button/Button';
import docs from './_docs/button/Button.json';

export default {};

function sleepWait(e) {
  return new Promise((resolve) => setTimeout(resolve, 2500));
}

storiesOf('button', module)
.add('Button', () => 
  <DocsContainer docs={docs}>
    <UseCase title="bsStyle" description={`
    <Button>Default</Button>
    <Button bsStyle="primary">Primary</Button>
    <Button bsStyle="success">Success</Button>
    <Button bsStyle="info">Info</Button>
    <Button bsStyle="warning">Warning</Button>
    <Button bsStyle="danger">Danger</Button>
    <Button bsStyle="link">Link</Button>
    `}>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait}>Default</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} bsStyle="primary">Primary</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} bsStyle="success">Success</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} bsStyle="info">Info</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} bsStyle="warning">Warning</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} bsStyle="danger">Danger</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} bsStyle="link">Link</Button>
      </div>
    </UseCase>
    <UseCase title="disable" description={`
    <Button disabled>Default</Button>
    <Button disabled bsStyle="primary">Primary</Button>
    <Button disabled bsStyle="success">Success</Button>
    <Button disabled bsStyle="info">Info</Button>
    <Button disabled bsStyle="warning">Warning</Button>
    <Button disabled bsStyle="danger">Danger</Button>
    <Button disabled bsStyle="link">Link</Button>`}>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} disabled>Default</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} disabled bsStyle="primary">Primary</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} disabled bsStyle="success">Success</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} disabled bsStyle="info">Info</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} disabled bsStyle="warning">Warning</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} disabled bsStyle="danger">Danger</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} disabled bsStyle="link">Link</Button>
      </div>
    </UseCase>
    <UseCase title="style" description={`
    <Button style={{width:"120px"}}>Default</Button>
    <Button style={{width:"120px"}} bsStyle="primary">Primary</Button>
    <Button style={{width:"120px"}} bsStyle="success">Success</Button>
    <Button style={{width:"120px"}} bsStyle="info">Info</Button>
    <Button style={{width:"120px"}} bsStyle="warning">Warning</Button>
    <Button style={{width:"120px"}} bsStyle="danger">Danger</Button>
    <Button style={{width:"120px"}} bsStyle="link">Link</Button>`}>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} style={{width:"120px"}}>Default</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} style={{width:"120px"}} bsStyle="primary">Primary</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} style={{width:"120px"}} bsStyle="success">Success</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} style={{width:"120px"}} bsStyle="info">Info</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} style={{width:"120px"}} bsStyle="warning">Warning</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} style={{width:"120px"}} bsStyle="danger">Danger</Button>
      </div>
      <div style={{paddingRight: "10px", display: "inline-block"}}>
        <Button onClick={sleepWait} style={{width:"120px"}} bsStyle="link">Link</Button>
      </div>
    </UseCase>
    <UseCase title="bsSize" description={`
    <Button onClick={sleepWait} bsSize="large">large</Button>
    <Button onClick={sleepWait}>default</Button>
    <Button onClick={sleepWait} bsSize="small">small</Button>
    <Button onClick={sleepWait} bsSize="xsmall">xsmall</Button>`}>
      <div style={{padding: "10px 0px 10px 0px"}}>
        <Button onClick={sleepWait} bsSize="large">large</Button>
      </div>
      <div style={{padding: "10px 0px 10px 0px"}}>
        <Button onClick={sleepWait}>default</Button>
      </div>
      <div style={{padding: "10px 0px 10px 0px"}}>
        <Button onClick={sleepWait} bsSize="small">small</Button>
      </div>
      <div style={{padding: "10px 0px 10px 0px"}}>
        <Button onClick={sleepWait} bsSize="xsmall">xsmall</Button>
      </div>
    </UseCase>
  </DocsContainer>
);