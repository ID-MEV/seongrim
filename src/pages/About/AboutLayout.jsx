import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav/SideNav';
import styles from './Layout.module.css';

const aboutLinks = [
  { path: '/about/vision', label: '비전' },
  { path: '/about/staff', label: '섬기는 사람들' },
  { path: '/about/history', label: '교회 연혁' },
];

const AboutLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <button className={styles.navToggle} onClick={toggleNav}>
        ☰
      </button>
      {isNavOpen && <div className={styles.backdrop} onClick={toggleNav}></div>}
      <SideNav title="교회소개" links={aboutLinks} isOpen={isNavOpen} />
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AboutLayout;
