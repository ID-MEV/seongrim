import React from 'react';
import './GalleryItem.css'; // We'll create this next

const GalleryItem = ({ image, onClick }) => {
    return (
        <div className="gallery-item" onClick={() => onClick(image)}>
            <img src={image.src} alt={image.alt} className="gallery-image" />
        </div>
    );
};

export default GalleryItem;