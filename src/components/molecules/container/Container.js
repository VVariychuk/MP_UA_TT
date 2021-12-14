import React from 'react';
import styles from './container.module.css';

const Container = ({ children, className = '' }) => (
    <main className={`${styles.container} ${className}`}>{children}</main>
);

export default Container;
