import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const AdminLayout = () => {
  return (
    <div className="layout-wrapper">
      <AdminNavBar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;