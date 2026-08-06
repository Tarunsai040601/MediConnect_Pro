const express = require("express");
const {
  CreateProfile,
  UpdateProfile,
  doctorProfile,
  GetDoctorsAllProfile,
} = require("../../Services/DoctorDetailsServices/DoctorDetailsServices");
const upload = require("../../StorageFiles/Muliter.js");
const AuthMiddleWare = require("../../MiddleWares/AuthMiddleWare/AuthMiddleWare");
const roleMiddleware = require("../../MiddleWares/RoleMiddleware/RoleMiddleware");
const DoctorDetailsRouters = express.Router();
const perfix = "/doctorDetails";
// craete profile
DoctorDetailsRouters.post(
  `${perfix}/create`,
  AuthMiddleWare,
  roleMiddleware(["Doctor"]),
  upload.fields([
    {
      name: "ProfileImage",
      maxCount: 1,
    },
    {
      name: "WorkingImage",
      maxCount: 10,
    },
  ]),
  CreateProfile,
);
// update profile
DoctorDetailsRouters.patch(
  `${perfix}/update`,
  AuthMiddleWare,
  roleMiddleware(["Doctor"]),
  upload.fields([
    {
      name: "ProfileImage",
      maxCount: 1,
    },
    {
      name: "WorkingImage",
      maxCount: 10,
    },
  ]),
  UpdateProfile
);
// fetch doctor details
DoctorDetailsRouters.get(
  `${perfix}/profile`,
  AuthMiddleWare,
  roleMiddleware(["Doctor"]),
  doctorProfile,
);

// fetch all doctors
DoctorDetailsRouters.get(
  `${perfix}/DoctorsAllProfile`,
  GetDoctorsAllProfile
);

module.exports = DoctorDetailsRouters;
