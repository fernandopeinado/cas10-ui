import './Spinner.css'

import React from 'react'

function Spinner(props) {
    const diameter = props.diameter ? props.diameter : "65px"
    return (
        <svg className="spinner" width={diameter} height={diameter} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
    )
}

export default Spinner;