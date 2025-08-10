import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav/SideNav';
import styles from './Layout.module.css';

const newsLinks = [
  { path: '/news/church-news', label: '교회소식' },
  { path: '/news/bulletin', label: '주보' },
  { path: '/news/album', label: '앨범' },
  { path: '/news/free-board', label: '자유게시판' },
];

const NewsLayout = () => {
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
      <SideNav title="교회소식" links={newsLinks} isOpen={isNavOpen} />
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default NewsLayout;
