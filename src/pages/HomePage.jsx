import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import SermonSection from '../components/home/SermonSection';
import Announcements from '../components/home/Announcements';
import QuickLinks from '../components/home/QuickLinks';
import { SkeletonHero, SkeletonCardSection } from '../components/Skeleton/Skeleton';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지 초기 로딩 시 짧은 로딩 시간 후 표시
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main>
        <SkeletonHero />
        <div style={{ padding: '0 16px' }}>
          <SkeletonCardSection count={3} />
        </div>
      </main>
    );
  }

  return (
    <>
      <HeroSection />
      <SermonSection />
      <Announcements />
      <QuickLinks />
    </>
  );
};

export default HomePage;
