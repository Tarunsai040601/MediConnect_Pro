import React, { useEffect, useState } from "react";
import "./MyAppointments.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
} from "react-icons/fa";

const API_BASE = "https://mediconnect-pro-gzv5.onrender.com/api";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const data = appointments.filter(
      (item) =>
        item.DoctorName?.toLowerCase().includes(search.toLowerCase()) ||
        item.Disease?.toLowerCase().includes(search.toLowerCase()) ||
        item.Specialization?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredAppointments(data);
  }, [search, appointments]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("patientToken");

      const res = await axios.get(
        `${API_BASE}/booking/myAppointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.details);
      setFilteredAppointments(res.data.details);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Appointment
  const handleDelete = async (BookingId) => {
    const result = await Swal.fire({
      title: "Delete Appointment?",
      text: "You won't be able to recover it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("patientToken");

      await axios.delete(
        `${API_BASE}/booking/delete/${BookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire(
        "Deleted!",
        "Appointment deleted successfully.",
        "success"
      );

      fetchAppointments();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Delete Failed",
        "error"
      );
    }
  };

  // Update Appointment
  const handleUpdate = async (appointment) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Appointment",
      html: `
        <input id="date" type="date" class="swal2-input" value="${appointment.AppointmentDate?.split("T")[0] || ""}">
        <input id="time" type="time" class="swal2-input" value="${appointment.AppointmentTime}">
        <input id="disease" class="swal2-input" placeholder="Disease" value="${appointment.Disease}">
        <textarea id="symptoms" class="swal2-textarea" placeholder="Symptoms">${appointment.Symptoms}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => ({
        AppointmentDate: document.getElementById("date").value,
        AppointmentTime: document.getElementById("time").value,
        Disease: document.getElementById("disease").value,
        Symptoms: document.getElementById("symptoms").value,
      }),
    });

    if (!formValues) return;

    try {
      const token = localStorage.getItem("patientToken");

      await axios.patch(
        `${API_BASE}/booking/update/${appointment.BookingId}`,
        {
          DoctorId: appointment.DoctorId,
          ...formValues,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire(
        "Updated",
        "Appointment Updated Successfully",
        "success"
      );

      fetchAppointments();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Update Failed",
        "error"
      );
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p>View, Update or Cancel your appointments.</p>
      </div>

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search Doctor / Disease..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Disease</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((item) => (
                <tr key={item.BookingId}>
                  <td>
                    <div className="doctor-cell">
                      <img
                        src={item.ProfileImage}
                        alt={item.DoctorName}
                        onError={(e) => {
                          e.target.src =
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                        }}
                      />

                      <span>
                        <FaUserMd /> Dr. {item.DoctorName}
                      </span>
                    </div>
                  </td>

                  <td>{item.Specialization}</td>

                  <td>{item.Disease}</td>

                  <td>
                    <FaCalendarAlt />
                    {" "}
                    {new Date(item.AppointmentDate).toLocaleDateString()}
                  </td>

                  <td>
                    <FaClock />
                    {" "}
                    {item.AppointmentTime}
                  </td>

                  <td>
                    <span
                      className={`status ${item.BookingStatus.toLowerCase()}`}
                    >
                      {item.BookingStatus}
                    </span>
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleUpdate(item)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.BookingId)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <h3>No Appointments Found</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;