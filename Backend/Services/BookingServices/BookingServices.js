const { knex } = require("../../Configurations/config");

const BookingTable = "PatientBookingDetails";
const GetAllPatients = "AuthDetails";
const DoctorTable = "DoctorDetails";
const SchemaName = "HospitalManagement_Sysytem";
// ============================get all patients=================
const GetallPatients = async (req, res) => {
  try {
    const allPatients = await knex(GetAllPatients)
      .withSchema(SchemaName)
      .where({ Role: "Patient" })
      .select("id","Name", "Email", "Role");

    if (allPatients.length === 0) {
      return res.status(404).json({
        message: "No Patients Available up to now",
      });
    }

    return res.status(200).json({
      message: "All Patients",
      details: allPatients,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// ===================== Booking =====================

const Booking = async (req, res) => {
  try {
    // Login user details from JWT
    const { id, name, email, role } = req.users;

    // Optional: Only patients can book
    if (role !== "Patient") {
      return res.status(403).json({
        success: false,
        message: "Only patients can book appointments",
      });
    }

    const { DoctorId, Disease, Symptoms, AppointmentDate, AppointmentTime } =
      req.body;

    // Validation
    if (!DoctorId || !Disease || !AppointmentDate || !AppointmentTime) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // Check doctor exists
    const doctor = await knex(DoctorTable)
      .withSchema(SchemaName)
      .where({ DoctorId })
      .first();

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check slot availability
    const alreadyBooked = await knex(BookingTable)
      .withSchema(SchemaName)
      .where({
        DoctorId,
        AppointmentDate,
        AppointmentTime,
      })
      .whereNot("BookingStatus", "Cancelled")
      .first();

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Selected slot is already booked",
      });
    }

    // Insert booking
    const booking = await knex(BookingTable)
      .withSchema(SchemaName)
      .insert({
        PatientId: id,
        DoctorId,
        Disease,
        Symptoms,
        AppointmentDate,
        AppointmentTime,
        BookingStatus: "Pending",
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      Patient: {
        id,
        name,
        email,
      },
      Doctor: {
        DoctorId,
      },
      Booking: booking[0],
    });
  } catch (error) {
    console.log("Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= Update Booking =================

const UpdateBooking = async (req, res) => {
  try {
    const { BookingId } = req.params;
    const { id } = req.users;

    const { DoctorId, Disease, Symptoms, AppointmentDate, AppointmentTime } =
      req.body;

    // Check booking exists
    const booking = await knex(BookingTable)
      .withSchema(SchemaName)
      .where({
        BookingId,
        PatientId: id,
      })
      .first();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check doctor exists
    const doctor = await knex(DoctorTable)
      .withSchema(SchemaName)
      .where({ DoctorId })
      .first();

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check slot availability (exclude current booking)
    const slotBooked = await knex(BookingTable)
      .withSchema(SchemaName)
      .where({
        DoctorId,
        AppointmentDate,
        AppointmentTime,
      })
      .whereNot("BookingId", BookingId)
      .whereNot("BookingStatus", "Cancelled")
      .first();

    if (slotBooked) {
      return res.status(400).json({
        success: false,
        message: "Selected slot already booked",
      });
    }

    // Update booking
    const updated = await knex(BookingTable)
      .withSchema(SchemaName)
      .where({ BookingId })
      .update(
        {
          DoctorId,
          Disease,
          Symptoms,
          AppointmentDate,
          AppointmentTime,
          updated_at: knex.fn.now(),
        },
        ["*"],
      );

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updated[0],
    });
  } catch (error) {
    console.log("Update Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===================== Delete Booking =====================

const DeleteBooking = async (req, res) => {
  try {
    const { BookingId } = req.params;
    const { id } = req.users;

    const booking = await knex(BookingTable)
      .withSchema(SchemaName)
      .where({
        BookingId,
        PatientId: id,
      })
      .first();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await knex(BookingTable).withSchema(SchemaName).where({ BookingId }).del();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log("Delete Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  GetallPatients,
  Booking,
  UpdateBooking,
  DeleteBooking,
};
