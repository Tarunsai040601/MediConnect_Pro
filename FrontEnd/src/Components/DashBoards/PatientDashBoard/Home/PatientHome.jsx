import React, { useEffect, useState } from "react";
import "./PatientHome.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaCalendarCheck,
  FaHeartbeat,
  FaFileMedical,
  FaArrowRight,
  FaStethoscope,
  FaHospitalAlt,
  FaShieldAlt,
} from "react-icons/fa";

const PatientHome = () => {
  const [patientName, setPatientName] = useState("Patient");
  const navigate=useNavigate()
  useEffect(() => {
    try {
      const token = localStorage.getItem("patientToken");

      if (token) {
        const decoded = jwtDecode(token);
        setPatientName(decoded.name || decoded.Name || "Patient");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showDoctors = () => {
    navigate("/Mediconnect/doctors", {
    });
  };
    const handlerBook = () => {
    navigate("/Mediconnect/BookAppointment", {
    });
  };

  const services = [
    {
      icon: <FaUserMd />,
      title: "Find Doctors",
      desc: "Search experienced doctors based on specialization.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Book Appointment",
      desc: "Book appointments online without waiting in queues.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health Records",
      desc: "Access all your medical history securely.",
    },
    {
      icon: <FaFileMedical />,
      title: "Medical Reports",
      desc: "View prescriptions and reports anytime.",
    },
  ];

  return (
    <div className="patient-home">
      {/* ================= HERO ================= */}

      <section className="hero-section">
        <div className="hero-left">
          <span className="hero-tag">
            <FaHospitalAlt /> Welcome to MediConnectPro
          </span>

          <h1>
            Welcome Back,
            <span> {patientName}</span>
          </h1>

          <p>
            Your health is our highest priority. Easily book appointments,
            connect with expert doctors, manage prescriptions, and keep your
            medical records organized—all in one place.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={showDoctors}>
              OurSpecialists
              <FaArrowRight />
            </button>

            {/* <button className="secondary-btn">Find Doctors</button> */}
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700"
            alt="Hospital"
          />
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="stats-section">
        <div className="stat-card">
          <FaUserMd />
          <h2>120+</h2>
          <p>Doctors</p>
        </div>

        <div className="stat-card">
          <FaCalendarCheck />
          <h2>24/7</h2>
          <p>Appointments</p>
        </div>

        <div className="stat-card">
          <FaHeartbeat />
          <h2>100%</h2>
          <p>Patient Care</p>
        </div>

        <div className="stat-card">
          <FaShieldAlt />
          <h2>Secure</h2>
          <p>Medical Data</p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="services-section">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Everything you need for better healthcare.</p>
        </div>

        <div className="services-grid">
          {services.map((item, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <button>
                Explore
                <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY US ================= */}

      <section className="why-us">
        <div className="section-title">
          <h2>Why Choose MediConnectPro?</h2>
        </div>

        <div className="why-container">
          <div className="why-card">
            <FaUserMd />
            <h3>Expert Doctors</h3>
            <p>
              Highly qualified specialists with years of experience across
              multiple departments.
            </p>
          </div>

          <div className="why-card">
            <FaStethoscope />
            <h3>Modern Treatment</h3>
            <p>
              Advanced diagnostic tools and personalized healthcare services.
            </p>
          </div>

          <div className="why-card">
            <FaShieldAlt />
            <h3>Secure Records</h3>
            <p>
              Your health information is protected with secure authentication.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="appointment-banner">
        <div>
          <h2>Need Medical Consultation?</h2>

          <p>
            Book an appointment with our experienced doctors in just one click.
          </p>
        </div>

        <button onClick={handlerBook}>
          Book Now
          <FaArrowRight />
        </button>
      </section>
    </div>
  );
};

export default PatientHome;
