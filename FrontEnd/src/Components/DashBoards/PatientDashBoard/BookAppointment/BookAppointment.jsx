import React, { useEffect, useState } from "react";
import "./BookAppointment.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

import {
  FaUser,
  FaUserMd,
  FaHospital,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaNotesMedical,
  FaStethoscope,
  FaMoneyBillWave,
} from "react-icons/fa";

const API_BASE = "https://mediconnect-pro-10ha.onrender.com/api";

const BookAppointment = () => {
  const { state: doctor } = useLocation();

  const [patient, setPatient] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    Disease: "",
    Symptoms: "",
    AppointmentDate: "",
    AppointmentTime: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("patientToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setPatient({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("patientToken");

      const bookingData = {
        DoctorId: doctor.DoctorId,
        Disease: formData.Disease,
        Symptoms: formData.Symptoms,
        AppointmentDate: formData.AppointmentDate,
        AppointmentTime: formData.AppointmentTime,
      };

      const res = await axios.post(
        `${API_BASE}/booking/create`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Appointment Booked",
        text: res.data.message,
      });

      setFormData({
        Disease: "",
        Symptoms: "",
        AppointmentDate: "",
        AppointmentTime: "",
      });
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (!doctor) {
    return <h2>No Doctor Selected</h2>;
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Book Appointment</h1>

        <div className="booking-top">
          {/* Patient */}

          <div className="info-card">
            <h2>
              <FaUser />
              Patient Details
            </h2>

            <p>
              <strong>Name :</strong> {patient.name}
            </p>

            <p>
              <FaEnvelope />
              {patient.email}
            </p>
          </div>

          {/* Doctor */}

          <div className="info-card">
            <h2>
              <FaUserMd />
              Doctor Details
            </h2>

            <p>
              <strong>Doctor :</strong> Dr. {doctor.Name}
            </p>

            <p>
              <FaStethoscope />
              {doctor.Specialization}
            </p>

            <p>
              <FaHospital />
              {doctor.HospitalName}
            </p>

            <p>
              <FaMoneyBillWave />₹ {doctor.ConsultationFee}
            </p>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Disease</label>

            <input
              type="text"
              name="Disease"
              placeholder="Enter Disease"
              value={formData.Disease}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Symptoms</label>

            <textarea
              rows="4"
              name="Symptoms"
              placeholder="Describe Symptoms"
              value={formData.Symptoms}
              onChange={handleChange}
            />
          </div>

          <div className="double-input">
            <div className="input-group">
              <label>
                <FaCalendarAlt />
                Appointment Date
              </label>

              <input
                type="date"
                name="AppointmentDate"
                min={new Date().toISOString().split("T")[0]}
                value={formData.AppointmentDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>
                <FaClock />
                Appointment Time
              </label>

              <input
                type="time"
                name="AppointmentTime"
                value={formData.AppointmentTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit">
            <FaNotesMedical />
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;