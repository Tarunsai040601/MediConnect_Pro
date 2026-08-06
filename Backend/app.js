const express = require("express");
const dotenv = require("dotenv").config({ quiet: true });

console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
console.log("FROM_EMAIL:", process.env.FROM_EMAIL);

const { dataBaseconnection } = require("./Configurations/config.js");
const AuthRouter = require("./Routers/AuthRouters/AuthRouter.js");
const DoctorRouter = require("./Routers/DoctorsRouters/DoctorsRouters.js");
const DoctorDetailsRouters = require("./Routers/DoctorsDetails/DoctorsDetailsRouters.js");
const cors = require("cors");
const BookingRouter = require("./Routers/BookingRouters/BookingRouter.js");
const RecipetRouter = require("./Routers/RecipetRouter/RecipetRouter.js");
const app = express();
const port = process.env.serverPort || 8085;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connect backend to frontend
app.use(cors());
// authrouter middleware
app.use("/api", AuthRouter);
// doctorCreate Router middleware
app.use("/api", DoctorRouter);
// doctor profile router
app.use("/api", DoctorDetailsRouters);
// patient booking
app.use("/api", BookingRouter);
// recipet
app.use("/api",RecipetRouter)

app.get("/", (req, res) => {
  res.send("MediConnect Pro Backend is Running 🚀");
});
app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);
});
dataBaseconnection();
