import React from 'react';
import styles from './ChurchNewsPage.module.css';

// 가상의 교회소식 데이터 (이미지 포함)
const newsItems = [
  {
    id: 1,
    category: '행사',
    title: '창립 50주년 기념 음악회',
    date: '2024-09-01',
    imageUrl: 'https://via.placeholder.com/400x250/FFC107/808080?Text=Concert',
  },
  {
    id: 2,
    category: '선교',
    title: '2024 여름 단기선교 (멕시코)',
    date: '2024-07-20',
    imageUrl: 'https://via.placeholder.com/400x250/28A745/FFFFFF?Text=Mission',
  },
  {
    id: 3,
    category: '교육',
    title: '여름성경학교(VBS) 스케치',
    date: '2024-06-30',
    imageUrl: 'https://via.placeholder.com/400x250/17A2B8/FFFFFF?Text=VBS',
  },
  {
    id: 4,
    category: '행사',
    title: '전교인 봄 야유회',
    date: '2024-05-25',
    imageUrl: 'https://via.placeholder.com/400x250/DC3545/FFFFFF?Text=Picnic',
  },
  {
    id: 5,
    category: '예배',
    title: '부활주일 칸타타',
    date: '2024-03-31',
    imageUrl: 'https://via.placeholder.com/400x250/6F42C1/FFFFFF?Text=Easter',
  },
  {
    id: 6,
    category: '봉사',
    title: '지역사회 클린업 캠페인',
    date: '2024-02-18',
    imageUrl: 'https://via.placeholder.com/400x250/FD7E14/FFFFFF?Text=Service',
  },
];

const ChurchNewsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>교회 소식</h1>
      <p className={styles.introText}>성림교회의 다양한 소식과 행사들을 사진과 함께 만나보세요.</p>
      
      <div className={styles.galleryGrid}>
        {newsItems.map((item) => (
          <div key={item.id} className={styles.galleryCard}>
            <img src={item.imageUrl} alt={item.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <span className={styles.cardCategory}>{item.category}</span>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardDate}>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChurchNewsPage;
