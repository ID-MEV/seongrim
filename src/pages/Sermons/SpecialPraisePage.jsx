import React, { useState } from 'react';
import styles from './Layout.module.css';
import YouTubeVideoList from '../../components/YouTubeVideoList';
import VideoModal from '../../components/VideoModal';

const SpecialPraisePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const handleVideoClick = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl('');
  };

  // 특별찬양 플레이리스트 ID (실제 YouTube 플레이리스트 ID로 교체 필요)
  // TODO: Replace with the actual YouTube playlist ID for Special Praise
  const specialPraisePlaylistId = 'PLT8iueXeLMBxWIEt_AngzLaYso2pd7w9v'; 

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>특별 찬양</h1>
      <div className={styles.content}>
        <p>성도님들의 진실한 고백이 담긴 특별 찬양을 통해 함께 은혜를 나누기 원합니다.</p>
        
        <YouTubeVideoList 
          playlistId={specialPraisePlaylistId} 
          onVideoClick={handleVideoClick} 
        />
      </div>
      <VideoModal 
        isOpen={isModalOpen} 
        videoUrl={currentVideoUrl} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default SpecialPraisePage;
