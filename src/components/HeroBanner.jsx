import React from 'react';
import './HeroBanner.css';

/**
 * 공용 히어로 배너 컴포넌트
 * 각 서브 페이지 상단에 공통으로 사용될 UI 컴포넌트입니다.
 * @param {object} props - 컴포넌트 props
 * @param {string} props.imageUrl - 배경 이미지 URL
 * @param {string} props.title - 페이지 제목
 */
const HeroBanner = ({ imageUrl, title }) => {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="hero-banner-overlay"></div>
      <h1 className="hero-banner-title">{title}</h1>
    </div>
  );
};

export default HeroBanner;
