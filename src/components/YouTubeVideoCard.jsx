import React from 'react';
import './YouTubeVideoCard.css'; // We'll create this next

const YouTubeVideoCard = ({ video, onClick }) => {
    // Assuming 'video' object has title, url, and a thumbnail property (e.g., thumbnailUrl)
    // The backend API currently returns only title and url.
    // We might need to adjust the backend or assume a default thumbnail for now.
    // For now, let's assume video object has 'title' and 'url'.
    // If thumbnail is not available, we can use a placeholder.

    const thumbnailUrl = `https://img.youtube.com/vi/${video.url.split('v=')[1]}/mqdefault.jpg`; // Extract video ID from URL

    return (
        <div className="youtube-video-card" onClick={() => onClick(video.url)}>
            <div className="video-thumbnail-container">
                <img src={thumbnailUrl} alt={video.title} className="video-thumbnail" />
                {/* Duration could be added here if available in video object */}
            </div>
            <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                {/* <p className="video-duration">{video.duration}</p> */}
            </div>
        </div>
    );
};

export default YouTubeVideoCard;