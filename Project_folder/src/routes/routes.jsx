import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home/Home'));
const Explore = lazy(() => import('../pages/Explore/Explore'));
const StartupView = lazy(() => import('../pages/Startup/StartupView'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/startup/:id" element={<StartupView />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </Suspense>
  );
}
