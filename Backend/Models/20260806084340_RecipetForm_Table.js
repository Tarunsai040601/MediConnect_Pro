/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


const table_name = "PrescriptionDetails";
const SchemaName = "HospitalManagement_Sysytem";


exports.up = async function (knex) {

    await knex.schema
    .withSchema(SchemaName)
    .createTable(table_name,(table)=>{


        table.increments("PrescriptionId")
        .primary();


        // Patient Reference

        table.string("PatientName")
        .notNullable();



        // Doctor automatically from JWT

        table.string("DoctorName")
        .notNullable();



        // Appointment reference

        table.integer("BookingId")
        .notNullable();



        table.text("Diagnosis")
        .notNullable();



        table.text("Medicines")
        .notNullable();



        table.text("Dosage");


        table.text("Instructions");



        table.enum("Status",[
            "Active",
            "Completed"
        ])
        .defaultTo("Active");



        table.timestamps(true,true);


    })

};



exports.down = async function(knex){

    await knex.schema
    .withSchema(SchemaName)
    .dropTableIfExists(table_name);

};