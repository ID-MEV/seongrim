import React from 'react';
import './VideoModal.css'; // 모달 스타일을 위한 CSS 파일

const VideoModal = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* 모달 내부 클릭 시 닫히지 않도록 */} 
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <div className="video-container">
          <iframe
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
