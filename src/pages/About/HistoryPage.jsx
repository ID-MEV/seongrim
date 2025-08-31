import React from 'react';
import styles from './HistoryPage.module.css';

const historyData = [
  { year: '1974', events: ['1974.05.12 - 시카고 성림교회 창립 (5가정, 초대 담임목사 OOO)'] },
  { year: '1980', events: ['1980.03.01 - 제2대 담임목사 OOO 취임'] },
  { year: '1985', events: ['1985.11.23 - 현 위치의 교회 부지 매입 및 성전 건축 시작'] },
  { year: '1987', events: ['1987.09.20 - 새 성전 입당 감사 예배'] },
  { year: '1995', events: ['1995.07.01 - 제3대 담임목사 OOO 취임'] },
  { year: '2000', events: ['2000.10.15 - 창립 26주년 기념, 전교인 성경 필사본 봉헌'] },
  { year: '2008', events: ['2008.04.13 - 제4대 담임목사 김사랑 취임'] },
  { year: '2010', events: ['2010.09.05 - 창립 36주년 기념, 첫 단기 선교 (멕시코)'] },
  { year: '2015', events: ['2015.12.25 - 지역 사회를 위한 사랑의 쌀 나누기 행사 시작'] },
  { year: '2020', events: ['2020.03.15 - 코로나19 팬데믹으로 인한 온라인 예배 전환'] },
  { year: '2024', events: ['2024.05.12 - 창립 50주년 희년 감사 예배 및 임직식', '2024.09.01 - 50주년 기념 음악회 개최'] },
];

const HistoryPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>교회 연혁</h1>
      <p className={styles.introText}>
        지난 50년간 성림교회를 인도하신 하나님의 은혜에 감사드립니다. 성림교회는 다음과 같은 발자취를 남기며 성장해왔습니다.
      </p>
      <div className={styles.timeline}>
        {historyData.map((item, index) => (
          <div
            key={index}
            className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
          >
            <div className={styles.timelineContent}>
              <h2 className={styles.year}>{item.year}</h2>
              <ul className={styles.events}>
                {item.events.map((event, eventIndex) => (
                  <li key={eventIndex}>{event}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
