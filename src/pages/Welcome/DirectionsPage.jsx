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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.833333333333!2d127.0275833151683!3d37.506630379809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca5aedd33e6e9%3A0x34a7b8b8a7b8b8a7!2z7ISc7Jq47Yq567OE7Iuc!5e0!3m2!1sko!2skr!4v1620000000000!5m2!1sko!2skr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Church Location"
            ></iframe>
          </div>

          <h3>주소</h3>
          <p>
            (12345) 서울특별시 강남구 테헤란로 123 성림빌딩 4층
          </p>

          <h3>대중교통 이용 시</h3>
          <ul>
            <li>
              <strong>지하철:</strong> 2호선 강남역 11번 출구에서 도보 5분
            </li>
            <li>
              <strong>버스:</strong> '강남역' 정류장에서 하차 (파랑: 140, 402, 420 / 초록: 3412, 4412)
            </li>
          </ul>

          <h3>자가용 이용 시</h3>
          <p>
            건물 내 주차장을 이용하시거나, 주일에는 인근 공영 주차장을 무료로 이용하실 수 있습니다.
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default DirectionsPage;