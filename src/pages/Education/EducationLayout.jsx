import React from 'react';
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
  return (
    <div className={styles.layoutContainer}>
      <SideNav title="교회학교" links={educationLinks} />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default EducationLayout;
