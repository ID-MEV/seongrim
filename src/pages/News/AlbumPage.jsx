import React from 'react';
import styles from './Layout.module.css';

// 가상의 앨범 데이터
const albums = [
  {
    id: 1,
    title: '2024년 성탄절 칸타타',
    thumbnail: 'https://via.placeholder.com/300x200.png?text=Christmas+Cantata',
    imageCount: 15,
  },
  {
    id: 2,
    title: '2024년 가을 전교인 체육대회',
    thumbnail: 'https://via.placeholder.com/300x200.png?text=Sports+Day',
    imageCount: 25,
  },
  {
    id: 3,
    title: '2024년 여름성경학교',
    thumbnail: 'https://via.placeholder.com/300x200.png?text=VBS+2024',
    imageCount: 30,
  },
  {
    id: 4,
    title: '2024년 창립기념주일',
    thumbnail: 'https://via.placeholder.com/300x200.png?text=Anniversary',
    imageCount: 10,
  },
  {
    id: 5,
    title: '2023년 동남아 단기선교',
    thumbnail: 'https://via.placeholder.com/300x200.png?text=Mission+Trip',
    imageCount: 40,
  },
  {
    id: 6,
    title: '2023년 추수감사주일',
    thumbnail: 'https://via.placeholder.com/300x200.png?text=Thanksgiving',
    imageCount: 12,
  },
];

const AlbumPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>교회 앨범</h1>
      <div className={styles.content}>
        <p>사진을 통해 성림교회의 행복한 순간들을 함께 나누세요.</p>
        
        <div className={styles.albumGrid}>
          {albums.map((album) => (
            <div key={album.id} className={styles.albumCard}>
              <img src={album.thumbnail} alt={album.title} className={styles.albumThumbnail} />
              <div className={styles.albumInfo}>
                <h3>{album.title}</h3>
                <p>{album.imageCount} photos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
