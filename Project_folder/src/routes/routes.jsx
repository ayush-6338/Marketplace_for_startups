import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../pages/Home/Home'));
const Explore = lazy(() => import('../pages/Explore/Explore'));
const StartupView = lazy(() => import('../pages/Startup/StartupView'));
const Gigs = lazy(() => import('../pages/Gigs/Gigs'));
const GigDetail = lazy(() => import('../pages/Gigs/GigDetail'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const CreateGig = lazy(() => import('../pages/Gigs/CreateGig'));

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

        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gigs/:id" element={<GigDetail />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/create-gig"
          element={
            <PrivateRoute>
              <CreateGig />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </Suspense>
  );
}
