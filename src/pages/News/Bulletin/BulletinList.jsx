import React from 'react';
import styles from './BulletinList.module.css';

const BulletinList = ({ bulletins, onSelectBulletin }) => {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.title}>주보 목록</h3>
      <ul className={styles.list}>
        {bulletins.map((bulletin) => (
          <li
            key={bulletin.id}
            className={styles.listItem}
            onClick={() => onSelectBulletin(bulletin)}
          >
            <span className={styles.bulletinTitle}>{bulletin.title}</span>
            <span className={styles.bulletinDate}>{bulletin.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletinList;
