import React, { useState, useEffect, useMemo } from 'react';
import BulletinList from './Bulletin/BulletinList';
import BulletinViewer from './Bulletin/BulletinViewer';
import styles from './BulletinPage.module.css';
import { getPostsByCategory, extractImageUrlFromHtml } from '../../api/wordpress';
import { FaSpinner } from 'react-icons/fa'; // 로딩 스피너 아이콘

const BULLETIN_CATEGORY_ID = 5; // 주보 카테고리 ID
const ITEMS_PER_PAGE = 16; // 한 페이지에 표시할 주보 개수

const BulletinPage = () => {
  const [allBulletins, setAllBulletins] = useState([]);
  const [selectedBulletin, setSelectedBulletin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // 기본값: 현재 연도
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBulletins = async () => {
      setLoading(true);
      setError(null);
      try {
        // 워드프레스 API는 모든 게시물을 가져온 후 클라이언트에서 필터링하는 것이 일반적입니다.
        // 연도별 필터링을 위해 모든 주보를 한 번에 가져옵니다.
        // per_page를 충분히 크게 설정하여 모든 주보를 가져오거나, 페이지네이션을 반복 호출할 수 있습니다.
        // 여기서는 간단하게 per_page를 100으로 설정하여 최근 100개의 주보를 가져오는 것으로 가정합니다.
        // 실제 운영 환경에서는 더 견고한 전체 데이터 로딩 전략이 필요할 수 있습니다.
        const response = await getPostsByCategory(BULLETIN_CATEGORY_ID, 1, 100); 
        const processedBulletins = response.posts.map(post => ({
          id: post.id,
          date: post.date, // YYYY-MM-DDTHH:MM:SS 형식
          title: post.title.rendered,
          imageUrl: extractImageUrlFromHtml(post.content.rendered), // 이미지 URL 추출
        })).filter(bulletin => bulletin.imageUrl !== null); // 이미지 URL이 있는 게시물만 필터링

        setAllBulletins(processedBulletins);
        if (processedBulletins.length > 0) {
          setSelectedBulletin(processedBulletins[0]); // 첫 번째 주보를 기본 선택
        }
      } catch (err) {
        console.error("Failed to fetch bulletins:", err);
        setError('주보 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchBulletins();
  }, []);

  // 사용 가능한 연도 목록 생성
  const availableYears = useMemo(() => {
    const years = new Set();
    allBulletins.forEach(bulletin => years.add(new Date(bulletin.date).getFullYear()));
    return Array.from(years).sort((a, b) => b - a); // 최신 연도부터 정렬
  }, [allBulletins]);

  // 선택된 연도에 따라 주보 필터링
  const filteredBulletins = useMemo(() => {
    return allBulletins.filter(bulletin => new Date(bulletin.date).getFullYear() === selectedYear);
  }, [allBulletins, selectedYear]);

  // 페이지네이션 적용
  const totalPages = Math.ceil(filteredBulletins.length / ITEMS_PER_PAGE);
  const paginatedBulletins = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBulletins.slice(startIndex, endIndex);
  }, [filteredBulletins, currentPage]);

  const handleSelectBulletin = (bulletin) => {
    setSelectedBulletin(bulletin);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentPage(1); // 연도 변경 시 1페이지로 초기화
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>주보 보기</h1>
      {loading && (
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>주보 목록을 불러오는 중...</p>
        </div>
      )}
      {error && <div className={styles.errorContainer}><p>{error}</p></div>}
      {!loading && !error && allBulletins.length === 0 && (
        <div className={styles.noDataContainer}><p>주보가 없습니다.</p></div>
      )}
      {!loading && !error && allBulletins.length > 0 && (
        <div className={styles.bulletinContainer}>
          <div className={styles.viewerContainer}>
            <BulletinViewer bulletin={selectedBulletin} />
          </div>
          <div className={styles.listContainer}>
            <BulletinList
              bulletins={paginatedBulletins}
              selectedBulletin={selectedBulletin}
              onSelectBulletin={handleSelectBulletin}
              availableYears={availableYears}
              selectedYear={selectedYear}
              onYearSelect={handleYearSelect}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BulletinPage;