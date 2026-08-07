import React, { useState } from "react";
import "./CreateDoctor.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaEye,
  FaEyeSlash,
  FaSave,
} from "react-icons/fa";

const API_BASE = "https://mediconnect-pro-gzv5.onrender.com/api";

const CreateDoctor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Role: "Doctor",
  });

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const { Name, Email, Password } = doctorData;
    if (!Name.trim()) {
      Swal.fire({ icon: "warning", title: "Name required", text: "Please enter the doctor's name.", confirmButtonColor: "#0F4C81" });
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(Email)) {
      Swal.fire({ icon: "warning", title: "Invalid email", text: "Please enter a valid email address.", confirmButtonColor: "#0F4C81" });
      return false;
    }
    if (!Password || Password.length < 6) {
      Swal.fire({ icon: "warning", title: "Weak password", text: "Password should be at least 6 characters long.", confirmButtonColor: "#0F4C81" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      // Attempt to read token from common keys used across the app
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("adminToken") ||
        localStorage.getItem("accessToken");

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        ...doctorData,
      };

      const res = await axios.post(`${API_BASE}/doctor/create`, payload, { headers });

      await Swal.fire({ icon: "success", title: "Doctor created", text: res.data?.message || "Doctor account created successfully.", timer: 1600, showConfirmButton: false });

      // Redirect to admin home after popup
      navigate("/adminDashboard");

      setDoctorData({ Name: "", Email: "", Password: "", Role: "Doctor" });
    } catch (err) {
      console.error("CreateDoctor error:", err);
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err.response?.data?.message || err.message || "Something went wrong",
        confirmButtonColor: "#0F4C81",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="createDoctorPage">
      <div className="doctorCreateContainer">
        <div className="doctorCreateHeader">
          <h2>Create Doctor</h2>
          <p>Add a new doctor into Hospital Management System</p>
        </div>

        <form className="doctorCreateForm" onSubmit={handleSubmit}>
          <div className="doctorInputBox">
            <FaUserMd className="doctorInputIcon" />
            <input type="text" name="Name" placeholder="Doctor Name" value={doctorData.Name} onChange={handleChange} required />
          </div>

          <div className="doctorInputBox">
            <FaEnvelope className="doctorInputIcon" />
            <input type="email" name="Email" placeholder="Doctor Email" value={doctorData.Email} onChange={handleChange} required />
          </div>

          <div className="doctorInputBox">
            <FaLock className="doctorInputIcon" />
            <input type={showPassword ? "text" : "password"} name="Password" placeholder="Strong Password" value={doctorData.Password} onChange={handleChange} required />
            <span className="doctorPasswordToggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>

          <div className="doctorInputBox">
            <FaUserTag className="doctorInputIcon" />
            <select name="Role" value={doctorData.Role} onChange={handleChange}>
              <option>Doctor</option>
            </select>
          </div>

          <button className="doctorSubmitBtn" type="submit" disabled={loading}>
            <FaSave /> {loading ? "Creating..." : "Create Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctor;