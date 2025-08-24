import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav/SideNav';
import styles from './Layout.module.css';

const sermonLinks = [
  { path: '/sermons/sunday', label: '주일설교' },
  { path: '/sermons/choir', label: '찬양대' },
  { path: '/sermons/special-praise', label: '특별찬양' },
];

const SermonsLayout = () => {
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
      <SideNav title="말씀" links={sermonLinks} isOpen={isNavOpen} />
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SermonsLayout;
