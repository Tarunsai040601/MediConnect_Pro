import React, { useEffect, useState } from "react";
import "./ShowDoctorsData.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaSearch,
  FaEye,
  FaCalendarCheck,
  FaBriefcaseMedical,
  FaClock,
} from "react-icons/fa";

const API_BASE = "http://localhost:8080/api";

const ShowDoctorsData = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      return (
        doctor.Name?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.Specialization?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredDoctors(filtered);
  }, [search, doctors]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/doctorDetails/DoctorsAllProfile`);

      if (res.data.success) {
        setDoctors(res.data.details);
        setFilteredDoctors(res.data.details);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (doctor) => {
    navigate(`/Mediconnect/doctor/${doctor.DoctorId}`, {
      state: doctor,
    });
  };

 const handleBook = (doctor) => {
  navigate("/Mediconnect/BookAppointment", {
    state: doctor,
  });
};

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Doctors...</h2>
      </div>
    );
  }

  return (
    <div className="show-doctors-page">

      <div className="doctor-header">
        <h1>Our Specialist Doctors</h1>
        <p>Find the right doctor and book your appointment.</p>
      </div>

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search Doctor / Specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="doctor-grid">

        {filteredDoctors.length === 0 ? (
          <h2 className="no-data">
            No Doctors Found
          </h2>
        ) : (
          filteredDoctors.map((doctor) => (
            <div
              className="doctor-card"
              key={doctor.DoctorId}
            >
              <div className="doctor-image">

                <img
                  src={doctor.ProfileImage}
                  alt={doctor.Name}
                  onError={(e) => {
                    e.target.src =
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />

                <span
                  className={
                    doctor.IsAvailable
                      ? "available"
                      : "not-available"
                  }
                >
                  {doctor.IsAvailable
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

              <div className="doctor-details">

                <h2>
                  <FaUserMd /> Dr. {doctor.Name}
                </h2>

                <p>
                  <FaBriefcaseMedical />
                  <strong>Specialization :</strong>{" "}
                  {doctor.Specialization}
                </p>

                <p>
                  <FaClock />
                  <strong>Experience :</strong>{" "}
                  {doctor.Experience}
                </p>

                <div className="doctor-buttons">

                  <button
                    className="view-btn"
                    onClick={() => handleView(doctor)}
                  >
                    <FaEye />
                    View More
                  </button>

                  <button
                    className="book-btn"
                    onClick={() => handleBook(doctor)}
                  >
                    <FaCalendarCheck />
                    Book Appointment
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ShowDoctorsData;