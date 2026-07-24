// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dotenv=require('dotenv').config({quiet:true})
module.exports = {

  development: {
    client: "pg",
    connection: {
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password:process.env.password,
      database:process.env.database
    },

    migrations: {
      directory: "./Models"
    }
  },

  

};
