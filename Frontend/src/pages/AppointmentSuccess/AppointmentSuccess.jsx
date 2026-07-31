import React, { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaCalendarPlus, FaPrint, FaColumns, FaHospital } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import './AppointmentSuccess.css';

const AppointmentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef(null);

  const appointment = location.state?.appointment || {
    id: 'MC-72948',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Mitchell',
    department: 'Cardiology',
    date: '2026-08-05',
    time: '10:00 AM',
    type: 'Consultation',
    fee: 150,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="appointmentSuccessPage">
      <BackgroundAnimation />
      <div className="container successContainer">
        <ScrollReveal>
          <div className="successHeader">
            {/* Animated SVG Checkmark */}
            <div className="successCheckIcon">
              <svg viewBox="0 0 52 52" className="checkmarkSvg">
                <circle cx="26" cy="26" r="25" fill="none" className="checkmarkCircle" />
                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className="checkmarkCheck" />
              </svg>
            </div>
            <h2>Appointment Confirmed!</h2>
            <p>Your booking has been registered successfully. A confirmation message has been dispatched to your email.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div ref={printRef} className="appointmentTicket glass">
            <div className="ticketHeader">
              <div className="ticketLogo">
                <FaHospital className="ticketLogoIcon" />
                <span>MediConnect Pro</span>
              </div>
              <span className="receiptBadge">Receipt Invoice</span>
            </div>

            <div className="ticketDivider">
              <div className="notch left"></div>
              <div className="dashedLine"></div>
              <div className="notch right"></div>
            </div>

            <div className="ticketBody">
              <div className="ticketRow">
                <span>Receipt Number</span>
                <strong>MC-APT-{appointment.id}</strong>
              </div>
              <div className="ticketRow">
                <span>Patient Name</span>
                <strong>{appointment.patientName}</strong>
              </div>
              <div className="ticketRow">
                <span>Assigned Doctor</span>
                <strong>{appointment.doctorName}</strong>
              </div>
              <div className="ticketRow">
                <span>Department</span>
                <span>{appointment.department}</span>
              </div>
              <div className="ticketRow">
                <span>Schedule Date</span>
                <strong>{appointment.date}</strong>
              </div>
              <div className="ticketRow">
                <span>Schedule Time</span>
                <strong>{appointment.time}</strong>
              </div>
              <div className="ticketRow">
                <span>Appointment Type</span>
                <span>{appointment.type}</span>
              </div>

              <div className="ticketDivider dark">
                <div className="dashedLine"></div>
              </div>

              <div className="ticketTotalRow">
                <span>Consultation Fee</span>
                <span className="ticketCost">${appointment.fee}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="successActions">
            <Button variant="outline" onClick={handlePrint}>
              <FaPrint /> Print Receipt
            </Button>
            
            <a
              href={`data:text/calendar;charset=utf-8,${encodeURIComponent(
                `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:MediConnect Appointment with ${appointment.doctorName}\nDTSTART:${appointment.date.replace(/-/g, '')}T090000\nDTEND:${appointment.date.replace(/-/g, '')}T100000\nDESCRIPTION:Hospital appointment consultation\nEND:VEVENT\nEND:VCALENDAR`
              )}`}
              download={`mediconnect-appointment-${appointment.id}.ics`}
              className="calendarDownloadLink"
            >
              <Button variant="secondary">
                <FaCalendarPlus /> Save to Calendar
              </Button>
            </a>

            <Button onClick={() => navigate('/patient/dashboard')}>
              <FaColumns /> Go to Dashboard
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
