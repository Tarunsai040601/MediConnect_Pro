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
import PatientLayout from "./Components/DashBoards/PatientDashBoard/PatientLayout/PatientLayout";
import About from "./Components/DashBoards/PatientDashBoard/About/About";
import ShowDoctorsData from "./Components/DashBoards/PatientDashBoard/ShowDoctorsData/ShowDoctorsData";
import BookAppointment from "./Components/DashBoards/PatientDashBoard/BookAppointment/BookAppointment";
import MyAppointments from "./Components/DashBoards/PatientDashBoard/MyAppointments/MyAppointments";
import DoctorDetails from "./Components/DashBoards/PatientDashBoard/ShowDoctorsData/DoctorDetails/DoctorDetails";
import DoctotLayout from "./Components/DashBoards/DoctorDashBoard/DoctorLayout/DoctotLayout";
// import Myprofile from "./Components/DashBoards/DoctorDashBoard/Myprofile/Myprofile";
import CreateProfile from "./Components/DashBoards/DoctorDashBoard/CreateProfile/CreateProfile";
import Myprofile from "./Components/DashBoards/DoctorDashBoard/Myprofile/Myprofile";
import PatientAppointments from "./Components/DashBoards/DoctorDashBoard/PatentAppointments/PatientAppointments";
import Recipets from "./Components/DashBoards/PatientDashBoard/MyRecipets/Recipets";
import MediInfo from "./Components/DashBoards/DoctorDashBoard/GiveMediInfo/MediInfo";

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
      {/* Patient Dashboard */}
      <Route path="/Mediconnect" element={<PatientLayout />}>
        <Route index element={<PatientHome />} />
        {/* Future Pages */}
        <Route path="about" element={<About />} />
        <Route path="doctors" element={<ShowDoctorsData />} />
        <Route path="doctor/:id" element={<DoctorDetails />} />
        <Route path="BookAppointment" element={<BookAppointment />} />
        <Route path="MyAppointments" element={<MyAppointments />} />
        <Route path="Myrecipet" element={<Recipets/>}/>
      </Route>
      {/* Doctor Dashboard */}
      <Route path="/DoctorDashboard" element={<DoctotLayout />}>
        <Route index element={<DoctorHomePage />} />
        <Route path="Createprofile" element={<CreateProfile/>} />
        <Route path="Myprofile" element={<Myprofile/>}/>
        <Route path="PatientAppointments" element={<PatientAppointments/>}/>
        <Route path="mediInfo" element={<MediInfo/>}/>
      </Route>
    </Routes>
  );
};

export default App;
