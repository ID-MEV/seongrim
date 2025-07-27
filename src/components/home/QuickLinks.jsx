import React from 'react';
import styles from './QuickLinks.module.css';
import { FaMapMarkerAlt, FaClock, FaUsers, FaVideo } from 'react-icons/fa';

const QuickLinks = () => {
  const links = [
    { icon: <FaMapMarkerAlt />, title: '오시는 길', desc: '교회 위치 안내' },
    { icon: <FaClock />, title: '예배 시간', desc: '주일/수요/새벽 예배' },
    { icon: <FaUsers />, title: '새가족 안내', desc: '처음 오신 분들을 위해' },
    { icon: <FaVideo />, title: '온라인 방송', desc: '실시간 예배 참여' },
  ];

  return (
    <section className={styles.quickLinksSection}>
      <div className={styles.container}>
        {links.map(link => (
          <div key={link.title} className={styles.linkCard}>
            <div className={styles.icon}>{link.icon}</div>
            <h3 className={styles.title}>{link.title}</h3>
            <p className={styles.desc}>{link.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
