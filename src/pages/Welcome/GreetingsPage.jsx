import React from 'react';
import styles from './GreetingsPage.module.css';
import placeholderImage from '../../assets/react.svg';
import FadeIn from '../../components/FadeIn';

const GreetingsPage = () => {
  return (
    <FadeIn>
      <div className={styles.greetingsContainer}>
        <div className={styles.pastorImage}>
          <img src={placeholderImage} alt="담임목사" />
        </div>
        <div className={styles.welcomeMessage}>
          <h2>환영의 말씀</h2>
          <p>
            성림교회에 오신 여러분을 진심으로 환영합니다. 우리 교회는 하나님의 크신 사랑을 함께 나누고, 예수 그리스도의 복음을 삶으로 실천하며 세상에 전파하는 따뜻하고 활기찬 신앙 공동체입니다. 
          </p>
          <p>
            이 곳, 성림교회에서 여러분이 삶의 참된 의미와 목적을 발견하고, 하나님의 풍성한 은혜 안에서 믿음의 형제자매들과 함께 영적으로 성장하며 삶의 기쁨과 슬픔을 나누는 소중한 교제를 경험하시기를 소망합니다. 
          </p>
          <p>
            여러분의 귀한 발걸음을 통해 하나님의 선하고 놀라운 계획이 아름답게 이루어지기를 기도하며, 우리는 언제나 열린 마음과 따뜻한 미소로 여러분을 기다리겠습니다. 교회에 대해 궁금한 점이 있으시거나 도움이 필요하시면 언제든지 편하게 문의해주세요. 
          </p>
          <p>
            다시 한번 여러분의 방문을 진심으로 환영하며, 가정과 삶 가운데 하나님의 크신 평강이 늘 함께하시기를 축복합니다.
          </p>
        </div>
      </div>
    </FadeIn>
  );
};

export default GreetingsPage;
