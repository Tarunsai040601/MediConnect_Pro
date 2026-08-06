const express = require("express");

const AuthMiddleWare = require("../../MiddleWares/AuthMiddleWare/AuthMiddleWare");

const roleMiddleware = require("../../MiddleWares/RoleMiddleware/RoleMiddleware");

const {
  CreateRecipet,
  UpdateRecipet,
  getByNameRecipet,
  deleteByNameRecipet,
  getDoctorRecipets,
} = require("../../Services/RecipetServices/RecipetServices");

const RecipetRouter = express.Router();

const Prefix = "/Recipet";

// CREATE

RecipetRouter.post(
  `${Prefix}/create`,

  AuthMiddleWare,

  roleMiddleware(["Doctor"]),

  CreateRecipet,
);

// DOCTOR GET ALL

RecipetRouter.get(
  `${Prefix}/doctor`,

  AuthMiddleWare,

  roleMiddleware(["Doctor"]),

  getDoctorRecipets,
);

// PATIENT GET

RecipetRouter.get(
  `${Prefix}/getall/:name`,

  AuthMiddleWare,

  getByNameRecipet,
);

// UPDATE

RecipetRouter.patch(
  `${Prefix}/update/:PrescriptionId`,

  AuthMiddleWare,

  roleMiddleware(["Doctor"]),

  UpdateRecipet,
);

// DELETE

RecipetRouter.delete(
  `${Prefix}/delete/:PrescriptionId`,

  AuthMiddleWare,

  roleMiddleware(["Doctor"]),

  deleteByNameRecipet,
);

module.exports = RecipetRouter;
