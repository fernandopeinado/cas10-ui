import React from 'react';
import PropTypes from 'prop-types';
import Markdown from './Markdown';

/**
 * Representa um caso de uso da componente.
 */
function UseCase(props) {
  console.log(props.description);
  return (
    <div>
      <h3>{props.title}</h3>
      {props.description && <Markdown content={props.description} style={{padding: "10px 0px 10px 0px"}} />}
      <div style={{padding: "10px 0px 10px 0px"}}>
        {props.children}
      </div>
    </div>
  );
}

UseCase.propTypes = {
  /**
   * Titulo do caso de uso
   */
  title: PropTypes.string,
  /**
   * Descrição do caso de uso, normalmente um markdown contendo um exemplo de como usar em JSX
   */
  description: PropTypes.string
};

UseCase.defaultProps = {
  title: "Use Case",
  description: ""
};

export default UseCase;