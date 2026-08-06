import React, { useEffect, useState } from "react";
import "./PatientNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const PatientNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [patientName, setPatientName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("patientToken");

      if (token) {
        const decoded = jwtDecode(token);

        setPatientName(decoded.name || decoded.Name || "Patient");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = () => {
  Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("patient_token");

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  });
};

  return (
    <nav className="patient-navbar">
      {/* Logo */}

      <div className="patient-logo">
        <h2>MediConnectPro</h2>
      </div>

      {/* Desktop Menu */}

      <ul className={menuOpen ? "patient-links active" : "patient-links"}>
        <li>
          <Link to="/Mediconnect">Home</Link>
        </li>

        <li>
          <Link to="/Mediconnect/about">About</Link>
        </li>

        <li>
          <Link to="/Mediconnect/doctors">Doctors</Link>
        </li>

        <li>
          <Link to="/Mediconnect/BookAppointment">Book Appointment</Link>
        </li>

        <li>
          <Link to="/Mediconnect/MyAppointments">My Appointments</Link>
        </li>
        <li>
          <Link to="/Mediconnect/Myrecipet">Recipets</Link>
        </li>

        <div className="patient-profile">
         

          <span>
            Welcome:
            <strong> {patientName}</strong>
          </span>
           <FaUserCircle className="profile-icon" />

          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </ul>

      {/* Mobile Toggle */}

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default PatientNavBar;
