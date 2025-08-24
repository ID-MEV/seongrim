import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav/SideNav';
import styles from './Layout.module.css';

const educationLinks = [
  { path: '/education/toddler', label: '영유아부' },
  { path: '/education/elementary', label: '초등부' },
  { path: '/education/youth', label: '중고등부' },
  { path: '/education/young-adult', label: '청년부' },
];

const EducationLayout = () => {
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
      <SideNav title="교회학교" links={educationLinks} isOpen={isNavOpen} />
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default EducationLayout;
