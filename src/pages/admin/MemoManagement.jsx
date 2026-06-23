import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../AdminPage.module.css';

const API_BASE = '/api/admin';

const MemoManagement = () => {
  const { token } = useAuth();
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMemos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/memos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('게시글을 불러올 수 없습니다.');
      const data = await res.json();
      setMemos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`${API_BASE}/memos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('삭제 실패');
      setMemos(memos.filter((m) => m.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleImportant = async (id, current) => {
    try {
      const res = await fetch(`${API_BASE}/memos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isImportant: current ? 0 : 1 }),
      });
      if (!res.ok) throw new Error('업데이트 실패');
      setMemos(memos.map((m) => (m.id === id ? { ...m, isImportant: current ? 0 : 1 } : m)));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className={styles.loading}>불러오는 중...</div>;
  if (error) return <div className={styles.empty}>오류: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>게시글 관리 ({memos.length}건)</h2>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={fetchMemos}>
          새로고침
        </button>
      </div>

      {memos.length === 0 ? (
        <div className={styles.empty}>등록된 게시글이 없습니다.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 50 }}>ID</th>
                <th>내용</th>
                <th style={{ width: 80 }}>중요</th>
                <th style={{ width: 140 }}>작성일</th>
                <th style={{ width: 100 }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {memos.map((memo) => (
                <tr key={memo.id}>
                  <td>{memo.id}</td>
                  <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {memo.content}
                  </td>
                  <td>
                    {memo.isImportant ? (
                      <span className={`${styles.badge} ${styles.badgeImportant}`}>중요</span>
                    ) : (
                      <span style={{ color: '#aaa' }}>-</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#888' }}>
                    {memo.created_at ? new Date(memo.created_at).toLocaleDateString('ko-KR') : '-'}
                  </td>
                  <td>
                    <button
                      className={`${styles.btn} ${styles.btnSmall}`}
                      onClick={() => handleToggleImportant(memo.id, memo.isImportant)}
                      style={{ background: memo.isImportant ? '#ffc107' : '#6c757d', color: '#fff', marginRight: 4 }}
                    >
                      {memo.isImportant ? '해제' : '지정'}
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                      onClick={() => handleDelete(memo.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemoManagement;
