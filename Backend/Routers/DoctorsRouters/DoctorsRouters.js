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
DoctorRouter.get(
  `${perfix}`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  GetDoctors,
);
DoctorRouter.post(
  `${perfix}/create`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  CreateDoctor,
);
DoctorRouter.patch(
  `${perfix}/:name`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  updateDoctor,
);
DoctorRouter.get(
  `${perfix}/:name`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  GetDoctorById,
);
DoctorRouter.delete(
  `${perfix}/:name`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  DeleteDoctor,
);

// module exports
module.exports = DoctorRouter;
