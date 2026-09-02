import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './SettingsManagement.module.css';
import { SkeletonSettings } from '../../components/Skeleton/Skeleton';

const API_BASE = '/api/admin';

const SettingsManagement = () => {
  const { user } = useAuth();
  const token = user?.token;
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  // 신규 회원 등록 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    group_name: '',
    position: '',
    gender: '남',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // 회원 목록 불러오기
  const fetchMembers = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMembers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('회원 목록 불러오기 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [token]);

  // 사진 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 신규 회원 등록 제출 (사진 선택은 옵션)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setMessage('❌ 이름은 필수 입력 항목입니다.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      // 1. 회원 기본 정보 등록
      const res = await fetch(`${API_BASE}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('회원 등록에 실패했습니다.');
      const newMember = await res.json();

      // 2. 선택된 사진이 있는 경우 사진 업로드 수행
      if (selectedFile && newMember.id) {
        const photoFormData = new FormData();
        photoFormData.append('photo', selectedFile);

        await fetch(`${API_BASE}/members/${newMember.id}/photo`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: photoFormData,
        });
      }

      setMessage('✅ 신규 회원이 성공적으로 등록되었습니다.');
      // 폼 초기화
      setFormData({ name: '', group_name: '', position: '', gender: '남' });
      setSelectedFile(null);
      setPreviewUrl('');
      fetchMembers();
    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 회원 삭제
  const handleDeleteMember = async (id, name) => {
    if (!window.confirm(`'${name}' 회원을 정말로 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`${API_BASE}/members/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('회원 삭제 실패');
      setMessage(`✅ '${name}' 회원이 삭제되었습니다.`);
      fetchMembers();
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  // 기존 회원 사진 별도 업로드
  const handleMemberPhotoUpload = async (id, file) => {
    if (!file) return;
    const photoFormData = new FormData();
    photoFormData.append('photo', file);

    try {
      const res = await fetch(`${API_BASE}/members/${id}/photo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: photoFormData,
      });
      const data = await res.json();
      const pathInfo = data.saved_path ? ` (저장 위치: ${data.saved_path})` : '';
      setMessage(`✅ 회원 사진이 업로드되었습니다.${pathInfo}`);
      fetchMembers();
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  if (loading) return <SkeletonSettings />;

  if (!token) {
    return (
      <div className={styles.section} style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ marginBottom: 12 }}>🔐 관리자 로그인이 필요합니다</h2>
        <p style={{ color: '#666', fontSize: '0.95rem' }}>
          회원 등록, 사진 업로드 및 회원 삭제 기능은 상단 메뉴에서 관리자 계정으로 로그인 후 이용하실 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 1. 신규 회원 추가 세션 */}
      <div className={styles.section}>
        <h2>➕ 신규 회원 등록</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>이름 *</label>
            <input
              type="text"
              placeholder="예: 홍길동"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>순</label>
            <input
              type="text"
              placeholder="예: 1순"
              value={formData.group_name}
              onChange={(e) => setFormData({ ...formData, group_name: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>직분</label>
            <input
              type="text"
              placeholder="예: 집사, 권사, 성도 등"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>성별</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>

          <div className={styles.inputGroupFull}>
            <label>프로필 사진 (선택 사항)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <div className={styles.previewBox}>
                <img src={previewUrl} alt="미리보기" />
                <button
                  type="button"
                  className={styles.removePhotoBtn}
                  onClick={() => { setSelectedFile(null); setPreviewUrl(''); }}
                >
                  사진 취소
                </button>
              </div>
            )}
          </div>

          <div className={styles.btnRow}>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? '등록 중...' : '회원 등록하기'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`${styles.message} ${message.startsWith('✅') ? styles.success : styles.error}`}>
            {message}
          </div>
        )}
      </div>

      {/* 2. 등록된 회원 관리 및 삭제/사진 업로드 세션 */}
      <div className={styles.section} style={{ marginTop: 32 }}>
        <h2>📋 회원 정보 관리 및 삭제 ({members.length}명)</h2>
        <div className={styles.memberTableWrapper}>
          <table className={styles.memberTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>사진</th>
                <th>이름</th>
                <th>순</th>
                <th>직분</th>
                <th>성별</th>
                <th>사진 관리</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: 20 }}>
                    등록된 회원이 없습니다.
                  </td>
                </tr>
              ) : (
                members.map((m) => (
                  <tr key={m.ID || m.id}>
                    <td>{m.ID || m.id}</td>
                    <td>
                      {m.photo_url ? (
                        <img 
                          src={m.photo_url.startsWith('http') ? m.photo_url : `https://api.mev.o-r.kr${m.photo_url}`} 
                          alt={m.이름} 
                          className={styles.tableAvatar} 
                        />
                      ) : (
                        <span className={styles.noPhoto}>없음</span>
                      )}
                    </td>
                    <td><strong>{m.이름 || m.name}</strong></td>
                    <td>{m.순 || m.group_name || '-'}</td>
                    <td>{m.직분 || m.position || '-'}</td>
                    <td>{m.성별 || m.gender || '-'}</td>
                    <td>
                      <label className={styles.uploadLabel}>
                        사진 선택
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleMemberPhotoUpload(m.ID || m.id, e.target.files[0])}
                        />
                      </label>
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteMember(m.ID || m.id, m.이름 || m.name)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
