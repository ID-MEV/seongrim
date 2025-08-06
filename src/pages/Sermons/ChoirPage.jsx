import React from 'react';
import styles from './Layout.module.css';

// 가상의 찬양 데이터
const choirPraises = [
  {
    date: '2025-08-03',
    title: '은혜 아니면',
    choir: '시온 찬양대',
    videoUrl: 'https://www.youtube.com/embed/rokA4Z7d-Nw', // Placeholder URL
  },
  {
    date: '2025-07-27',
    title: '주님 말씀하시면',
    choir: '호산나 찬양대',
    videoUrl: 'https://www.youtube.com/embed/rokA4Z7d-Nw',
  },
  {
    date: '2025-07-20',
    title: '하나님의 은혜',
    choir: '시온 찬양대',
    videoUrl: 'https://www.youtube.com/embed/rokA4Z7d-Nw',
  },
  {
    date: '2025-07-13',
    title: '내 영혼이 은총입어',
    choir: '호산나 찬양대',
    videoUrl: 'https://www.youtube.com/embed/rokA4Z7d-Nw',
  },
];

const ChoirPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>주일 찬양대</h1>
      <div className={styles.content}>
        <p>아름다운 목소리로 하나님께 영광 돌리는 찬양대의 찬양을 영상으로 만나보세요.</p>
        
        <div className={styles.sermonList}>
          {choirPraises.map((praise, index) => (
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
                <p><strong>찬양대:</strong> {praise.choir}</p>
                <p><strong>찬양일:</strong> {praise.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoirPage;
