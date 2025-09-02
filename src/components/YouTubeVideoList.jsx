import React, { useState, useEffect } from 'react';
import styles from '../pages/Sermons/Layout.module.css'; // 기존 스타일 재활용

const YouTubeVideoList = ({ playlistId, onVideoClick }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/youtube-videos?playlistId=${playlistId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // position을 기준으로 정렬 (백엔드에서 정렬되어 온다고 가정하지만, 혹시 몰라 클라이언트에서도 정렬)
        const sortedVideos = data.sort((a, b) => a.position - b.position);
        setVideos(sortedVideos);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    if (playlistId) {
      fetchVideos();
    }
  }, [playlistId]);

  if (loading) {
    return <div className={styles.loading}>영상을 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className={styles.error}>영상을 불러오는데 실패했습니다: {error.message}</div>;
  }

  return (
    <div className={styles.sermonList}>
      {videos.map((video) => (
        <div 
          key={video.video_id} 
          className={styles.sermonCard} 
          onClick={() => onVideoClick(`https://www.youtube.com/embed/${video.video_id}`)}
        >
          <div className={styles.sermonVideo}>
            <img src={video.thumbnail_url} alt={video.title} />
          </div>
          <div className={styles.sermonInfo}>
            <h3>{video.title}</h3>
            <p><strong>게시일:</strong> {new Date(video.published_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YouTubeVideoList;
