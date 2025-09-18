import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoModal from './VideoModal'; // 모달 컴포넌트 import
import YouTubeVideoCard from './YouTubeVideoCard'; // 영상 카드 컴포넌트 import

const YouTubeVideoList = ({ playlistId }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null); // 선택된 영상 URL 상태

    useEffect(() => {
        if (!playlistId) return;

        const fetchVideos = async () => {
            try {
                setLoading(true);
                setError(null);
                // API 주소를 실제 운영 주소로 변경해야 할 수 있습니다.
                const response = await axios.get(`${import.meta.env.VITE_YOUTUBE_API_BASE_URL}/api/youtube-videos?playlistId=${playlistId}`);
                setVideos(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError('영상 목록을 불러오는 데 실패했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [playlistId]);

    const handleVideoClick = (url) => {
        setSelectedVideoUrl(url);
    };

    const handleCloseModal = () => {
        setSelectedVideoUrl(null);
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (videos.length === 0) {
        return <div>영상이 없습니다.</div>;
    }

    return (
        <>
            <div className="video-list-container">
                <div className="video-cards-grid">
                    {videos.map((video, index) => (
                        <YouTubeVideoCard key={index} video={video} onClick={handleVideoClick} />
                    ))}
                </div>
            </div>
            <VideoModal videoUrl={selectedVideoUrl} onClose={handleCloseModal} />
        </>
    );
};

export default YouTubeVideoList;