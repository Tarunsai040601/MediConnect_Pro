const dotenv = require("dotenv");
dotenv.config();

const knexConfig = require("../knexfile");

const environment = process.env.NODE_ENV || "development";

const knex = require("knex")(knexConfig[environment]);

const dataBaseconnection = async () => {
  try {
    await knex.raw("SELECT 1");
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed");
    console.log(error.message);
  }
};

module.exports = {
  knex,
  dataBaseconnection,
};