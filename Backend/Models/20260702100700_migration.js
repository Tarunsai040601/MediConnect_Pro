/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table_name = "AuthDetails";
const SchemaName = "HospitalManagement_Sysytem";
exports.up = async function (knex) {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${SchemaName}"`);
  await knex.schema.withSchema(SchemaName).createTable(table_name,(table) => {
    table.increments("id").primary();
    table.string("Name").notNullable();
    table.string("Email").notNullable();
    table.string("Password").notNullable().unique();
    table.string("Role").notNullable()
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
