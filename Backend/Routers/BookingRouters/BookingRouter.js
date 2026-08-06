const express = require("express");
const {
  Booking,
  DeleteBooking,
  UpdateBooking,
  GetallPatients,
  MyAppointments,
  DoctorAppointments,
  AcceptAppointment,
  RejectAppointment,
} = require("../../Services/BookingServices/BookingServices");
const AuthMiddleWare = require("../../MiddleWares/AuthMiddleWare/AuthMiddleWare.js");
const roleMiddleware = require("../../MiddleWares/RoleMiddleware/RoleMiddleware.js");
const BookingRouter = express.Router();
const perfix = "/booking";
BookingRouter.get(
  `${perfix}/myAppointments`,
  AuthMiddleWare,
  roleMiddleware(["Patient"]),
  MyAppointments
);
// booking
BookingRouter.post(
  `${perfix}/create`,
  AuthMiddleWare,
  roleMiddleware(["Patient"]),
  Booking,
);
// update
BookingRouter.patch(
  `${perfix}/update/:BookingId`,
  AuthMiddleWare,
  roleMiddleware(["Patient"]),
  UpdateBooking,
);
// delete booking
BookingRouter.delete(
  `${perfix}/delete/:BookingId`,
  AuthMiddleWare,
  roleMiddleware(["Patient"]),
  DeleteBooking,
);
BookingRouter.get(
  `${perfix}/doctorAppointments`,
  AuthMiddleWare,
  roleMiddleware(["Doctor"]),
  DoctorAppointments
);

BookingRouter.patch(
  `${perfix}/accept/:BookingId`,
  AuthMiddleWare,
  roleMiddleware(["Doctor"]),
  AcceptAppointment
);

BookingRouter.patch(
  `${perfix}/reject/:BookingId`,
  AuthMiddleWare,
  roleMiddleware(["Doctor"]),
  RejectAppointment
);

// get all patients
BookingRouter.get(`${perfix}/allPatients`, GetallPatients);

module.exports = BookingRouter;
