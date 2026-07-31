import { Link, useLocation } from 'react-router-dom';
import { FaHospital, FaTimes, FaBars } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import { useAuth } from '../../utils/AuthContext';
import './Sidebar.css';

const Sidebar = ({ navItems, isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getIcon = (iconName) => {
    const Icon = FaIcons[iconName];
    return Icon ? <Icon /> : null;
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebarHeader">
          <Link to="/" className="logo">
            <FaHospital className="logoIcon" />
            <span>MediConnect</span>
          </Link>
          <button className="closeBtn" onClick={onClose} aria-label="Close sidebar">
            <FaTimes />
          </button>
        </div>

        <div className="userBadge">
          <span className="avatar">{user?.name?.charAt(0)}</span>
          <div>
            <strong>{user?.name}</strong>
            <span className="role">{user?.role}</span>
          </div>
        </div>

        <nav className="sidebarNav" aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={onClose}
            >
              {getIcon(item.icon)}
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="logoutBtn" onClick={logout}>Logout</button>
      </aside>
      {isOpen && <div className="overlay" onClick={onClose} />}
    </>
  );
};

export const SidebarToggle = ({ onClick }) => (
  <button className="sidebarToggle" onClick={onClick} aria-label="Open sidebar">
    <FaBars />
  </button>
);

export default Sidebar;
