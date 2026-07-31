import React from 'react';
import { FaFileMedical, FaDownload, FaEye } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';

import './PatientReports.css';

const REPORTS = [
  { id: 'REP-72948', name: 'Complete Blood Count (CBC)', department: 'Hematology', date: '2026-07-25', status: 'ready' },
  { id: 'REP-63910', name: 'Lipid Profile Test', department: 'Biochemistry', date: '2026-07-22', status: 'ready' },
  { id: 'REP-50293', name: 'Electrocardiogram (ECG) Chart', department: 'Cardiology', date: '2026-07-20', status: 'ready' },
  { id: 'REP-39281', name: 'Brain MRI Scan', department: 'Radiology', date: '2026-08-01', status: 'pending' }
];

const PatientReports = () => {
  const handleDownload = (name) => {
    Swal.fire({
      title: 'Downloading Lab Report',
      text: `Preparing PDF package for: ${name}`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleView = (name) => {
    Swal.fire({
      title: name,
      html: `
        <div style="text-align: left; font-size: 0.95rem; line-height: 1.6;">
          <p><strong>Status:</strong> Completed & Verified</p>
          <p><strong>Lab Tech:</strong> Dr. Robert Smith</p>
          <p><strong>Remarks:</strong> All blood values lie within optimal range thresholds. No anomalies detected.</p>
        </div>
      `,
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
    });
  };

  return (
    <div className="patientReports">
      <div className="dashPageHeader">
        <h2>Medical & Lab Reports</h2>
        <p>Inspect diagnostic results, MRI/CT scans, and clinical testing records.</p>
      </div>

      <Card glass className="reportsListCard">
        <div className="reportsTableWrap">
          <table className="dashDataTable">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Report Details</th>
                <th>Department</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {REPORTS.map((rep) => (
                <tr key={rep.id}>
                  <td>#{rep.id}</td>
                  <td>
                    <div className="repNameWrap">
                      <FaFileMedical className="repFileIcon" />
                      <strong>{rep.name}</strong>
                    </div>
                  </td>
                  <td>{rep.department}</td>
                  <td>{rep.date}</td>
                  <td>
                    <span className={`repBadge ${rep.status}`}>
                      {rep.status}
                    </span>
                  </td>
                  <td>
                    {rep.status === 'ready' ? (
                      <div className="reportActionBtns">
                        <button className="viewRepBtn" onClick={() => handleView(rep.name)}>
                          <FaEye /> View
                        </button>
                        <button className="downloadRepBtn" onClick={() => handleDownload(rep.name)}>
                          <FaDownload /> Download
                        </button>
                      </div>
                    ) : (
                      <span className="pendingNotice">Awaiting Results</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PatientReports;
