// taking table name & schema name  here
const { knex } = require("../../Configurations/config.js");
const bcryptjs = require("bcryptjs");
const table_name = "AuthDetails";
const SchemaName = "HospitalManagement_Sysytem";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ quiet: true });

// register Services
const Register = async (req, res) => {
  try {
    const { Name, Email, Password, Role } = req.body;
    console.log("requestbody:", req.body);
    if (!Name || !Email || !Password || !Role) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required...!" });
    }
    // email formate
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(Email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    // password formate
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

    if (!passwordRegex.test(Password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
      });
    }
    // passwordHashing
    const PasswordHashing = await bcryptjs.hash(Password, 10);
    // check is there or not
    const User = await knex(table_name)
      .withSchema(SchemaName)
      .where({ Email })
      .first();
    if (User) {
      return res.status(400).json({
        success: false,
        message: `user already exists with this email:${Email}`,
      });
    }
    const setUser = await knex(table_name)
      .withSchema(SchemaName)
      .insert({
        Name,
        Email,
        Role,
        Password: PasswordHashing,
      })
      .returning("*");
    return res.status(200).json({
      success: true,
      UserDetails: {
        Name: setUser[0].Name,
        Email: setUser[0].Email,
        Role: setUser[0].Role,
      },
    });
  } catch (error) {
    console.log("error_data:", error);
    return res.status(500).json({ success: false, err_message: error.message });
  }
};
// Login Services
const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required...!" });
    }
    // email formate
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(Email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    // password formate
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

    if (!passwordRegex.test(Password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
      });
    }
    const Found = await knex(table_name)
      .withSchema(SchemaName)
      .where({ Email })
      .first();
    if (!Found) {
      return res.status(400).json({
        success: false,
        message: `user not found with this email:${Email}`,
      });
    }
    // compare password
    const CheckPassword = await bcryptjs.compare(Password, Found.Password);
    if (!CheckPassword) {
      return res.status(400).json({
        success: false,
        message: "invaild details",
      });
    }
    // token display payload data
    const playLoad = {
      id: Found.id,
      name: Found.Name,
      email: Found.Email,
      role: Found.Role,
    };
    // token
    const token = jwt.sign(playLoad, process.env.MYTOKEN, { expiresIn: "1d" });
    res.status(200).json({
      success: true,
      message: "login sucessfully",
      details: { id: Found.id, email: Found.Email },
      tokenDetails:{token}
    });
  } catch (error) {
    console.log("error_data:", error);
    return res.status(500).json({ success: false, err_message: error.message });
  }
};
module.exports = { Register, Login };
