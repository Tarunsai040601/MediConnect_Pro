/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const SchemaName = "HospitalManagement_Sysytem";
const table_name = "DoctorDetails";

exports.up = async function (knex) {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${SchemaName}"`);

  await knex.schema.withSchema(SchemaName).createTable(table_name, (table) => {
    // Primary Key
    table.increments("DoctorId").primary();

    // AuthDetails Table Reference
    table.string("AuthId").notNullable().unique();

    // Professional Details
    table.string("Specialization").notNullable();
    table.string("Qualification").notNullable();
    table.string("Experience").notNullable();

    // Images
    table.string("ProfileImage");
    table.json("WorkingImage");

    // Contact Details
    table.string("PhoneNumber").notNullable();
    table.string("HospitalName").notNullable();
    table.text("HospitalAddress").notNullable();

    // Doctor Information
    table.text("AboutDoctor");
    table.integer("ConsultationFee").defaultTo(0);

    // Availability
    table.string("AvailableDays");
    table.string("AvailableTime");

    // Status
    table.boolean("IsAvailable").defaultTo(true);

    // Admin Details
    table.integer("CreatedBy").notNullable();

    // Created & Updated Time
    table.timestamps(true, true);
  });

  console.log("DoctorDetails table created successfully.");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = async function (knex) {
  await knex.schema.withSchema(SchemaName).dropTableIfExists(table_name);

  console.log("DoctorDetails table deleted successfully.");
};
