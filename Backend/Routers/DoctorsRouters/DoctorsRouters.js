const express = require("express");
const {
  GetDoctors,
  CreateDoctor,
  updateDoctor,
  GetDoctorById,
  DeleteDoctor,
  FetchallDoctors,
} = require("../../Services/DoctorsServices/DoctorServices.js");
const AuthMiddleWare = require("../../MiddleWares/AuthMiddleWare/AuthMiddleWare.js");
const roleMiddleware = require("../../MiddleWares/RoleMiddleware/RoleMiddleware.js");
const DoctorRouter = express.Router();
const perfix = "/doctor";
// get doctor after login admin
DoctorRouter.get(
  `${perfix}`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  GetDoctors,
);
// post doctors
DoctorRouter.post(
  `${perfix}/create`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  CreateDoctor,
);
// update doctor by name
DoctorRouter.patch(
  `${perfix}/:name`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  updateDoctor,
);
// get all doctor without token
DoctorRouter.get(`${perfix}/fetch`, FetchallDoctors);
// get doctor by name
DoctorRouter.get(
  `${perfix}/:name`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  GetDoctorById,
);
// delete doctor by name
DoctorRouter.delete(
  `${perfix}/:name`,
  AuthMiddleWare,
  roleMiddleware(["admin"]),
  DeleteDoctor,
);

// module exports
module.exports = DoctorRouter;
