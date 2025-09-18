import React from 'react';
import FadeIn from '../../components/FadeIn';
import styles from './Layout.module.css';

const ToddlerPage = () => {
  return (
    <div className={styles.pageContainer}>
      <FadeIn>
        <h1 className={styles.title}>영유아부 (0-5세)</h1>
        <div className={styles.content}>
          <h2>"예수님 안에서 무럭무럭 자라나는 어린이"</h2>
          <p>
            성림교회 영유아부는 부모님의 신앙을 이어받아 믿음의 다음 세대로 자라나는 것을 돕습니다.
            아이들의 눈높이에 맞춘 예배와 다양한 활동을 통해 하나님을 알아가는 기쁨을 누리게 합니다.
          </p>

          <h3>예배 안내</h3>
          <ul>
            <li><strong>시간:</strong> 주일 오전 11시</li>
            <li><strong>장소:</strong> 교육관 1층 영유아부실</li>
            <li><strong>대상:</strong> 0세부터 5세까지의 영유아</li>
          </ul>

          <h3>주요 활동</h3>
          <ul>
            <li>찬양과 율동</li>
            <li>성경 이야기 듣기</li>
            <li>오감을 활용한 만들기 및 놀이 활동</li>
            <li>생일 축하 및 환영</li>
          </ul>

          <h3>부서 소식</h3>
          <ul>
            <li><strong>[알림]</strong> 2025년 영유아부 여름성경학교가 7월 마지막 주에 열립니다.</li>
            <li><strong>[모집]</strong> 영유아부 교사로 함께 섬겨주실 분들을 모집합니다. (문의: 이믿음 전도사)</li>
            <li><strong>[사진]</strong> 지난 주 생일잔치 사진이 교회 앨범에 업데이트되었습니다.</li>
          </ul>

          <h3>섬기는 이들</h3>
          <ul>
            <li><strong>담당 교역자:</strong> 이믿음 전도사</li>
            <li><strong>부장:</strong> 김자람 교사</li>
            <li><strong>교사:</strong> 박사랑, 최온유, 정소망</li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );
};

export default ToddlerPage;
