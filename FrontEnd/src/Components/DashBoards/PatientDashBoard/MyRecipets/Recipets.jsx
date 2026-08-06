import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Recipets.css";
import { jwtDecode } from "jwt-decode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  FaUserMd,
  FaCalendarAlt,
  FaPills,
  FaNotesMedical,
  FaFilePrescription,
  FaDownload,
} from "react-icons/fa";

const API_BASE = "https://mediconnect-pro-q1pw.onrender.com/api";

const Recipets = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const pdfRef = useRef();

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("patientToken");

      const decoded = jwtDecode(token);

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
      console.log(error);
    }
  };

  // PDF DOWNLOAD

  const downloadPDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "A4");

    const width = 190;

    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(
      imgData,

      "PNG",

      10,

      10,

      width,

      height,
    );

    pdf.save("MediConnect_Prescription.pdf");
  };

  return (
    <div className="prescription-container">
      {prescriptions.length === 0 ? (
        <h2>No Prescription Available</h2>
      ) : (
        prescriptions.map((item) => (
          <div className="prescription-wrapper" key={item.PrescriptionId}>
            <div className="prescription-bill" ref={pdfRef}>
              {/* HEADER */}

              <div className="hospital-header">
                <div>
                  <h1>🏥 MediConnect</h1>

                  <p>Hospital Management System</p>

                  <p>Healthcare • Trust • Care</p>
                </div>

                <FaFilePrescription className="big-icon" />
              </div>

              <hr />

              {/* PATIENT */}

              <div className="section">
                <h3>Patient Information</h3>

                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>

                      <td>{item.PatientName}</td>
                    </tr>

                    <tr>
                      <td>Prescription ID</td>

                      <td>#{item.PrescriptionId}</td>
                    </tr>

                    <tr>
                      <td>Date</td>

                      <td>
                        <FaCalendarAlt />

                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* DOCTOR */}

              <div className="section">
                <h3>
                  <FaUserMd />
                  Doctor Details
                </h3>

                <p>Dr. {item.DoctorName}</p>
              </div>

              {/* DIAGNOSIS */}

              <div className="section">
                <h3>
                  <FaNotesMedical />
                  Diagnosis
                </h3>

                <p>{item.Diagnosis}</p>
              </div>

              {/* MEDICINES */}

              <div className="section">
                <h3>
                  <FaPills />
                  Prescription
                </h3>

                <div className="rx">Rx</div>

                <table className="medicine-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>

                      <th>Dosage</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{item.Medicines}</td>

                      <td>{item.Dosage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* INSTRUCTIONS */}

              <div className="section">
                <h3>Instructions</h3>

                <p>{item.Instructions}</p>
              </div>

              <div className="signature">
                <div>
                  Doctor Signature
                  <br />
                  _________________
                </div>
              </div>

              <div className="footer">
                MediConnect Hospital
                <br />
                Patient Copy
              </div>
            </div>

            <button className="download-btn" onClick={downloadPDF}>
              <FaDownload />
              Download Prescription
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Recipets;
