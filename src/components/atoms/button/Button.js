import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, className = '', onClickHandler, type = 'button', disabled = false }) => {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClickHandler} type={type} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
