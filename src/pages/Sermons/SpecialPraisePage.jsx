import React from 'react';
import styles from './Layout.module.css';

// 가상의 특별찬양 데이터
const specialPraises = [
  {
    date: '2025-08-03',
    title: '나를 통하여',
    praiser: '김믿음 형제',
    videoUrl: 'https://www.youtube.com/embed/ABr4aJ_4xGg', // Placeholder URL
  },
  {
    date: '2025-07-27',
    title: '주 은혜임을',
    praiser: '청년부 일동',
    videoUrl: 'https://www.youtube.com/embed/ABr4aJ_4xGg',
  },
  {
    date: '2025-07-20',
    title: '사명',
    praiser: '박소망 자매',
    videoUrl: 'https://www.youtube.com/embed/ABr4aJ_4xGg',
  },
  {
    date: '2025-07-13',
    title: 'You Raise Me Up',
    praiser: '이사랑, 최온유 듀엣',
    videoUrl: 'https://www.youtube.com/embed/ABr4aJ_4xGg',
  },
];

const SpecialPraisePage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>특별 찬양</h1>
      <div className={styles.content}>
        <p>성도님들의 진실한 고백이 담긴 특별 찬양을 통해 함께 은혜를 나누기 원합니다.</p>
        
        <div className={styles.sermonList}>
          {specialPraises.map((praise, index) => (
            <div key={index} className={styles.sermonCard}>
              <div className={styles.sermonVideo}>
                <iframe
                  src={praise.videoUrl}
                  title={praise.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className={styles.sermonInfo}>
                <h3>{praise.title}</h3>
                <p><strong>찬양:</strong> {praise.praiser}</p>
                <p><strong>봉헌일:</strong> {praise.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialPraisePage;
