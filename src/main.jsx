import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import './index.css';

// Layout Imports
import WelcomeLayout from './pages/Welcome/WelcomeLayout.jsx';
import AboutLayout from './pages/About/AboutLayout.jsx';
import SermonsLayout from './pages/Sermons/SermonsLayout.jsx';
import EducationLayout from './pages/Education/EducationLayout.jsx';
import NewsLayout from './pages/News/NewsLayout.jsx';

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
      {
        path: '/welcome',
        element: <WelcomeLayout />,
        children: [
          { path: 'greetings', element: <GreetingsPage /> },
          { path: 'new-family', element: <NewFamilyPage /> },
          { path: 'service-times', element: <ServiceTimesPage /> },
          { path: 'directions', element: <DirectionsPage /> },
        ],
      },
      // About
      {
        path: '/about',
        element: <AboutLayout />,
        children: [
          { path: 'vision', element: <VisionPage /> },
          { path: 'staff', element: <StaffPage /> },
          { path: 'history', element: <HistoryPage /> },
        ],
      },
      // Sermons
      {
        path: '/sermons',
        element: <SermonsLayout />,
        children: [
          { path: 'sunday', element: <SundaySermonPage /> },
          { path: 'choir', element: <ChoirPage /> },
          { path: 'special-praise', element: <SpecialPraisePage /> },
        ],
      },
      // Education
      {
        path: '/education',
        element: <EducationLayout />,
        children: [
          { path: 'toddler', element: <ToddlerPage /> },
          { path: 'elementary', element: <ElementaryPage /> },
          { path: 'youth', element: <YouthPage /> },
          { path: 'young-adult', element: <YoungAdultPage /> },
        ],
      },
      // News
      {
        path: '/news',
        element: <NewsLayout />,
        children: [
          { path: 'church-news', element: <ChurchNewsPage /> },
          { path: 'bulletin', element: <BulletinPage /> },
          { path: 'album', element: <AlbumPage /> },
          { path: 'free-board', element: <FreeBoardPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
