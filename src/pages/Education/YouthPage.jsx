import React from 'react';
import FadeIn from '../../components/FadeIn';
import styles from './Layout.module.css';

const YouthPage = () => {
  return (
    <div className={styles.pageContainer}>
      <FadeIn>
        <h1 className={styles.title}>중고등부 (12-17세)</h1>
        <div className={styles.content}>
          <h2>"세상의 빛과 소금이 되는 다음 세대 리더"</h2>
          <p>
            중고등부는 청소년 시기에 겪는 다양한 고민과 어려움을 신앙 안에서 해결하고,
            하나님이 주신 비전을 발견하여 세상의 리더로 성장하도록 돕는 공동체입니다.
          </p>

          <h3>예배 안내</h3>
          <ul>
            <li><strong>시간:</strong> 주일 오전 11시</li>
            <li><strong>장소:</strong> 교육관 3층 중고등부실</li>
            <li><strong>대상:</strong> 12세부터 17세까지의 청소년</li>
          </ul>

          <h3>주요 활동</h3>
          <ul>
            <li>주제별 성경공부 및 토론</li>
            <li>뜨거운 찬양과 기도회</li>
            <li>여름/겨울 수련회</li>
            <li>단기선교 및 봉사활동</li>
          </ul>

          <h3>부서 소식</h3>
          <ul>
            <li><strong>[모집]</strong> 2025 여름 단기선교 참가자를 모집합니다. (문의: 최헌신 부장)</li>
            <li><strong>[안내]</strong> 중고등부 기도회가 매주 금요일 저녁 8시에 있습니다.</li>
            <li><strong>[공지]</strong> 다음 주 예배는 전체 야외 예배로 드려집니다.</li>
          </ul>

          <h3>섬기는 이들</h3>
          <ul>
            <li><strong>담당 교역자:</strong> 이믿음 전도사</li>
            <li><strong>부장:</strong> 최헌신 교사</li>
            <li><strong>교사:</strong> 김진실, 박열정, 이화평</li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );
};

export default YouthPage;
