import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './Footer.module.css';
import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.churchInfo}>
          <h3 className={styles.logo}>광주성림교회</h3>
          <p>담임목사: 안성주</p>
          <p>(12345) 서울특별시 성림구 성림로 123</p>
          <p>전화: 02-1234-5678 | 팩스: 02-1234-5679</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright &copy; 2025 성림교회. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
