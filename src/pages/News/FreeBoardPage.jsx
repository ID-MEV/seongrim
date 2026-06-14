import React, { useState, useEffect } from 'react';
import styles from './FreeBoard.module.css';
import { FaTrash, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'https://api.mev.o-r.kr';

// WordPress 자유게시판 API (백엔드 프록시 경유)
const getFreePosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/wp-memo`);
  return response.data;
};

const createFreePost = async (nickname, content) => {
  const response = await axios.post(`${API_BASE_URL}/api/wp-memo`, {
    nickname,
    content,
  });
  return response.data;
};

const deleteFreePost = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/wp-memo/${id}`);
  return response.data;
};

// WordPress content.rendered HTML에서 순수 텍스트 추출
const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const FreeBoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 입력 폼 상태
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFreePosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }
    if (content.length > 300) {
      alert('내용은 최대 300자까지 작성할 수 있습니다.');
      return;
    }

    try {
      setSubmitting(true);
      const newPost = await createFreePost(nickname.trim(), content.trim());
      // 새 글을 목록 맨 앞에 추가 (새로고침 없이 실시간 반영)
      setPosts(prev => [newPost, ...prev]);
      setContent('');
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      alert('게시글 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;

    try {
      await deleteFreePost(id);
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 포스트 제목([닉네임])과 본문(content)을 파싱
  const parsePost = (post) => {
    const nickname = post.title?.replace(/\[|\]/g, '') || '익명';
    const text = stripHtml(post.content);
    return { nickname, text };
  };

  return (
    <div className={styles.boardContainer}>
      <h2 className={styles.boardTitle}>자유게시판</h2>
      <p className={styles.boardSubtitle}>성도들 간의 따뜻한 소통과 나눔의 공간입니다.</p>

      {/* 글쓰기 폼 */}
      <form className={styles.memoFormCard} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={styles.nicknameInput}
            maxLength={20}
            disabled={submitting}
            required
          />
          <textarea
            placeholder="따뜻한 이야기를 나누어 주세요 (최대 300자)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.contentTextarea}
            maxLength={300}
            disabled={submitting}
            required
          />
        </div>
        <div className={styles.formFooter}>
          <span className={styles.charCount}>{content.length} / 300자</span>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting || !nickname.trim() || !content.trim()}
          >
            {submitting ? (
              <div className={styles.spinner}></div>
            ) : (
              <><FaPaperPlane /> 등록</>
            )}
          </button>
        </div>
      </form>

      {/* 게시글 목록 */}
      {loading ? (
        <div className={styles.loading}>게시글을 불러오는 중...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : posts.length === 0 ? (
        <div className={styles.memoGrid}>
          <div className={styles.noData}>등록된 자유게시물이 없습니다. 첫 글을 작성해 보세요!</div>
        </div>
      ) : (
        <div className={styles.memoGrid}>
          {posts.map((post) => {
            const { nickname, text } = parsePost(post);
            return (
              <div key={post.id} className={styles.memoCard}>
                <div className={styles.memoHeader}>
                  <span className={styles.nickname}>{nickname}</span>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className={styles.deleteButton}
                    title="삭제"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
                <div className={styles.memoContent}>{text}</div>
                <div className={styles.memoFooter}>
                  {post.date
                    ? new Date(post.date).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FreeBoardPage;
