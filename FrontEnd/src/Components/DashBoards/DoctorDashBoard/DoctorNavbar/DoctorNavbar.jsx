import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./DoctorNavabar.css";
import {
  FaHome,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserMd,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [doctorName, setDoctorName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("doctorToken");

      if (token) {
        const decoded = jwtDecode(token);
        setDoctorName(decoded.name || decoded.Name || "Doctor");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    navigate("/");
  };

  return (
    <nav className="doctor-navbar">
      <div className="doctor-logo">
        <FaUserMd className="logo-icon" />
        <span>Doctor Panel</span>
      </div>

      {/* Mobile Toggle */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "doctor-menu active" : "doctor-menu"}>
        <div className="doctor-welcome">
          Welcome: <strong>Dr. {doctorName}</strong>
        </div>

        <li
          className={location.pathname === "/DoctorDashboard" ? "active" : ""}
        >
          <Link to="/DoctorDashboard">
            <FaHome /> Home
          </Link>
        </li>
        <li
          className={location.pathname === "/DoctorDashboard" ? "active" : ""}
        >
          <Link to="/DoctorDashboard/Createprofile">
            <FaUserCircle /> CraeteProfile
          </Link>
        </li>
        <li
          className={
            location.pathname === "/doctor/appointments" ? "active" : ""
          }
        >
          <Link to="/doctor/appointments">
            <FaCalendarCheck /> My Appointments
          </Link>
        </li>

        <li
          className={location.pathname === "/DoctorDashboard" ? "active" : ""}
        >
          <Link to="/DoctorDashboard/Myprofile">
            <FaUserCircle /> My Profile
          </Link>
        </li>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </ul>
    </nav>
  );
};

export default DoctorNavbar;
