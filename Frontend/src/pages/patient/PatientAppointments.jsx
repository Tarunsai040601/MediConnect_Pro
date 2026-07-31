import React, { useState, useEffect, useMemo } from 'react';
import { FaCalendarAlt, FaTimes, FaCalendarCheck, FaClock } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import doctors from '../../assets/data/doctors.json';
import { TIME_SLOTS, BOOKED_SLOTS } from '../../utils/constants';

import './PatientAppointments.css';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  
  // Reschedule state
  const [reschedulingApt, setReschedulingApt] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(saved);
  }, []);

  const handleCancelApt = (id) => {
    Swal.fire({
      title: 'Cancel Appointment?',
      text: 'Are you sure you want to cancel this appointment slot?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: 'var(--gray-500)',
      confirmButtonText: 'Yes, cancel slot',
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = appointments.map(apt => 
          apt.id === id ? { ...apt, status: 'cancelled' } : apt
        );
        localStorage.setItem('appointments', JSON.stringify(updated));
        setAppointments(updated);
        Swal.fire('Cancelled', 'Your appointment has been cancelled successfully.', 'success');
      }
    });
  };

  const handleOpenReschedule = (apt) => {
    setReschedulingApt(apt);
    setNewDate('');
    setNewTime('');
  };

  const currentDoctor = useMemo(() => {
    if (!reschedulingApt) return null;
    return doctors.find(d => d.id === reschedulingApt.doctorId);
  }, [reschedulingApt]);

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
    if (!reschedulingApt || !newDate) return [];
    const bookedForDate = BOOKED_SLOTS[reschedulingApt.doctorId]?.[newDate] || [];
    return TIME_SLOTS.map(slot => ({
      time: slot,
      isBooked: bookedForDate.includes(slot),
    }));
  }, [reschedulingApt, newDate]);

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!newDate || !newTime) {
      Swal.fire('Select Time', 'Please choose a valid date and hours slot.', 'warning');
      return;
    }

    const updated = appointments.map(apt => 
      apt.id === reschedulingApt.id ? { ...apt, date: newDate, time: newTime, status: 'confirmed' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updated));
    setAppointments(updated);
    setReschedulingApt(null);

    Swal.fire('Rescheduled', 'Your appointment has been successfully rescheduled.', 'success');
  };

  return (
    <div className="patientAppointments">
      <div className="dashPageHeader">
        <h2>Appointment History</h2>
        <p>Monitor your active bookings and review past clinical visits.</p>
      </div>

      <Card glass className="appointmentsListCard">
        <div className="appointmentsTableContainer">
          <table className="dashDataTable">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td>#APT-{apt.id}</td>
                  <td><strong>{apt.doctorName}</strong></td>
                  <td>{apt.department}</td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td>{apt.type}</td>
                  <td>
                    <span className={`statusBadge ${apt.status}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                      <div className="actionButtons">
                        <button className="reschedLink" onClick={() => handleOpenReschedule(apt)}>
                          Reschedule
                        </button>
                        <button className="cancelLink" onClick={() => handleCancelApt(apt.id)}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem' }}>
                    No appointment records found in local storage.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Rescheduling Modal */}
      {reschedulingApt && (
        <div className="modalOverlay animate-fade-in" onClick={() => setReschedulingApt(null)}>
          <div className="modalPanel glass animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseBtn" onClick={() => setReschedulingApt(null)}>×</button>
            <h3>Reschedule Appointment</h3>
            <p className="modalSub">Choose a new slot for consultation with <strong>{reschedulingApt.doctorName}</strong></p>
            
            <form onSubmit={handleConfirmReschedule} className="rescheduleForm">
              <div className="datesSelectionSection">
                <h4>Choose New Date</h4>
                <div className="calendarStrip flex-row">
                  {availableDates.map((item) => (
                    <button
                      key={item.dateStr}
                      type="button"
                      className={`calDayBtn ${newDate === item.dateStr ? 'selected' : ''}`}
                      onClick={() => {
                        setNewDate(item.dateStr);
                        setNewTime('');
                      }}
                    >
                      <span className="month">{item.monthName}</span>
                      <span className="num">{item.dayNum}</span>
                      <span className="day">{item.dayName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {newDate && (
                <div className="slotsSelectionSection animate-fade-in">
                  <h4>Available Hours</h4>
                  <div className="slotsGrid">
                    {timeSlotsStatus.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={slot.isBooked}
                        className={`slotBtn ${newTime === slot.time ? 'selected' : ''} ${slot.isBooked ? 'booked' : 'available'}`}
                        onClick={() => setNewTime(slot.time)}
                      >
                        <FaClock className="clockIcon" />
                        <span>{slot.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="reschedFormControls">
                <Button variant="outline" type="button" onClick={() => setReschedulingApt(null)}>Close</Button>
                <Button type="submit">Reschedule Slot</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
