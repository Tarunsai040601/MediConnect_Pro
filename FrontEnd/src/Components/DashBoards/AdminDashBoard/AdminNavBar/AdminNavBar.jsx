import React, { useState } from "react";
import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaStar,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./AdminNavBar.css";

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="admin-navbar">
      <div className="logo">
        🏥 <span>Hospital AdminDashBoard</span>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <NavLink to="/adminDashboard">
            <FaHome /> Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/adminDashboard/createDoctor">
            <FaUserMd /> Create Doctor
          </NavLink>
        </li>

        <li>
          <NavLink to="/adminDashboard/showDoctors">
            <FaUsers /> Doctors
          </NavLink>
        </li>

        <li>
          <NavLink to="/adminDashboard/reviews">
            <FaStar /> Reviews
          </NavLink>
        </li>

        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </ul>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default AdminNavBar;