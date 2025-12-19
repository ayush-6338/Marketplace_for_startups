import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../pages/Home/Home'));
const Explore = lazy(() => import('../pages/Explore/Explore'));
const StartupView = lazy(() => import('../pages/Startup/StartupView'));
const Gigs = lazy(() => import('../pages/Gigs/Gigs'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const Login = lazy(() => import('../pages/Auth/Login'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />

        <Route
          path="/startup/:id"
          element={
            <PrivateRoute>
              <StartupView />
            </PrivateRoute>
          }
        />

        <Route
          path="/gigs"
          element={
            <PrivateRoute>
              <Gigs />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </Suspense>
  );
}
