import React from 'react';
import styles from './BulletinViewer.module.css';

const BulletinViewer = ({ bulletin }) => {
  return (
    <div className={styles.viewerContainer}>
      {bulletin && bulletin.imageUrl ? (
        <img src={bulletin.imageUrl} alt={bulletin.title} className={styles.bulletinImage} />
      ) : (
        <p className={styles.noSelection}>오른쪽 목록에서 주보를 선택하세요.</p>
      )}
    </div>
  );
};

export default BulletinViewer;