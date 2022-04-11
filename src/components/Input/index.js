import React from "react";
import "./style.css";
const Input = ({ placeholder, ...rest }) => <input className="input-field" placeholder={placeholder} {...rest} />;

export default Input;
