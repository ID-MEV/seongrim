import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SermonSection from '../components/home/SermonSection';
import Announcements from '../components/home/Announcements';
import QuickLinks from '../components/home/QuickLinks';

const HomePage = () => {
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
