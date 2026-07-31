import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserMd, FaEdit, FaGraduationCap, FaMoneyBillWave, FaClock, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

import doctors from '../../assets/data/doctors.json';
import './DoctorProfileDashboard.css';

const DoctorProfileDashboard = () => {
  const navigate = useNavigate();
  // Sarah Mitchell is ID 1
  const doctor = doctors[0];

  return (
    <div className="doctorProfileDashboard">
      <div className="dashPageHeader">
        <h2>My Clinical Profile</h2>
        <p>Manage your professional bio, consultation parameters, and schedule details.</p>
      </div>

      <div className="docProfileLayout">
        <Card glass className="profileViewCard">
          <div className="docHeaderInfo">
            <img src={doctor.image} alt={doctor.name} className="docBigAvatar" />
            <div>
              <h3>{doctor.name}</h3>
              <span className="specialtyBadge">{doctor.specialty}</span>
              <p>Ratings: ⭐ {doctor.rating} | Experience: {doctor.experience} Yrs</p>
            </div>
            <Link to="/doctor/edit-profile" className="editProfileLinkBtn">
              <Button size="sm"><FaEdit /> Edit Profile</Button>
            </Link>
          </div>

          <div className="docProfileDetailsSection">
            <h4>Biography</h4>
            <p className="bioText">{doctor.bio}</p>

            <div className="qualificationsGrid">
              <div className="qualRow">
                <FaGraduationCap className="qualIcon" />
                <div>
                  <strong>Education</strong>
                  <p>{doctor.education}</p>
                </div>
              </div>
              <div className="qualRow">
                <FaMoneyBillWave className="qualIcon" />
                <div>
                  <strong>Consultation Fee</strong>
                  <p>${doctor.consultationFee} per visit</p>
                </div>
              </div>
              <div className="qualRow">
                <FaClock className="qualIcon" />
                <div>
                  <strong>Clinic Schedule Days</strong>
                  <p>{doctor.availability.join(', ')}</p>
                </div>
              </div>
              <div className="qualRow">
                <FaEnvelope className="qualIcon" />
                <div>
                  <strong>Office Email</strong>
                  <p>{doctor.email}</p>
                </div>
              </div>
              <div className="qualRow">
                <FaPhoneAlt className="qualIcon" />
                <div>
                  <strong>Helpline Contact</strong>
                  <p>{doctor.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorProfileDashboard;
