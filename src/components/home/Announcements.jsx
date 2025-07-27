import React from 'react';
import styles from './Announcements.module.css';
import { FaBullhorn, FaPlus } from 'react-icons/fa';

const Announcements = () => {
  const announcements = [
    { id: 1, title: '다음 주일은 전교인 야외예배로 드립니다.', date: '2024-07-22' },
    { id: 2, title: '청년부 여름 수련회 참가 신청 안내', date: '2024-07-20' },
    { id: 3, title: '새가족반 3기 교육이 시작됩니다.', date: '2024-07-19' },
    { id: 4, title: '성경통독 챌린지 시상 안내', date: '2024-07-18' },
  ];

  const weeklyReport = {
    title: '지난 주 주보 보기',
    date: '2024년 7월 21일 (제29권 29호)',
    link: '#'
  };

  return (
    <section className={styles.announcementsSection}>
      <div className={styles.container}>
        <div className={styles.announcements}>
          <h3 className={styles.title}><FaBullhorn /> 교회소식</h3>
          <ul className={styles.list}>
            {announcements.map(item => (
              <li key={item.id}>
                <a href="#">{item.title}</a>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
          <a href="#" className={styles.moreLink}><FaPlus /> 더보기</a>
        </div>
        <div className={styles.weeklyReport}>
          <h3 className={styles.title}>주보 보기</h3>
          <div className={styles.reportBox}>
            <p>{weeklyReport.title}</p>
            <span>{weeklyReport.date}</span>
            <a href={weeklyReport.link} className={styles.reportLink}>바로가기</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
