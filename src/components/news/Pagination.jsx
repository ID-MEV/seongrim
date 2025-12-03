import React from 'react';
import styles from './Pagination.module.css'; // Import CSS module

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={styles.pageItem}>
            <button
              onClick={() => onPageChange(number)}
              className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;