import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar, { SidebarToggle } from '../components/Sidebar/Sidebar';
import { useTheme } from '../utils/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './DashboardLayout.css';

const DashboardLayout = ({ navItems, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="dashboardLayout">
      <Sidebar navItems={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboardMain">
        <header className="dashHeader">
          <div className="headerLeft">
            <SidebarToggle onClick={() => setSidebarOpen(true)} />
            <h1>{title}</h1>
          </div>
          <button className="themeBtn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </header>
        <div className="dashContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
