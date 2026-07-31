import React, { useState, useEffect } from 'react';
import { FaUser, FaSave } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import './PatientProfile.css';

const PatientProfile = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'patient@mediconnect.com',
    phone: '+1 (555) 123-4567',
    dob: '1990-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '742 Evergreen Terrace, Springfield',
  });

  // Load name from session if user modified it in auth registration
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('user'));
    if (session && session.name) {
      const parts = session.name.split(' ');
      setProfile(prev => ({
        ...prev,
        firstName: parts[0] || 'John',
        lastName: parts.slice(1).join(' ') || 'Doe',
        email: session.email || 'patient@mediconnect.com'
      }));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update local storage user profile name
    const session = JSON.parse(localStorage.getItem('user') || '{}');
    session.name = `${profile.firstName} ${profile.lastName}`;
    localStorage.setItem('user', JSON.stringify(session));

    Swal.fire({
      title: 'Profile Updated!',
      text: 'Demographic settings saved successfully.',
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
    });
  };

  return (
    <div className="patientProfile">
      <div className="dashPageHeader">
        <h2>My Demographic Profile</h2>
        <p>Update personal medical metrics, contact info, and home address records.</p>
      </div>

      <Card glass className="profileFormCard">
        <div className="profileHeaderAvatar">
          <div className="avatarCircle"><FaUser /></div>
          <div>
            <h3>{profile.firstName} {profile.lastName}</h3>
            <span>Patient ID: MC-PAT-90248</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profileForm">
          <div className="formGrid">
            <div className="formField">
              <label htmlFor="pFirst">First Name</label>
              <input
                type="text"
                id="pFirst"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="formField">
              <label htmlFor="pLast">Last Name</label>
              <input
                type="text"
                id="pLast"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="pMail">Email Address</label>
              <input
                type="email"
                id="pMail"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="pPhoneNum">Phone Number</label>
              <input
                type="tel"
                id="pPhoneNum"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="pDob">Birth Date</label>
              <input
                type="date"
                id="pDob"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="pGender">Gender</label>
              <select
                id="pGender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="formField">
              <label htmlFor="pBlood">Blood Group</label>
              <select
                id="pBlood"
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="formField addressField">
              <label htmlFor="pAddr">Residential Address</label>
              <input
                type="text"
                id="pAddr"
                name="address"
                value={profile.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="profileFormControls">
            <Button type="submit"><FaSave /> Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PatientProfile;
