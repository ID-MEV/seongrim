import React from 'react';
import FadeIn from '../../components/FadeIn';
import styles from './Layout.module.css';

const DirectionsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <FadeIn>
        <h1 className={styles.title}>오시는 길</h1>
        <div className={styles.content}>
          <h2>성림교회에 오신 것을 환영합니다.</h2>
          <p>
            교회에 오시는 길을 안내해 드립니다. 대중교통이나 자가용을 이용하여 쉽게 방문하실 수 있습니다.
          </p>

          <div className={styles.mapContainer}>
            {/* Google Maps Embed - 실제 주소로 변경해야 합니다. */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.681104012882!2d126.88032867622739!3d35.16457307275845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35718c1195f08019%3A0x9d356c90e30e462!2z7ISx66a86rWQ7ZqM!5e0!3m2!1sko!2skr!4v1758973414772!5m2!1sko!2skr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Church Location"
            ></iframe>
          </div>

          <div className={styles.headingWithSeparator}>
            <h3>광주성림교회</h3>
            <hr className={styles.separator} />
          </div>
          <ul className={styles.bulletedList}>
              <li><strong>주소</strong>: (61914) 광주 서구 죽봉대로119번길 8-1</li>
          </ul>

          <div className={styles.headingWithSeparator} style={{marginTop: '40px'}}>
            <h3>대중교통 이용안내</h3>
            <hr className={styles.separator} />
          </div>
          <ul className={styles.bulletedList}>
            <li>
              <strong>지하철:</strong> 2호선 강남역 11번 출구에서 도보 5분
            </li>
            <li>
              <strong>버스:</strong> '강남역' 정류장에서 하차 (파랑: 140, 402, 420 / 초록: 3412, 4412)
            </li>
          </ul>

          <div className={styles.headingWithSeparator} style={{marginTop: '40px'}}>
            <h3>자가용 이용 시</h3>
            <hr className={styles.separator} />
          </div>
          <p>
            건물 내 주차장을 이용하시거나, 주일에는 인근 공영 주차장을 무료로 이용하실 수 있습니다.
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default DirectionsPage;