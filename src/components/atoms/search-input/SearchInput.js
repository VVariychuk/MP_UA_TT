import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({ value = '', name = 'searchInput', onChangeHandler, className = '' }) => {
    return <input value={value} name={name} onChange={onChangeHandler} className={`${styles.input} ${className}`} />;
};

export default SearchInput;
