import React, { useState, useEffect } from "react";
import "./CreateProfile.css";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const API = "https://mediconnect-pro-q1pw.onrender.com/api";

const CreateProfile = () => {
  const [doctor, setDoctor] = useState({
    Name: "",
    Email: "",
    Specialization: "",
    Qualification: "",
    Experience: "",
    PhoneNumber: "",
    HospitalName: "",
    HospitalAddress: "",
    AboutDoctor: "",
    ConsultationFee: "",
    AvailableDays: "",
    AvailableTime: "",
    IsAvailable: true,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [workingImages, setWorkingImages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("doctorToken");

    if (token) {
      const decoded = jwtDecode(token);

      setDoctor((prev) => ({
        ...prev,
        Name: decoded.name || "",
        Email: decoded.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor({
      ...doctor,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const res = await axios.post(
        `${API}/doctorDetails/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: res.data.message,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="profile-container">

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        <h2>Create Doctor Profile</h2>

        <div className="grid">

          <div className="input-box">
            <label>Name</label>
            <input
              value={doctor.Name}
              readOnly
            />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input
              value={doctor.Email}
              readOnly
            />
          </div>

          <div className="input-box">
            <label>Specialization</label>
            <input
              name="Specialization"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Qualification</label>
            <input
              name="Qualification"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Experience</label>
            <input
              name="Experience"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Phone Number</label>
            <input
              name="PhoneNumber"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Hospital Name</label>
            <input
              name="HospitalName"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Consultation Fee</label>
            <input
              name="ConsultationFee"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="input-box">
          <label>Hospital Address</label>
          <textarea
            rows="3"
            name="HospitalAddress"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="input-box">
          <label>About Doctor</label>
          <textarea
            rows="5"
            name="AboutDoctor"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid">

          <div className="input-box">
            <label>Available Days</label>
            <input
              name="AvailableDays"
              placeholder="Mon-Fri"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Available Time</label>
            <input
              name="AvailableTime"
              placeholder="10AM - 5PM"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="grid">

          <div className="input-box">
            <label>Profile Image</label>
            <input
              type="file"
              onChange={(e) =>
                setProfileImage(e.target.files[0])
              }
            />
          </div>

          <div className="input-box">
            <label>Working Images</label>
            <input
              multiple
              type="file"
              onChange={(e) =>
                setWorkingImages([...e.target.files])
              }
            />
          </div>

        </div>

        <button className="save-btn">
          Create Profile
        </button>

      </form>

    </div>
  );
};

export default CreateProfile;