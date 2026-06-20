import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('https://api.mev.o-r.kr/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={styles.adminPanel}>
      <div className={styles.panelHeader}>
        <h2>관리자 패널</h2>
        <div className={styles.userInfo}>
          <span>{user?.username}</span>
          <button onClick={logout} className={styles.logoutButton}>로그아웃</button>
        </div>
      </div>

      {loading ? (
        <p className={styles.loading}>통계 불러오는 중...</p>
      ) : stats ? (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.memos}</span>
            <span className={styles.statLabel}>게시글</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.videos}</span>
            <span className={styles.statLabel}>캐시 영상</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.members}</span>
            <span className={styles.statLabel}>회원</span>
          </div>
        </div>
      ) : (
        <p className={styles.error}>통계를 불러올 수 없습니다.</p>
      )}

      <div className={styles.infoBox}>
        <h3>관리 기능 안내</h3>
        <ul>
          <li>게시글 관리: 자유게시판 CRUD 기능</li>
          <li>설정 관리: 배경화면, 테마 색상 변경</li>
          <li>회원 관리: 회원 검색 및 조회</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
