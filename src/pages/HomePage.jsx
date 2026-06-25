import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import SermonSection from '../components/home/SermonSection';
import Announcements from '../components/home/Announcements';
import QuickLinks from '../components/home/QuickLinks';
import { SkeletonAnnouncements, SkeletonQuickLinks } from '../components/Skeleton/Skeleton';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeroSection />
      <SermonSection />
      {loading ? (
        <>
          <SkeletonAnnouncements />
          <SkeletonQuickLinks />
        </>
      ) : (
        <>
          <Announcements />
          <QuickLinks />
        </>
      )}
    </>
  );
};

export default HomePage;
