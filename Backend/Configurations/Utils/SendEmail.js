const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendAppointmentMail = async (
  to,
  patientName,
  doctorName,
  appointmentDate,
  appointmentTime,
  disease,
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

        <p>
          Thank you for choosing our hospital.
        </p>

      </div>
      `,
    });

    console.log("✅ Appointment Email Sent");
  } catch (err) {
    console.log("Status:", err.code);
    console.log("Response:", err.response?.body);
  }
};

module.exports = sendAppointmentMail;
