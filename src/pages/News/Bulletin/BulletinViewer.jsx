import React from 'react';
import styles from './BulletinViewer.module.css';

const BulletinViewer = ({ bulletin }) => {
  return (
    <div className={styles.viewerContainer}>
      {bulletin ? (
        <iframe
          src={bulletin.fileUrl}
          title={bulletin.title}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        ></iframe>
      ) : (
        <p className={styles.noSelection}>오른쪽 목록에서 주보를 선택하세요.</p>
      )}
    </div>
  );
};

export default BulletinViewer;
