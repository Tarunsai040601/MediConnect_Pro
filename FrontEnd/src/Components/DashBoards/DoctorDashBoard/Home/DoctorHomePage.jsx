import React from "react";
import "./DoctorHomePage.css";
import {
  FaCalendarCheck,
  FaUserMd,
  FaHeartbeat,
  FaArrowRight,
} from "react-icons/fa";

const DoctorHomePage = () => {
  return (
    <div className="doctor-home">

      <div className="doctor-home-left">
        <span className="welcome-tag">
          👨‍⚕️ Welcome Doctor
        </span>

        <h1>
          Manage Your <span>Patients</span> <br />
          With Confidence
        </h1>

        <p>
          View appointments, monitor patient records, manage schedules,
          and provide quality healthcare from one secure dashboard.
        </p>

        <div className="doctor-btns">
          <button className="primary-btn">
            View Appointments
            <FaArrowRight />
          </button>

          <button className="secondary-btn">
            Patient Records
          </button>
        </div>

        <div className="doctor-stats">

          <div className="stat-card">
            <FaUserMd />
            <div>
              <h3>250+</h3>
              <p>Patients</p>
            </div>
          </div>

          <div className="stat-card">
            <FaCalendarCheck />
            <div>
              <h3>35</h3>
              <p>Today's Appointments</p>
            </div>
          </div>

          <div className="stat-card">
            <FaHeartbeat />
            <div>
              <h3>98%</h3>
              <p>Success Rate</p>
            </div>
          </div>

        </div>

      </div>

      <div className="doctor-home-right">

        <div className="circle-bg"></div>

        <img
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80"
          alt="doctor"
          className="doctor-image"
        />

        <div className="floating-card top-card">
          <p>Blood Pressure</p>
          <h3>124/80</h3>
        </div>

        <div className="floating-card middle-card">
          <p>Today's Appointment</p>
          <h3>35 Patients</h3>
        </div>

        <div className="floating-card bottom-card">
          <p>AI Suggestions</p>
          <h3>Healthy Progress</h3>
        </div>

      </div>

    </div>
  );
};

export default DoctorHomePage;