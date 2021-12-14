import React from 'react';
import styles from './container.module.css';

const Container = ({ children, className = '' }) => (
    <div className={`${styles.container} ${className}`}>{children}</div>
);

export default Container;