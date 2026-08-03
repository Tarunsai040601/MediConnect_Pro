const path = require("path");

// Load .env from Backend folder
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const sgMail = require("@sendgrid/mail");

console.log("API KEY Loaded:", process.env.SENDGRID_API_KEY ? "YES ✅" : "NO ❌");
console.log("FROM EMAIL:", process.env.FROM_EMAIL);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendTestMail() {
  try {
    const msg = {
      to: "YOUR_RECEIVER_EMAIL@gmail.com", // Replace with your email
      from: process.env.FROM_EMAIL,
      subject: "Hospital Management Test Email",
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>✅ SendGrid Working</h2>
          <p>This is a test email from Hospital Management System.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    console.log("✅ Email Sent Successfully");
  } catch (err) {
    console.log("❌ Email Sending Failed");

    console.log("Status Code:", err.code);

    if (err.response) {
      console.log("Response Body:");
      console.log(JSON.stringify(err.response.body, null, 2));
    } else {
      console.log(err.message);
    }
  }
}

sendTestMail();