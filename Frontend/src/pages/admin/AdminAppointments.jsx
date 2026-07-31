import { useState, useMemo } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import appointments from '../../assets/data/appointments.json';
import { formatDate, getStatusColor } from '../../utils/helpers';
import '../../css/forms.css';
import './AdminAppointments.css';

const STATUS_OPTIONS = ['all', 'confirmed', 'pending', 'completed', 'cancelled'];

const AdminAppointments = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        apt.patientName.toLowerCase().includes(q) ||
        apt.doctorName.toLowerCase().includes(q) ||
        apt.department.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, search]);

  return (
    <div className="adminAppointments">
      <div className="pageHeader">
        <div>
          <h2>All Appointments</h2>
          <p>Manage and monitor all hospital appointments</p>
        </div>
        <Button>+ Schedule Appointment</Button>
      </div>

      <Card>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search patient, doctor, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
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
              {filtered.map((apt) => (
                <tr key={apt.id}>
                  <td>#{apt.id}</td>
                  <td>{apt.patientName}</td>
                  <td>{apt.doctorName}</td>
                  <td>{apt.department}</td>
                  <td>{formatDate(apt.date)}</td>
                  <td>{apt.time}</td>
                  <td>{apt.type}</td>
                  <td>
                    <span
                      className="statusBadge"
                      style={{ background: `${getStatusColor(apt.status)}20`, color: getStatusColor(apt.status) }}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    <Button size="sm" variant="outline">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="emptyState">
            <h3>No appointments found</h3>
            <p>Try changing the status filter or search term</p>
          </div>
        )}
      </Card>

      {/* API PLACEHOLDER: GET /api/admin/appointments?status=&search= */}
    </div>
  );
};

export default AdminAppointments;
