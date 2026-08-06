import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MediInfo.css";

const API = "http://localhost:8080/api/Recipet";

const MediInfo = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const [formData, setFormData] = useState({
    PatientName: "",
    BookingId: "",
    Diagnosis: "",
    Medicines: "",
    Dosage: "",
    Instructions: "",
  });

  const token = localStorage.getItem("doctorToken");
  console.log("Doctor Token:", token);

  // ================= TOKEN CHECK =================

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ================= GET DOCTOR PRESCRIPTIONS =================

  const getPrescriptions = async () => {
    try {
      if (!token) {
        console.log("Doctor token missing");

        return;
      }

      const response = await axios.get(
        `${API}/doctor`,

        authConfig,
      );

      console.log("Prescription Data:", response.data);

      setPrescriptions(response.data.data || []);
    } catch (error) {
      console.log(
        "GET PRESCRIPTION ERROR:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    getPrescriptions();
  }, []);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        alert("Doctor login required");

        return;
      }

      const response = await axios.post(
        `${API}/create`,

        formData,

        authConfig,
      );

      console.log(response.data);

      alert("Prescription Created");

      setFormData({
        PatientName: "",
        BookingId: "",
        Diagnosis: "",
        Medicines: "",
        Dosage: "",
        Instructions: "",
      });

      getPrescriptions();
    } catch (error) {
      console.log("CREATE ERROR:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ================= DELETE =================

  const deletePrescription = async (id) => {
    try {
      await axios.delete(
        `${API}/delete/${id}`,

        authConfig,
      );

      alert("Deleted Successfully");

      getPrescriptions();
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <div className="prescription-container">
      <div className="prescription-content">
        <div className="prescription-form-section">
          <h2>💊 Create Prescription</h2>

          <form className="prescription-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="PatientName"
              placeholder="Patient Name"
              value={formData.PatientName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="BookingId"
              placeholder="Booking ID"
              value={formData.BookingId}
              onChange={handleChange}
            />

            <textarea
              name="Diagnosis"
              placeholder="Diagnosis"
              value={formData.Diagnosis}
              onChange={handleChange}
            />

            <textarea
              name="Medicines"
              placeholder="Medicines"
              value={formData.Medicines}
              onChange={handleChange}
            />

            <input
              type="text"
              name="Dosage"
              placeholder="Dosage"
              value={formData.Dosage}
              onChange={handleChange}
            />

            <textarea
              name="Instructions"
              placeholder="Instructions"
              value={formData.Instructions}
              onChange={handleChange}
            />

            <button type="submit">Create Prescription</button>
          </form>
        </div>

        <div className="prescription-table-section">
          <h2>📋 My Prescriptions</h2>

          <div className="prescription-table">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>

                  <th>Booking ID</th>

                  <th>Diagnosis</th>

                  <th>Medicines</th>

                  <th>Dosage</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {prescriptions.length === 0 ? (
                  <tr>
                    <td colSpan="6">No Prescriptions Found</td>
                  </tr>
                ) : (
                  prescriptions.map((item) => (
                    <tr key={item.PrescriptionId}>
                      <td>{item.PatientName}</td>

                      <td>{item.BookingId}</td>

                      <td>{item.Diagnosis}</td>

                      <td>{item.Medicines}</td>

                      <td>{item.Dosage}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deletePrescription(item.PrescriptionId)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediInfo;