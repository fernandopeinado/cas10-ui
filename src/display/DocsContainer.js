import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import PropTypes from 'prop-types';

import Markdown from './Markdown';
import PropsContainer from './PropsContainer';
import MethodsContainer from './MethodsContainer';

/**
 * Container de documentação.
 * 
 * Propriedades: 
 * - docs: um json com os dados extraidos pelo react-docgen
 * - children: o conteudo da documentação (UseCases)
 * 
 * Uso básico:
 * ~~~js
 * <DocsContainer docs={docs}>
 *    <UseCase>1</UseCase>
 *    <UseCase>2</UseCase>
 * </DocsContainer>
 * ~~~
 */
function DocsContainer(props) {
  var meta = props.docs;
  if (meta) {
    return (
      <div style={{padding:"10px"}}>
        <h1>{meta.displayName}</h1>
        <hr/>
        <Markdown content={meta.description} />
        {meta.props && <PropsContainer props={meta.props} />}
        {meta.methods && <MethodsContainer methods={meta.methods} />}
        <hr />
        {props.children && (
          <React.Fragment>
            <h2>Exemplos e Usos</h2>
            {props.children}
          </React.Fragment>
        )}
      </div>
    );
  }
  return (
    <div style={{padding:"10px"}}>
      <h2>Exemplos e Usos</h2>
      {props.children}
    </div>
  );
}

DocsContainer.propTypes = {
  /**
   * Objeto contendo a documentação gerada pelo react-docgen
   */
  docs: PropTypes.object
}

export default DocsContainer;