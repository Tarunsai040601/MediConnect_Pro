import React, { useState } from "react";
import "./Register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaHospital,
  FaUserMd,
  FaStethoscope,
  FaClinicMedical
} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const Register = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Role: "admin",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { Name, Email, Password } = formData;

    if (!Name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter your full name.",
        confirmButtonColor: "#0F4C81"
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(Email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email Format",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#0F4C81"
      });
      return false;
    }

    // Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    if (!passwordRegex.test(Password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
        confirmButtonColor: "#0F4C81"
      });
      return false;
    }

    return true;
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/authRouter/Register",
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text:
          res.data.message ||
          "Your account has been created successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        Name: "",
        Email: "",
        Password: "",
        Role: "admin",
      });

      // Switch to Login after successful registration
      setTimeout(() => {
        onSwitch();
      }, 2000);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data?.message ||
          err.response?.data?.err_message ||
          "Something went wrong",
        confirmButtonColor: "#0F4C81"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Decorative floating health circles */}
      <div className="floating circle-one"></div>
      <div className="floating circle-two"></div>
      <div className="floating circle-three"></div>

      <div className="register-container">
        {/* Left Side: Hospital Branding/Image Panel */}
        <div className="register-visual-panel">
          <div className="visual-overlay"></div>
          <div className="visual-content">
            <div className="hospital-badge">
              <FaHospital className="badge-icon" />
              <span>MediConnect Pro</span>
            </div>
            <h2>Join Our Healthcare Network</h2>
            <p>
              Register today to start managing appointments, messaging clinic staff,
              and tracking medical consultations.
            </p>
            <div className="features-grid">
              <div className="feature-item">
                <FaUserMd className="feat-icon" />
                <span>Smart Routing</span>
              </div>
              <div className="feature-item">
                <FaStethoscope className="feat-icon" />
                <span>E-Prescriptions</span>
              </div>
              <div className="feature-item">
                <FaClinicMedical className="feat-icon" />
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="register-form-panel">
          <form className="register-form" onSubmit={registerHandler}>
            <div className="form-header">
              <h1>Create Account</h1>
              <p>Sign up to access your health portal.</p>
            </div>

            {/* Name Input */}
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="John Doe"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  placeholder="Choose a strong password"
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

            {/* Role Select */}
            <div className="form-group">
              <label>Account Role</label>
              <div className="input-wrapper">
                <FaUserShield className="input-icon" />
                <select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>

            <div className="form-footer">
              <p>
                Already have an account?{" "}
                <button type="button" className="switch-link-btn" onClick={onSwitch}>
                  Please login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;