import React, { useState, useEffect, useCallback, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { getAlbumImages } from '../../api/wordpress';
import GalleryItem from '../../components/GalleryItem';
import GallerySkeleton from '../../components/GallerySkeleton';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Default styles
import styles from './AlbumPage.module.css';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const AlbumPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const loader = useRef(null);
    const [openLightbox, setOpenLightbox] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchImages = useCallback(async () => {
        if (page > totalPages && totalPages !== 1) return;
        setLoading(true);
        setError(null);
        try {
            const { images: newImages, totalPages: newTotalPages } = await getAlbumImages(page);
            setImages(prevImages => [...prevImages, ...newImages]);
            setTotalPages(newTotalPages);
        } catch (err) {
            setError('앨범 이미지를 불러오는 데 실패했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, totalPages]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        };

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && page <= totalPages) {
                setPage(prevPage => prevPage + 1);
            }
        }, options);

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loading, page, totalPages]);

    const handleImageClick = (image) => {
        const index = images.findIndex(img => img.src === image.src);
        setCurrentImageIndex(index);
        setOpenLightbox(true);
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    const slides = images.map(image => ({ src: image.src, alt: image.alt }));

    return (
        <div className={styles.albumPageContainer}>
            <h1 className={styles.title}>앨범</h1>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {images.map((image, index) => (
                    <GalleryItem key={index} image={image} onClick={handleImageClick} />
                ))}
            </Masonry>
            {loading && <GallerySkeleton count={breakpointColumnsObj.default} />} 
            {page <= totalPages && !loading && <div ref={loader} className={styles.loader}>로딩 중...</div>}
            {page > totalPages && !loading && images.length > 0 && <div className={styles.endOfContent}>모든 이미지를 불러왔습니다.</div>}
            {images.length === 0 && !loading && !error && <div className={styles.noImages}>앨범 이미지가 없습니다.</div>}

            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                slides={slides}
                index={currentImageIndex}
            />
        </div>
    );
};

export default AlbumPage;