import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav/SideNav';
import styles from './Layout.module.css';

const sermonLinks = [
  { path: '/sermons/sunday', label: '주일 오전 예배' },
  { path: '/sermons/sunday-afternoon', label: '주일 오후 예배' },
  { path: '/sermons/wednesday', label: '수요예배' },
  { path: '/sermons/dawn', label: '새벽예배' },
  { path: '/sermons/choir', label: '찬양대' },
  { path: '/sermons/special-praise', label: '특별찬양' },
];

const SermonsLayout = () => {
  return (
    <>
      <SideNav title="말씀" links={sermonLinks} isOpen={false} />
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SermonsLayout;
