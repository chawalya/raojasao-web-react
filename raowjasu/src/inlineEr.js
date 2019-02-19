import React from 'react';
import PropTypes from 'prop-types';
import errorpic from './img/errorIcon.png';
const InlineError = ({ text }) => 
<span style={{marginLeft: "5%"}}>  
<img style={{width:'20px',height:'20px'}} 
src={errorpic} alt="error icon" ></img>
<span style={{ color: '#ff0000',marginLeft: "3%", fontWeight: 'bold'}}>{ text }</span></span>;

InlineError.propTypes = {
 text: PropTypes.string.isRequired,
};
export default InlineError;