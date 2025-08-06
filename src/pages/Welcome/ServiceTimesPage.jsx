import React from 'react';
import styles from './Layout.module.css';

const ServiceTimesPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>예배 시간 안내</h1>
      <div className={styles.content}>
        <p>성림교회는 다음과 같이 예배를 드립니다. 은혜와 감격이 넘치는 예배에 여러분을 초대합니다.</p>
        
        <table className={styles.table}>
          <thead>
            <tr>
              <th>예배</th>
              <th>시간</th>
              <th>장소</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>주일 1부 예배</strong></td>
              <td>오전 9:00</td>
              <td>본당</td>
            </tr>
            <tr>
              <td><strong>주일 2부 예배</strong></td>
              <td>오전 11:00</td>
              <td>본당</td>
            </tr>
            <tr>
              <td><strong>주일학교 예배</strong></td>
              <td>오전 11:00</td>
              <td>교육관 각 부서실</td>
            </tr>
            <tr>
              <td><strong>수요예배</strong></td>
              <td>오후 7:30</td>
              <td>본당</td>
            </tr>
            <tr>
              <td><strong>새벽기도회</strong></td>
              <td>오전 5:30 (화-토)</td>
              <td>본당</td>
            </tr>
          </tbody>
        </table>

        <p className={styles.note}>
          * 모든 예배는 온라인으로도 실시간 방송됩니다. (유튜브 채널: 성림교회)
        </p>
      </div>
    </div>
  );
};

export default ServiceTimesPage;
