import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarPlus, FaCalendarAlt, FaClock, FaCheckCircle, FaChevronLeft } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import doctors from '../../assets/data/doctors.json';
import departments from '../../assets/data/departments.json';
import { TIME_SLOTS, BOOKED_SLOTS } from '../../utils/constants';

import './PatientBookAppointment.css';

const PatientBookAppointment = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [aptType, setAptType] = useState('Consultation');
  const [reason, setReason] = useState('');

  const filteredDoctors = useMemo(() => {
    if (!selectedDept) return [];
    return doctors.filter(doc => doc.department === selectedDept);
  }, [selectedDept]);

  const currentDoctor = useMemo(() => {
    return doctors.find(d => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

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
        Swal.fire('Required', 'Please select a department and doctor.', 'warning');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTimeSlot) {
        Swal.fire('Required', 'Please select a date and time slot.', 'warning');
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
    
    // Fetch logged in user info
    const sessionUser = JSON.parse(localStorage.getItem('user') || '{"name":"John Doe"}');

    Swal.fire({
      title: 'Confirm Booking?',
      text: `Book appointment with ${currentDoctor.name} on ${selectedDate} at ${selectedTimeSlot}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: 'var(--gray-500)',
      confirmButtonText: 'Confirm Booking',
    }).then((result) => {
      if (result.isConfirmed) {
        const newAptId = Math.floor(Math.random() * 10000);
        const appointmentData = {
          id: newAptId,
          patientName: sessionUser.name,
          doctorName: currentDoctor.name,
          doctorId: currentDoctor.id,
          department: selectedDept,
          date: selectedDate,
          time: selectedTimeSlot,
          type: aptType,
          status: 'confirmed',
          fee: currentDoctor.consultationFee,
        };

        const existingApts = JSON.parse(localStorage.getItem('appointments') || '[]');
        localStorage.setItem('appointments', JSON.stringify([appointmentData, ...existingApts]));

        Swal.fire({
          title: 'Success!',
          text: 'Appointment booked successfully.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)',
        }).then(() => {
          navigate('/patient/appointments');
        });
      }
    });
  };

  return (
    <div className="patientBookAppointment">
      <div className="dashPageHeader">
        <h2>Schedule an Appointment</h2>
        <p>Follow the wizard steps to confirm a new consultation slot.</p>
      </div>

      {/* Steps Row */}
      <div className="bookingStepsBar glass">
        <div className={`stepNode ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <span className="stepNum">{step > 1 ? <FaCheckCircle /> : '1'}</span>
          <span>Select Specialist</span>
        </div>
        <div className="stepLine"></div>
        <div className={`stepNode ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <span className="stepNum">{step > 2 ? <FaCheckCircle /> : '2'}</span>
          <span>Choose Date</span>
        </div>
        <div className="stepLine"></div>
        <div className={`stepNode ${step >= 3 ? 'active' : ''}`}>
          <span className="stepNum">3</span>
          <span>Submit Info</span>
        </div>
      </div>

      <Card glass className="bookingWizardCard">
        {step === 1 && (
          <div className="stepInner">
            <h3>Select Medical Specialist</h3>
            <div className="fieldsGrid">
              <div className="formField">
                <label>Department</label>
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
                  <option value="">Select department...</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {selectedDept && (
                <div className="formField animate-fade-in">
                  <label>Specialist Doctor</label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => {
                      setSelectedDoctorId(parseInt(e.target.value));
                      setSelectedDate('');
                      setSelectedTimeSlot('');
                    }}
                    required
                  >
                    <option value="">Select doctor...</option>
                    {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} (Fee: ${doc.consultationFee})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {currentDoctor && (
              <div className="docMiniCard glass animate-scale-in">
                <img src={currentDoctor.image} alt={currentDoctor.name} />
                <div>
                  <h4>{currentDoctor.name}</h4>
                  <p>{currentDoctor.bio}</p>
                  <small>Experience: {currentDoctor.experience} years | Weekly Days: {currentDoctor.availability.join(', ')}</small>
                </div>
              </div>
            )}

            <div className="wizardControls justify-end">
              <Button onClick={handleNextStep}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="stepInner">
            <h3>Choose Date & Time Slot</h3>

            <div className="calendarSection">
              <h4>Available Dates</h4>
              {availableDates.length === 0 ? (
                <p className="noDatesMsg">No matching available dates found on the doctor schedule.</p>
              ) : (
                <div className="calendarStrip">
                  {availableDates.map((item) => (
                    <button
                      key={item.dateStr}
                      className={`calDayBtn ${selectedDate === item.dateStr ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedDate(item.dateStr);
                        setSelectedTimeSlot('');
                      }}
                    >
                      <span className="month">{item.monthName}</span>
                      <span className="num">{item.dayNum}</span>
                      <span className="day">{item.dayName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedDate && (
              <div className="timeSlotsSection animate-fade-in">
                <h4>Available Hours for {selectedDate}</h4>
                <div className="slotsGrid">
                  {timeSlotsStatus.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={slot.isBooked}
                      className={`slotBtn ${selectedTimeSlot === slot.time ? 'selected' : ''} ${slot.isBooked ? 'booked' : 'available'}`}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                    >
                      <FaClock className="clockIcon" />
                      <span>{slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="wizardControls">
              <Button variant="outline" onClick={handlePrevStep}><FaChevronLeft /> Back</Button>
              <Button onClick={handleNextStep}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleBookSubmit} className="stepInner">
            <h3>Appointment Details</h3>

            <div className="fieldsGrid">
              <div className="formField">
                <label htmlFor="aptType">Appointment Type</label>
                <select
                  id="aptType"
                  value={aptType}
                  onChange={(e) => setAptType(e.target.value)}
                >
                  <option value="Consultation">General Consultation</option>
                  <option value="Check-up">Regular Check-up</option>
                  <option value="Follow-up">Follow-up Session</option>
                </select>
              </div>

              <div className="formField textareaField">
                <label htmlFor="reasonText">Reason for Visit</label>
                <textarea
                  id="reasonText"
                  rows="3"
                  placeholder="Mention symptoms or medical records..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="summaryPanel glass">
              <h4>Review Booking</h4>
              <div className="summaryRowGrid">
                <p><strong>Doctor:</strong> {currentDoctor.name}</p>
                <p><strong>Department:</strong> {selectedDept}</p>
                <p><strong>Date & Time:</strong> {selectedDate} at {selectedTimeSlot}</p>
                <p><strong>Fee:</strong> ${currentDoctor.consultationFee}</p>
              </div>
            </div>

            <div className="wizardControls">
              <Button variant="outline" onClick={handlePrevStep}><FaChevronLeft /> Back</Button>
              <Button type="submit">Book Appointment</Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default PatientBookAppointment;
