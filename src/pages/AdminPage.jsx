import React, { useState } from 'react';
import SettingsManagement from './admin/SettingsManagement';
import MemberManagement from './admin/MemberManagement';
import AdminStats from './admin/AdminStats';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('stats');

  const tabs = [
    { id: 'stats', label: '📊 대시보드' },
    { id: 'members', label: '👥 회원 목록' },
    { id: 'settings', label: '⚙️ 설정' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>관리자 페이지</h1>

      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'members' && <MemberManagement />}
        {activeTab === 'settings' && <SettingsManagement />}
      </div>
    </div>
  );
};

export default AdminPage;