import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaUserMd, FaStar, FaGraduationCap, FaMoneyBillWave, FaClock, FaEnvelope, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Swal from 'sweetalert2';

import doctors from '../../assets/data/doctors.json';
import './DoctorProfile.css';

// Initial reviews mock data
const INITIAL_REVIEWS = [
  { id: 1, name: 'Alice Adams', rating: 5, date: '2026-07-20', comment: 'Extremely professional doctor. Made me feel very comfortable and answered all my questions patiently.' },
  { id: 2, name: 'Brian Baker', rating: 4, date: '2026-07-15', comment: 'Very knowledgeable physician. The wait time was slightly long, but the consultation itself was thorough.' },
  { id: 3, name: 'Clara Carter', rating: 5, date: '2026-07-10', comment: 'Dr. Sarah Mitchell is outstanding. She followed up with me multiple times post-recovery.' },
];

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const doctor = useMemo(() => {
    return doctors.find((doc) => doc.id === parseInt(id));
  }, [id]);

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  if (!doctor) {
    return (
      <div className="doctorNotFoundPage">
        <BackgroundAnimation />
        <div className="container errorBox glass">
          <h2>Doctor Profile Not Found</h2>
          <p>The doctor details you are searching for does not exist or may have been relocated.</p>
          <Link to="/doctors">
            <Button>Back to Doctors Listing</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all review details.',
        icon: 'error',
        confirmButtonColor: 'var(--primary)',
      });
      return;
    }

    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      rating: parseInt(newReview.rating),
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
    };

    setReviews([reviewObj, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    
    Swal.fire({
      title: 'Review Submitted!',
      text: 'Thank you for your rating & feedback.',
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
    });
  };

  const calculatedRatingInfo = useMemo(() => {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = reviews.length > 0 ? (total / reviews.length).toFixed(1) : doctor.rating;
    return { avg, count: reviews.length };
  }, [reviews, doctor.rating]);

  return (
    <div className="doctorProfilePage">
      <section className="pageHero profileHero">
        <BackgroundAnimation />
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/doctors">Doctors</Link>
            <span>/</span>
            <span>{doctor.name}</span>
          </nav>
          <h1>Doctor Profile</h1>
        </div>
      </section>

      <section className="section profileSection">
        <div className="container profileLayout">
          {/* Left Column: Doctor Card and Quick Info */}
          <div className="profileLeftCol">
            <ScrollReveal>
              <Card glass className="profileIntroCard">
                <div className="profileImgContainer">
                  <img src={doctor.image} alt={doctor.name} className="profileBigImg" />
                  <span className="experienceBadge">{doctor.experience} Yrs Experience</span>
                </div>
                <h2>{doctor.name}</h2>
                <span className="profileDeptLabel">{doctor.specialty}</span>
                <div className="overallStars">
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={i < Math.round(calculatedRatingInfo.avg) ? 'filled' : 'empty'} />
                    ))}
                  </div>
                  <span>{calculatedRatingInfo.avg} ({calculatedRatingInfo.count} ratings)</span>
                </div>

                <div className="profileContactInfo">
                  <div className="contactRow">
                    <FaEnvelope className="contactIcon" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="contactRow">
                    <FaPhoneAlt className="contactIcon" />
                    <span>{doctor.phone}</span>
                  </div>
                </div>

                <Button full onClick={() => navigate(`/book-appointment?doctorId=${doctor.id}`)}>
                  Book Appointment Now
                </Button>
              </Card>
            </ScrollReveal>

            {/* Quick Metrics */}
            <ScrollReveal delay={100}>
              <div className="quickMetricsGrid">
                <Card className="metricBox" glass>
                  <strong>{doctor.patients}+</strong>
                  <span>Patients Treated</span>
                </Card>
                <Card className="metricBox" glass>
                  <strong>${doctor.consultationFee}</strong>
                  <span>Consultation Fee</span>
                </Card>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Bio, Reviews, Working Hours */}
          <div className="profileRightCol">
            {/* Bio & Details */}
            <ScrollReveal>
              <Card glass className="profileDetailsCard">
                <h3>About Dr. {doctor.name.split(' ').slice(1).join(' ')}</h3>
                <p className="doctorBioText">{doctor.bio}</p>

                <div className="academicQualifications">
                  <div className="qualificationItem">
                    <FaGraduationCap className="academicIcon" />
                    <div>
                      <h4>Education & Qualifications</h4>
                      <p>{doctor.education}</p>
                    </div>
                  </div>
                  <div className="qualificationItem">
                    <FaMoneyBillWave className="academicIcon" />
                    <div>
                      <h4>Consultation & Billing</h4>
                      <p>Fee per visit: ${doctor.consultationFee} (Accepts major insurances)</p>
                    </div>
                  </div>
                  <div className="qualificationItem">
                    <FaClock className="academicIcon" />
                    <div>
                      <h4>Weekly Availability</h4>
                      <p>Days: {doctor.availability.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            {/* Reviews Section */}
            <ScrollReveal delay={100}>
              <Card glass className="profileReviewsCard">
                <h3>Patient Ratings & Reviews</h3>

                {/* Rating Submission Form */}
                <form className="addReviewForm" onSubmit={handleReviewSubmit}>
                  <h4>Leave a Review</h4>
                  <div className="formRowGroup">
                    <div className="formField">
                      <label htmlFor="patientName">Your Name</label>
                      <input
                        type="text"
                        id="patientName"
                        placeholder="Enter your name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="formField">
                      <label htmlFor="patientRating">Rating</label>
                      <select
                        id="patientRating"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                      >
                        <option value="5">5 Stars (Excellent)</option>
                        <option value="4">4 Stars (Very Good)</option>
                        <option value="3">3 Stars (Average)</option>
                        <option value="2">2 Stars (Poor)</option>
                        <option value="1">1 Star (Very Poor)</option>
                      </select>
                    </div>
                  </div>
                  <div className="formField">
                    <label htmlFor="patientComment">Feedback Message</label>
                    <textarea
                      id="patientComment"
                      rows="3"
                      placeholder="Share your treatment experience with this specialist..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <Button size="sm" type="submit">Submit Feedback</Button>
                </form>

                {/* Reviews List */}
                <div className="reviewsFeed">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="reviewItemRow">
                      <div className="reviewHeader">
                        <strong>{rev.name}</strong>
                        <span className="reviewDate">{rev.date}</span>
                      </div>
                      <div className="reviewStars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar key={i} className={i < rev.rating ? 'filled' : 'empty'} />
                        ))}
                      </div>
                      <p className="reviewComment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorProfile;
