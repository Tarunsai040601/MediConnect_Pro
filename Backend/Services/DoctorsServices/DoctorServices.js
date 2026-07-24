const{knex}=require("../../Configurations/config.js")
const table_name = "AuthDetails";
const SchemaName = "HospitalManagement_Sysytem";
const bcryptjs = require("bcryptjs");
// get doctor details
const GetDoctors = () => {};
// create doctors
const CreateDoctor = async (req, res) => {
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
        message: `Doctor already exists with this email:${Email}`,
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
      message:"Doctor created sucessfully",
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
const updateDoctor = () => {};
const GetDoctorById = () => {};
const DeleteDoctor = () => {};

// module export
module.exports = {
  GetDoctors,
  CreateDoctor,
  updateDoctor,
  GetDoctorById,
  DeleteDoctor,
};
