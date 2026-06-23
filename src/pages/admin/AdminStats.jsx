import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AdminStats.module.css';

const AdminStats = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats', {
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

  if (loading) return <p className={styles.loading}>통계 불러오는 중...</p>;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats?.memos || 0}</span>
          <span className={styles.statLabel}>게시글</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats?.videos || 0}</span>
          <span className={styles.statLabel}>캐시 영상</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats?.members || 0}</span>
          <span className={styles.statLabel}>회원</span>
        </div>
      </div>
      <div className={styles.infoBox}>
        <h3>시스템 정보</h3>
        <ul>
          <li>Apache + PM2 + MariaDB 환경</li>
          <li>React 19 + Vite 7 프론트엔드</li>
          <li>WordPress Headless CMS 연동</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminStats;
