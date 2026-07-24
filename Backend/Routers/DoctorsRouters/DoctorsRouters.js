const express = require("express");
const {
  GetDoctors,
  CreateDoctor,
  updateDoctor,
  GetDoctorById,
  DeleteDoctor,
} = require("../../Services/DoctorsServices/DoctorServices");
const AuthMiddleWare = require("../../MiddleWares/AuthMiddleWare/AuthMiddleWare");
const roleMiddleware = require("../../MiddleWares/RoleMiddleware/RoleMiddleware");
const DoctorRouter = express.Router();
const perfix = "/doctor";
DoctorRouter.get(`${perfix}`, GetDoctors);
DoctorRouter.post(
  `${perfix}/create`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  CreateDoctor,
);
DoctorRouter.patch(`${perfix}`, updateDoctor);
DoctorRouter.get(`${perfix}`, GetDoctorById);
DoctorRouter.delete(`${perfix}`, DeleteDoctor);

// module exports
module.exports = DoctorRouter;
