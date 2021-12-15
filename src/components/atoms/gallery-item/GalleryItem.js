import React from 'react';
import styles from './GalleryItem.module.css';

const GalleryItem = ({ src, fullSrc, alt = '', className = '', name, createdAt, imgClickHandler }) => {
    return (
        <li id="item" className={styles.item}>
            <div className={styles['image-wrapper']} onClick={e => imgClickHandler(e, fullSrc)}>
                <img src={src} alt={alt} className={styles.image} />
            </div>
            <div id="description" className={styles.description}>
                <p>created at {createdAt}</p>
                <p>by: {name}</p>
            </div>
        </li>
    );
};

export default GalleryItem;
