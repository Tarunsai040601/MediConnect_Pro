import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCalendarAlt, FaFileMedical, FaPrescription, FaCreditCard, FaUser } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import './PatientDashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  // Load patient appointments
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
    // Seed with initial dummy data if empty
    if (saved.length === 0) {
      const seed = [
        { id: 1001, doctorName: 'Dr. Sarah Mitchell', department: 'Cardiology', date: '2026-08-05', time: '10:00 AM', status: 'confirmed', type: 'Consultation', fee: 150 },
        { id: 1002, doctorName: 'Dr. James Chen', department: 'Neurology', date: '2026-08-12', time: '02:30 PM', status: 'pending', type: 'Check-up', fee: 175 },
      ];
      localStorage.setItem('appointments', JSON.stringify(seed));
      setAppointments(seed);
    } else {
      setAppointments(saved);
    }
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
        Swal.fire('Cancelled', 'Your appointment has been cancelled.', 'success');
      }
    });
  };

  return (
    <div className="patientDashboard">
      <div className="dashHeaderBanner">
        <h2>Welcome Back, Patient!</h2>
        <p>Manage your health schedule, view prescriptions, and complete clinical payments.</p>
      </div>

      {/* Metrics Row */}
      <div className="dashMetricsRow">
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaCalendarAlt /></div>
          <div>
            <h3>{appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').length}</h3>
            <p>Active Bookings</p>
          </div>
        </Card>
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaPrescription /></div>
          <div>
            <h3>2</h3>
            <p>Active Prescriptions</p>
          </div>
        </Card>
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaFileMedical /></div>
          <div>
            <h3>3</h3>
            <p>Medical Reports</p>
          </div>
        </Card>
        <Card className="dashMetricCard glass">
          <div className="metricIcon"><FaCreditCard /></div>
          <div>
            <h3>$150</h3>
            <p>Pending Balances</p>
          </div>
        </Card>
      </div>

      <div className="dashSectionsGrid">
        {/* Appointments List */}
        <Card className="dashMainListCard" header={<h3>Upcoming Consultations</h3>}>
          <div className="dashTableWrap">
            <table className="dashDataTable">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 4).map((apt) => (
                  <tr key={apt.id}>
                    <td><strong>{apt.doctorName}</strong></td>
                    <td>{apt.department}</td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td>
                      <span className={`statusBadge ${apt.status}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                        <div className="tableActions">
                          <button
                            className="cancelBtn"
                            onClick={() => handleCancelApt(apt.id)}
                            title="Cancel Appointment"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                      No appointments scheduled.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions Shortcuts */}
        <Card className="dashShortcutsCard" header={<h3>Quick Portal Actions</h3>}>
          <div className="shortcutsGrid flex-column">
            <Link to="/patient/book-appointment">
              <Button full><FaCalendarAlt /> Book New Appointment</Button>
            </Link>
            <Link to="/patient/prescriptions">
              <Button variant="secondary" full><FaPrescription /> View Prescriptions</Button>
            </Link>
            <Link to="/patient/payments">
              <Button variant="outline" full><FaCreditCard /> Settle Balance Invoices</Button>
            </Link>
            <Link to="/patient/profile">
              <Button variant="outline" full><FaUser /> Manage Demographic Profile</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
