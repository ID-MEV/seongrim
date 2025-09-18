import React, { useState } from 'react';
import styles from './Layout.module.css';
import YouTubeVideoList from '../../components/YouTubeVideoList';
import VideoModal from '../../components/VideoModal';

const ChoirPage = () => {
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

  // 찬양대 플레이리스트 ID (실제 YouTube 플레이리스트 ID로 교체 필요)
  // TODO: Replace with the actual YouTube playlist ID for Choir
  const choirPlaylistId = 'PLT8iueXeLMByLxAYh26k6UYEDpAVxBIM_'; 

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>주일 찬양대</h1>
      <div className={styles.content}>
        <p>아름다운 목소리로 하나님께 영광 돌리는 찬양대의 찬양을 영상으로 만나보세요.</p>
        
        <YouTubeVideoList 
          playlistId={choirPlaylistId} 
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

export default ChoirPage;
