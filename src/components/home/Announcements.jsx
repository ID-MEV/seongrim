import React, { useState, useEffect } from 'react';
import styles from './Announcements.module.css';
import { FaBullhorn, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트 추가
import { getPostsByCategory, getCategories } from '../../api/wordpress';

const BULLETIN_CATEGORY_ID = 5; // 주보 카테고리 ID
const CHURCH_NEWS_CATEGORY_ID = 6; // 교회소식 카테고리 ID

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]); // 교회소식 데이터를 저장할 상태
  const [latestBulletin, setLatestBulletin] = useState(null); // 최신 주보 정보를 저장할 상태

  // 교회소식 데이터 가져오기
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getPostsByCategory(CHURCH_NEWS_CATEGORY_ID, 1, 4); // 최신 4개의 교회소식 가져오기
        setAnnouncements(response.posts.map(post => ({
          id: post.id,
          title: post.title ? post.title.rendered : '',
          date: new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').trim(), // 날짜 형식 변경
          link: `/news/church-news?id=${post.id}` // 상세 페이지 링크
        })));
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchLatestBulletin = async () => {
      try {
        // 주보 카테고리에서 최신 게시물 1개만 가져옵니다.
        const response = await getPostsByCategory(BULLETIN_CATEGORY_ID, 1, 1);
        if (response.posts.length > 0) {
          setLatestBulletin(response.posts[0]);
        }
      } catch (error) {
        console.error('Failed to fetch latest bulletin:', error);
      }
    };

    fetchLatestBulletin();
  }, []);

  // 주보 제목 파싱 함수 (실제 데이터 형식에 맞게 수정)
  const parseBulletinTitle = (fullTitle) => {
    // 예상 형식: "YYYY년 MM월 DD일 주보"
    // 또는 "YYYY-MM-DD | 제N권 N호 | 주보 제목" (이전 가정)
    // 현재는 "YYYY년 MM월 DD일 주보" 형식으로 들어오는 것으로 확인됨.
    const parts = fullTitle.split(' | ').map(part => part.trim());

    let datePart = '';
    let issuePart = '';
    let titlePart = '';

    if (parts.length === 1) {
      // "YYYY년 MM월 DD일 주보" 형식일 경우
      datePart = fullTitle.replace(' 주보', ''); // " 주보" 부분을 제거하여 날짜만 남김
      titlePart = fullTitle; // 전체 제목을 titlePart로 사용
    } else if (parts.length >= 3) {
      // "YYYY-MM-DD | 제N권 N호 | 주보 제목" 형식일 경우 (이전 가정)
      datePart = parts[0];
      issuePart = parts[1];
      titlePart = parts[2];
    }

    return { datePart, issuePart, titlePart };
  };

  const bulletinInfo = latestBulletin && latestBulletin.title ? parseBulletinTitle(latestBulletin.title.rendered || '') : { datePart: '', issuePart: '', titlePart: '' };

  const displayTitle = bulletinInfo.titlePart || '최신 주보';
  const displayDateAndIssue = bulletinInfo.datePart + (bulletinInfo.issuePart ? ` (${bulletinInfo.issuePart})` : '');
  const displayLink = latestBulletin ? `/news/bulletin?id=${latestBulletin.id}` : '#';

  const weeklyReport = {
    title: displayTitle,
    date: displayDateAndIssue,
    link: displayLink
  };

  return (
    <section className={styles.announcementsSection}>
      <div className={styles.container}>
        <div className={styles.announcements}>
          <h3 className={styles.title}><FaBullhorn /> 교회소식</h3>
          <ul className={styles.list}>
            {announcements.map(item => (
              <li key={item.id}>
                <a href="#">{item.title}</a>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
          <Link to="/news/church-news" className={styles.moreLink}><FaPlus /> 더보기</Link>
        </div>
        <div className={styles.weeklyReport}>
          <h3 className={styles.title}>주보 보기</h3>
          <div className={styles.reportBox}>
            <p>{weeklyReport.title}</p>
            <span>{weeklyReport.date}</span>
            <a href={weeklyReport.link} className={styles.reportLink}>바로가기</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
