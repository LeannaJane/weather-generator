import React from 'react';
import './button.css';

const Button = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
