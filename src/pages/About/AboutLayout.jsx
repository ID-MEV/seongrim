import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav/SideNav';
import styles from './Layout.module.css';

const aboutLinks = [
  { path: '/about/vision', label: '비전' },
  { path: '/about/staff', label: '섬기는 사람들' },
  { path: '/about/history', label: '교회 연혁' },
];

const AboutLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <SideNav title="교회소개" links={aboutLinks} />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AboutLayout;
