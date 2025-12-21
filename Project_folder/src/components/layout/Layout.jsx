import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Define public paths where footer should appear
  const publicPaths = ['/', '/about', '/contact'];
  const showFooter = publicPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
