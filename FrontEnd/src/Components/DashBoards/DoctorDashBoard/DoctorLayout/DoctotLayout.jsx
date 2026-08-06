import React from "react";
import { Outlet } from "react-router-dom";
import DoctorNavbar from "../DoctorNavbar/DoctorNavbar";

const DoctotLayout = () => {
  return (
    <div className="layout-wrapper">
      <DoctorNavbar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctotLayout;