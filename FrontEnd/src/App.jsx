import React from "react";
import { Route, Routes } from "react-router-dom";

import Register from "./Components/Pages/Register/Register";
import Login from "./Components/Pages/Login/Login";

import DoctorHomePage from "./Components/DashBoards/DoctorDashBoard/Home/DoctorHomePage";
import PatientHome from "./Components/DashBoards/PatientDashBoard/Home/PatientHome";
import AdminHome from "./Components/DashBoards/AdminDashBoard/Home/AdminHome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/adminDashBoard" element={<AdminHome />} />
      <Route path="/doctorDashBoard" element={<DoctorHomePage />} />
      <Route path="/patientDashBoard" element={<PatientHome />} />
    </Routes>
  );
};

export default App;
