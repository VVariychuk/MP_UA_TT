/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import withApiService from '../../../hoc/withApiService';
import Gallery from '../gallery';
import SearchForm from '../search-form';
import Button from '../../atoms/button';
import Container from '../container';
import Modal from '../modal/Modal';
import MyLoader from '../../atoms/loader';

import styles from './styles.module.css';

const SearchWrapper = ({ API }) => {
    const [width, height] = useWindowSize();
    const [storageName] = useState('queries');
    const [page, setPage] = useState(1);
    const [perPage] = useState(16);
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isNewQuery, setIsNewQuery] = useState(true);
    const [remoteData, setRemoteData] = useState([]);
    const [lastQueries, setLastQueries] = useState([]);
    const [noMoreContent, setNoMore] = useState(false);
    const [currentPicture, setCurrentPicture] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isNoContent, setIsNoContent] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [emptyImagesListMessage, setEILM] = useState('We are glad to see you!');

    useEffect(() => {
        setLastQueries(getLast_5_Queries(getQueriesList()));
    }, [API]);

    const getData = (page, perPage, query) => {
        const orientation = width >= 768 ? 'landscape' : 'portrait';

        setShowLoader(true);
        API.getPhotosBySearchQuery(page, perPage, query, orientation)
            .then(res => res.data)
            .then(res => {
                if (res.results.length === 0) {
                    setEILM('No content for this query');
                    return setIsNoContent(true);
                }
                if (!isNewQuery) {
                    setRemoteData(prev => [...prev, ...res.results]);
                } else {
                    setRemoteData(res.results);
                }
                setIsNoContent(false);
                isMoreContent(page, res.total_pages);
                setInputValue('');
            })
            .then(() =>
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                }),
            )
            .finally(() => setShowLoader(false));
    };

    function getLast_5_Queries(arr) {
        return arr.slice(-5).reverse();
    }

    function getQueriesList() {
        return JSON.parse(localStorage.getItem(storageName)) || [];
    }

    const setQueriesList = value => {
        const list = getQueriesList();
        if (!list.includes(value) && value) {
            list.push(value);
            setLastQueries(getLast_5_Queries(list));
        }
        localStorage.setItem(storageName, JSON.stringify(list));
    };

    const handleQueryChange = e => {
        const { value } = e.target;
        setQuery(value);
        setInputValue(value);
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
            return setNoMore(true);
        }
        return setNoMore(false);
    }

    const loadMoreHandler = e => {
        e.preventDefault();
        setPage(page + 1);
        getData(page, perPage, query);
    };

    const toggleModal = () => {
        if (currentPicture) {
            setCurrentPicture('');
        }
        setIsOpenModal(!isOpenModal);
    };

    const onImgClick = (e, src) => {
        if (e.target.nodeName !== 'IMG') {
            return;
        }

        setCurrentPicture(src);
        toggleModal();
        setShowLoader(true);
    };

    return (
        <>
            <SearchForm
                value={inputValue}
                text="Click to search"
                onChangeHandler={handleQueryChange}
                onClickHandler={handleClickSearchButton}
                inputStyles={styles.input}
                buttonStyles={styles.button}
                className={styles.wrapper}
                queriesList={lastQueries}
                disabledBtn={inputValue ? false : true}
            />
            <Container>
                {!isNoContent ? (
                    <>
                        <Gallery remoteData={remoteData} imgClickHandler={onImgClick} size={{ width, height }} />
                        {remoteData.length > 0 && (
                            <Button
                                text="Load more"
                                onClickHandler={loadMoreHandler}
                                disabled={noMoreContent}
                                className={`${styles.button} ${styles['load-more-button']}`}
                            />
                        )}
                    </>
                ) : (
                    <div>
                        <h1 className={styles.message}>{emptyImagesListMessage}</h1>
                    </div>
                )}
            </Container>
            {isOpenModal && (
                <Modal onClose={toggleModal}>
                    {showLoader && <MyLoader />}
                    <img src={currentPicture} alt="Big variant" onLoad={() => setShowLoader(false)} />
                </Modal>
            )}
        </>
    );
};

export default withApiService(SearchWrapper);
