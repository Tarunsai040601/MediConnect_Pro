const express = require("express");
const dotenv = require("dotenv").config({ quiet: true });
const { dataBaseconnection } = require("./Configurations/config.js");
const AuthRouter = require("./Routers/AuthRouters/AuthRouter.js");
const app = express();
const port = process.env.serverPort || 8085;

// middleware
app.use(express.json())
app.use(express.urlencoded())
// router middleware
app.use("/api", AuthRouter);
app.listen(port, () => {
  console.log(`server is runing on http://localhost:${port}`);
});
dataBaseconnection();
