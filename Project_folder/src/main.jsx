import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#0f172a',
              color: '#fff',
              border: '1px solid #3b82f6',
              padding: '16px',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
