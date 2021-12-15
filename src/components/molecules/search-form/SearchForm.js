import React from 'react';
import SearchInput from '../../atoms/search-input';
import Button from '../../atoms/button';
import styles from './SearchForm.module.css';

const SearchForm = ({
    text,
    onClickHandler,
    value,
    onChangeHandler,
    buttonStyles = '',
    inputStyles = '',
    className,
    queriesList = [],
    disabledBtn,
}) => {
    return (
        <header>
            <form className={`${styles['search-form']} ${className}`} onSubmit={onClickHandler}>
                <SearchInput
                    placeholder="Type your query here please"
                    value={value}
                    onChangeHandler={onChangeHandler}
                    className={inputStyles}
                    queriesList={queriesList}
                />
                <Button text={text} onClickHandler={onClickHandler} className={buttonStyles} disabled={disabledBtn} />
            </form>
        </header>
    );
};

export default SearchForm;
