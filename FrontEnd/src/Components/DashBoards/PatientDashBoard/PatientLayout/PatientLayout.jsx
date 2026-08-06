import React from "react";
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import { Outlet } from "react-router-dom";
const PatientLayout = () => {
  return (
    <div className="layout-wrapper">
      <PatientNavBar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default PatientLayout;
