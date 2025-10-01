import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SermonSection.module.css';
import { FaPlayCircle } from 'react-icons/fa';
import { getLatestSermons } from '../../api/sermonApi';
import VideoModal from '../../components/VideoModal';

const SermonSection = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleVideoClick = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl('');
  };

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setLoading(true);
        const data = await getLatestSermons();
        setSermons(data);
      } catch (err) {
        setError('Failed to fetch sermons.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  if (loading) {
    return (
      <section className={styles.sermonSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>최신 설교 말씀</h2>
          <p>설교 영상을 불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.sermonSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>최신 설교 말씀</h2>
          <p className={styles.errorText}>{error}</p>
        </div>
      </section>
    );
  }

  // Function to parse sermon title
  const parseSermonTitle = (fullTitle) => {
    const parts = fullTitle.split(' | ').map(part => part.trim());
    // Expected format: "YYYY-MM-DD | Sermon Type | Sermon Title | Preacher Name | Church Name"
    const date = parts[0] || '';
    const sermonType = parts[1] || '';
    const sermonTitle = parts[2] || '';
    const preacher = parts[3] || '';

    return { date, sermonType, sermonTitle, preacher };
  };

  return (
    <section className={styles.sermonSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>최신 설교 말씀</h2>
        <div className={styles.sermonGrid}>
          {sermons.map(sermon => {
            const { date, sermonType, sermonTitle, preacher } = parseSermonTitle(sermon.title);
            return (
              <div 
                key={sermon.videoId} 
                className={styles.sermonCard}
                onClick={() => handleVideoClick(sermon.url)}
                role="button"
                tabIndex="0"
              >
                <div className={styles.thumbnail}>
                  <img src={sermon.thumbnail} alt={sermonTitle} />
                  <div className={styles.overlay}>
                    <FaPlayCircle className={styles.playIcon} />
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.sermonTitle}>{sermonTitle}</h3>
                  <p className={styles.sermonInfo}>{preacher} | {date}</p>
                  <p className={styles.sermonType}>{sermonType}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.moreButtonContainer}>
          <button className={styles.moreButton} onClick={() => navigate('/sermons/sunday')}>설교 전체보기</button>
        </div>
      </div>
      <VideoModal 
        isOpen={isModalOpen} 
        videoUrl={currentVideoUrl} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};

export default SermonSection;
