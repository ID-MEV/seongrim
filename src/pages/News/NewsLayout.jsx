import React from 'react';
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
  return (
    <>
      <SideNav title="교회소식" links={newsLinks} />
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default NewsLayout;
