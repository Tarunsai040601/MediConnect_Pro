import React from "react";
import "./About.css";
import {
  FaHospital,
  FaUserMd,
  FaHeartbeat,
  FaShieldAlt,
  FaBullseye,
  FaEye,
  FaUsers,
  FaAward,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}

      <section className="about-hero">
        <div className="about-overlay">
          <h1>About MediConnectPro</h1>
          <p>
            Delivering quality healthcare with technology, compassion,
            and trusted medical professionals.
          </p>
        </div>
      </section>

      {/* About */}

      <section className="about-container">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900"
            alt="Hospital"
          />
        </div>

        <div className="about-content">
          <h2>Who We Are</h2>

          <p>
            <strong>MediConnectPro</strong> is a modern Hospital Management
            System that connects patients and doctors on one secure platform.
            Patients can book appointments, access medical records, and
            communicate with healthcare professionals with ease.
          </p>

          <p>
            Our mission is to simplify healthcare through innovative
            technology while ensuring secure, reliable, and patient-friendly
            services.
          </p>
        </div>

      </section>

      {/* Mission & Vision */}

      <section className="mission-section">

        <div className="mission-card">
          <FaBullseye />
          <h3>Our Mission</h3>
          <p>
            To provide seamless digital healthcare services that improve
            patient experience and hospital efficiency.
          </p>
        </div>

        <div className="mission-card">
          <FaEye />
          <h3>Our Vision</h3>
          <p>
            To become a trusted healthcare platform connecting patients,
            doctors, and hospitals across the country.
          </p>
        </div>

      </section>

      {/* Why Choose */}

      <section className="why-section">

        <h2>Why Choose MediConnectPro?</h2>

        <div className="why-grid">

          <div className="why-card">
            <FaUserMd />
            <h3>Expert Doctors</h3>
            <p>Highly experienced doctors across multiple specialties.</p>
          </div>

          <div className="why-card">
            <FaHeartbeat />
            <h3>Quality Care</h3>
            <p>Providing compassionate and patient-focused healthcare.</p>
          </div>

          <div className="why-card">
            <FaShieldAlt />
            <h3>Secure Records</h3>
            <p>Your health information is encrypted and protected.</p>
          </div>

          <div className="why-card">
            <FaHospital />
            <h3>Modern Facilities</h3>
            <p>Advanced hospital infrastructure with smart healthcare.</p>
          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats-section">

        <div className="stat-box">
          <FaUsers />
          <h2>10K+</h2>
          <p>Happy Patients</p>
        </div>

        <div className="stat-box">
          <FaUserMd />
          <h2>120+</h2>
          <p>Expert Doctors</p>
        </div>

        <div className="stat-box">
          <FaAward />
          <h2>15+</h2>
          <p>Years Experience</p>
        </div>

        <div className="stat-box">
          <FaHospital />
          <h2>24/7</h2>
          <p>Medical Support</p>
        </div>

      </section>

    </div>
  );
};

export default About;