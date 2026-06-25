import React from 'react';
import styles from './Skeleton.module.css';

// 기본 스켈레톤 블록
export const SkeletonBlock = ({ width = '100%', height = '16px', style = {} }) => (
  <div className={styles.skeleton} style={{ width, height, ...style }} />
);

// 통계 카드 스켈레톤
export const SkeletonStatCard = () => (
  <div className={styles.statCard}>
    <div className={styles.skeleton} style={{ width: '60px', height: '32px', marginBottom: '8px' }} />
    <div className={styles.skeleton} style={{ width: '80px', height: '14px' }} />
  </div>
);

// 테이블 행 스켈레톤
export const SkeletonTableRow = ({ columns = 5 }) => (
  <tr className={styles.skeletonRow}>
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i}>
        <div className={styles.skeleton} style={{ width: i === 0 ? '30px' : '80%', height: '14px' }} />
      </td>
    ))}
  </tr>
);

// 테이블 전체 스켈레톤
export const SkeletonTable = ({ rows = 5, columns = 5 }) => (
  <div style={{ overflowX: 'auto' }}>
    <table className={styles.table}>
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i}>
              <div className={styles.skeleton} style={{ width: '60px', height: '14px' }} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonTableRow key={i} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

// 관리자 페이지 대시보드 스켈레톤
export const SkeletonDashboard = () => (
  <div>
    <div className={styles.skeleton} style={{ width: '150px', height: '24px', marginBottom: '16px' }} />
    <div className={styles.statsGrid}>
      <SkeletonStatCard />
      <SkeletonStatCard />
      <SkeletonStatCard />
      <SkeletonStatCard />
    </div>
    <div className={styles.infoBox}>
      <div className={styles.skeleton} style={{ width: '120px', height: '18px', marginBottom: '12px' }} />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.skeleton} style={{ width: `${70 + i * 10}%`, height: '14px', marginBottom: '8px' }} />
      ))}
    </div>
  </div>
);

// 게시글/설정/회원 탭 스켈레톤
export const SkeletonTabContent = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <div className={styles.skeleton} style={{ width: '120px', height: '20px' }} />
      <div className={styles.skeleton} style={{ width: '80px', height: '32px', borderRadius: '4px' }} />
    </div>
    <SkeletonTable rows={5} columns={5} />
  </div>
);

// 설정 탭 스켈레톤
export const SkeletonSettings = () => (
  <div style={{ maxWidth: 500 }}>
    <div className={styles.skeleton} style={{ width: '100px', height: '20px', marginBottom: 20 }} />
    {Array.from({ length: 2 }).map((_, i) => (
      <div key={i} style={{ marginBottom: 20 }}>
        <div className={styles.skeleton} style={{ width: '80px', height: '14px', marginBottom: 6 }} />
        <div className={styles.skeleton} style={{ width: '100%', height: '36px', borderRadius: '4px' }} />
      </div>
    ))}
    <div className={styles.skeleton} style={{ width: '80px', height: '36px', borderRadius: '4px' }} />
  </div>
);

// 회원 목록 스켈레톤
export const SkeletonMembers = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
      <div className={styles.skeleton} style={{ width: '100px', height: '20px' }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <div className={styles.skeleton} style={{ width: '200px', height: '32px', borderRadius: '4px' }} />
        <div className={styles.skeleton} style={{ width: '80px', height: '32px', borderRadius: '4px' }} />
      </div>
    </div>
    <SkeletonTable rows={5} columns={6} />
  </div>
);

// 홈페이지 히어로 섹션 스켈레톤
export const SkeletonHero = () => (
  <div className={styles.heroSkeleton}>
    <div className={styles.skeleton} style={{ width: '70%', height: '40px', marginBottom: '16px' }} />
    <div className={styles.skeleton} style={{ width: '50%', height: '20px', marginBottom: '12px' }} />
    <div className={styles.skeleton} style={{ width: '40%', height: '36px', borderRadius: '8px' }} />
  </div>
);

// 홈페이지 카드 섹션 스켈레톤 (기존 - 사용 안함)
export const SkeletonCardSection = ({ count = 3 }) => (
  <div className={styles.cardGrid}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={styles.cardSkeleton}>
        <div className={styles.skeleton} style={{ width: '100%', height: '180px', borderRadius: '8px 8px 0 0' }} />
        <div style={{ padding: '16px' }}>
          <div className={styles.skeleton} style={{ width: '80%', height: '18px', marginBottom: '10px' }} />
          <div className={styles.skeleton} style={{ width: '100%', height: '14px', marginBottom: '6px' }} />
          <div className={styles.skeleton} style={{ width: '60%', height: '14px' }} />
        </div>
      </div>
    ))}
  </div>
);

// Announcements 스켈레톤
export const SkeletonAnnouncements = () => (
  <section className={styles.announcementsSection}>
    <div className={styles.container}>
      <div className={styles.announcements}>
        <div className={styles.skeleton} style={{ width: '100px', height: '20px', marginBottom: '16px' }} />
        <ul className={styles.list}>
          {[1, 2, 3, 4].map((i) => (
            <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <div className={styles.skeleton} style={{ width: '60%', height: '14px' }} />
              <div className={styles.skeleton} style={{ width: '70px', height: '14px' }} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.weeklyReport}>
        <div className={styles.skeleton} style={{ width: '60px', height: '20px', marginBottom: '12px' }} />
        <div className={styles.reportBox}>
          <div className={styles.skeleton} style={{ width: '70%', height: '16px', marginBottom: '8px' }} />
          <div className={styles.skeleton} style={{ width: '50%', height: '14px' }} />
        </div>
      </div>
    </div>
  </section>
);

// QuickLinks 스켈레톤
export const SkeletonQuickLinks = () => (
  <section className={styles.quickLinksSection}>
    <div className={styles.container}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={styles.linkCard}>
          <div className={styles.skeleton} style={{ width: '40px', height: '40px', borderRadius: '50%', marginBottom: '12px' }} />
          <div className={styles.skeleton} style={{ width: '70%', height: '16px', marginBottom: '6px' }} />
          <div className={styles.skeleton} style={{ width: '90%', height: '12px' }} />
        </div>
      ))}
    </div>
  </section>
);
