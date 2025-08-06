import React from 'react';
import styles from './Layout.module.css';

// 가상의 주보 데이터
const bulletins = [
  {
    date: '2025-08-03',
    title: '2025년 8월 첫째 주 주보',
    imageUrl: 'https://via.placeholder.com/800x1131.png?text=Weekly+Bulletin+1', // Placeholder image
    downloadUrl: '#',
  },
  {
    date: '2025-07-27',
    title: '2025년 7월 넷째 주 주보',
    imageUrl: 'https://via.placeholder.com/800x1131.png?text=Weekly+Bulletin+2',
    downloadUrl: '#',
  },
  {
    date: '2025-07-20',
    title: '2025년 7월 셋째 주 주보',
    imageUrl: 'https://via.placeholder.com/800x1131.png?text=Weekly+Bulletin+3',
    downloadUrl: '#',
  },
];

const BulletinPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>주보 보기</h1>
      <div className={styles.content}>
        <p>지난 주보를 확인하고 다운로드할 수 있습니다.</p>
        
        <div className={styles.bulletinList}>
          {bulletins.map((bulletin, index) => (
            <div key={index} className={styles.bulletinCard}>
              <h3>{bulletin.title}</h3>
              <img src={bulletin.imageUrl} alt={bulletin.title} className={styles.bulletinImage} />
              <a href={bulletin.downloadUrl} download className={styles.downloadButton}>
                PDF 다운로드
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulletinPage;
