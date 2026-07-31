import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHospital, FaBars, FaTimes, FaSun, FaMoon, FaCalendarPlus } from 'react-icons/fa';
import { useTheme } from '../../utils/ThemeContext';
import { useAuth } from '../../utils/AuthContext';
import { NAV_LINKS } from '../../utils/constants';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const dashboardPath = user?.role === 'admin' ? '/admin/dashboard'
    : user?.role === 'doctor' ? '/doctor/dashboard'
    : user?.role === 'patient' ? '/patient/dashboard' : null;

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navInner">
        <Link to="/" className="logo" aria-label="MediConnect Pro Home">
          <FaHospital className="logoIcon" />
          <span>MediConnect <strong>Pro</strong></span>
        </Link>

        <nav className={`navLinks ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/emergency" className="emergencyLink" onClick={() => setMenuOpen(false)}>
            Emergency
          </Link>
        </nav>

        <div className="navActions">
          <button className="iconBtn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {isAuthenticated ? (
            <>
              <NotificationDropdown />
              <ProfileDropdown user={user} dashboardPath={dashboardPath} />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient/login')}>Login</Button>
              <Button size="sm" onClick={() => navigate('/book-appointment')}>
                <FaCalendarPlus /> Book Now
              </Button>
            </>
          )}

          <button className="menuToggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
