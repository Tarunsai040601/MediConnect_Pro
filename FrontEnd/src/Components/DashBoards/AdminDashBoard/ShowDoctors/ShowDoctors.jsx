import React, { useEffect, useState } from "react";
import "./ShowDoctors.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUserMd,
  FaEnvelope,
  FaUserTag,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const API_BASE = "http://localhost:8080/api";

const ShowDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const [editDoctor, setEditDoctor] = useState(null);

  const token = localStorage.getItem("adminToken");

  console.log("Token:", token);

  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  // ==================== GET ALL ====================

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/doctor`, {
        headers,
      });

      setDoctors(res.data.details || []);
      setFilteredDoctors(res.data.details || []);
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Unable to load doctors", "error");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ================= SEARCH =================

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setFilteredDoctors(doctors);
      return;
    }

    const filter = doctors.filter((doc) =>
      doc.Name.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredDoctors(filter);
  };

  // ================= DELETE =================

  const handleDelete = async (name) => {
    const result = await Swal.fire({
      title: "Delete Doctor?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/doctor/${name}`, {
        headers,
      });

      Swal.fire("Deleted!", "Doctor deleted successfully.", "success");

      fetchDoctors();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Delete failed",
        "error",
      );
    }
  };

  // ================= UPDATE =================

  const handleUpdate = async () => {
    try {
      await axios.patch(`${API_BASE}/doctor/${editDoctor.Name}`, editDoctor, {
        headers,
      });

      Swal.fire("Success", "Doctor updated successfully", "success");

      setEditDoctor(null);
      fetchDoctors();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Update failed",
        "error",
      );
    }
  };

  return (
    <div className="showDoctorsPage">
      <div className="doctorTop">
        <h2>Doctors List</h2>

        <div className="doctorSearch">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Doctor..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="doctorGrid">
        {filteredDoctors.length === 0 ? (
          <h3>No Doctors Found</h3>
        ) : (
          filteredDoctors.map((doctor, index) => (
            <div className="doctorCard" key={index}>
              <div className="doctorImage">
                <FaUserMd />
              </div>

              <h3>{doctor.Name}</h3>

              <p>
                <FaEnvelope /> {doctor.Email}
              </p>

              <span>
                <FaUserTag /> {doctor.Role}
              </span>

              <div className="doctorBtns">
                <button
                  className="editBtn"
                  onClick={() => setEditDoctor({ ...doctor })}
                >
                  <FaEdit /> Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(doctor.Name)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editDoctor && (
        <div className="doctorModal">
          <div className="doctorModalContent">
            <div className="modalHead">
              <h2>Edit Doctor</h2>

              <FaTimes className="close" onClick={() => setEditDoctor(null)} />
            </div>

            <input
              type="text"
              value={editDoctor.Name}
              onChange={(e) =>
                setEditDoctor({
                  ...editDoctor,
                  Name: e.target.value,
                })
              }
            />

            <input
              type="email"
              value={editDoctor.Email}
              onChange={(e) =>
                setEditDoctor({
                  ...editDoctor,
                  Email: e.target.value,
                })
              }
            />

            <button onClick={handleUpdate}>Update Doctor</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDoctors;
