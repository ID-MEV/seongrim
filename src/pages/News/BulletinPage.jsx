import React from 'react';
import styles from './Bulletin.module.css';
import layoutStyles from './Layout.module.css';

// 가상의 주보 데이터
const weeklyBulletin = {
  title: '2025년 8월 3일 첫째 주',
  images: [
    'https://www.youngnak.net/wp-content/uploads/2025/07/2025_08_03_1.jpg',
    'https://www.youngnak.net/wp-content/uploads/2025/07/2025_08_03_2.jpg',
  ],
};

const bulletinHistory = [
  { id: 844, title: '2025년 8월 3일 첫째 주', link: '#' },
  { id: 843, title: '2025년 7월 27일 넷째 주', link: '#' },
  { id: 842, title: '2025년 7월 20일 셋째 주', link: '#' },
  { id: 841, title: '2025년 7월 13일 둘째 주', link: '#' },
  { id: 840, title: '2025년 7월 6일 첫째 주', link: '#' },
  { id: 839, title: '2025년 6월 29일 다섯째 주', link: '#' },
  { id: 838, title: '2025년 6월 22일 넷째 주', link: '#' },
  { id: 837, title: '2025년 6월 15일 셋째 주', link: '#' },
  { id: 836, title: '2025년 6월 8일 둘째 주', link: '#' },
  { id: 835, title: '2025년 6월 1일 첫째 주', link: '#' },
];

const years = ['전체', '2025', '2024', '2023', '2022', '2021', '2020'];

const BulletinPage = () => {
  return (
    <div className={layoutStyles.pageContainer}>
      <h1 className={layoutStyles.title}>교회 주보</h1>
      <div className={styles.bulletinLayout}>
        {/* Left Section: Image Viewer */}
        <div className={styles.imageViewer}>
          <div className={styles.viewerHeader}>
            <span className={styles.viewerIcon}></span>
            <p>
              이 주의 주보 <br />
              {weeklyBulletin.title}
            </p>
          </div>
          <div className={styles.imageContainer}>
            {weeklyBulletin.images.map((img, index) => (
              <a href={img} key={index} target="_blank" rel="noopener noreferrer">
                <img src={img} alt={`주보 이미지 ${index + 1}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Section: Bulletin List */}
        <div className={styles.listSection}>
          <div className={styles.yearFilter}>
            {years.map((year) => (
              <a href="#" key={year}>
                {year}
              </a>
            ))}
          </div>
          <table className={styles.bulletinTable}>
            <thead>
              <tr>
                <th className={styles.thNumber}>번호</th>
                <th className={styles.thTitle}>제목</th>
              </tr>
            </thead>
            <tbody>
              {bulletinHistory.map((bulletin) => (
                <tr key={bulletin.id}>
                  <td>{bulletin.id}</td>
                  <td className={styles.tdTitle}>
                    <a href={bulletin.link}>{bulletin.title}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BulletinPage;
