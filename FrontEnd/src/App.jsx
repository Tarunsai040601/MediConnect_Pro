import React from "react";
import { Route, Routes } from "react-router-dom";

import Register from "./Components/Pages/Register/Register";
import Login from "./Components/Pages/Login/Login";

import DoctorHomePage from "./Components/DashBoards/DoctorDashBoard/Home/DoctorHomePage";
import PatientHome from "./Components/DashBoards/PatientDashBoard/Home/PatientHome";
import AdminHome from "./Components/DashBoards/AdminDashBoard/Home/AdminHome";
import AdminLayout from "./Components/DashBoards/AdminDashBoard/AdminLayouts/AdminLayout";
import CreateDoctor from "./Components/DashBoards/AdminDashBoard/CreateDoctor/CreateDoctor";
import ShowDoctors from "./Components/DashBoards/AdminDashBoard/ShowDoctors/ShowDoctors";
import ShowReviews from "./Components/DashBoards/AdminDashBoard/ShowReviews/ShowReviews";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Dashboard */}
      <Route path="/adminDashboard" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        {/* Future Pages */}
        <Route path="Createdoctors" element={<CreateDoctor />} />
        <Route path="ShowDoctors" element={<ShowDoctors />} />
        <Route path="Reviews" element={<ShowReviews />} />
      </Route>
      <Route path="/doctorDashBoard" element={<DoctorHomePage />} />
      <Route path="/patientDashBoard" element={<PatientHome />} />
    </Routes>
  );
};

export default App;
