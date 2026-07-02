const { Pool } = require("pg");
const database = require("../knexfile.js");

const dataBaseconnection = async () => {
  try {
    const data = new Pool(database.development.connection);

    await data.connect();

    console.log(
      `Database connected successfully on port ${database.development.connection.port}`
    );
  } catch (error) {
    console.log(
      `Database connection issue on port ${database.development.connection.port}`
    );
    console.log(error.message);
  }
};

module.exports = dataBaseconnection;