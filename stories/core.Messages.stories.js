import React from 'react';
import { storiesOf } from '@storybook/react';
import DocsContainer from '../src/display/DocsContainer';
import UseCase from '../src/display/UseCase';
import MessageToastr from '../src/layout/MessageToastr';
import messages from '../src/core/Messages';

export default {};

var clicableStyle = {
  padding: 10, backgroundColor: '#EEE', cursor: 'pointer'
}

var description = `
\`messages\` é um serviço singleton, exportado por \`core.Messages\` e que oferece uma central de envio de 
mensagens para o usuário. Baseado na classe \`core.EventEmmiter\`. Para a apresentação das mensagens na tela
veja a componente \`layout.MessageToastr\`.
`

storiesOf('core', module)
.add('Messages', () => 
  <DocsContainer>
    <MessageToastr/>
    <UseCase title="messages" description={description}>
    </UseCase>
    <UseCase title="info" description={`
      messages.infoMessage('Mensagem Info')
    `}>
      <div className="text-info" style={clicableStyle} onClick={() => messages.infoMessage('Mensagem Info')}>Mensagem: Info</div>
    </UseCase>
    <UseCase title="success" description={`
      messages.successMessage('Mensagem Success')
    `}>
      <div className="text-success" style={clicableStyle} onClick={() => messages.successMessage('Mensagem Success')}>Mensagem: Success</div>
    </UseCase>
    <UseCase title="warning" description={`
      messages.warningMessage('Mensagem Warning')
    `}>
      <div className="text-warning" style={clicableStyle} onClick={() => messages.warningMessage('Mensagem Warning')}>Mensagem: Warning</div>
    </UseCase>
    <UseCase title="error" description={`
      messages.errorMessage('Mensagem Error')
    `}>
      <div className="text-danger" style={clicableStyle} onClick={() => messages.errorMessage('Mensagem Error')}>Mensagem: Error</div>
    </UseCase>
    <UseCase title="clear" description={`
      messages.clearMessages()
    `}>
      <div style={clicableStyle} onClick={() => messages.clearMessages()}>Clear</div>
    </UseCase>

    <UseCase title="*MessageOnly" description={`
      Quando queremos que apenas a mensagem atual seja mostrada, esse processo limpa todas as mensagens anteriores antes de mostrar a nova.
    `}>
    </UseCase>
    <UseCase title="infoOnly" description={`
      messages.infoMessageOnly('Mensagem Info Only')
    `}>
      <div className="text-info" style={clicableStyle} onClick={() => messages.infoMessageOnly('Mensagem Info Only')}>Mensagem: Info Only</div>
    </UseCase>
    <UseCase title="successOnly" description={`
      messages.successMessageOnly('Mensagem Success Only')
    `}>
      <div className="text-success" style={clicableStyle} onClick={() => messages.successMessageOnly('Mensagem Success Only')}>Mensagem: Success Only</div>
    </UseCase>
    <UseCase title="warningOnly" description={`
      messages.warningMessageOnly('Mensagem Warning Only')
    `}>
      <div className="text-warning" style={clicableStyle} onClick={() => messages.warningMessageOnly('Mensagem Warning Only')}>Mensagem: Warning Only</div>
    </UseCase>
    <UseCase title="errorOnly" description={`
      messages.errorMessageOnly('Mensagem Error Only')
    `}>
      <div className="text-danger" style={clicableStyle} onClick={() => messages.errorMessageOnly('Mensagem Error Only')}>Mensagem: Error Only</div>
    </UseCase>
  </DocsContainer>
  );