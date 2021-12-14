/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import withApiService from '../../../hoc/withApiService';
import Gallery from '../gallery';
import SearchForm from '../search-form';
import Button from '../../atoms/button';
import Container from '../container';

import styles from './styles.module.css';

const SearchWrapper = ({ API }) => {
    const [storageName] = useState('queries');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [query, setQuery] = useState('');
    const [isNewQuery, setIsNewQuery] = useState(true);
    const [remoteData, setRemoteData] = useState([]);
    const [lastQueries, setLastQueries] = useState([]);
    const [noMoreContent, setNoMore] = useState(false);

    useEffect(() => {
        setLastQueries(getQueriesList());
    }, [API]);

    const getData = (page, perPage, query) => {
        API.getPhotosBySearchQuery(page, perPage, query)
            .then(res => res.data)
            .then(res => {
                if (!isNewQuery) {
                    setRemoteData(prev => [...prev, ...res.results]);
                } else {
                    setRemoteData(res.results);
                }
                isMoreContent(page, res.total_pages);
            })
            .catch(err => console.log(err));
    };

    function getQueriesList() {
        return JSON.parse(localStorage.getItem(storageName)) || [];
    }

    const setQueriesList = value => {
        const list = getQueriesList();
        if (!list.includes(value) && value) {
            list.push(value);
            setLastQueries(list);
        }
        localStorage.setItem(storageName, JSON.stringify(list));
    };

    const handleQueryChange = e => {
        const { value } = e.target;
        setQuery(value);
        setPage(1);
        setIsNewQuery(true);
    };

    const handleClickSearchButton = e => {
        e.preventDefault();
        getData(page, perPage, query);
        setPage(page + 1);
        if (query) {
            setQueriesList(query);
        }
        setIsNewQuery(false);
    };

    function isMoreContent(page, totalPages) {
        if (page === totalPages) {
            setNoMore(true);
        }
    }

    const loadMoreHandler = e => {
        e.preventDefault();
        setPage(page + 1);
        console.log(page);
        getData(page, perPage, query);
    };

    return (
        <>
            <SearchForm
                value={query}
                text="Click to search"
                onChangeHandler={handleQueryChange}
                onClickHandler={handleClickSearchButton}
                inputStyles={styles.input}
                buttonStyles={styles.button}
                className={styles.wrapper}
                queriesList={lastQueries}
            />
            <Container>
                <Gallery remoteData={remoteData} />
                {remoteData.length > 0 && (
                    <Button
                        text="Load more"
                        onClickHandler={loadMoreHandler}
                        disabled={noMoreContent}
                        className={`${styles.button} ${styles['load-more-button']}`}
                    />
                )}
            </Container>
        </>
    );
};

export default withApiService(SearchWrapper);
