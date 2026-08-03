const express = require("express");
const dotenv = require("dotenv").config({ quiet: true });
const { dataBaseconnection } = require("./Configurations/config.js");
const AuthRouter = require("./Routers/AuthRouters/AuthRouter.js");
const DoctorRouter = require("./Routers/DoctorsRouters/DoctorsRouters.js");
const DoctorDetailsRouters = require("./Routers/DoctorsDetails/DoctorsDetailsRouters.js");
const cors=require('cors')
const app = express();
const port = process.env.serverPort || 8085;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())
// authrouter middleware
app.use("/api", AuthRouter);
// doctorCreate Router middleware
app.use("/api", DoctorRouter);
// doctor profile router
app.use("/api",DoctorDetailsRouters)
app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);
});
dataBaseconnection();
