import React from 'react';
import './GallerySkeleton.css'; // We'll create this next

const GallerySkeleton = ({ count = 9 }) => {
    return (
        <>
            {Array.from({ count }).map((_, index) => (
                <div key={index} className="gallery-skeleton-item">
                    <div className="skeleton-thumbnail"></div>
                    <div className="skeleton-text-line"></div>
                </div>
            ))}
        </>
    );
};

export default GallerySkeleton;