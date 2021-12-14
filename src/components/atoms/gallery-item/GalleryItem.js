import React from 'react';
import styles from './GalleryItem.module.css';

const GalleryItem = ({ src, alt = '', className = '' }) => {
    return (
        <li>
            <div className={styles['image-wrapper']}>
                <img src={src} alt={alt} className={styles.image} />
            </div>
        </li>
    );
};

export default GalleryItem;
