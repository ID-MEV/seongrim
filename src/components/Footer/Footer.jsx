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
          <p>(61914) 광주광역시 서구 죽봉대로119번길 8-1</p>
          <p>전화: 062)366-0691 | 팩스: 062)361-0847</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright &copy; 2025 광주성림교회. All Rights Reserved. Designed by Team Nehemiah</p>
      </div>
    </footer>
  );
};

export default Footer;
