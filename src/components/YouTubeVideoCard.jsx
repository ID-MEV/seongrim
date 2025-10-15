import React from 'react';
import './YouTubeVideoCard.css';

const YouTubeVideoCard = ({ video, onClick }) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${video.url.split('v=')[1]}/mqdefault.jpg`;

    // Function to parse sermon title from the full YouTube video title
    const parseVideoTitle = (fullTitle) => {
        const parts = fullTitle.split(' | ').map(part => part.trim());
        // Expected format: "YYYY-MM-DD | Sermon Type | Sermon Title | Preacher Name | Church Name"
        // Or sometimes: "Sermon Title | Preacher Name | YYYY-MM-DD"
        // Let's try to be flexible.

        let date = '';
        let sermonType = '';
        let sermonTitle = '';
        let preacher = '';

        // Attempt to find date (YYYY-MM-DD)
        const dateRegex = /\d{4}-\d{2}-\d{2}/;
        const datePart = parts.find(part => dateRegex.test(part));
        if (datePart) {
            date = datePart;
            // Remove date part from array for further processing
            const dateIndex = parts.indexOf(datePart);
            if (dateIndex > -1) parts.splice(dateIndex, 1);
        }

        // Assuming remaining parts are Sermon Type, Sermon Title, Preacher Name
        // This might need adjustment based on actual title patterns
        if (parts.length >= 3) {
            sermonType = parts[0] || '';
            sermonTitle = parts[1] || '';
            preacher = parts[2] || '';
        } else if (parts.length === 2) {
            // If only two parts, assume Sermon Title and Preacher
            sermonTitle = parts[0] || '';
            preacher = parts[1] || '';
        } else if (parts.length === 1) {
            sermonTitle = parts[0] || '';
        }

        // Fallback if parsing is not successful or title is simple
        if (!sermonTitle && fullTitle) {
            sermonTitle = fullTitle;
        }

        return { date, sermonType, sermonTitle, preacher };
    };

    const { date, sermonType, sermonTitle, preacher } = parseVideoTitle(video.title);

    return (
        <div className="youtube-video-card" onClick={() => onClick(video.url)}>
            <div className="video-thumbnail-container">
                <img src={thumbnailUrl} alt={sermonTitle} className="video-thumbnail" />
            </div>
            <div className="video-info">
                <h3 className="video-title">{sermonTitle}</h3>
                <p className="video-meta">{preacher && `${preacher}`} {date && `| ${date}`}</p>
            </div>
        </div>
    );
};

export default YouTubeVideoCard;