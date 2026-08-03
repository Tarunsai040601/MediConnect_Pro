/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return knex.schema
    .withSchema("HospitalManagement_Sysytem")
    .createTable("PatientBookingDetails", (table) => {
      // Primary Key
      table.increments("BookingId").primary();

      // Foreign Keys
      table
        .integer("PatientId")
        .unsigned()
        .notNullable();

      table
        .integer("DoctorId")
        .unsigned()
        .notNullable();

      // Appointment Details
      table.string("Disease", 150).notNullable();

      table.text("Symptoms");

      table.date("AppointmentDate").notNullable();

      table.time("AppointmentTime").notNullable();

      // Status
      table
        .enu("BookingStatus", [
          "Pending",
          "Approved",
          "Completed",
          "Cancelled",
        ])
        .defaultTo("Pending");

      // Timestamps
      table.timestamps(true, true);

      // Foreign Key Constraints
      table
        .foreign("PatientId")
        .references("id")
        .inTable("HospitalManagement_Sysytem.AuthDetails")
        .onDelete("CASCADE");

      table
        .foreign("DoctorId")
        .references("DoctorId")
        .inTable("HospitalManagement_Sysytem.DoctorDetails")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = async function (knex) {
  return knex.schema
    .withSchema("HospitalManagement_Sysytem")
    .dropTableIfExists("PatientBookingDetails");
};