/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
    useEffect(() => {
        window.addEventListener('keydown', onEscHandler);

        return () => window.removeEventListener('keydown', onEscHandler);
    }, []);

    function onEscHandler(e) {
        if (e.code === 'Escape') {
            onClose();
        }
    }

    const onBdpClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={styles.overlay} onClick={onBdpClick}>
            <div className={styles['modal-window']}>{children}</div>
        </div>,
        modalRoot,
    );
};

export default Modal;
