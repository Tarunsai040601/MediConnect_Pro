import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import FloatingButtons from '../components/FloatingButtons/FloatingButtons';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <Navbar />
      <main className="mainContent">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingButtons />
    </div>
  );
};

export default MainLayout;
