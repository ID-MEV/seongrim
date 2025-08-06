import React from 'react';
import styles from './Layout.module.css';

// 가상의 교회소식 데이터
const newsItems = [
  {
    id: 1,
    category: '알림',
    title: '2025년 여름 단기선교 참가자 모집',
    date: '2025-07-20',
  },
  {
    id: 2,
    category: '행사',
    title: '전교인 체육대회 안내 (9/28)',
    date: '2025-07-18',
  },
  {
    id: 3,
    category: '모집',
    title: '시온 찬양대 신규 대원 모집',
    date: '2025-07-15',
  },
  {
    id: 4,
    category: '알림',
    title: '새가족 교육 3기 수료식 안내',
    date: '2025-07-10',
  },
  {
    id: 5,
    category: '감사',
    title: '창립 15주년 기념 부흥회에 참여해주셔서 감사합니다.',
    date: '2025-07-05',
  },
];

const ChurchNewsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>교회 소식</h1>
      <div className={styles.content}>
        <p>성림교회의 다양한 소식을 알려드립니다.</p>
        
        <table className={styles.newsTable}>
          <thead>
            <tr>
              <th>번호</th>
              <th>분류</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {newsItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td className={styles.newsTitle}>{item.title}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChurchNewsPage;
