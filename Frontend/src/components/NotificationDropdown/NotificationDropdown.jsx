import { useState, useRef, useEffect } from 'react';
import { FaBell, FaCalendarCheck, FaUserMd, FaExclamationCircle } from 'react-icons/fa';
import './NotificationDropdown.css';

const notifications = [
  { id: 1, icon: FaCalendarCheck, text: 'Appointment confirmed for Aug 5', time: '2 min ago', unread: true },
  { id: 2, icon: FaUserMd, text: 'Dr. Mitchell updated availability', time: '1 hr ago', unread: true },
  { id: 3, icon: FaExclamationCircle, text: 'Lab results are ready', time: '3 hrs ago', unread: false },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="notifDropdown" ref={ref}>
      <button className="notifBtn" onClick={() => setOpen(!open)} aria-label="Notifications">
        <FaBell />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>
      {open && (
        <div className="dropdown">
          <div className="dropdownHeader">
            <h4>Notifications</h4>
            <span>{unreadCount} new</span>
          </div>
          <ul>
            {notifications.map((n) => (
              <li key={n.id} className={n.unread ? 'unread' : ''}>
                <n.icon className="notifIcon" />
                <div>
                  <p>{n.text}</p>
                  <time>{n.time}</time>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
