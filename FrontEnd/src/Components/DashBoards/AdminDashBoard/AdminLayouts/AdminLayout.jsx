import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavBar />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;