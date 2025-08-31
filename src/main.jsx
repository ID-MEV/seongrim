import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import './index.css';

// Layout Imports (Lazy Loaded)
const WelcomeLayout = lazy(() => import('./pages/Welcome/WelcomeLayout.jsx'));
const AboutLayout = lazy(() => import('./pages/About/AboutLayout.jsx'));
const SermonsLayout = lazy(() => import('./pages/Sermons/SermonsLayout.jsx'));
const EducationLayout = lazy(() => import('./pages/Education/EducationLayout.jsx'));
const NewsLayout = lazy(() => import('./pages/News/NewsLayout.jsx'));

// Page Imports (Lazy Loaded)
const GreetingsPage = lazy(() => import('./pages/Welcome/GreetingsPage.jsx'));
const NewFamilyPage = lazy(() => import('./pages/Welcome/NewFamilyPage.jsx'));
const ServiceTimesPage = lazy(() => import('./pages/Welcome/ServiceTimesPage.jsx'));
const DirectionsPage = lazy(() => import('./pages/Welcome/DirectionsPage.jsx'));
const VisionPage = lazy(() => import('./pages/About/VisionPage.jsx'));
const StaffPage = lazy(() => import('./pages/About/StaffPage.jsx'));
const HistoryPage = lazy(() => import('./pages/About/HistoryPage.jsx'));
const SundaySermonPage = lazy(() => import('./pages/Sermons/SundaySermonPage.jsx'));
const ChoirPage = lazy(() => import('./pages/Sermons/ChoirPage.jsx'));
const SpecialPraisePage = lazy(() => import('./pages/Sermons/SpecialPraisePage.jsx'));
const ToddlerPage = lazy(() => import('./pages/Education/ToddlerPage.jsx'));
const ElementaryPage = lazy(() => import('./pages/Education/ElementaryPage.jsx'));
const YouthPage = lazy(() => import('./pages/Education/YouthPage.jsx'));
const YoungAdultPage = lazy(() => import('./pages/Education/YoungAdultPage.jsx'));
const ChurchNewsPage = lazy(() => import('./pages/News/ChurchNewsPage.jsx'));
const BulletinPage = lazy(() => import('./pages/News/BulletinPage.jsx'));
const AlbumPage = lazy(() => import('./pages/News/AlbumPage.jsx'));
const FreeBoardPage = lazy(() => import('./pages/News/FreeBoardPage.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      // Welcome
      {
        path: '/welcome',
        element: <Suspense fallback={<div>Loading Welcome...</div>}><WelcomeLayout /></Suspense>,
        children: [
          { path: 'greetings', element: <Suspense fallback={<div>Loading Greetings...</div>}><GreetingsPage /></Suspense> },
          { path: 'new-family', element: <Suspense fallback={<div>Loading New Family...</div>}><NewFamilyPage /></Suspense> },
          { path: 'service-times', element: <Suspense fallback={<div>Loading Service Times...</div>}><ServiceTimesPage /></Suspense> },
          { path: 'directions', element: <Suspense fallback={<div>Loading Directions...</div>}><DirectionsPage /></Suspense> },
        ],
      },
      // About
      {
        path: '/about',
        element: <Suspense fallback={<div>Loading About...</div>}><AboutLayout /></Suspense>,
        children: [
          { path: 'vision', element: <Suspense fallback={<div>Loading Vision...</div>}><VisionPage /></Suspense> },
          { path: 'staff', element: <Suspense fallback={<div>Loading Staff...</div>}><StaffPage /></Suspense> },
          { path: 'history', element: <Suspense fallback={<div>Loading History...</div>}><HistoryPage /></Suspense> },
        ],
      },
      // Sermons
      {
        path: '/sermons',
        element: <Suspense fallback={<div>Loading Sermons...</div>}><SermonsLayout /></Suspense>,
        children: [
          { path: 'sunday', element: <Suspense fallback={<div>Loading Sunday Sermon...</div>}><SundaySermonPage /></Suspense> },
          { path: 'choir', element: <Suspense fallback={<div>Loading Choir...</div>}><ChoirPage /></Suspense> },
          { path: 'special-praise', element: <Suspense fallback={<div>Loading Special Praise...</div>}><SpecialPraisePage /></Suspense> },
        ],
      },
      // Education
      {
        path: '/education',
        element: <Suspense fallback={<div>Loading Education...</div>}><EducationLayout /></Suspense>,
        children: [
          { path: 'toddler', element: <Suspense fallback={<div>Loading Toddler...</div>}><ToddlerPage /></Suspense> },
          { path: 'elementary', element: <Suspense fallback={<div>Loading Elementary...</div>}><ElementaryPage /></Suspense> },
          { path: 'youth', element: <Suspense fallback={<div>Loading Youth...</div>}><YouthPage /></Suspense> },
          { path: 'young-adult', element: <Suspense fallback={<div>Loading Young Adult...</div>}><YoungAdultPage /></Suspense> },
        ],
      },
      // News
      {
        path: '/news',
        element: <Suspense fallback={<div>Loading News...</div>}><NewsLayout /></Suspense>,
        children: [
          { path: 'church-news', element: <Suspense fallback={<div>Loading Church News...</div>}><ChurchNewsPage /></Suspense> },
          { path: 'bulletin', element: <Suspense fallback={<div>Loading Bulletin...</div>}><BulletinPage /></Suspense> },
          { path: 'album', element: <Suspense fallback={<div>Loading Album...</div>}><AlbumPage /></Suspense> },
          { path: 'free-board', element: <Suspense fallback={<div>Loading Free Board...</div>}><FreeBoardPage /></Suspense> },
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
