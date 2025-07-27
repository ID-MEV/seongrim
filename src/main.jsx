import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import './index.css';

// Page Imports
import GreetingsPage from './pages/Welcome/GreetingsPage.jsx';
import NewFamilyPage from './pages/Welcome/NewFamilyPage.jsx';
import ServiceTimesPage from './pages/Welcome/ServiceTimesPage.jsx';
import DirectionsPage from './pages/Welcome/DirectionsPage.jsx';
import VisionPage from './pages/About/VisionPage.jsx';
import StaffPage from './pages/About/StaffPage.jsx';
import HistoryPage from './pages/About/HistoryPage.jsx';
import SundaySermonPage from './pages/Sermons/SundaySermonPage.jsx';
import ChoirPage from './pages/Sermons/ChoirPage.jsx';
import SpecialPraisePage from './pages/Sermons/SpecialPraisePage.jsx';
import ToddlerPage from './pages/Education/ToddlerPage.jsx';
import ElementaryPage from './pages/Education/ElementaryPage.jsx';
import YouthPage from './pages/Education/YouthPage.jsx';
import YoungAdultPage from './pages/Education/YoungAdultPage.jsx';
import ChurchNewsPage from './pages/News/ChurchNewsPage.jsx';
import BulletinPage from './pages/News/BulletinPage.jsx';
import AlbumPage from './pages/News/AlbumPage.jsx';
import FreeBoardPage from './pages/News/FreeBoardPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      // Welcome
      { path: '/welcome/greetings', element: <GreetingsPage /> },
      { path: '/welcome/new-family', element: <NewFamilyPage /> },
      { path: '/welcome/service-times', element: <ServiceTimesPage /> },
      { path: '/welcome/directions', element: <DirectionsPage /> },
      // About
      { path: '/about/vision', element: <VisionPage /> },
      { path: '/about/staff', element: <StaffPage /> },
      { path: '/about/history', element: <HistoryPage /> },
      // Sermons
      { path: '/sermons/sunday', element: <SundaySermonPage /> },
      { path: '/sermons/choir', element: <ChoirPage /> },
      { path: '/sermons/special-praise', element: <SpecialPraisePage /> },
      // Education
      { path: '/education/toddler', element: <ToddlerPage /> },
      { path: '/education/elementary', element: <ElementaryPage /> },
      { path: '/education/youth', element: <YouthPage /> },
      { path: '/education/young-adult', element: <YoungAdultPage /> },
      // News
      { path: '/news/church-news', element: <ChurchNewsPage /> },
      { path: '/news/bulletin', element: <BulletinPage /> },
      { path: '/news/album', element: <AlbumPage /> },
      { path: '/news/free-board', element: <FreeBoardPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);