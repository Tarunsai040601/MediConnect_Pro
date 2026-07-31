import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUserMd, FaHospital, FaChevronLeft, FaCheckCircle } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Swal from 'sweetalert2';

import doctors from '../../assets/data/doctors.json';
import departments from '../../assets/data/departments.json';
import { TIME_SLOTS, BOOKED_SLOTS } from '../../utils/constants';

import './AppointmentBooking.css';

const AppointmentBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryDoctorId = searchParams.get('doctorId');
  const queryDept = searchParams.get('department');

  // Step state: 1: Select Dept & Doctor, 2: Select Date & Time, 3: Patient Info
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState(queryDept || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState(queryDoctorId ? parseInt(queryDoctorId) : '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  // Patient details state
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Consultation',
    reason: '',
  });

  // Keep state sync with query params if any
  useEffect(() => {
    if (queryDoctorId) {
      const doc = doctors.find(d => d.id === parseInt(queryDoctorId));
      if (doc) {
        setSelectedDept(doc.department);
        setSelectedDoctorId(parseInt(queryDoctorId));
      }
    } else if (queryDept) {
      setSelectedDept(queryDept);
    }
  }, [queryDoctorId, queryDept]);

  // Doctors filtered by selected department
  const filteredDoctors = useMemo(() => {
    if (!selectedDept) return [];
    return doctors.filter(doc => doc.department === selectedDept);
  }, [selectedDept]);

  // Selected doctor object
  const currentDoctor = useMemo(() => {
    return doctors.find(d => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  // Generate next 14 calendar dates
  const availableDates = useMemo(() => {
    if (!currentDoctor) return [];
    
    const dates = [];
    const daysMap = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    const docDays = currentDoctor.availability.map(day => daysMap[day]);

    let today = new Date();
    for (let i = 0; i < 14; i++) {
      let tempDate = new Date();
      tempDate.setDate(today.getDate() + i);
      const dayOfWeek = tempDate.getDay();
      
      if (docDays.includes(dayOfWeek)) {
        dates.push({
          dateStr: tempDate.toISOString().split('T')[0],
          dayName: tempDate.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNum: tempDate.getDate(),
          monthName: tempDate.toLocaleDateString('en-US', { month: 'short' }),
        });
      }
    }
    return dates;
  }, [currentDoctor]);

  // Time slot statuses (checking BOOKED_SLOTS)
  const timeSlotsStatus = useMemo(() => {
    if (!selectedDoctorId || !selectedDate) return [];

    const bookedForDate = BOOKED_SLOTS[selectedDoctorId]?.[selectedDate] || [];
    return TIME_SLOTS.map(slot => ({
      time: slot,
      isBooked: bookedForDate.includes(slot),
    }));
  }, [selectedDoctorId, selectedDate]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedDept || !selectedDoctorId) {
        Swal.fire('Required', 'Please select a department and doctor first.', 'warning');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTimeSlot) {
        Swal.fire('Required', 'Please select an appointment date and time slot.', 'warning');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!patientDetails.name || !patientDetails.email || !patientDetails.phone) {
      Swal.fire('Required', 'Please fill in all contact details.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Confirm Appointment Booking?',
      html: `
        <div style="text-align: left; padding: 0.5rem 1rem;">
          <p><strong>Doctor:</strong> ${currentDoctor.name}</p>
          <p><strong>Department:</strong> ${selectedDept}</p>
          <p><strong>Date:</strong> ${selectedDate}</p>
          <p><strong>Time:</strong> ${selectedTimeSlot}</p>
          <p><strong>Type:</strong> ${patientDetails.type}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, book slot!',
    }).then((result) => {
      if (result.isConfirmed) {
        // API PLACEHOLDER: POST /api/appointments/book
        const newAptId = Math.floor(Math.random() * 10000);
        const appointmentData = {
          id: newAptId,
          patientName: patientDetails.name,
          doctorName: currentDoctor.name,
          doctorId: currentDoctor.id,
          department: selectedDept,
          date: selectedDate,
          time: selectedTimeSlot,
          type: patientDetails.type,
          status: 'confirmed',
          fee: currentDoctor.consultationFee,
        };

        // Add to local storage for persistence across views
        const existingApts = JSON.parse(localStorage.getItem('appointments') || '[]');
        localStorage.setItem('appointments', JSON.stringify([appointmentData, ...existingApts]));

        // Direct success navigation
        navigate('/appointment-success', { state: { appointment: appointmentData } });
      }
    });
  };

  return (
    <div className="appointmentBookingPage">
      <section className="pageHero bookingHero">
        <BackgroundAnimation />
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Book Appointment</span>
          </nav>
          <h1>Book an Appointment</h1>
          <p>Complete our 3-step digital scheduler to secure your appointment instantly.</p>
        </div>
      </section>

      <section className="section bookingWizardSection">
        <div className="container bookingWizardContainer">
          {/* Progress Indicators */}
          <div className="wizardProgress glass">
            <div className={`progressStep ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <span className="stepNum">{step > 1 ? <FaCheckCircle /> : '1'}</span>
              <span className="stepLabel">Specialty</span>
            </div>
            <div className="progressLine"></div>
            <div className={`progressStep ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <span className="stepNum">{step > 2 ? <FaCheckCircle /> : '2'}</span>
              <span className="stepLabel">Schedule</span>
            </div>
            <div className="progressLine"></div>
            <div className={`progressStep ${step >= 3 ? 'active' : ''}`}>
              <span className="stepNum">3</span>
              <span className="stepLabel">Confirmation</span>
            </div>
          </div>

          {/* Form Wizard Container */}
          <Card glass className="wizardFormCard">
            {/* STEP 1: Select Department & Doctor */}
            {step === 1 && (
              <div className="wizardStepContent">
                <h3><FaHospital className="stepIcon" /> Select Department & Specialist</h3>
                <div className="bookingFormGroup">
                  <div className="bookingField">
                    <label>Select Department</label>
                    <select
                      value={selectedDept}
                      onChange={(e) => {
                        setSelectedDept(e.target.value);
                        setSelectedDoctorId('');
                        setSelectedDate('');
                        setSelectedTimeSlot('');
                      }}
                      required
                    >
                      <option value="">Choose department...</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>

                  {selectedDept && (
                    <div className="bookingField animate-fade-in">
                      <label>Select Doctor Specialist</label>
                      <select
                        value={selectedDoctorId}
                        onChange={(e) => {
                          setSelectedDoctorId(parseInt(e.target.value));
                          setSelectedDate('');
                          setSelectedTimeSlot('');
                        }}
                        required
                      >
                        <option value="">Choose specialist doctor...</option>
                        {filteredDoctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>{doc.name} - Fee: ${doc.consultationFee}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {currentDoctor && (
                  <div className="selectedDocShortProfile glass animate-scale-in">
                    <img src={currentDoctor.image} alt={currentDoctor.name} className="docShortImg" />
                    <div>
                      <h4>{currentDoctor.name}</h4>
                      <p>{currentDoctor.bio}</p>
                      <small><strong>Availability:</strong> {currentDoctor.availability.join(', ')}</small>
                    </div>
                  </div>
                )}

                <div className="wizardActions">
                  <span />
                  <Button onClick={handleNextStep}>Next Step</Button>
                </div>
              </div>
            )}

            {/* STEP 2: Select Date & Time */}
            {step === 2 && (
              <div className="wizardStepContent">
                <h3><FaCalendarAlt className="stepIcon" /> Choose Date & Time Slot</h3>
                
                <div className="bookingCalendarSection">
                  <h4>Available Booking Dates</h4>
                  {availableDates.length === 0 ? (
                    <p className="noDatesError">No available clinic dates matching this specialist's schedule.</p>
                  ) : (
                    <div className="customCalendarStrip">
                      {availableDates.map((item) => (
                        <button
                          key={item.dateStr}
                          className={`calendarDayNode ${selectedDate === item.dateStr ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedDate(item.dateStr);
                            setSelectedTimeSlot('');
                          }}
                        >
                          <span className="calMonth">{item.monthName}</span>
                          <span className="calNum">{item.dayNum}</span>
                          <span className="calDay">{item.dayName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedDate && (
                  <div className="bookingTimeSlotsSection animate-fade-in">
                    <h4>Available Time Slots for {selectedDate}</h4>
                    <div className="timeSlotsGrid">
                      {timeSlotsStatus.map((slot) => (
                        <button
                          key={slot.time}
                          disabled={slot.isBooked}
                          className={`timeSlotNode ${selectedTimeSlot === slot.time ? 'selected' : ''} ${slot.isBooked ? 'booked' : 'available'}`}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                        >
                          <FaClock className="slotClock" />
                          <span>{slot.time}</span>
                          {slot.isBooked && <span className="bookedTag">Booked</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="wizardActions">
                  <Button variant="outline" onClick={handlePrevStep}><FaChevronLeft /> Back</Button>
                  <Button onClick={handleNextStep}>Next Step</Button>
                </div>
              </div>
            )}

            {/* STEP 3: Patient Info & Confirmation */}
            {step === 3 && (
              <form onSubmit={handleBookSubmit} className="wizardStepContent">
                <h3><FaHospital className="stepIcon" /> Patient Details</h3>

                <div className="bookingFormGrid">
                  <div className="bookingField">
                    <label htmlFor="pName">Patient Full Name</label>
                    <input
                      type="text"
                      id="pName"
                      placeholder="Enter patient full name"
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="bookingField">
                    <label htmlFor="pEmail">Email Address</label>
                    <input
                      type="email"
                      id="pEmail"
                      placeholder="patient@email.com"
                      value={patientDetails.email}
                      onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="bookingField">
                    <label htmlFor="pPhone">Phone Number</label>
                    <input
                      type="tel"
                      id="pPhone"
                      placeholder="+1 (555) 000-0000"
                      value={patientDetails.phone}
                      onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="bookingField">
                    <label htmlFor="pType">Appointment Type</label>
                    <select
                      id="pType"
                      value={patientDetails.type}
                      onChange={(e) => setPatientDetails({ ...patientDetails, type: e.target.value })}
                    >
                      <option value="Consultation">General Consultation</option>
                      <option value="Check-up">Regular Check-up</option>
                      <option value="Follow-up">Follow-up Session</option>
                      <option value="Emergency">Urgent Clinical Visit</option>
                    </select>
                  </div>
                </div>

                <div className="bookingField textBlockField">
                  <label htmlFor="pReason">Reason for Appointment (Brief Description)</label>
                  <textarea
                    id="pReason"
                    rows="3"
                    placeholder="Describe any symptoms or clinical details..."
                    value={patientDetails.reason}
                    onChange={(e) => setPatientDetails({ ...patientDetails, reason: e.target.value })}
                  ></textarea>
                </div>

                <div className="appointmentSummaryPanel glass">
                  <h4>Schedule Summary</h4>
                  <div className="summaryGrid">
                    <div>
                      <span>Doctor:</span>
                      <strong>{currentDoctor.name}</strong>
                    </div>
                    <div>
                      <span>Department:</span>
                      <span>{selectedDept}</span>
                    </div>
                    <div>
                      <span>Date:</span>
                      <strong>{selectedDate}</strong>
                    </div>
                    <div>
                      <span>Time:</span>
                      <strong>{selectedTimeSlot}</strong>
                    </div>
                    <div>
                      <span>Consultation Fee:</span>
                      <strong className="summaryFee">${currentDoctor.consultationFee}</strong>
                    </div>
                  </div>
                </div>

                <div className="wizardActions">
                  <Button variant="outline" onClick={handlePrevStep}><FaChevronLeft /> Back</Button>
                  <Button type="submit">Confirm & Book Now</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AppointmentBooking;
