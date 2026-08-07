const { knex } = require('./Configurations/config.js');
async function fix() {
  try {
    const hasColumn = await knex.schema.withSchema('HospitalManagement_Sysytem').hasColumn('PatientBookingDetails', 'RejectReason');
    console.log('Has RejectReason:', hasColumn);
    
    // Drop constraint if exists
    await knex.raw('ALTER TABLE "HospitalManagement_Sysytem"."PatientBookingDetails" DROP CONSTRAINT IF EXISTS "PatientBookingDetails_BookingStatus_check"');
    console.log('Dropped constraint');
    
    // Add new constraint
    await knex.raw(`ALTER TABLE "HospitalManagement_Sysytem"."PatientBookingDetails" ADD CONSTRAINT "PatientBookingDetails_BookingStatus_check" CHECK ("BookingStatus"::text = ANY (ARRAY['Pending'::character varying, 'Approved'::character varying, 'Completed'::character varying, 'Cancelled'::character varying, 'Accepted'::character varying, 'Rejected'::character varying]::text[]))`);
    console.log('Added constraint');
    
    if (!hasColumn) {
      await knex.schema.withSchema('HospitalManagement_Sysytem').table('PatientBookingDetails', table => {
        table.text('RejectReason').nullable();
      });
      console.log('Added RejectReason column');
    }
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
fix();
