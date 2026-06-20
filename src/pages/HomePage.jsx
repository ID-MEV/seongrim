import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SermonSection from '../components/home/SermonSection';
import Announcements from '../components/home/Announcements';
import QuickLinks from '../components/home/QuickLinks';
import AdminPanel from './AdminPanel';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <AdminPanel />}
      <HeroSection />
      <SermonSection />
      <Announcements />
      <QuickLinks />
    </>
  );
};

export default HomePage;
