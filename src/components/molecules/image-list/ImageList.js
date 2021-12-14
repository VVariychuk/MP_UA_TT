import React, { useEffect, useState } from 'react';
import withApiService from '../../../hoc/withApiService';
import Container from '../container/Container';
import GalleryItem from '../../atoms/gallery-item';
import styles from './ImageList.module.css';

const ImageList = props => {
    const { API } = props;
    console.log(props);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [remoteData, setRemoteData] = useState([]);

    useEffect(() => {
        API.getPhotosBySearchQuery(page, perPage, 'dog')
            .then(res => res.data)
            .then(res => setRemoteData(prev => [...prev, ...res.results]))
            .catch(err => console.log(err));
        API.getRandom();
    }, [API, page, perPage]);

    return (
        <Container>
            {remoteData.length > 0 ? (
                <ul className={styles.sheet}>
                    {remoteData.map(item => (
                        <GalleryItem key={item.id} src={item.urls.small} alt={item.alt_description} />
                    ))}
                </ul>
            ) : (
                <div />
            )}
        </Container>
    );
};

export default withApiService(ImageList);
