import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AuthContext = createContext(null);

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15분 (ms)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_username');
    sessionStorage.removeItem('admin_last_activity');
    setUser(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    window.location.href = '/';
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (!sessionStorage.getItem('admin_token')) return;

    const now = Date.now();
    sessionStorage.setItem('admin_last_activity', now.toString());

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      alert('15분 동안 활동이 없어 세션이 만료되었습니다. 다시 로그인해 주세요.');
      logout();
    }, INACTIVITY_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    const username = sessionStorage.getItem('admin_username');
    const lastActivity = sessionStorage.getItem('admin_last_activity');

    if (token && username) {
      const now = Date.now();
      const timePassed = lastActivity ? now - parseInt(lastActivity, 10) : 0;

      if (timePassed > INACTIVITY_TIMEOUT) {
        // 이미 15분이 초과한 경우 로그아웃
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_username');
        sessionStorage.removeItem('admin_last_activity');
        setUser(null);
      } else {
        setUser({ username, token });
        // 남은 시간 계산 후 타이머 재설정
        const remainingTime = INACTIVITY_TIMEOUT - timePassed;
        timeoutRef.current = setTimeout(() => {
          alert('15분 동안 활동이 없어 세션이 만료되었습니다. 다시 로그인해 주세요.');
          logout();
        }, remainingTime);
      }
    }
    setLoading(false);
  }, [logout]);

  // 사용자 활동 감지 이벤트 등록 (마우스 이동, 키보드 입력, 터치, 스크롤 등)
  useEffect(() => {
    if (!user) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    // 디바운스로 너무 잦은 업데이트 방지
    let lastExecuted = 0;
    const handleUserActivity = () => {
      const now = Date.now();
      if (now - lastExecuted > 2000) { // 2초마다 갱신
        lastExecuted = now;
        resetInactivityTimer();
      }
    };

    events.forEach((event) => window.addEventListener(event, handleUserActivity));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user, resetInactivityTimer]);

  const login = (token, username) => {
    const now = Date.now();
    sessionStorage.setItem('admin_token', token);
    sessionStorage.setItem('admin_username', username);
    sessionStorage.setItem('admin_last_activity', now.toString());
    setUser({ username, token });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      alert('15분 동안 활동이 없어 세션이 만료되었습니다. 다시 로그인해 주세요.');
      logout();
    }, INACTIVITY_TIMEOUT);
  };

  return (
    <AuthContext.Provider value={{ user, token: user?.token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
