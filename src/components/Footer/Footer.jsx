import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './Footer.module.css';
import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.churchInfo}>
          <h3 className={styles.logo}>성림교회</h3>
          <p>담임목사: 홍길동</p>
          <p>(12345) 서울특별시 성림구 성림로 123</p>
          <p>전화: 02-1234-5678 | 팩스: 02-1234-5679</p>
        </div>
        <div className={styles.footerLinks}>
          <h4>바로가기</h4>
          <ul>
            <li><Link to="/about/vision">교회소개</Link></li>
            <li><Link to="/sermons/sunday">주일설교</Link></li>
            <li><Link to="/education/toddler">교회학교</Link></li>
            <li><Link to="/welcome/directions">오시는길</Link></li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <h4>소셜 미디어</h4>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="유튜브"><FaYoutube /></a>
            <a href="#" aria-label="페이스북"><FaFacebook /></a>
            <a href="#" aria-label="인스타그램"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright &copy; 2024 성림교회. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
