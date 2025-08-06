import React from 'react';
import styles from './Layout.module.css';

// 가상의 설교 데이터
const sermons = [
  {
    date: '2025-08-03',
    title: '감사로 제사를 드리는 자',
    preacher: '김사랑 담임목사',
    passage: '시편 50:23',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder URL
  },
  {
    date: '2025-07-27',
    title: '네 짐을 여호와께 맡기라',
    preacher: '김사랑 담임목사',
    passage: '시편 55:22',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    date: '2025-07-20',
    title: '광야에서 길을 내시는 하나님',
    preacher: '박은혜 부목사',
    passage: '이사야 43:19',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    date: '2025-07-13',
    title: '믿음의 주요 온전하게 하시는 이',
    preacher: '김사랑 담임목사',
    passage: '히브리서 12:2',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

const SundaySermonPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>주일 설교</h1>
      <div className={styles.content}>
        <p>매주 선포되는 생명의 말씀을 통해 삶의 지혜와 능력을 얻으시길 바랍니다.</p>
        
        <div className={styles.sermonList}>
          {sermons.map((sermon, index) => (
            <div key={index} className={styles.sermonCard}>
              <div className={styles.sermonVideo}>
                <iframe
                  src={sermon.videoUrl}
                  title={sermon.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className={styles.sermonInfo}>
                <h3>{sermon.title}</h3>
                <p><strong>설교자:</strong> {sermon.preacher}</p>
                <p><strong>본문:</strong> {sermon.passage}</p>
                <p><strong>설교일:</strong> {sermon.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SundaySermonPage;
