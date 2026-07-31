export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export const BOOKED_SLOTS = {
  1: { '2026-08-05': ['10:00 AM', '02:30 PM'], '2026-08-06': ['09:00 AM'] },
  2: { '2026-08-06': ['02:30 PM'], '2026-08-07': ['10:00 AM', '11:00 AM'] },
  3: { '2026-08-07': ['11:00 AM'], '2026-08-08': ['09:30 AM'] },
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Departments', path: '/departments' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Contact', path: '/contact' },
];

export const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: 'FaThLarge' },
  { label: 'Manage Doctors', path: '/admin/doctors', icon: 'FaUserMd' },
  { label: 'Manage Patients', path: '/admin/patients', icon: 'FaUsers' },
  { label: 'Appointments', path: '/admin/appointments', icon: 'FaCalendarCheck' },
  { label: 'Analytics', path: '/admin/analytics', icon: 'FaChartBar' },
  { label: 'Revenue', path: '/admin/revenue', icon: 'FaDollarSign' },
  { label: 'Settings', path: '/admin/settings', icon: 'FaCog' },
];

export const DOCTOR_NAV = [
  { label: 'Dashboard', path: '/doctor/dashboard', icon: 'FaThLarge' },
  { label: 'My Profile', path: '/doctor/profile', icon: 'FaUser' },
  { label: 'Edit Profile', path: '/doctor/edit-profile', icon: 'FaEdit' },
  { label: 'Appointments', path: '/doctor/appointments', icon: 'FaCalendarCheck' },
  { label: 'Patients', path: '/doctor/patients', icon: 'FaUsers' },
  { label: 'Availability', path: '/doctor/availability', icon: 'FaClock' },
  { label: 'Reports', path: '/doctor/reports', icon: 'FaFileAlt' },
];

export const PATIENT_NAV = [
  { label: 'Dashboard', path: '/patient/dashboard', icon: 'FaThLarge' },
  { label: 'Book Appointment', path: '/patient/book-appointment', icon: 'FaCalendarPlus' },
  { label: 'Appointment History', path: '/patient/appointments', icon: 'FaHistory' },
  { label: 'Prescriptions', path: '/patient/prescriptions', icon: 'FaPrescription' },
  { label: 'Medical Reports', path: '/patient/reports', icon: 'FaFileMedical' },
  { label: 'Payments', path: '/patient/payments', icon: 'FaCreditCard' },
  { label: 'Profile', path: '/patient/profile', icon: 'FaUser' },
];

export const WHY_CHOOSE_US = [
  { icon: 'FaAward', title: 'Award Winning Care', desc: 'Recognized nationally for excellence in patient care and medical innovation.' },
  { icon: 'FaMicroscope', title: 'Advanced Technology', desc: 'State-of-the-art medical equipment and cutting-edge treatment methods.' },
  { icon: 'FaHandHoldingHeart', title: 'Compassionate Staff', desc: 'Dedicated healthcare professionals committed to your wellbeing.' },
  { icon: 'FaShieldAlt', title: 'Safe & Secure', desc: 'HIPAA compliant systems ensuring your medical data is always protected.' },
];

export const SERVICES = [
  { icon: 'FaStethoscope', title: 'General Consultation', desc: 'Comprehensive health check-ups and primary care services.' },
  { icon: 'FaHeartbeat', title: 'Cardiac Care', desc: 'Advanced heart diagnostics, treatment, and rehabilitation programs.' },
  { icon: 'FaProcedures', title: 'Surgical Services', desc: 'Minimally invasive and traditional surgical procedures.' },
  { icon: 'FaAmbulance', title: 'Emergency Care', desc: '24/7 emergency services with rapid response teams.' },
  { icon: 'FaPills', title: 'Pharmacy', desc: 'In-house pharmacy with prescription management.' },
  { icon: 'FaVial', title: 'Lab & Diagnostics', desc: 'Full-service laboratory and diagnostic imaging center.' },
];
