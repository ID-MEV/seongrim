import React from 'react';
import styles from './Layout.module.css';

const VisionPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>교회 비전</h1>
      <div className={styles.content}>
        <h2>"세상을 변화시키는 하나님의 사람들"</h2>
        <p className={styles.visionStatement}>
          성림교회는 말씀과 성령의 능력으로 변화된 성도들이 가정과 세상 속에서 하나님의 나라를 이루어가는 것을 목표로 합니다.
        </p>

        <h3>핵심 가치</h3>
        <ul>
          <li><strong>예배 (Worship):</strong> 하나님을 향한 진정한 예배를 통해 삶의 목적을 발견합니다.</li>
          <li><strong>양육 (Discipleship):</strong> 체계적인 성경 공부와 훈련을 통해 예수님의 제자로 성장합니다.</li>
          <li><strong>교제 (Fellowship):</strong> 소그룹(목장) 안에서 서로 사랑하고 섬기며 건강한 공동체를 이룹니다.</li>
          <li><strong>선교 (Mission):</strong> 지역 사회와 열방을 향해 복음을 전하고 하나님의 사랑을 실천합니다.</li>
          <li><strong>다음 세대 (Next Generation):</strong> 다음 세대를 믿음의 유산을 계승하는 리더로 세웁니다.</li>
        </ul>

        <h3>2025년 표어</h3>
        <p className={styles.motto}>
          <strong>"주여, 이제 회복하게 하소서" (행 1:6)</strong>
        </p>
        <p>
          올 한 해, 예배의 감격을 회복하고, 기도의 능력을 회복하며, 가정과 교회가 온전히 회복되는 역사를 경험하기를 소망합니다.
        </p>
      </div>
    </div>
  );
};

export default VisionPage;
