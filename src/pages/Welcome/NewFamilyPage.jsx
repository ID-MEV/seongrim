import React from 'react';
import styles from './Layout.module.css';

const NewFamilyPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>새가족 안내</h1>
      <div className={styles.content}>
        <h2>성림교회에 오신 것을 환영합니다!</h2>
        <p>
          저희 교회에 처음 방문하셨거나 등록을 원하시는 분들을 위해 다음과 같이 안내해 드립니다.
        </p>

        <h3>새가족 등록 과정</h3>
        <ol>
          <li><strong>예배 참석:</strong> 주일 예배에 참석하여 함께 은혜를 나눕니다.</li>
          <li><strong>새가족 카드 작성:</strong> 예배 후 새가족부의 안내에 따라 새가족 카드를 작성합니다.</li>
          <li><strong>목사님과의 만남:</strong> 담임목사님과 간단한 만남의 시간을 통해 교회에 대해 소개받고 신앙 상담을 할 수 있습니다.</li>
          <li><strong>새가족 교육:</strong> 4주간 진행되는 새가족 교육을 통해 교회의 비전과 신앙의 기초를 다집니다.</li>
          <li><strong>교회 등록 및 소그룹(목장) 배정:</strong> 교육을 수료한 후 정식 교인으로 등록되며, 소그룹(목장)에 배정되어 성도들과 깊은 교제를 나누게 됩니다.</li>
        </ol>

        <h3>새가족부 안내</h3>
        <p>
          새가족부는 여러분이 교회에 잘 정착할 수 있도록 돕는 섬김의 부서입니다. 궁금한 점이나 어려운 점이 있으시면 언제든지 새가족부원들에게 문의해 주세요.
        </p>
        <p>
          <strong>문의:</strong> OOO 집사 (새가족부장) / 123-456-7890
        </p>
      </div>
    </div>
  );
};

export default NewFamilyPage;
