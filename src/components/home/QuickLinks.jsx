import React from 'react';
import styles from './QuickLinks.module.css';
import { FaMapMarkerAlt, FaClock, FaUsers, FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트

const QuickLinks = () => {
  const links = [
    { icon: <FaMapMarkerAlt />, title: '오시는 길', desc: '교회 위치 안내', path: '/welcome/directions' },
    { icon: <FaClock />, title: '예배 시간', desc: '주일/수요/새벽 예배', path: '/welcome/service-times' },
    { icon: <FaUsers />, title: '새가족 안내', desc: '처음 오신 분들을 위해', path: '/welcome/new-family' },
    { icon: <FaVideo />, title: '온라인 방송', desc: '실시간 예배 참여', path: 'https://www.youtube.com/@seongrimchurch/live' },
  ];

  return (
    <section className={styles.quickLinksSection}>
      <div className={styles.container}>
        {links.map(link => (
          link.title === '온라인 방송' ? (
            <a href={link.path} key={link.title} className={styles.linkCard} target="_blank" rel="noopener noreferrer"> {/* 외부 링크는 <a> 태그 사용 */}
              <div className={styles.icon}>{link.icon}</div>
              <h3 className={styles.title}>{link.title}</h3>
              <p className={styles.desc}>{link.desc}</p>
            </a>
          ) : (
            <Link to={link.path} key={link.title} className={styles.linkCard}> {/* 내부 링크는 Link 컴포넌트 사용 */}
              <div className={styles.icon}>{link.icon}</div>
              <h3 className={styles.title}>{link.title}</h3>
              <p className={styles.desc}>{link.desc}</p>
            </Link>
          )
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;