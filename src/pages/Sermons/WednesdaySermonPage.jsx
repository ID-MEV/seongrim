import React, { useState } from 'react';
import styles from './Layout.module.css';
import YouTubeVideoList from '../../components/YouTubeVideoList';
import VideoModal from '../../components/VideoModal';

const WednesdaySermonPage = () => {
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

  // 수요예배 플레이리스트 ID (실제 YouTube 플레이리스트 ID로 교체 필요)
  // TODO: Replace with the actual YouTube playlist ID for Wednesday Sermons
  const wednesdaySermonPlaylistId = 'PLT8iueXeLMBwMY83K0E5w9jvqEsoQH2fW'; 

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>수요예배</h1>
      <div className={styles.content}>
        <p>매주 선포되는 생명의 말씀을 통해 삶의 지혜와 능력을 얻으시길 바랍니다.</p>
        
        <YouTubeVideoList 
          playlistId={wednesdaySermonPlaylistId} 
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

export default WednesdaySermonPage;