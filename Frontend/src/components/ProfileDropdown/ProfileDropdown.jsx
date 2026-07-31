import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../utils/AuthContext';
import { getInitials } from '../../utils/helpers';
import './ProfileDropdown.css';

const ProfileDropdown = ({ user, dashboardPath }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <div className="profileDropdown" ref={ref}>
      <button className="profileBtn" onClick={() => setOpen(!open)} aria-label="User menu">
        <span className="avatar">{getInitials(user.name)}</span>
        <FaChevronDown className={`chevron ${open ? 'open' : ''}`} />
      </button>
      {open && (
        <div className="dropdown">
          <div className="userInfo">
            <span className="avatar lg">{getInitials(user.name)}</span>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>
          <div className="menuItems">
            {dashboardPath && (
              <Link to={dashboardPath} onClick={() => setOpen(false)}>
                <FaTachometerAlt /> Dashboard
              </Link>
            )}
            <button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
