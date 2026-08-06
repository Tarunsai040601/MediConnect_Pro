import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaStar,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavBar.css";

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const firstLinkRef = useRef(null);

  // Close menu and restore body scroll
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    // Implement logout logic here
    closeMenu();
    alert("logout sucessfully")
    navigate('/login');
  };

  // Lock body scroll when menu is open (mobile/side menu)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // focus first navigable link for keyboard users
      setTimeout(() => firstLinkRef.current && firstLinkRef.current.focus(), 80);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape key and close when resizing to large screens
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1150 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // Helper for keyboard activation of menu button
  const handleMenuKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMenuOpen((s) => !s);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        id="mcaNavOverlay"
        className={`mca-nav__overlay ${menuOpen ? "mca-is-active" : ""}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      ></div>

      <nav id="mcaAdminNav" className="mca-nav" role="navigation" aria-label="Admin navigation">
        <div
          className="mca-nav__brand"
          onClick={() => {
            navigate("/adminDashboard");
            closeMenu();
          }}
        >
          <span className="mca-nav__brand-icon" aria-hidden>🏥</span>
          <span className="mca-nav__brand-text">MediConnect <b>Admin</b></span>
        </div>

        <ul id="mcaNavLinks" className={`mca-nav__links ${menuOpen ? "mca-is-active" : ""}`}>
          <li className="mca-nav__item">
            <NavLink
              to="/adminDashboard"
              end
              onClick={closeMenu}
              ref={firstLinkRef}
              className={({ isActive }) => `mca-nav__link ${isActive ? "mca-is-current" : ""}`}
            >
              <FaHome className="mca-nav__icon" aria-hidden /> <span>Home</span>
            </NavLink>
          </li>

          <li className="mca-nav__item">
            <NavLink
              to="/adminDashboard/Createdoctors"
              onClick={closeMenu}
              className={({ isActive }) => `mca-nav__link ${isActive ? "mca-is-current" : ""}`}
            >
              <FaUserMd className="mca-nav__icon" aria-hidden /> <span>Create Doctor</span>
            </NavLink>
          </li>

          <li className="mca-nav__item">
            <NavLink
              to="/adminDashboard/ShowDoctors"
              onClick={closeMenu}
              className={({ isActive }) => `mca-nav__link ${isActive ? "mca-is-current" : ""}`}
            >
              <FaUsers className="mca-nav__icon" aria-hidden /> <span>Doctors</span>
            </NavLink>
          </li>

          {/* <li className="mca-nav__item">
            <NavLink
              to="/adminDashboard/Reviews"
              onClick={closeMenu}
              className={({ isActive }) => `mca-nav__link ${isActive ? "mca-is-current" : ""}`}
            >
              <FaStar className="mca-nav__icon" aria-hidden /> <span>Reviews</span>
            </NavLink>
          </li> */}

          {/* keep a logout button inside the mobile slide menu */}
          <li className="mca-nav__item mca-nav__item--mobile-logout">
            <button className="mca-nav__logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="mca-nav__icon" aria-hidden /> <span>Logout</span>
            </button>
          </li>
        </ul>

        {/* Desktop logout: sits to the right of nav-links on wide screens */}
        <div className="mca-nav__logout-desktop">
          <button className="mca-nav__logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="mca-nav__icon" aria-hidden /> <span>Logout</span>
          </button>
        </div>

        <div
          id="mcaMenuToggle"
          className="mca-nav__toggle"
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mcaNavLinks"
          onClick={() => setMenuOpen((s) => !s)}
          onKeyDown={handleMenuKey}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </>
  );
};

export default AdminNavBar;