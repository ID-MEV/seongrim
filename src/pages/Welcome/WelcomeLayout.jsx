import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav/SideNav';
import styles from './Layout.module.css';

const welcomeLinks = [
  { path: '/welcome/greetings', label: '인사말' },
  { path: '/welcome/new-family', label: '새가족 안내' },
  { path: '/welcome/service-times', label: '예배시간' },
  { path: '/welcome/directions', label: '오시는 길' },
];

const WelcomeLayout = () => {
  return (
    <>
      <SideNav title="환영합니다" links={welcomeLinks} isOpen={false} />
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default WelcomeLayout;
