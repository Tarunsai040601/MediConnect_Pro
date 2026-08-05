import React from "react";
import { Outlet } from "react-router-dom";
import DoctorNavbar from "../DoctorNavbar/DoctorNavbar";

const DoctotLayout = () => {
  return (
    <>
      <DoctorNavbar />
      <Outlet />
    </>
  );
};

export default DoctotLayout;