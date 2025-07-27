import React from 'react';
import styles from './SermonSection.module.css';
import { FaPlayCircle } from 'react-icons/fa';

const SermonSection = () => {
  const sermons = [
    {
      id: 1,
      title: '참된 평안을 누리는 삶',
      preacher: '홍길동 목사',
      date: '2024년 7월 21일',
      scripture: '요한복음 14:27',
      thumbnail: 'https://images.unsplash.com/photo-1593696559764-261649c44316?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      title: '믿음의 경주를 완주하라',
      preacher: '홍길동 목사',
      date: '2024년 7월 14일',
      scripture: '디모데후서 4:7',
      thumbnail: 'https://images.unsplash.com/photo-1604162743941-4458fac61f1c?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 3,
      title: '세상의 빛과 소금',
      preacher: '김철수 부목사',
      date: '2024년 7월 7일',
      scripture: '마태복음 5:13-16',
      thumbnail: 'https://images.unsplash.com/photo-1508427953056-b6b0de8d2333?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <section className={styles.sermonSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>최신 설교 말씀</h2>
        <div className={styles.sermonGrid}>
          {sermons.map(sermon => (
            <div key={sermon.id} className={styles.sermonCard}>
              <div className={styles.thumbnail}>
                <img src={sermon.thumbnail} alt={sermon.title} />
                <div className={styles.overlay}>
                  <FaPlayCircle className={styles.playIcon} />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.sermonTitle}>{sermon.title}</h3>
                <p className={styles.sermonInfo}>{sermon.preacher} | {sermon.date}</p>
                <p className={styles.sermonScripture}>{sermon.scripture}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.moreButtonContainer}>
          <button className={styles.moreButton}>설교 전체보기</button>
        </div>
      </div>
    </section>
  );
};

export default SermonSection;
