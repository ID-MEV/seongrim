import React from 'react';
import styles from './BulletinList.module.css';
import Pagination from '@/components/news/Pagination.jsx'; // Pagination 컴포넌트 임포트

const BulletinList = ({
  bulletins,
  selectedBulletin,
  onSelectBulletin,
  availableYears,
  selectedYear,
  onYearSelect,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.title}>주보 목록</h3>

      {/* 연도 필터 */} 
      <div className={styles.yearFilter}>
        <label htmlFor="year-select">연도 선택:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearSelect(parseInt(e.target.value))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.list}>
        {bulletins.length > 0 ? (
          bulletins.map((bulletin, index) => (
            <li
              key={bulletin.id}
              className={`${styles.listItem} ${selectedBulletin && selectedBulletin.id === bulletin.id ? styles.selected : ''}`}
              onClick={() => onSelectBulletin(bulletin)}
            >
              <span className={styles.bulletinNumber}>{(currentPage - 1) * 16 + index + 1}.</span>
              <span className={styles.bulletinTitle}>{bulletin.title}</span>
            </li>
          ))
        ) : (
          <li className={styles.noBulletins}>해당 연도의 주보가 없습니다.</li>
        )}
      </ul>

      {/* 페이지네이션 */} 
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default BulletinList;