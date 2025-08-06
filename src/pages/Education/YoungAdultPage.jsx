import React from 'react';
import styles from './Layout.module.css';

const YoungAdultPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>청년부</h1>
      <div className={styles.content}>
        <h2>"깨어 기도하며 세상을 섬기는 청년 공동체"</h2>
        <p>
          성림교회 청년부는 학업, 직장, 결혼 등 삶의 중요한 시기를 지나는 청년들이
          말씀 안에서 서로 교제하며 함께 성장하는 신앙 공동체입니다.
        </p>

        <h3>모임 안내</h3>
        <ul>
          <li><strong>예배:</strong> 주일 오후 2시, 본당</li>
          <li><strong>소그룹 모임:</strong> 주일 예배 후 각 소그룹별 장소</li>
          <li><strong>대상:</strong> 대학생 및 미혼 청년</li>
        </ul>

        <h3>주요 활동</h3>
        <ul>
          <li>청년부 수련회 (여름/겨울)</li>
          <li>국내/해외 단기선교</li>
          <li>문화 사역 및 봉사활동</li>
          <li>리더십 훈련</li>
        </ul>

        <h3>섬기는 이들</h3>
        <ul>
          <li><strong>담당 교역자:</strong> 박은혜 목사</li>
          <li><strong>회장:</strong> 김청년</li>
          <li><strong>부회장:</strong> 이청년</li>
        </ul>
      </div>
    </div>
  );
};

export default YoungAdultPage;
