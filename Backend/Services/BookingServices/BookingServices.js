const { knex } = require("../../Configurations/config.js");
const {
  sendAppointmentMail,
  sendAppointmentAcceptedMail,
  sendAppointmentRejectedMail,
} = require("../../Configurations/Utils/SendEmail.js");

const BookingTable = "PatientBookingDetails";
const GetAllPatients = "AuthDetails";
const DoctorTable = "DoctorDetails";
const SchemaName = "HospitalManagement_Sysytem";

// ===================== My Appointments =====================

const MyAppointments = async (req, res) => {
  try {
    const { id } = req.users;
   

    const bookings = await knex(`${SchemaName}.${BookingTable} as b`)
      .leftJoin(`${SchemaName}.${DoctorTable} as d`, "b.DoctorId", "d.DoctorId")
      .select(
        "b.BookingId",
        "b.Disease",
        "b.Symptoms",
        "b.AppointmentDate",
        "b.AppointmentTime",
        "b.BookingStatus",
        "d.DoctorId",
        "d.AuthId as DoctorName",
        "d.Specialization",
        "d.HospitalName",
        "d.ProfileImage",
        "d.ConsultationFee",
      )
      .where("b.PatientId", id)
      .orderBy("b.AppointmentDate", "desc");

    return res.status(200).json({
      success: true,
      message: "My Appointments",
      details: bookings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================get all patients=================
const GetallPatients = async (req, res) => {
  try {
    // Use case-insensitive match for Role to handle inconsistently cased values
    const allPatients = await knex(GetAllPatients)
      .withSchema(SchemaName)
      .whereRaw('LOWER("Role") = ?', ["patient"])
      .select("id", "Name", "Email", "Role");

    // Always return 200 with an array (possibly empty). Frontend expects a list
    // under 'details' and handles empty lists gracefully.
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
    // ================= JWT User =================
    const { id, name, email, role } = req.users;
    console.log("JWT USER:", req.users);

    // Only Patient can book
    if (role !== "patient") {
      return res.status(403).json({
        success: false,
        message: "Only patients can book appointments",
      });
    }

    // ================= Request Body =================
    const { DoctorId, Disease, Symptoms, AppointmentDate, AppointmentTime } =
      req.body;

    // ================= Validation =================
    if (!DoctorId || !Disease || !AppointmentDate || !AppointmentTime) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // ================= Get Doctor Details =================
    const doctor = await knex(DoctorTable)
      .withSchema(SchemaName)
      .where({ DoctorId })
      .select("DoctorId", "AuthId", "Specialization", "HospitalName")
      .first();
    console.log("Doctor Object:", doctor);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // ================= Check Slot =================
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

    // ================= Insert Booking =================
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

    // ================= Send Email =================
    try {
      await sendAppointmentMail(
        email,
        name,
        `${doctor.AuthId} (${doctor.Specialization.trim()})`,
        AppointmentDate,
        AppointmentTime,
        Disease,
      );
    } catch (mailError) {
      console.log("Email Error:", mailError.message);
    }

    // ================= Response =================
    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      Patient: {
        id,
        name,
        email,
      },
      Doctor: {
        DoctorId: doctor.DoctorId,
        Name: doctor.Name,
        Specialization: doctor.Specialization,
        Hospital: doctor.HospitalName,
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

// ===================== Doctor Appointments =====================

// ===================== Doctor Appointments =====================

const DoctorAppointments = async (req, res) => {
  try {
    const { id, name } = req.users;
    console.log("iddata:", req.users);

    // Find Doctor using JWT AuthId (AuthId stores the user's Name)
    const doctor = await knex(DoctorTable)
      .withSchema(SchemaName)
      .where({ AuthId: name })
      .first();
    console.log("DOCTOR DATA:", doctor);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    // Get Doctor Appointments
    const appointments = await knex(`${BookingTable} as b`)
      .withSchema(SchemaName)
      .join(
        `${GetAllPatients} as p`,
        "b.PatientId",
        "p.id"
      )
      .where("b.DoctorId", doctor.DoctorId)
      .select(
        "b.BookingId",
        "b.Disease",
        "b.Symptoms",
        "b.AppointmentDate",
        "b.AppointmentTime",
        "b.BookingStatus",
        // Note: some DBs may not have a RejectReason column on the bookings table.
        // Avoid selecting it directly to prevent SQL errors when the column is absent.
        "p.id as PatientId",
        "p.Name as PatientName",
        "p.Email as PatientEmail"
      )
      .orderBy("b.AppointmentDate", "asc");


    return res.status(200).json({
      success: true,
      message: "Doctor Appointments",
      details: appointments,
    });


  } catch (error) {

    console.log(
      "DoctorAppointments Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===================== Accept Appointment =====================

const AcceptAppointment = async (req, res) => {
  try {
    const { BookingId } = req.params;

    const booking = await knex(`${SchemaName}.${BookingTable} as b`)
      .leftJoin(
        `${SchemaName}.${DoctorTable} as d`,
        "b.DoctorId",
        "d.DoctorId"
      )
      .leftJoin(
        `${SchemaName}.AuthDetails as a`,
        "b.PatientId",
        "a.id"
      )
      .select(
        "b.*",
        "a.Name as PatientName",
        "a.Email",
        "d.AuthId as DoctorName",
        "d.Specialization",
        "d.HospitalName"
      )
      .where("b.BookingId", BookingId)
      .first();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    await knex(BookingTable)
      .withSchema(SchemaName)
      .where({ BookingId })
      .update({
        BookingStatus: "Accepted",
      });

    await sendAppointmentAcceptedMail(
      booking.Email,
      booking.PatientName,
      booking.DoctorName,
      booking.Specialization,
      booking.HospitalName,
      booking.AppointmentDate,
      booking.AppointmentTime
    );

    return res.status(200).json({
      success: true,
      message: "Appointment Accepted Successfully",
    });
  } catch (error) {
    console.log("Accept Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===================== Reject Appointment =====================

// ===================== Reject Appointment =====================

const RejectAppointment = async (req, res) => {
  try {
    const { BookingId } = req.params;
    const { reason } = req.body;


    const booking = await knex(`${SchemaName}.${BookingTable} as b`)
      .leftJoin(
        `${SchemaName}.${DoctorTable} as d`,
        "b.DoctorId",
        "d.DoctorId"
      )
      .leftJoin(
        `${SchemaName}.AuthDetails as a`,
        "b.PatientId",
        "a.id"
      )
      .select(
        "b.*",
        "a.Name as PatientName",
        "a.Email",
        "d.AuthId as DoctorName",
        "d.Specialization",
        "d.HospitalName"
      )
      .where("b.BookingId", BookingId)
      .first();


    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }


    await knex(BookingTable)
      .withSchema(SchemaName)
      .where({ BookingId })
      .update({
        BookingStatus: "Rejected",
        RejectReason: reason,
      });


    await sendAppointmentRejectedMail(
      booking.Email,
      booking.PatientName,
      booking.DoctorName,
      booking.Specialization,
      booking.HospitalName,
      booking.AppointmentDate,
      booking.AppointmentTime,
      reason
    );


    return res.status(200).json({
      success: true,
      message: "Appointment Rejected Successfully",
    });


  } catch (error) {

    console.log("Reject Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  MyAppointments,
  GetallPatients,
  Booking,
  UpdateBooking,
  DeleteBooking,
  DoctorAppointments,
  AcceptAppointment,
  RejectAppointment,
};
