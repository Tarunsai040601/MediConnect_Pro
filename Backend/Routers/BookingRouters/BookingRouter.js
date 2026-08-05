const express = require("express");
const {
  Booking,
  DeleteBooking,
  UpdateBooking,
  GetallPatients,
  MyAppointments,
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

// get all patients
BookingRouter.get(`${perfix}/allPatients`, GetallPatients);

module.exports = BookingRouter;
