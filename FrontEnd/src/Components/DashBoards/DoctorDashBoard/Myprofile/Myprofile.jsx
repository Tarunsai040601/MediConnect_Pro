import React, { useEffect, useState } from "react";
import "./Myprofile.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUserMd,
  FaEnvelope,
  FaPhoneAlt,
  FaHospital,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaMoneyBillWave,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const API = "https://mediconnect-pro-gzv5.onrender.com/api";

const Myprofile = () => {
  const [doctor, setDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profileImage, setProfileImage] = useState(null);
  const [workingImages, setWorkingImages] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("doctorToken");

      const res = await axios.get(
        `${API}/doctorDetails/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDoctor(res.data.details);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title:
          err.response?.data?.message ||
          "Unable to fetch profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("doctorToken");

      const formData = new FormData();

      Object.keys(doctor).forEach((key) => {
        formData.append(key, doctor[key]);
      });

      if (profileImage) {
        formData.append("ProfileImage", profileImage);
      }

      workingImages.forEach((img) => {
        formData.append("WorkingImage", img);
      });

      const res = await axios.patch(
        `${API}/doctorDetails/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: res.data.message,
      });

      setEditMode(false);

      fetchProfile();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title:
          err.response?.data?.message ||
          "Update Failed",
      });
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="profile-loading">
        <h2>No Profile Found</h2>
      </div>
    );
  }return (
  <div className="myprofile-container">
    <div className="profile-card">

      <div className="profile-header">

        <img
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : doctor.ProfileImage ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="Doctor"
          className="profile-image"
        />

        <div className="profile-info">

          {editMode ? (
            <>
              <input
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />

              <input
                className="edit-input"
                name="Specialization"
                value={doctor.Specialization || ""}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <h2>Dr. {doctor.Name}</h2>

              <span className="specialization">
                {doctor.Specialization}
              </span>

              <div className="availability">
                <FaCheckCircle />
                {doctor.IsAvailable ? " Available" : " Not Available"}
              </div>
            </>
          )}

        </div>

        <div className="edit-actions">

          {!editMode ? (
            <button
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <>
              <button
                className="save-btn"
                onClick={handleUpdate}
              >
                <FaSave /> Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setEditMode(false);
                  fetchProfile();
                }}
              >
                <FaTimes /> Cancel
              </button>
            </>
          )}

        </div>

      </div>

      <div className="profile-details">

        {[
          {
            icon: <FaEnvelope />,
            label: "Email",
            name: "Email",
          },
          {
            icon: <FaPhoneAlt />,
            label: "Phone",
            name: "PhoneNumber",
          },
          {
            icon: <FaGraduationCap />,
            label: "Qualification",
            name: "Qualification",
          },
          {
            icon: <FaBriefcaseMedical />,
            label: "Experience",
            name: "Experience",
          },
          {
            icon: <FaHospital />,
            label: "Hospital",
            name: "HospitalName",
          },
          {
            icon: <FaMoneyBillWave />,
            label: "Consultation Fee",
            name: "ConsultationFee",
          },
          {
            icon: <FaCalendarAlt />,
            label: "Available Days",
            name: "AvailableDays",
          },
          {
            icon: <FaClock />,
            label: "Available Time",
            name: "AvailableTime",
          },
        ].map((item) => (
          <div className="detail-box" key={item.name}>
            {item.icon}

            <div className="detail-content">
              <label>{item.label}</label>

              {editMode && item.name !== "Email" ? (
                <input
                  className="edit-input"
                  name={item.name}
                  value={doctor[item.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <span>{doctor[item.name]}</span>
              )}
            </div>
          </div>
        ))}

      </div>

      <div className="about-section">

        <h3>
          <FaMapMarkerAlt /> Hospital Address
        </h3>

        {editMode ? (
          <textarea
            className="edit-textarea"
            rows="3"
            name="HospitalAddress"
            value={doctor.HospitalAddress || ""}
            onChange={handleChange}
          />
        ) : (
          <p>{doctor.HospitalAddress}</p>
        )}

      </div>

      <div className="about-section">

        <h3>
          <FaUserMd /> About Doctor
        </h3>

        {editMode ? (
          <textarea
            className="edit-textarea"
            rows="5"
            name="AboutDoctor"
            value={doctor.AboutDoctor || ""}
            onChange={handleChange}
          />
        ) : (
          <p>{doctor.AboutDoctor}</p>
        )}

      </div>

      <div className="gallery-section">

        <h3>Working Images</h3>

        {editMode && (
          <input
            type="file"
            multiple
            onChange={(e) =>
              setWorkingImages([...e.target.files])
            }
          />
        )}

        <div className="gallery">

          {doctor.WorkingImage &&
            doctor.WorkingImage.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="work"
                className="gallery-img"
              />
            ))}

        </div>

      </div>

    </div>
  </div>
);
};

export default Myprofile;