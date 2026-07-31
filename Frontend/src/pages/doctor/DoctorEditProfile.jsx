import React, { useState } from 'react';
import { FaSave, FaChevronLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import doctors from '../../assets/data/doctors.json';
import './DoctorEditProfile.css';

const DoctorEditProfile = () => {
  const navigate = useNavigate();
  const doctor = doctors[0]; // Sarah Mitchell

  const [formData, setFormData] = useState({
    bio: doctor.bio,
    fee: doctor.consultationFee,
    email: doctor.email,
    phone: doctor.phone,
    education: doctor.education,
    availability: doctor.availability, // Array of days
  });

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleCheckboxChange = (day) => {
    const current = [...formData.availability];
    if (current.includes(day)) {
      setFormData({ ...formData, availability: current.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, availability: [...current, day] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API PLACEHOLDER: PUT /api/doctor/profile
    Swal.fire({
      title: 'Profile Updated!',
      text: 'Your medical details have been updated.',
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
    }).then(() => {
      navigate('/doctor/profile');
    });
  };

  return (
    <div className="doctorEditProfile">
      <div className="dashPageHeader backActionHeader">
        <Link to="/doctor/profile" className="backBtnLink">
          <FaChevronLeft /> Back to Profile
        </Link>
        <h2>Edit Clinical Profile</h2>
      </div>

      <Card glass className="profileEditFormCard">
        <form onSubmit={handleSubmit} className="profileEditForm">
          <div className="formGrid">
            <div className="formField textColSpan">
              <label htmlFor="dBio">Biography Summary</label>
              <textarea
                id="dBio"
                rows="4"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="formField">
              <label htmlFor="dFee">Consultation Fee ($)</label>
              <input
                type="number"
                id="dFee"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="dEdu">Education & Degrees</label>
              <input
                type="text"
                id="dEdu"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="dMail">Office Email</label>
              <input
                type="email"
                id="dMail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="dPhone">Office Phone</label>
              <input
                type="text"
                id="dPhone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="formField textColSpan">
              <label>Weekly Schedule Availability</label>
              <div className="checkboxGrid">
                {allDays.map((day) => (
                  <label key={day} className="checkboxLabelNode">
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="profileEditControls">
            <Button type="submit"><FaSave /> Save Profile Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DoctorEditProfile;
