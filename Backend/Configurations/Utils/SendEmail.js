const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ================= BOOKING MAIL =================

const sendAppointmentMail = async (
  to,
  patientName,
  doctorName,
  appointmentDate,
  appointmentTime,
  disease
) => {
  try {
    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL,
      subject: "🏥 Appointment Booked Successfully",
      html: `
      <div style="max-width:600px;margin:auto;padding:20px;font-family:Arial,sans-serif;background:#f8f9fa;border-radius:10px">

        <h2 style="color:#0d6efd;text-align:center">
          Hospital Management System
        </h2>

        <p>Dear <b>${patientName}</b>,</p>

        <p>Your appointment has been booked successfully.</p>

        <table style="width:100%;border-collapse:collapse">

          <tr>
            <td><b>Doctor</b></td>
            <td>${doctorName}</td>
          </tr>

          <tr>
            <td><b>Disease</b></td>
            <td>${disease}</td>
          </tr>

          <tr>
            <td><b>Date</b></td>
            <td>${appointmentDate}</td>
          </tr>

          <tr>
            <td><b>Time</b></td>
            <td>${appointmentTime}</td>
          </tr>

          <tr>
            <td><b>Status</b></td>
            <td style="color:orange"><b>Pending</b></td>
          </tr>

        </table>

        <br>

        <p>Thank you for choosing our hospital.</p>

      </div>
      `,
    });

    console.log("✅ Appointment Booking Email Sent");
  } catch (err) {
    console.log(err);
  }
};

// ================= ACCEPTED MAIL =================

const sendAppointmentAcceptedMail = async (
  to,
  patientName,
  doctorName,
  specialization,
  hospitalName,
  appointmentDate,
  appointmentTime
) => {
  try {
    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL,
      subject: "✅ Appointment Accepted",
      html: `
      <div style="max-width:600px;margin:auto;padding:20px;background:#f4fff6;font-family:Arial;border-radius:10px">

      <h2 style="color:green;text-align:center">
      Appointment Confirmed
      </h2>

      <p>Dear <b>${patientName}</b>,</p>

      <p>Your appointment has been <b style="color:green">ACCEPTED</b>.</p>

      <table style="width:100%">

      <tr>
      <td><b>Doctor</b></td>
      <td>${doctorName}</td>
      </tr>

      <tr>
      <td><b>Specialization</b></td>
      <td>${specialization}</td>
      </tr>

      <tr>
      <td><b>Hospital</b></td>
      <td>${hospitalName}</td>
      </tr>

      <tr>
      <td><b>Date</b></td>
      <td>${appointmentDate}</td>
      </tr>

      <tr>
      <td><b>Time</b></td>
      <td>${appointmentTime}</td>
      </tr>

      </table>

      <br>

      <p>Please arrive 15 minutes before your appointment.</p>

      <h3 style="color:green">Thank You.</h3>

      </div>
      `,
    });

    console.log("✅ Accept Mail Sent");
  } catch (err) {
    console.log(err);
  }
};

// ================= REJECTED MAIL =================

const sendAppointmentRejectedMail = async (
  to,
  patientName,
  doctorName,
  specialization,
  hospitalName,
  appointmentDate,
  appointmentTime,
  reason
) => {
  try {
    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL,
      subject: "❌ Appointment Rejected",
      html: `
      <div style="max-width:600px;margin:auto;padding:20px;background:#fff5f5;font-family:Arial;border-radius:10px">

      <h2 style="color:red;text-align:center">
      Appointment Rejected
      </h2>

      <p>Dear <b>${patientName}</b>,</p>

      <p>Unfortunately your appointment has been <b style="color:red">REJECTED</b>.</p>

      <table style="width:100%">

      <tr>
      <td><b>Doctor</b></td>
      <td>${doctorName}</td>
      </tr>

      <tr>
      <td><b>Specialization</b></td>
      <td>${specialization}</td>
      </tr>

      <tr>
      <td><b>Hospital</b></td>
      <td>${hospitalName}</td>
      </tr>

      <tr>
      <td><b>Date</b></td>
      <td>${appointmentDate}</td>
      </tr>

      <tr>
      <td><b>Time</b></td>
      <td>${appointmentTime}</td>
      </tr>

      <tr>
      <td><b>Reason</b></td>
      <td style="color:red">${reason}</td>
      </tr>

      </table>

      <br>

      <p>Please book another slot.</p>

      </div>
      `,
    });

    console.log("❌ Reject Mail Sent");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendAppointmentMail,
  sendAppointmentAcceptedMail,
  sendAppointmentRejectedMail,
};