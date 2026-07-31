import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import appointments from '../../assets/data/appointments.json';
import doctors from '../../assets/data/doctors.json';
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers';
import '../../css/forms.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const stats = useMemo(() => ({
    patients: 1248,
    doctors: doctors.length,
    appointments: appointments.length + 47,
    revenue: 284750,
  }), []);

  const recentAppointments = appointments.slice(0, 5);

  return (
    <div className="adminDashboard">
      <div className="pageHeader">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Overview of hospital operations and key metrics</p>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="statCard">
          <div className="statIcon" style={{ background: 'var(--primary)' }}>👥</div>
          <div className="statInfo">
            <h3>{stats.patients.toLocaleString()}</h3>
            <p>Total Patients</p>
          </div>
        </div>
        <div className="statCard">
          <div className="statIcon" style={{ background: 'var(--accent)' }}>🩺</div>
          <div className="statInfo">
            <h3>{stats.doctors}</h3>
            <p>Active Doctors</p>
          </div>
        </div>
        <div className="statCard">
          <div className="statIcon" style={{ background: '#f59e0b' }}>📅</div>
          <div className="statInfo">
            <h3>{stats.appointments}</h3>
            <p>Appointments</p>
          </div>
        </div>
        <div className="statCard">
          <div className="statIcon" style={{ background: '#8b5cf6' }}>💰</div>
          <div className="statInfo">
            <h3>{formatCurrency(stats.revenue)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboardSections">
        <Card
          className="sectionCard"
          header={<h3>Recent Appointments</h3>}
          footer={
            <Link to="/admin/appointments">
              <Button variant="outline" size="sm">View All Appointments</Button>
            </Link>
          }
        >
          <div className="tableWrap">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>{apt.patientName}</td>
                    <td>{apt.doctorName}</td>
                    <td>{formatDate(apt.date)}</td>
                    <td>
                      <span
                        className="statusBadge"
                        style={{ background: `${getStatusColor(apt.status)}20`, color: getStatusColor(apt.status) }}
                      >
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="sectionCard quickActionsCard" header={<h3>Quick Actions</h3>}>
          <div className="quickActions">
            <Link to="/admin/doctors"><Button full>Add Doctor</Button></Link>
            <Link to="/admin/patients"><Button variant="secondary" full>Manage Patients</Button></Link>
            <Link to="/admin/appointments"><Button variant="outline" full>View Appointments</Button></Link>
            <Link to="/admin/analytics"><Button variant="outline" full>View Analytics</Button></Link>
          </div>
        </Card>
      </div>

      {/* API PLACEHOLDER: GET /api/admin/dashboard/stats */}
      {/* API PLACEHOLDER: GET /api/admin/appointments/recent */}
    </div>
  );
};

export default AdminDashboard;
