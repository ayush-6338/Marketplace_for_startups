import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // logged in
  return children;
};

export default PrivateRoute;
