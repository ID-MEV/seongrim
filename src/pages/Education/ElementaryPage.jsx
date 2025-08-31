import React from 'react';
import styles from './Layout.module.css';

const ElementaryPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>초등부 (6-11세)</h1>
      <div className={styles.content}>
        <h2>"말씀으로 꿈을 키우는 하나님의 자녀"</h2>
        <p>
          초등부는 어린이들이 하나님의 말씀을 배우고, 기도를 통해 하나님과 교제하며,
          예수님을 닮은 성품으로 성장하도록 돕습니다.
        </p>

        <h3>예배 안내</h3>
        <ul>
          <li><strong>시간:</strong> 주일 오전 11시</li>
          <li><strong>장소:</strong> 교육관 2층 초등부실</li>
          <li><strong>대상:</strong> 6세부터 11세까지의 어린이</li>
        </ul>

        <h3>주요 활동</h3>
        <ul>
          <li>학년별 성경공부 (공과)</li>
          <li>신나는 찬양과 예배</li>
          <li>여름성경학교 및 겨울캠프</li>
          <li>친구 초청 잔치</li>
        </ul>

        <h3>부서 소식</h3>
        <ul>
          <li><strong>[알림]</strong> 여름성경학교 등록이 시작되었습니다. (기간: ~7/15)</li>
          <li><strong>[안내]</strong> 매월 마지막 주일은 친구 초청 주일로 지켜집니다.</li>
          <li><strong>[영상]</strong> 지난 달란트 시장 영상이 유튜브 채널에 업로드되었습니다.</li>
        </ul>

        <h3>섬기는 이들</h3>
        <ul>
          <li><strong>담당 교역자:</strong> 이믿음 전도사</li>
          <li><strong>부장:</strong> 박지혜 교사</li>
          <li><strong>교사:</strong> 김성실, 이충성, 최진리</li>
        </ul>
      </div>
    </div>
  );
};

export default ElementaryPage;
