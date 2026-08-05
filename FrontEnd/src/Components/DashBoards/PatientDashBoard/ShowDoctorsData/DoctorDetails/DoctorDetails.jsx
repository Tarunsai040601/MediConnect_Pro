import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DoctorDetails.css";

const DoctorDetails = () => {
  const { state: doctor } = useLocation();
  const navigate = useNavigate();

  if (!doctor) {
    return <h2>No Doctor Details Found</h2>;
  }


  return (
    <div className="doctor-details-page">
      <div className="doctor-banner">
        <img
          src={doctor.ProfileImage}
          alt={doctor.Name}
          onError={(e) => {
            e.target.src =
              "https://cdn-icons-png.flaticon.com/512/387/387561.png";
          }}
        />

        <div className="doctor-info">
          <h1>Dr. {doctor.Name}</h1>

          <h3>{doctor.Specialization}</h3>

          <p>{doctor.AboutDoctor}</p>
        </div>
      </div>

      <div className="details-grid">
        <div className="card">
          <h3>Qualification</h3>
          <p>{doctor.Qualification}</p>
        </div>

        <div className="card">
          <h3>Experience</h3>
          <p>{doctor.Experience}</p>
        </div>

        <div className="card">
          <h3>Hospital</h3>
          <p>{doctor.HospitalName}</p>
        </div>

        <div className="card">
          <h3>Address</h3>
          <p>{doctor.HospitalAddress}</p>
        </div>

        <div className="card">
          <h3>Phone</h3>
          <p>{doctor.PhoneNumber}</p>
        </div>

        <div className="card">
          <h3>Fee</h3>
          <p>₹ {doctor.ConsultationFee}</p>
        </div>

        <div className="card">
          <h3>Available Days</h3>
          <p>{doctor.AvailableDays}</p>
        </div>

        <div className="card">
          <h3>Available Time</h3>
          <p>{doctor.AvailableTime}</p>
        </div>

        <div className="card">
          <h3>Status</h3>
          <p>{doctor.IsAvailable ? "🟢 Available" : "🔴 Not Available"}</p>
        </div>
      </div>

      <div className="working-images">
        <h2>Doctor Working Gallery</h2>

        <div className="gallery">
          {doctor.WorkingImage?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="working"
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/387/387561.png";
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
