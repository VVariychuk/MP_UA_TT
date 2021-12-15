import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({
    value = '',
    name = 'searchInput',
    onChangeHandler,
    className = '',
    placeholder = '',
    queriesList,
}) => {
    return (
        <>
            <input
                type="text"
                value={value}
                name={name}
                onChange={onChangeHandler}
                className={`${styles.input} ${className}`}
                placeholder={placeholder}
                autoComplete="off"
                list="queries"
            />
            <datalist id="queries">
                {queriesList.map(item => (
                    <option key={item}>{item}</option>
                ))}
            </datalist>
        </>
    );
};

export default SearchInput;
