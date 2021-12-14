import React from 'react';
import styles from './GalleryItem.module.css';

const GalleryItem = ({ src, alt = '', className = '', name, createdAt }) => {
    return (
        <li id="item" className={styles.item}>
            <div className={styles['image-wrapper']}>
                <img src={src} alt={alt} className={styles.image} />
            </div>
            <div id="description" className={styles.description}>
                <p>Created at {createdAt}</p>
                <p>By: {name}</p>
            </div>
        </li>
    );
};

export default GalleryItem;
