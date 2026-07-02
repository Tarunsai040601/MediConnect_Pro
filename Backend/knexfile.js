// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dotenv=require('dotenv').config({quiet:true})
module.exports = {

  development: {
    client: "pg",
    connection: {
      host: process.env.LOACLHOST,     // PostgreSQL server
      port: process.env.DATABASEPORT,
      user: process.env.USERNAME,
      password:process.env.PASSWORD,
      database:process.env.DATABASE
    },

    migrations: {
      directory: "./Models"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
