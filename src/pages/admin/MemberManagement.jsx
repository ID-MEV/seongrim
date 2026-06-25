import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../AdminPage.module.css';
import { SkeletonMembers } from '../../components/Skeleton/Skeleton';

const API_BASE = '/api/admin';

const MemberManagement = () => {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('회원 목록을 불러올 수 없습니다.');
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filtered = search
    ? members.filter(
        (m) =>
          (m.이름 && m.이름.includes(search)) ||
          (m.직분 && m.직분.includes(search)) ||
          (m.휴대번호 && m.휴대번호.includes(search))
      )
    : members;

  if (loading) return <SkeletonMembers />;
  if (error) return <div className={styles.empty}>오류: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>회원 목록 ({members.length}명)</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="이름, 직분, 전화번호 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.85rem', width: 200 }}
          />
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={fetchMembers}>
            새로고침
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>{search ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 60 }}>ID</th>
                <th>이름</th>
                <th>직분</th>
                <th>휴대번호</th>
                <th>자택번호</th>
                <th>주소</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.ID}>
                  <td>{member.ID}</td>
                  <td style={{ fontWeight: 600 }}>{member.이름}</td>
                  <td>{member.직분 || '-'}</td>
                  <td style={{ fontSize: '0.85rem' }}>{member.휴대번호 || '-'}</td>
                  <td style={{ fontSize: '0.85rem' }}>{member.자택번호 || '-'}</td>
                  <td style={{ fontSize: '0.8rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {member.주소 || '-'}
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

export default MemberManagement;
