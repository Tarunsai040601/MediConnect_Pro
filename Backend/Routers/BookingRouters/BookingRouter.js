const express = require("express");
const {
  Booking,
  DeleteBooking,
  UpdateBooking,
} = require("../../Services/BookingServices/BookingServices");
const AuthMiddleWare = require("../../MiddleWares/AuthMiddleWare/AuthMiddleWare.js");
const roleMiddleware = require("../../MiddleWares/RoleMiddleware/RoleMiddleware.js");
const BookingRouter = express.Router();
const perfix = "/booking";

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

module.exports = BookingRouter;
