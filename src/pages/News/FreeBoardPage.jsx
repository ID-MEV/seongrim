import React, { useState, useEffect, useMemo } from 'react';
import { getPostsByCategory, getCategories } from '../../api/wordpress';
import styles from './FreeBoard.module.css';
import { FaSearch } from 'react-icons/fa';

const FREEBOARD_CATEGORY_ID = 2; // 자유게시판 카테고리 ID

const FreeBoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // 모든 카테고리를 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const postsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          getPostsByCategory(FREEBOARD_CATEGORY_ID), // 자유게시판 카테고리(2) 글만 가져옴
          getCategories()
        ]);
        setPosts(postsRes.posts);
        setAllCategories(categoriesRes.filter(cat => cat.id === FREEBOARD_CATEGORY_ID)); // 자유게시판 카테고리만 필터
        setError(null);
      } catch (err) {
        setError(err.message || '데이터를 불러오는 중 알 수 없는 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = activeCategory 
      ? posts.filter(post => post.categories.includes(activeCategory))
      : posts;

    let sorted = [...filtered];
    if (sortOrder === 'latest') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'oldest') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return sorted;
  }, [posts, activeCategory, sortOrder]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.boardContainer}>
      <h2 className={styles.boardTitle}>자유게시판</h2>
      
      <div className={styles.controlsHeader}>
        <span className={styles.postCount}>전체 {filteredAndSortedPosts.length}</span>
        <select className={styles.sortFilter} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>

      <ul className={styles.categoryFilters}>
        <li className={!activeCategory ? styles.active : ''} onClick={() => setActiveCategory(null)}>전체</li>
        {allCategories.map(cat => (
          <li key={cat.id} className={activeCategory === cat.id ? styles.active : ''} onClick={() => setActiveCategory(cat.id)}>
            {cat.name}
          </li>
        ))}
      </ul>

      <table className={styles.boardTable}>
        <thead>
          <tr>
            <th className={styles.thNumber}>번호</th>
            <th className={styles.thTitle}>제목</th>
            <th className={styles.thAuthor}>작성자</th>
            <th className={styles.thDate}>작성일</th>
            <th className={styles.thViews}>조회</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="5" className={styles.loading}>게시글을 불러오는 중입니다...</td></tr>
          ) : error ? (
            <tr><td colSpan="5" className={styles.error}>에러: {error}</td></tr>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <tr key={post.id}>
                <td>{filteredAndSortedPosts.length - (indexOfFirstPost + index)}</td>
                <td className={styles.tdTitle}>{post.title.rendered}</td>
                <td>관리자</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>-</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">게시글이 없습니다.</td></tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? styles.activePage : ''}>
            {number}
          </button>
        ))}
      </div>

      <form className={styles.searchForm}>
        <input type="text" placeholder="검색어를 입력하세요" className={styles.searchInput} />
        <button type="submit" className={styles.searchButton}><FaSearch /></button>
      </form>
    </div>
  );
};

export default FreeBoardPage;
