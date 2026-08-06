require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    },
    migrations: {
      directory: "./Models",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./Models",
    },
  },
};