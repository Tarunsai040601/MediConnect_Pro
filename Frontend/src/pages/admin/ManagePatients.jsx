import { useState, useMemo } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { getStatusColor } from '../../utils/helpers';
import '../../css/forms.css';
import './ManagePatients.css';

const DUMMY_PATIENTS = [
  { id: 101, name: 'John Doe', email: 'john.doe@email.com', phone: '+1 (555) 111-2222', age: 45, bloodGroup: 'O+', lastVisit: '2026-07-15', status: 'active' },
  { id: 102, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 (555) 222-3333', age: 32, bloodGroup: 'A+', lastVisit: '2026-07-20', status: 'active' },
  { id: 103, name: 'Robert Lee', email: 'robert.lee@email.com', phone: '+1 (555) 333-4444', age: 58, bloodGroup: 'B+', lastVisit: '2026-07-28', status: 'active' },
  { id: 104, name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1 (555) 444-5555', age: 27, bloodGroup: 'AB-', lastVisit: '2026-06-10', status: 'inactive' },
  { id: 105, name: 'David Wilson', email: 'david.wilson@email.com', phone: '+1 (555) 555-6666', age: 41, bloodGroup: 'O-', lastVisit: '2026-07-25', status: 'active' },
];

const ManagePatients = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return DUMMY_PATIENTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.includes(q)
    );
  }, [search]);

  return (
    <div className="managePatients">
      <div className="pageHeader">
        <div>
          <h2>Manage Patients</h2>
          <p>View and manage registered patient records</p>
        </div>
        <Button>+ Add Patient</Button>
      </div>

      <Card>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Last Visit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id}>
                  <td>#{patient.id}</td>
                  <td><strong>{patient.name}</strong></td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.age}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <span
                      className="statusBadge"
                      style={{
                        background: `${getStatusColor(patient.status === 'active' ? 'confirmed' : 'cancelled')}20`,
                        color: getStatusColor(patient.status === 'active' ? 'confirmed' : 'cancelled'),
                      }}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="emptyState">
            <h3>No patients found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </Card>

      {/* API PLACEHOLDER: GET /api/admin/patients */}
    </div>
  );
};

export default ManagePatients;
