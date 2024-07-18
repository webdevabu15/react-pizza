import React from 'react'
import './Button.scss'
import PropTypes from 'prop-types';
const Button = ({text, click, count}) => {
  return (
    <button onClick={click}>
       {text} <span className={`${count >= 1 ? 'count' : ''}`}>{count >= 1?count:''}</span>
    </button>
  )
}


Button.propTypes = {
  text: PropTypes.node.isRequired,
  click: PropTypes.node.isRequired,
  count: PropTypes.node.isRequired,
};

export default Button