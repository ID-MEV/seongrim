import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../AdminPage.module.css';

const API_BASE = '/api/admin';

const SettingsManagement = () => {
  const { token } = useAuth();
  const [settings, setSettings] = useState({ background_image_url: '', theme_color: '#1E4040' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('설정을 불러올 수 없습니다.');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      setMessage('오류: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('저장 실패');
      setMessage('✅ 설정이 저장되었습니다.');
    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.loading}>불러오는 중...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '1.1rem', marginBottom: 20 }}>사이트 설정</h2>

      <div style={{ maxWidth: 500 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.9rem' }}>
            테마 색상
          </label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              type="color"
              value={settings.theme_color}
              onChange={(e) => setSettings({ ...settings, theme_color: e.target.value })}
              style={{ width: 50, height: 36, border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer' }}
            />
            <input
              type="text"
              value={settings.theme_color}
              onChange={(e) => setSettings({ ...settings, theme_color: e.target.value })}
              style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.9rem', width: 120 }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.9rem' }}>
            배경 이미지 URL
          </label>
          <input
            type="text"
            value={settings.background_image_url || ''}
            onChange={(e) => setSettings({ ...settings, background_image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.9rem', boxSizing: 'border-box' }}
          />
          {settings.background_image_url && (
            <div style={{ marginTop: 8 }}>
              <img
                src={settings.background_image_url}
                alt="배경 미리보기"
                style={{ maxWidth: 200, maxHeight: 120, borderRadius: 4, border: '1px solid #eee' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? '저장 중...' : '저장'}
        </button>

        {message && (
          <p style={{ marginTop: 12, fontSize: '0.9rem', color: message.startsWith('✅') ? '#28a745' : '#dc3545' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingsManagement;
