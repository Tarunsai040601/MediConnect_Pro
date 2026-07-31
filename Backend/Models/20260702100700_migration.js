/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table_name = "AuthDetails";
const SchemaName = "HospitalManagement_Sysytem";

exports.up = async function (knex) {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${SchemaName}"`);

  await knex.schema.withSchema(SchemaName).createTable(table_name, (table) => {
    table.increments("id").primary();

    table.string("Name").notNullable();

    table.string("Email").notNullable().unique();

    table.string("Password").notNullable();

    table.string("Role").notNullable();

    // Login ayina admin id store avuthundi
    table.integer("CreatedBy").nullable();

    table.timestamps(true, true);
  });

  console.log("Schema and Table created successfully.");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.withSchema(SchemaName).dropTableIfExists(table_name);
};