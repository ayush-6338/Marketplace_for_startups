import React from 'react';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/routes';

export default function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}
