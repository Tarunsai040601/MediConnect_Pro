// taking table name & schema name here
const { knex } = require("../../Configurations/config.js");

const SchemaName = "HospitalManagement_Sysytem";
const table_name = "DoctorDetails";

// Create Profile
const CreateProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      Specialization,
      Qualification,
      Experience,
      PhoneNumber,
      HospitalName,
      HospitalAddress,
      AboutDoctor,
      ConsultationFee,
      AvailableDays,
      AvailableTime,
      IsAvailable,
    } = req.body || {};

    // Validation
    if (
      !Specialization ||
      !Qualification ||
      !Experience ||
      !PhoneNumber ||
      !HospitalName ||
      !HospitalAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check Profile Exists
    const checkProfile = await knex(table_name)
      .withSchema(SchemaName)
      .where({ AuthId: req.users.name })
      .first();

    if (checkProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    // Images
    const ProfileImage = req.files?.ProfileImage
      ? req.files.ProfileImage[0].path
      : null;

    const WorkingImage = req.files?.WorkingImage
      ? req.files.WorkingImage.map((img) => img.path)
      : [];

    // Insert Profile
    const profile = await knex(table_name)
      .withSchema(SchemaName)
      .insert({
        AuthId: req.users.name,
        Specialization,
        Qualification,
        Experience,
        ProfileImage,
        WorkingImage: JSON.stringify(WorkingImage),
        PhoneNumber,
        HospitalName,
        HospitalAddress,
        AboutDoctor,
        ConsultationFee: Number(ConsultationFee),
        AvailableDays,
        AvailableTime,
        IsAvailable: IsAvailable === "true",
        CreatedBy: req.users.id,
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Doctor profile created successfully",
      details: profile[0],
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
const UpdateProfile = async (req, res) => {
  try {
    const {
      Specialization,
      Qualification,
      Experience,
      PhoneNumber,
      HospitalName,
      HospitalAddress,
      AboutDoctor,
      ConsultationFee,
      AvailableDays,
      AvailableTime,
      IsAvailable,
    } = req.body;

    const checkProfile = await knex(table_name)
      .withSchema(SchemaName)
      .where({ AuthId: req.users.name })
      .first();

    if (!checkProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor Profile Not Found",
      });
    }

    const updateData = {};

    if (Specialization) updateData.Specialization = Specialization;
    if (Qualification) updateData.Qualification = Qualification;
    if (Experience) updateData.Experience = Experience;
    if (PhoneNumber) updateData.PhoneNumber = PhoneNumber;
    if (HospitalName) updateData.HospitalName = HospitalName;
    if (HospitalAddress) updateData.HospitalAddress = HospitalAddress;
    if (AboutDoctor) updateData.AboutDoctor = AboutDoctor;
    if (ConsultationFee) updateData.ConsultationFee = ConsultationFee;
    if (AvailableDays) updateData.AvailableDays = AvailableDays;
    if (AvailableTime) updateData.AvailableTime = AvailableTime;
    if (IsAvailable !== undefined)
      updateData.IsAvailable = IsAvailable;

    // Update Profile Image
    if (req.files?.ProfileImage) {
      updateData.ProfileImage = req.files.ProfileImage[0].path;
    }

    // Update Working Images
    if (req.files?.WorkingImage) {
      updateData.WorkingImage = req.files.WorkingImage.map(
        (img) => img.path
      );
    }

    const updatedProfile = await knex(table_name)
      .withSchema(SchemaName)
      .where({ AuthId: req.users.id })
      .update(updateData)
      .returning("*");

    return res.status(200).json({
      success: true,
      message: "Doctor Profile Updated Successfully",
      details: updatedProfile[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// featch doctor profile
const doctorProfile = async (req, res) => {
  try {
    const data = await knex(table_name)
      .withSchema(SchemaName)
      .select("*")
      .first();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor profile fetched successfully",
      details: data,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  CreateProfile,
  UpdateProfile,
  doctorProfile
};