import React, { useState } from 'react';
import styles from './Layout.module.css';
import YouTubeVideoList from '../../components/YouTubeVideoList';
import VideoModal from '../../components/VideoModal';

const DawnSermonPage = () => {
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

  // 새벽예배 플레이리스트 ID (실제 YouTube 플레이리스트 ID로 교체 필요)
  // TODO: Replace with the actual YouTube playlist ID for Dawn Sermons
  const dawnSermonPlaylistId = 'PLT8iueXeLMBy2HecKYjB845XVqzGALnf8'; 

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>새벽예배</h1>
      <div className={styles.content}>
        <p>매주 선포되는 생명의 말씀을 통해 삶의 지혜와 능력을 얻으시길 바랍니다.</p>
        
        <YouTubeVideoList 
          playlistId={dawnSermonPlaylistId} 
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

export default DawnSermonPage;