import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recipets.css";
import {
  FaUserMd,
  FaCalendarAlt,
  FaPills,
  FaNotesMedical,
  FaFilePrescription,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const API_BASE = "http://localhost:8080/api";

const Recipets = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("patientToken");

      const decoded = jwtDecode(token);

      // mee JWT lo field name according ga change cheyyandi
      const patientName = decoded.name;

      const response = await axios.get(
        `${API_BASE}/Recipet/getall/${patientName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPrescriptions(response.data.data);
    } catch (error) {
      console.log("Prescription Fetch Error", error);
    }
  };

  return (
    <div className="prescription-container">
      {prescriptions.length === 0 ? (
        <h2>No Prescriptions Available</h2>
      ) : (
        prescriptions.map((item) => (
          <div className="prescription-bill" key={item.PrescriptionId}>
            {/* Header */}

            <div className="prescription-header">
              <div>
                <h1>MediConnect</h1>

                <p>Hospital Management System</p>
              </div>

              <FaFilePrescription className="prescription-icon" />
            </div>

            <div className="bill-divider"></div>

            {/* Patient */}

            <div className="prescription-section">
              <h3>Patient Details</h3>

              <div className="details-grid">
                <div>
                  <span>Patient Name</span>

                  <strong>{item.PatientName}</strong>
                </div>

                <div>
                  <span>Prescription ID</span>

                  <strong>#{item.PrescriptionId}</strong>
                </div>
              </div>
            </div>

            {/* Doctor */}

            <div className="prescription-section">
              <h3>
                <FaUserMd />
                Doctor Details
              </h3>

              <div className="details-grid">
                <div>
                  <span>Doctor Name</span>

                  <strong>{item.DoctorName}</strong>
                </div>

                <div>
                  <span>Date</span>

                  <strong>
                    <FaCalendarAlt />{" "}
                    {new Date(item.created_at).toLocaleDateString()}
                  </strong>
                </div>
              </div>
            </div>

            {/* Diagnosis */}

            <div className="prescription-section">
              <h3>
                <FaNotesMedical />
                Diagnosis
              </h3>

              <p className="diagnosis">{item.Diagnosis}</p>
            </div>

            {/* Medicines */}

            <div className="prescription-section">
              <h3>
                <FaPills />
                Medicines
              </h3>

              <div className="medicine-box">
                <div className="medicine-row">
                  <span>{item.Medicines}</span>

                  <span>{item.Dosage}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}

            <div className="prescription-section">
              <h3>Instructions</h3>

              <p className="instructions">{item.Instructions}</p>
            </div>

            <div className="bill-footer">Status : {item.Status}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Recipets;
