import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaUsers, FaChartBar, FaFileSignature } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import appointments from '../../assets/data/appointments.json';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [apts, setApts] = useState([]);

  useEffect(() => {
    // Read from local storage first to capture any new user bookings
    const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
    const docApts = saved.filter(a => a.doctorId === 1 || !a.doctorId); // Default load for Dr. Sarah Mitchell
    
    if (docApts.length === 0) {
      // Seed with some initial data matching Dr. Mitchell
      const seed = [
        { id: 2001, patientName: 'Robert Johnson', date: '2026-07-31', time: '09:00 AM', status: 'confirmed', type: 'Consultation' },
        { id: 2002, patientName: 'Mary Davis', date: '2026-07-31', time: '11:30 AM', status: 'pending', type: 'Follow-up' },
        { id: 2003, patientName: 'William Wilson', date: '2026-08-01', time: '10:00 AM', status: 'confirmed', type: 'Consultation' },
      ];
      setApts(seed);
    } else {
      setApts(docApts);
    }
  }, []);

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: 'Update Status?',
      text: `Confirm marking this appointment slot as ${newStatus}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: 'var(--gray-500)',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = apts.map(a => a.id === id ? { ...a, status: newStatus } : a);
        setApts(updated);
        // Sync with local storage
        const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
        const updatedGlobal = saved.map(a => a.id === id ? { ...a, status: newStatus } : a);
        localStorage.setItem('appointments', JSON.stringify(updatedGlobal));

        Swal.fire('Updated', `Appointment has been set to ${newStatus}.`, 'success');
      }
    });
  };

  const todaysQueue = apts.filter(a => a.date === '2026-07-31' || a.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="doctorDashboard">
      <div className="dashHeaderBanner docBanner">
        <h2>Welcome, Dr. Mitchell!</h2>
        <p>You have {todaysQueue.filter(a => a.status === 'confirmed').length} consultations scheduled on your queue today.</p>
      </div>

      {/* Metrics Row */}
      <div className="dashMetricsRow">
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaCalendarCheck /></div>
          <div>
            <h3>{todaysQueue.length}</h3>
            <p>Today's Patients</p>
          </div>
        </Card>
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaUsers /></div>
          <div>
            <h3>120+</h3>
            <p>Total Patients</p>
          </div>
        </Card>
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaFileSignature /></div>
          <div>
            <h3>{apts.filter(a => a.status === 'pending').length}</h3>
            <p>Pending Approvals</p>
          </div>
        </Card>
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaChartBar /></div>
          <div>
            <h3>$2,450</h3>
            <p>This Month's Earnings</p>
          </div>
        </Card>
      </div>

      <div className="dashSectionsGrid">
        {/* Today's Patients queue */}
        <Card className="dashMainListCard" header={<h3>Today's Clinic Queue</h3>}>
          <div className="dashTableWrap">
            <table className="dashDataTable">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Hours Slot</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todaysQueue.map((apt) => (
                  <tr key={apt.id}>
                    <td><strong>{apt.patientName}</strong></td>
                    <td>{apt.time}</td>
                    <td>{apt.type}</td>
                    <td>
                      <span className={`statusBadge ${apt.status}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      {apt.status === 'pending' && (
                        <div className="queueActions">
                          <button className="approveBtn" onClick={() => handleStatusChange(apt.id, 'confirmed')}>Accept</button>
                          <button className="rejectBtn" onClick={() => handleStatusChange(apt.id, 'cancelled')}>Reject</button>
                        </div>
                      )}
                      {apt.status === 'confirmed' && (
                        <div className="queueActions">
                          <button className="completeBtn" onClick={() => handleStatusChange(apt.id, 'completed')}>Complete</button>
                        </div>
                      )}
                      {apt.status === 'completed' && <span className="actionDone">Consultation Closed</span>}
                      {apt.status === 'cancelled' && <span className="actionCancelled">Cancelled</span>}
                    </td>
                  </tr>
                ))}
                {todaysQueue.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                      No queue scheduled for today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Shortcuts list */}
        <Card className="dashShortcutsCard" header={<h3>Specialist Tools</h3>}>
          <div className="shortcutsGrid flex-column">
            <Link to="/doctor/profile">
              <Button full><FaUserMd /> View Personal Profile</Button>
            </Link>
            <Link to="/doctor/availability">
              <Button variant="secondary" full><FaCalendarCheck /> Manage Availability Hours</Button>
            </Link>
            <Link to="/doctor/reports">
              <Button variant="outline" full><FaFileSignature /> Generate Clinical Report</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
