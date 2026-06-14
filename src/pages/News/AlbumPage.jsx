import React, { useState, useEffect } from 'react';
import layoutStyles from './Layout.module.css';
import albumStyles from './AlbumPage.module.css';
import { getAlbumImages } from '../../api/wordpress';
import GallerySkeleton from '../../components/GallerySkeleton';

// Fallback image URL when image fails to load
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/600x400.png?text=No+Image';

const AlbumPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAlbumImages(1, 100); // Fetch up to 100 images
        setImages(data.images || []);
      } catch (err) {
        console.error('Failed to load albums:', err);
        setError('사진 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE;
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.substring(0, 10);
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <h1 className={layoutStyles.title}>교회 앨범</h1>
      <div className={layoutStyles.content}>
        <p style={{ marginBottom: '24px', color: 'var(--text-secondary, #6b7280)' }}>
          사진을 통해 성림교회의 행복한 순간들을 함께 나누세요.
        </p>

        {loading ? (
          <div className={albumStyles.albumGrid}>
            <GallerySkeleton count={9} />
          </div>
        ) : error ? (
          <p className={albumStyles.errorText}>{error}</p>
        ) : images.length === 0 ? (
          <p className={albumStyles.noData}>등록된 사진이 없습니다.</p>
        ) : (
          <div className={albumStyles.albumGrid}>
            {images.map((image, index) => (
              <div 
                key={`${image.postId}-${index}`} 
                className={albumStyles.albumCard}
                onClick={() => openLightbox(image)}
              >
                <div className={albumStyles.thumbnailContainer}>
                  <img 
                    src={image.src || PLACEHOLDER_IMAGE} 
                    alt={image.alt || image.postTitle} 
                    className={albumStyles.albumThumbnail}
                    onError={handleImageError}
                  />
                </div>
                <div className={albumStyles.albumInfo}>
                  <h3>{image.postTitle}</h3>
                  <p>{formatDate(image.date)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className={albumStyles.lightboxOverlay} onClick={closeLightbox}>
          <div className={albumStyles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={albumStyles.closeButton} onClick={closeLightbox}>&times;</button>
            <img 
              src={selectedImage.src || PLACEHOLDER_IMAGE} 
              alt={selectedImage.alt || selectedImage.postTitle} 
              className={albumStyles.lightboxImage}
              onError={handleImageError}
            />
            <div className={albumStyles.lightboxTitle}>{selectedImage.postTitle}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
