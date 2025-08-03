import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FreeBoard.module.css';

const REST_API_ENDPOINT = 'https://api.seongrim.o-r.kr/wp-json/wp/v2/posts';

const FreeBoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(REST_API_ENDPOINT);
        setPosts(response.data);
      } catch (err) {
        setError(err.message || '데이터를 불러오는 중 알 수 없는 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.boardContainer}>
      <h2 className={styles.boardTitle}>자유게시판</h2>
      <div className={styles.toolbar}>
        <button className={styles.writeButton}>글쓰기</button>
      </div>
      <table className={styles.boardTable}>
        <thead>
          <tr>
            <th className={styles.thNumber}>번호</th>
            <th className={styles.thTitle}>제목</th>
            <th className={styles.thAuthor}>작성자</th>
            <th className={styles.thDate}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className={styles.loading}>게시글을 불러오는 중입니다...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4" className={styles.error}>에러: {error}</td>
            </tr>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post.id}>
                <td>{posts.length - index}</td>
                <td className={styles.tdTitle}>{post.title.rendered}</td>
                <td>관리자</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FreeBoardPage;
