import React from 'react';
import styles from './GalleryItem.module.css';

const GalleryItem = ({ src, fullSrc, alt = '', className = '', name, createdAt, imgClickHandler }) => {
    return (
        <li id="item" className={styles.item}>
            <div id="imageWrapper" className={styles['image-wrapper']} onClick={e => imgClickHandler(e, fullSrc)}>
                <img src={src} alt={alt} className={styles.image} />
                <div id="description" className={styles.description}>
                    <span>created at: {createdAt}</span>
                    <span>by: {name}</span>
                </div>
            </div>
        </li>
    );
};

export default GalleryItem;
