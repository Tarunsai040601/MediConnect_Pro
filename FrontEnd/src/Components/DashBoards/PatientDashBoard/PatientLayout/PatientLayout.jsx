import React from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import { Outlet } from "react-router-dom";
const PatientLayout = () => {
  return (
    <div>
      <PatientNavBar />
      <Outlet />
    </div>
  );
};

export default PatientLayout;
