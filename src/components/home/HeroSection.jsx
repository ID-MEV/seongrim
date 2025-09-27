import React from 'react';
import styles from './HeroSection.module.css';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <h2 className={styles.subtitle}>하나님의 사랑을 전하는</h2>
        <h1 className={styles.title}>광주성림교회에 오신 것을 환영합니다</h1>
        <p className={styles.description}>
          "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라" (마11:28)
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
