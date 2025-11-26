import React from 'react';
import styles from './LoginMemoModal.module.css';

const LoginMemoModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>향후 개발 계획</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          <p>로그인 기능은 향후 웹사이트 관리자를 위해 다음과 같은 기능을 제공할 예정입니다.</p>
          <ul>
            <li><strong>배경화면 수정:</strong> 관리자가 직접 홈페이지의 배경사을을 변경할 수 있는 기능을 제공합니다.</li>
            <li><strong>컨텐츠 수정:</strong> 게시글 페이지를 제외한 정적인 콘텐츠를 담고 있는 페이지의 텍스트를 수정할 수 있습니다.</li>
          </ul>
          <p>이 기능은 현재 개발 계획 단계에 있으며, 빠른 시일 내에 구현될 예정입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginMemoModal;
