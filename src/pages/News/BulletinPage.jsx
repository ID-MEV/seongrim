import React, { useState } from 'react';
import BulletinList from './Bulletin/BulletinList';
import BulletinViewer from './Bulletin/BulletinViewer';
import styles from './BulletinPage.module.css';

// 가상의 주보 데이터 (PDF 파일 경로 포함)
// PDF 파일은 public 폴더에 저장하거나, 실제 파일 경로로 변경해야 합니다.
const sampleBulletins = [
  {
    id: 1,
    date: '2025-08-03',
    title: '2025년 8월 첫째 주 주보',
    fileUrl: '/bulletins/sample1.pdf', // 예시 PDF 경로
  },
  {
    id: 2,
    date: '2025-07-27',
    title: '2025년 7월 넷째 주 주보',
    fileUrl: '/bulletins/sample2.pdf', // 예시 PDF 경로
  },
  {
    id: 3,
    date: '2025-07-20',
    title: '2025년 7월 셋째 주 주보',
    fileUrl: '/bulletins/sample3.pdf', // 예시 PDF 경로
  },
];

const BulletinPage = () => {
  const [selectedBulletin, setSelectedBulletin] = useState(null);

  const handleSelectBulletin = (bulletin) => {
    setSelectedBulletin(bulletin);
  };

  return (
    <div>
      <h1>주보 보기</h1>
      <div className={styles.bulletinContainer}>
        <div className={styles.viewerContainer}>
          <BulletinViewer bulletin={selectedBulletin} />
        </div>
        <div className={styles.listContainer}>
          <BulletinList bulletins={sampleBulletins} onSelectBulletin={handleSelectBulletin} />
        </div>
      </div>
    </div>
  );
};

export default BulletinPage;
