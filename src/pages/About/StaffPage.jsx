import React from 'react';
import styles from './Layout.module.css';

// 가상의 이미지 URL
const pastorImage = 'https://via.placeholder.com/150';

const staffMembers = [
  {
    role: '담임목사',
    name: '김사랑',
    image: pastorImage,
    details: '교회 전체 사역 총괄',
  },
  {
    role: '행정/청년부 담당목사',
    name: '박은혜',
    image: pastorImage,
    details: '교회 행정 및 청년부 담당',
  },
  {
    role: '교육부 담당 전도사',
    name: '이믿음',
    image: pastorImage,
    details: '주일학교(영유아부, 초등부, 중고등부) 담당',
  },
  {
    role: '시무장로',
    name: '최충성',
    image: pastorImage,
    details: '예배 및 선교 위원회',
  },
  {
    role: '시무장로',
    name: '정온유',
    image: pastorImage,
    details: '재정 및 관리 위원회',
  },
  {
    role: '찬양대 지휘자',
    name: '김하모니',
    image: pastorImage,
    details: '주일 예배 찬양대 지휘',
  },
  {
    role: '사무간사',
    name: '박성실',
    image: pastorImage,
    details: '교회 행정 및 재정 담당',
  },
];

const StaffPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>섬기는 사람들</h1>
      <div className={styles.content}>
        <p>성림교회는 성도들을 사랑으로 섬기는 교역자들과 직분자들이 함께 동역하고 있습니다.</p>
        
        <div className={styles.staffGrid}>
          {staffMembers.map((staff, index) => (
            <div key={index} className={styles.staffCard}>
              <img src={staff.image} alt={`${staff.name} ${staff.role}`} className={styles.staffImage} />
              <div className={styles.staffInfo}>
                <h3>{staff.role}</h3>
                <p>{staff.name}</p>
                <p className={styles.staffDetails}>{staff.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
