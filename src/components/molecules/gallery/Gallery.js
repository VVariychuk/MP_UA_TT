import React from 'react';
import GalleryItem from '../../atoms/gallery-item';
import styles from './Gallery.module.css';

const Gallery = props => {
    const { remoteData } = props;

    const getModifiedDate = date => {
        return date.split('T')[0].split('-').reverse().join('.');
    };

    return (
        <>
            {remoteData.length > 0 ? (
                <>
                    <ul className={styles.sheet}>
                        {remoteData.map(item => {
                            const { id, urls, alt_description, user, created_at } = item;

                            return (
                                <GalleryItem
                                    key={id}
                                    src={urls.small}
                                    alt={alt_description}
                                    name={user.name}
                                    createdAt={getModifiedDate(created_at)}
                                />
                            );
                        })}
                    </ul>
                </>
            ) : (
                <div />
            )}
        </>
    );
};

export default Gallery;
