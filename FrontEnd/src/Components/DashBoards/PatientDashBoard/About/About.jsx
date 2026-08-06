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
  FaPhoneAlt,
  FaStar,
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

      {/* Emergency & Support */}
      <section className="emergency-section">
        <h2>Emergency Support & Contacts</h2>
        <div className="emergency-container">
          <div className="emergency-card">
            <FaPhoneAlt />
            <h3>Ambulance</h3>
            <p>102 / 108</p>
          </div>
          <div className="emergency-card">
            <FaPhoneAlt />
            <h3>General Helpline</h3>
            <p>104</p>
          </div>
          <div className="emergency-card">
            <FaPhoneAlt />
            <h3>MediConnect Support</h3>
            <p>1800-123-4567</p>
          </div>
        </div>
      </section>

      {/* Tied Up Hospitals */}
      <section className="hospitals-section">
        <h2>Our Partner Hospitals</h2>
        <div className="hospitals-grid">
          <div className="hospital-card">
            <FaHospital />
            <h3>Apollo Hospitals</h3>
            <p>Multi-Specialty Care</p>
          </div>
          <div className="hospital-card">
            <FaHospital />
            <h3>Fortis Healthcare</h3>
            <p>Advanced Surgery Center</p>
          </div>
          <div className="hospital-card">
            <FaHospital />
            <h3>Max Super Specialty</h3>
            <p>Cardiac & Neuro Center</p>
          </div>
          <div className="hospital-card">
            <FaHospital />
            <h3>AIIMS</h3>
            <p>Premier Research & Care</p>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials */}
      <section className="reviews-section">
        <h2>Patient Reviews</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"MediConnectPro made booking my appointments so easy. I no longer have to wait in long queues at the hospital."</p>
            <h4>- Rahul S.</h4>
          </div>
          <div className="review-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"The best healthcare platform I've used. Accessing my medical records securely is incredibly convenient."</p>
            <h4>- Priya M.</h4>
          </div>
          <div className="review-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"Highly recommend! The doctors are very professional and the partner hospitals provide excellent facilities."</p>
            <h4>- Amit V.</h4>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;