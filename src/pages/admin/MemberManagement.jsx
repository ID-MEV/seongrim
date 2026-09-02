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
  const [searchField, setSearchField] = useState('이름');
  const [search, setSearch] = useState('');

  const fetchMembers = async (queryValue = search, queryField = searchField) => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/member';
      if (queryValue.trim()) {
        const params = new URLSearchParams({
          field: queryField,
          value: queryValue.trim(),
        });
        url += `?${params.toString()}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('회원 목록을 불러올 수 없습니다.');
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : (data.members || []));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 최초 로드
  useEffect(() => {
    fetchMembers('', searchField);
  }, []);

  // 검색어 입력 시 디바운스로 실시간 자동 검색
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMembers(search, searchField);
    }, 250);
    return () => clearTimeout(timer);
  }, [search, searchField]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>회원 목록 <span className={styles.count}>({members.length}명)</span></h2>
        <div className={styles.searchWrapper}>
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className={styles.searchSelect}
          >
            <option value="이름">이름</option>
            <option value="순">순</option>
            <option value="직분">직분</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            autoFocus
          />
          {search && (
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => setSearch('')}
            >
              초기화
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <SkeletonMembersCard count={8} />
      ) : error ? (
        <div className={styles.error}>오류: {error}</div>
      ) : members.length === 0 ? (
        <div className={styles.empty}>
          {search ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
        </div>
      ) : (
        <div className={styles.cardGrid}>
          {members.map((member, index) => (
            <div key={member.ID || member.id || index} className={styles.card}>
              <div className={styles.cardPhoto}>
                {member.photo_url ? (
                  <img
                    src={member.photo_url.startsWith('http') ? member.photo_url : `https://api.mev.o-r.kr${member.photo_url}`}
                    alt={`${member.이름 || member.name} 사진`}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div className={styles.photoPlaceholder} style={{ display: member.photo_url ? 'none' : 'flex' }}>
                  <span className={styles.placeholderInitial}>
                    {(member.이름 || member.name || '?').charAt(0)}
                  </span>
                </div>
              </div>
              <div className={styles.cardHeader}>
                <div className={styles.nameRow}>
                  <span className={styles.memberName}>{member.이름 || member.name || '이름 없음'}</span>
                  <span className={styles.memberGender}>{member.성별 || member.gender || '-'}</span>
                </div>
                <div className={styles.memberPosition}>{member.직분 || member.position || '직분 미지정'}</div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>순</span>
                  <span className={styles.infoValue}>{member.순 || member.group_name || '미배정'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberManagement;