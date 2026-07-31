import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Swal from 'sweetalert2';

import './ContactUs.css';

const BRANCHES = [
  { id: 1, name: 'Main Campus Hospital', city: 'Metro City Center', address: '742 Evergreen Terrace, Medical District', phone: '+1 (555) 123-4567', x: 120, y: 150 },
  { id: 2, name: 'North Pediatrics Clinic', city: 'Downtown North', address: '109 Baker Street, North Wing', phone: '+1 (555) 234-5678', x: 280, y: 80 },
  { id: 3, name: 'West Wellness Diagnostic Hub', city: 'Westside Valley', address: '404 Industrial Blvd, Suite A', phone: '+1 (555) 345-6789', x: 80, y: 240 },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API PLACEHOLDER: POST /api/contact
    Swal.fire({
      title: 'Message Dispatched!',
      text: `Thank you ${formData.name}, we will respond to your inquiry via ${formData.email} within 24 hours.`,
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contactUsPage">
      <section className="pageHero contactHero">
        <BackgroundAnimation />
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </nav>
          <h1>Contact MediConnect Pro</h1>
          <p>Have questions or inquiries? Our dedicated patient support team is available 24/7.</p>
        </div>
      </section>

      <section className="section contactDetailsSection">
        <div className="container contactDetailsGrid">
          <ScrollReveal>
            <Card glass className="contactDetailCard">
              <div className="detailIconWrap"><FaPhoneAlt /></div>
              <h3>Emergency Call</h3>
              <p>Critical care response and active dispatchers.</p>
              <strong>+1 (555) 911-0000</strong>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Card glass className="contactDetailCard">
              <div className="detailIconWrap"><FaEnvelope /></div>
              <h3>Email Support</h3>
              <p>General inquiries, clinical files, and career options.</p>
              <strong>support@mediconnect.com</strong>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Card glass className="contactDetailCard">
              <div className="detailIconWrap"><FaClock /></div>
              <h3>Working Hours</h3>
              <p>Telemedicine & OPD consultations schedule.</p>
              <strong>Mon - Sat: 8 AM - 8 PM</strong>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <section className="section contactMainSection">
        <div className="container contactMainLayout">
          {/* Contact Form */}
          <ScrollReveal>
            <Card glass className="contactFormCard">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="contactForm">
                <div className="formField">
                  <label htmlFor="cName">Full Name</label>
                  <input
                    type="text"
                    id="cName"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formField">
                  <label htmlFor="cEmail">Email Address</label>
                  <input
                    type="email"
                    id="cEmail"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formField">
                  <label htmlFor="cSubject">Subject</label>
                  <input
                    type="text"
                    id="cSubject"
                    name="subject"
                    placeholder="Appointments, billing inquiry, clinical checkups..."
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formField">
                  <label htmlFor="cMessage">Message Details</label>
                  <textarea
                    id="cMessage"
                    name="message"
                    rows="5"
                    placeholder="Provide details about your question..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <Button type="submit"><FaPaperPlane /> Send Inquiry</Button>
              </form>
            </Card>
          </ScrollReveal>

          {/* Interactive CSS Map */}
          <ScrollReveal delay={150}>
            <Card glass className="contactMapCard">
              <h3>Our Regional Medical Centers</h3>
              <p className="mapSubtitle">Click a medical branch to inspect details and location coordinates.</p>

              <div className="interactiveBranchGrid">
                <div className="branchList">
                  {BRANCHES.map((b) => (
                    <button
                      key={b.id}
                      className={`branchSelector ${selectedBranch.id === b.id ? 'active' : ''}`}
                      onClick={() => setSelectedBranch(b)}
                    >
                      <FaMapMarkerAlt className="markerIcon" />
                      <div>
                        <strong>{b.name}</strong>
                        <span>{b.city}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="visualMockMap">
                  {/* Map Vector Grid Lines */}
                  <div className="mapGridLines"></div>

                  {/* Active Pin coordinates overlay */}
                  <div
                    className="mapPin pulse"
                    style={{ left: `${selectedBranch.x}px`, top: `${selectedBranch.y}px` }}
                  >
                    <FaMapMarkerAlt />
                  </div>

                  {/* Highlight locations tags */}
                  {BRANCHES.map((b) => (
                    <div
                      key={b.id}
                      className={`staticDot ${selectedBranch.id === b.id ? 'active' : ''}`}
                      style={{ left: `${b.x}px`, top: `${b.y}px` }}
                      onClick={() => setSelectedBranch(b)}
                    />
                  ))}
                </div>
              </div>

              {/* Selected Branch details summary card */}
              <div className="selectedBranchPanel glass animate-scale-in">
                <h4>{selectedBranch.name}</h4>
                <p>📍 {selectedBranch.address}</p>
                <p>📞 Phone: {selectedBranch.phone}</p>
                <small>Coordinates: Latitude: {selectedBranch.y * 0.15}° N, Longitude: {selectedBranch.x * 0.2}° W</small>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};


export default ContactUs;
