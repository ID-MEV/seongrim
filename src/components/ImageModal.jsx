import React from 'react';
import './ImageModal.css';

const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content image-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>X</button>
                <img src={imageUrl} alt="Bulletin Image" className="modal-image" />
            </div>
        </div>
    );
};

export default ImageModal;