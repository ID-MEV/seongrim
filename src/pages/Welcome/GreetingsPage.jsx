import React from 'react';
import styles from './Layout.module.css';
import FadeIn from '../../components/FadeIn';

const GreetingsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <FadeIn>
      <h1 className={styles.title}>인사말</h1>
      <div className={styles.content}>
        <p>
          주님의 이름으로 성림교회 홈페이지에 오신 여러분을 진심으로 환영합니다.
        </p>
        <p>
          성림교회는 이민 생활의 어려움 속에서도 말씀과 기도로 서로를 위로하며 세워가는 신앙 공동체입니다. 저희 교회는 하나님의 사랑을 전하고, 지역 사회를 섬기며, 다음 세대를 믿음의 일꾼으로 키우는 일에 힘쓰고 있습니다.
        </p>
        <p>
          이 홈페이지가 여러분에게 유용한 정보와 영적인 쉼을 제공하는 공간이 되기를 바랍니다. 궁금한 점이 있으시면 언제든지 연락 주시고, 기회가 되신다면 교회에 방문하여 함께 예배드릴 수 있기를 소망합니다.
        </p>
        <p>
          여러분의 가정과 삶에 하나님의 은혜와 평강이 가득하시기를 기도합니다.
        </p>
        <br />
        <p>
          <strong>성림교회 담임목사 김사랑 드림</strong>
        </p>
      </div>
      </FadeIn>
    </div>
  );
};

export default GreetingsPage;
