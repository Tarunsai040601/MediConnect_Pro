import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHospital,
  FaUserMd,
  FaStethoscope,
  FaClinicMedical,
} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const Login = ({ onSwitch, onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { Email, Password } = formData;

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(Email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email Format",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#0F4C81",
      });
      return false;
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    if (!passwordRegex.test(Password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
        confirmButtonColor: "#0F4C81",
      });
      return false;
    }

    return true;
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "https://mediconnect-pro-fg3t.onrender.com/api/authRouter/Login",
        formData,
      );

      const token = res.data.tokenDetails?.token;
      const user = res.data.details;
      const role = user?.role?.toLowerCase();

      console.log("Login Response:", res.data);
      console.log("User:", user);
      console.log("Role:", role);

      if (token && user) {
        localStorage.setItem("user", JSON.stringify(user));

        if (role === "admin") {
          localStorage.setItem("adminToken", token);
        } else if (role === "doctor") {
          localStorage.setItem("doctorToken", token);
        } else if (role === "patient") {
          localStorage.setItem("patientToken", token);
        }

        if (onLogin) {
          onLogin(user);
        }
      }

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: res.data.message || "Login successful.",
        timer: 2000,
        showConfirmButton: false,
      });

      if (role === "admin") {
        navigate("/adminDashBoard");
      } else if (role === "doctor") {
        navigate("/doctorDashBoard");
      } else if (role === "patient") {
        navigate("/Mediconnect");
      }

      // Clear fields on success
      setFormData({
        Email: "",
        Password: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          err.response?.data?.message ||
          err.response?.data?.err_message ||
          "Invalid details. Please try again.",
        confirmButtonColor: "#0F4C81",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Decorative floating health circles */}
      <div className="floating circle-one"></div>
      <div className="floating circle-two"></div>
      <div className="floating circle-three"></div>

      <div className="login-container">
        {/* Left Side: Hospital Branding/Image Panel */}
        <div className="login-visual-panel">
          <div className="visual-overlay"></div>
          <div className="visual-content">
            <div className="hospital-badge">
              <FaHospital className="badge-icon" />
              <span>MediConnect Pro</span>
            </div>
            <h2>Care at Your Fingertips</h2>
            <p>
              Access your medical history, book appointments, and connect with
              specialists seamlessly.
            </p>
            <div className="features-grid">
              <div className="feature-item">
                <FaUserMd className="feat-icon" />
                <span>Top Doctors</span>
              </div>
              <div className="feature-item">
                <FaStethoscope className="feat-icon" />
                <span>Diagnostics</span>
              </div>
              <div className="feature-item">
                <FaClinicMedical className="feat-icon" />
                <span>Secure Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="login-form-panel">
          <form className="login-form" onSubmit={loginHandler}>
            <div className="form-header">
              <h1>Sign In</h1>
              <p>Welcome back! Please enter your details.</p>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="name@hospital.com"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In"}
            </button>

            <div className="form-footer">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="switch-link-btn"
                  onClick={() => navigate("/")}
                >
                  Create an account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
