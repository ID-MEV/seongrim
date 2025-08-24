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
            <li><strong>페이지 레이아웃 변경:</strong> 관리자가 직접 홈페이지의 전체적인 구조와 디자인을 변경할 수 있는 기능을 제공합니다.</li>
            <li><strong>템플릿 선택 기능:</strong> 사전에 정의된 3가지 이상의 디자인 템플릿 중 하나를 선택하여 웹사이트 분위기를 손쉽게 쇄신할 수 있습니다.</li>
            <li><strong>콘텐츠 관리:</strong> Headless WordPress와 별개로가 웹사이트의 특정 섹션을 직접 수정하는 기능을 포함할 수 있습니다.</li>
          </ul>
          <p>이 기능은 현재 개발 계획 단계에 있으며, 빠른 시일 내에 구현될 예정입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginMemoModal;
