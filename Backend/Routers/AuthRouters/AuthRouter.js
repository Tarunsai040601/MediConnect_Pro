const express = require("express");
const {
  Register,
  Login,
} = require("../../Services/AuthServices/AuthServices.js");
const AuthRouter = express.Router();

const perfix = "/authRouter";

AuthRouter.post(`${perfix}/Register`, Register);
AuthRouter.post(`${perfix}/login`, Login);

module.exports = AuthRouter;
