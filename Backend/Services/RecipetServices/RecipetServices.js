const { knex } = require("../../Configurations/config");

const TableName = "PrescriptionDetails";
const SchemaName = "HospitalManagement_Sysytem";

// ================= CREATE PRESCRIPTION =================

const CreateRecipet = async (req, res) => {
  try {
    console.log("Logged Doctor:", req.users);

    if (!req.users || !req.users.name) {
      return res.status(401).json({
        message: "Doctor authentication failed",
      });
    }

    const {
      PatientName,
      BookingId,
      Diagnosis,
      Medicines,
      Dosage,
      Instructions,
    } = req.body;

    if (!PatientName || !BookingId || !Diagnosis || !Medicines) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const DoctorName = req.users.name;

    const prescription = await knex(TableName)
      .withSchema(SchemaName)
      .insert({
        PatientName,

        DoctorName,

        BookingId,

        Diagnosis,

        Medicines,

        Dosage,

        Instructions,

        Status: "Active",
      })
      .returning("*");

    return res.status(201).json({
      message: "Prescription Created Successfully",

      data: prescription[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",

      error: error.message,
    });
  }
};

// ================= GET DOCTOR PRESCRIPTIONS =================

const getDoctorRecipets = async (req, res) => {
  try {
    console.log("Doctor:", req.users);

    if (!req.users || !req.users.name) {
      return res.status(401).json({
        message: "Doctor authentication failed",
      });
    }

    const DoctorName = req.users.name;

    const data = await knex(TableName)
      .withSchema(SchemaName)

      .where({
        DoctorName,
      })

      .orderBy(
        "created_at",

        "desc",
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET PATIENT PRESCRIPTION =================

const getByNameRecipet = async (req, res) => {
  try {
    const { name } = req.params;

    const data = await knex(TableName)
      .withSchema(SchemaName)

      .where(
        "PatientName",

        name,
      );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE =================

const UpdateRecipet = async (req, res) => {
  try {
    const { PrescriptionId } = req.params;

    const {
      Diagnosis,

      Medicines,

      Dosage,

      Instructions,

      Status,
    } = req.body;

    const updated = await knex(TableName)
      .withSchema(SchemaName)

      .where(
        "PrescriptionId",

        PrescriptionId,
      )

      .update({
        Diagnosis,

        Medicines,

        Dosage,

        Instructions,

        Status,

        updated_at: knex.fn.now(),
      })

      .returning("*");

    return res.status(200).json({
      message: "Prescription Updated",

      data: updated[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE =================

const deleteByNameRecipet = async (req, res) => {
  try {
    const { PrescriptionId } = req.params;

    await knex(TableName)
      .withSchema(SchemaName)

      .where(
        "PrescriptionId",

        PrescriptionId,
      )

      .del();

    return res.status(200).json({
      message: "Prescription Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  CreateRecipet,

  UpdateRecipet,

  getByNameRecipet,

  deleteByNameRecipet,

  getDoctorRecipets,
};
