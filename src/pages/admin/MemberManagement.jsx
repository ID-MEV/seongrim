import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './MemberManagement.module.css';
import { SkeletonMembersCard } from '../../components/Skeleton/Skeleton';

const API_BASE = '/api/admin';

const MemberManagement = () => {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 12;

  const fetchMembers = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: PAGE_SIZE.toString(),
        search,
      });
      const [res] = await Promise.all([
        fetch(`${API_BASE}/members?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        new Promise(r => setTimeout(r, 300)),
      ]);
      if (!res.ok) throw new Error('회원 목록을 불러올 수 없습니다.');
      const data = await res.json();
      setMembers(data.members || data);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(1);
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (!search) return;
    const timer = setTimeout(() => {
      fetchMembers(1);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredMembers = members;

  if (loading) return <SkeletonMembersCard count={PAGE_SIZE} />;
  if (error) return <div className={styles.error}>오류: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>회원 관리 <span className={styles.count}>({members.length}명)</span></h2>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="이름, 직분, 성별로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            autoFocus
          />
          <button className={styles.refreshBtn} onClick={() => fetchMembers(currentPage)}>
            새로고침
          </button>
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className={styles.empty}>
          {search ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
        </div>
      ) : (
        <>
          <div className={styles.cardGrid}>
            {filteredMembers.map((member) => (
              <div key={member.id} className={styles.card}>
                <div className={styles.cardPhoto}>
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={`${member.name} 사진`}
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div className={styles.photoPlaceholder} style={{ display: member.photo_url ? 'none' : 'flex' }}>
                    <span className={styles.placeholderInitial}>{member.name?.charAt(0) || '?'}</span>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.nameRow}>
                    <span className={styles.memberName}>{member.name || '이름 없음'}</span>
                    <span className={styles.memberGender}>{member.gender || '-'}</span>
                  </div>
                  <div className={styles.memberPosition}>{member.position || '직분 없음'}</div>
                  <div className={styles.memberOrder}>순서: {member.order !== undefined ? member.order : '-'}</div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => fetchMembers(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ◀ 이전
              </button>
              <span className={styles.pageInfo}>
                {currentPage} / {totalPages} 페이지
              </span>
              <button
                className={styles.pageBtn}
                onClick={() => fetchMembers(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음 ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemberManagement;