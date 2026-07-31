import React, { useState, useEffect, useMemo } from 'react';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Swal from 'sweetalert2';

import './DoctorAppointments.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
    const docApts = saved.filter(a => a.doctorId === 1 || !a.doctorId);
    
    if (docApts.length === 0) {
      const seed = [
        { id: 2001, patientName: 'Robert Johnson', date: '2026-07-31', time: '09:00 AM', status: 'confirmed', type: 'Consultation' },
        { id: 2002, patientName: 'Mary Davis', date: '2026-07-31', time: '11:30 AM', status: 'pending', type: 'Follow-up' },
        { id: 2003, patientName: 'William Wilson', date: '2026-08-01', time: '10:00 AM', status: 'confirmed', type: 'Consultation' },
        { id: 2004, patientName: 'Patricia Taylor', date: '2026-07-28', time: '03:00 PM', status: 'completed', type: 'Check-up' },
      ];
      setAppointments(seed);
    } else {
      setAppointments(docApts);
    }
  }, []);

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: 'Update Status?',
      text: `Confirm updating this appointment status to: ${newStatus}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: 'var(--gray-500)',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = appointments.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt);
        setAppointments(updated);
        // Sync with global store
        const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
        const updatedGlobal = saved.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt);
        localStorage.setItem('appointments', JSON.stringify(updatedGlobal));

        Swal.fire('Updated', `Status marked as ${newStatus}.`, 'success');
      }
    });
  };

  const filteredApts = useMemo(() => {
    return appointments.filter((apt) => {
      const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchDate = !dateFilter || apt.date === dateFilter;
      return matchStatus && matchDate;
    });
  }, [appointments, statusFilter, dateFilter]);

  return (
    <div className="doctorAppointments">
      <div className="dashPageHeader">
        <h2>Consultation Schedules</h2>
        <p>Review patient consultation requests and schedule states.</p>
      </div>

      {/* Filter toolbar */}
      <div className="appointmentsFiltersBar glass">
        <div className="filterGroup">
          <label htmlFor="aptStatusFilter">Filter Status</label>
          <select
            id="aptStatusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filterGroup">
          <label htmlFor="aptDateFilter">Filter Date</label>
          <input
            type="date"
            id="aptDateFilter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        { (statusFilter !== 'all' || dateFilter) && (
          <button className="resetFilterLink" onClick={() => { setStatusFilter('all'); setDateFilter(''); }}>
            Reset Filters
          </button>
        ) }
      </div>

      {/* Table grid */}
      <Card glass className="appointmentsListCard">
        <div className="appointmentsTableContainer">
          <table className="dashDataTable">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Patient</th>
                <th>Appointment Date</th>
                <th>Time Slot</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApts.map((apt) => (
                <tr key={apt.id}>
                  <td>#APT-{apt.id}</td>
                  <td><strong>{apt.patientName}</strong></td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td>{apt.type}</td>
                  <td>
                    <span className={`statusBadge ${apt.status}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    {apt.status === 'pending' && (
                      <div className="tableActions">
                        <button className="approveBtn" onClick={() => handleStatusChange(apt.id, 'confirmed')}>Accept</button>
                        <button className="rejectBtn" onClick={() => handleStatusChange(apt.id, 'cancelled')}>Reject</button>
                      </div>
                    )}
                    {apt.status === 'confirmed' && (
                      <div className="tableActions">
                        <button className="completeBtn" onClick={() => handleStatusChange(apt.id, 'completed')}>Complete</button>
                      </div>
                    )}
                    {apt.status === 'completed' && <span className="actionDone">Completed</span>}
                    {apt.status === 'cancelled' && <span className="actionCancelled">Cancelled</span>}
                  </td>
                </tr>
              ))}
              {filteredApts.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem' }}>
                    No appointments found matching search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DoctorAppointments;
