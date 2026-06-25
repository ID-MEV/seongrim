import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import SermonSection from '../components/home/SermonSection';
import Announcements from '../components/home/Announcements';
import QuickLinks from '../components/home/QuickLinks';
import { SkeletonHero, SkeletonCardSection } from '../components/Skeleton/Skeleton';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 최소 스켈레톤 표시 시간 800ms (부드러운 전환 + 깜빡임 방지)
    const timer = setTimeout(() => setLoading(false), 800);
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
