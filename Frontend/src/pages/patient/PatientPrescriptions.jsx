import React from 'react';
import { FaFilePdf, FaPrescription, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import './PatientPrescriptions.css';

const PRESCRIPTIONS = [
  {
    id: 'PR-92481',
    doctor: 'Dr. Sarah Mitchell',
    specialty: 'Cardiology',
    date: '2026-07-20',
    diagnosis: 'Mild Hypertension',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 Days' },
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'At bedtime', duration: '30 Days' },
    ],
    instructions: 'Take Lisinopril in the morning with food. Monitor blood pressure daily.'
  },
  {
    id: 'PR-83920',
    doctor: 'Dr. James Chen',
    specialty: 'Neurology',
    date: '2026-07-02',
    diagnosis: 'Tension Headaches',
    medications: [
      { name: 'Amitriptyline', dosage: '25mg', frequency: 'At bedtime', duration: '15 Days' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 8 hours as needed', duration: '10 Days' },
    ],
    instructions: 'Avoid screens for 1 hour before sleep. Keep hydrated.'
  }
];

const PatientPrescriptions = () => {
  const handleDownload = (id) => {
    Swal.fire({
      title: 'Downloading Prescription',
      text: `Prescription document ${id} is being converted and saved.`,
      icon: 'info',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="patientPrescriptions">
      <div className="dashPageHeader">
        <h2>My Prescriptions</h2>
        <p>Review current and past medical formulas prescribed by our specialists.</p>
      </div>

      <div className="prescriptionsGrid">
        {PRESCRIPTIONS.map((pr) => (
          <Card key={pr.id} glass className="prescriptionCard">
            <div className="prescriptionHeader">
              <div className="prescDocInfo">
                <FaUserMd className="docAvatarIcon" />
                <div>
                  <h3>{pr.doctor}</h3>
                  <span>{pr.specialty}</span>
                </div>
              </div>
              <span className="prescIdBadge">{pr.id}</span>
            </div>

            <div className="prescInfoRow">
              <div className="infoNode">
                <FaCalendarAlt className="metaIcon" />
                <div>
                  <small>Date Prescribed</small>
                  <strong>{pr.date}</strong>
                </div>
              </div>
              <div className="infoNode">
                <FaPrescription className="metaIcon" />
                <div>
                  <small>Diagnosis</small>
                  <strong>{pr.diagnosis}</strong>
                </div>
              </div>
            </div>

            <div className="medsTableWrap">
              <table className="medsTable">
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {pr.medications.map((med, i) => (
                    <tr key={i}>
                      <td><strong>{med.name}</strong></td>
                      <td>{med.dosage}</td>
                      <td>{med.frequency}</td>
                      <td>{med.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prescInstructions">
              <strong>Instructions:</strong>
              <p>{pr.instructions}</p>
            </div>

            <div className="prescFooterActions">
              <Button size="sm" onClick={() => handleDownload(pr.id)}>
                <FaFilePdf /> Download PDF
              </Button>
            </div>
          </Card>
        ))}
        {PRESCRIPTIONS.length === 0 && (
          <div className="emptyPrescBox glass">
            <h3>No Prescriptions</h3>
            <p>You do not have any active medical formula records.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPrescriptions;
