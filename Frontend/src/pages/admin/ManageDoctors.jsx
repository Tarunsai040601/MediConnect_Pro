import { useState, useMemo } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import doctors from '../../assets/data/doctors.json';
import { showConfirm, showSuccess } from '../../utils/helpers';
import '../../css/forms.css';
import './ManageDoctors.css';

const ManageDoctors = () => {
  const [search, setSearch] = useState('');
  const [doctorList, setDoctorList] = useState(doctors);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return doctorList.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
    );
  }, [search, doctorList]);

  const handleDelete = async (doctor) => {
    const result = await showConfirm(
      'Delete Doctor?',
      `Are you sure you want to remove ${doctor.name}? This action cannot be undone.`
    );
    if (result.isConfirmed) {
      setDoctorList((prev) => prev.filter((d) => d.id !== doctor.id));
      showSuccess('Doctor Removed', `${doctor.name} has been removed from the system.`);
      // API PLACEHOLDER: DELETE /api/admin/doctors/:id
    }
  };

  const handleAdd = () => {
    showSuccess('Add Doctor', 'Doctor registration form would open here.');
    // API PLACEHOLDER: POST /api/admin/doctors
  };

  const handleEdit = (doctor) => {
    showSuccess('Edit Doctor', `Editing profile for ${doctor.name}.`);
    // API PLACEHOLDER: PUT /api/admin/doctors/:id
  };

  return (
    <div className="manageDoctors">
      <div className="pageHeader">
        <div>
          <h2>Manage Doctors</h2>
          <p>Add, edit, or remove doctors from the hospital roster</p>
        </div>
        <Button onClick={handleAdd}>+ Add Doctor</Button>
      </div>

      <Card>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by name, specialty, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Rating</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    <div className="doctorCell">
                      <img src={doctor.image} alt={doctor.name} className="doctorAvatar" />
                      <div>
                        <strong>{doctor.name}</strong>
                        <span>{doctor.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.experience} yrs</td>
                  <td>⭐ {doctor.rating}</td>
                  <td>${doctor.consultationFee}</td>
                  <td>
                    <div className="actionBtns">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(doctor)}>Edit</Button>
                      <Button size="sm" variant="secondary" onClick={() => handleDelete(doctor)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="emptyState">
            <h3>No doctors found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </Card>

      {/* API PLACEHOLDER: GET /api/admin/doctors */}
    </div>
  );
};

export default ManageDoctors;
