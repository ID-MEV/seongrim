import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AdminStats.module.css';
import { SkeletonDashboard } from '../../components/Skeleton/Skeleton';

const API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'https://api.mev.o-r.kr';

const AdminStats = () => {
  const { user } = useAuth();
  const token = user?.token;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchStats = async () => {
      try {
        const [res] = await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          new Promise(r => setTimeout(r, 500)),
        ]);
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
  }, [token]);

  if (loading) return <SkeletonDashboard />;

  return (
    <div className={styles.statsContainer}>
      <h2 style={{ fontSize: '1.1rem', marginBottom: 16 }}>대시보드</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats?.memos || 0}</span>
          <span className={styles.statLabel}>메모 게시글</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats?.wpPosts || 0}</span>
          <span className={styles.statLabel}>WP 게시글</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats?.videos || 0}</span>
          <span className={styles.statLabel}>
            캐시 영상
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#aaa', marginTop: 2 }}>
              유튜브 예배 영상
            </span>
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats?.members || 0}</span>
          <span className={styles.statLabel}>교인 명단</span>
        </div>
      </div>

      <div className={styles.infoBox}>
        <h3>📌 각 항목 설명</h3>
        <ul>
          <li><strong>메모 게시글</strong> — 관리자 페이지에서 직접 작성한 공지/메모</li>
          <li><strong>WP 게시글</strong> — WordPress에서 작성한 게시물 (예배 영상, 소식 등)</li>
          <li><strong>캐시 영상</strong> — 유튜브 예배 영상을 서버에 캐싱한 수 (자동 업데이트)</li>
          <li><strong>교인 명단</strong> — DB에 등록된 교인 수</li>
        </ul>
      </div>

      <div className={styles.infoBox} style={{ marginTop: 16 }}>
        <h3>🖥️ 시스템 정보</h3>
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
