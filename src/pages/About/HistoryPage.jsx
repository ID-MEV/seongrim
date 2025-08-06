import React from 'react';
import styles from './Layout.module.css';

const historyData = [
  {
    year: '2010',
    events: [
      '2010.03.07 - 가정집에서 첫 예배 시작 (5가정)',
      '2010.09.05 - 상가 건물로 이전 및 창립 예배',
    ],
  },
  {
    year: '2012',
    events: [
      '2012.05.20 - 제1회 전교인 체육대회 개최',
      '2012.11.18 - 첫 장로/권사 임직 예배',
    ],
  },
  {
    year: '2015',
    events: [
      '2015.07.19 - 창립 5주년 기념 부흥회',
      '2015.12.25 - 지역 사회를 위한 사랑의 쌀 나누기 행사',
    ],
  },
  {
    year: '2020',
    events: [
      '2020.01.12 - 현재 위치의 성전으로 이전',
      '2020.03.15 - 코로나19로 인한 온라인 예배 시작',
    ],
  },
  {
    year: '2024',
    events: [
      '2024.09.01 - 창립 14주년 기념 음악회',
      '2024.10.05 - 제1회 단기 선교 (동남아)',
    ],
  },
];

const HistoryPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>교회 연혁</h1>
      <div className={styles.content}>
        <p>성림교회는 하나님의 은혜 가운데 다음과 같은 발자취를 남기며 성장해왔습니다.</p>
        
        <div className={styles.historyTimeline}>
          {historyData.map((item, index) => (
            <div key={index} className={styles.historyYearBlock}>
              <h2 className={styles.historyYear}>{item.year}</h2>
              <ul className={styles.historyEvents}>
                {item.events.map((event, eventIndex) => (
                  <li key={eventIndex}>{event}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
