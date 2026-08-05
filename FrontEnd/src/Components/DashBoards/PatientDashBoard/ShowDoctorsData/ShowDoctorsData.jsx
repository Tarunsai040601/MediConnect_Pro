import React, { useEffect, useState } from "react";
import "./ShowDoctorsData.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaPhoneAlt,
  FaHospital,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaCalendarCheck,
  FaEye,
  FaSearch,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
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
        doctor.AuthId?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.Specialization?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredDoctors(filtered);
  }, [search, doctors]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/doctorDetails/profile`
      );

      // API returns single object -> convert to array
      const doctor = res.data.details;

      setDoctors([doctor]);
      setFilteredDoctors([doctor]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (doctor) => {
    navigate(`/patient/doctor/${doctor.DoctorId}`, {
      state: doctor,
    });
  };

  const handleBook = (doctor) => {
    navigate("/patient/book", {
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
        <h1>Our Specialist Doctor</h1>
        <p>
          Book your appointment with our experienced specialist.
        </p>
      </div>

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="doctor-grid">

        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor.DoctorId}>

              <div className="doctor-image">
                <img
                  src={doctor.ProfileImage}
                  alt={doctor.AuthId}
                />
              </div>

              <div className="doctor-details">

                <h2>
                  <FaUserMd />
                  {doctor.AuthId}
                </h2>

                <p>
                  <FaBriefcaseMedical />
                  <strong>Specialization :</strong>
                  {doctor.Specialization}
                </p>

                <p>
                  <FaGraduationCap />
                  <strong>Qualification :</strong>
                  {doctor.Qualification}
                </p>

                <p>
                  <FaHospital />
                  <strong>Hospital :</strong>
                  {doctor.HospitalName}
                </p>

                <p>
                  <FaPhoneAlt />
                  <strong>Phone :</strong>
                  {doctor.PhoneNumber}
                </p>

                <p>
                  <FaMoneyBillWave />
                  <strong>Fee :</strong>
                  ₹{doctor.ConsultationFee}
                </p>

                <p>
                  <FaClock />
                  <strong>Time :</strong>
                  {doctor.AvailableTime}
                </p>

                <p>
                  <FaMapMarkerAlt />
                  <strong>Address :</strong>
                  {doctor.HospitalAddress}
                </p>

                <p>
                  <strong>Experience :</strong>
                  {doctor.Experience}
                </p>

                <p>
                  <strong>Status :</strong>{" "}
                  {doctor.IsAvailable ? (
                    <span style={{ color: "green" }}>
                      🟢 Available
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      🔴 Not Available
                    </span>
                  )}
                </p>

                <div className="doctor-buttons">

                  <button
                    className="view-btn"
                    onClick={() => handleView(doctor)}
                  >
                    <FaEye />
                    View Profile
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
        ) : (
          <h2 className="no-data">
            No Doctors Found
          </h2>
        )}

      </div>
    </div>
  );
};

export default ShowDoctorsData;