import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'calc(2rem)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;