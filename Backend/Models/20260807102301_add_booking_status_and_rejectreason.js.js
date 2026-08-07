/**
 * Add 'Accepted' and 'Rejected' enum values to BookingStatus and add RejectReason column
 * Run with: knex migrate:latest (from project root) or your project's migration runner
 */

exports.up = async function (knex) {
  // Add enum values in Postgres only if they don't already exist.
  // This uses a DO block to check pg_enum before running ALTER TYPE to avoid errors.
  await knex.raw(`DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      WHERE t.typname = 'enum_PatientBookingDetails_BookingStatus' AND e.enumlabel = 'Accepted'
    ) THEN
      ALTER TYPE "HospitalManagement_Sysytem"."enum_PatientBookingDetails_BookingStatus" ADD VALUE 'Accepted';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      WHERE t.typname = 'enum_PatientBookingDetails_BookingStatus' AND e.enumlabel = 'Rejected'
    ) THEN
      ALTER TYPE "HospitalManagement_Sysytem"."enum_PatientBookingDetails_BookingStatus" ADD VALUE 'Rejected';
    END IF;
  END
  $$;`);

  // Add RejectReason column (nullable text) to store rejection reason
  return knex.schema
    .withSchema("HospitalManagement_Sysytem")
    .table("PatientBookingDetails", (table) => {
      table.text("RejectReason").nullable();
    });
};

exports.down = async function (knex) {
  // Remove the RejectReason column. Removing enum values from a Postgres enum is non-trivial
  // and typically not done in down migrations; so only drop the column here.
  return knex.schema
    .withSchema("HospitalManagement_Sysytem")
    .table("PatientBookingDetails", (table) => {
      table.dropColumn("RejectReason");
    });
};
