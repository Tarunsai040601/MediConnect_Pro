import React from "react";
import "./Dashboard.css";
import {
  FaHospital,
  FaSignOutAlt,
  FaUserMd,
  FaStethoscope,
  FaClinicMedical,
  FaUserShield,
  FaChartBar,
  FaCalendarCheck,
  FaFolderOpen,
  FaCog,
  FaBell,
  FaSearch,
  FaUserCheck,
  FaRegFileAlt,
  FaPrescriptionBottleAlt
} from "react-icons/fa";

const Dashboard = ({ user, onLogout }) => {
  const role = user.role || "";
  const email = user.email || "";

  // Render role-specific welcome text
  const renderWelcomeMessage = () => {
    switch (role) {
      case "admin":
        return <h1 className="welcome-title">Welcome to Admin Dashboard</h1>;
      case "doctor":
        return <h1 className="welcome-title">Welcome to Doctor Dashboard</h1>;
      case "patient":
        return <h1 className="welcome-title">welcome to Patient login</h1>;
      default:
        return <h1 className="welcome-title">Welcome to MediConnect Pro</h1>;
    }
  };

  // Render role-specific content
  const renderDashboardContent = () => {
    switch (role) {
      case "admin":
        return (
          <div className="dashboard-grid">
            <div className="stat-card gradient-blue">
              <div className="stat-info">
                <h3>Total Patients</h3>
                <span className="stat-number">1,248</span>
                <span className="stat-trend positive">+12% this month</span>
              </div>
              <FaStethoscope className="stat-icon" />
            </div>

            <div className="stat-card gradient-purple">
              <div className="stat-info">
                <h3>Total Doctors</h3>
                <span className="stat-number">36</span>
                <span className="stat-trend positive">4 new joined</span>
              </div>
              <FaUserMd className="stat-icon" />
            </div>

            <div className="stat-card gradient-cyan">
              <div className="stat-info">
                <h3>Active Bookings</h3>
                <span className="stat-number">84</span>
                <span className="stat-trend positive">+8% today</span>
              </div>
              <FaCalendarCheck className="stat-icon" />
            </div>

            <div className="stat-card gradient-teal">
              <div className="stat-info">
                <h3>System Status</h3>
                <span className="stat-number">99.9%</span>
                <span className="stat-trend stable">Optimal Performance</span>
              </div>
              <FaClinicMedical className="stat-icon" />
            </div>

            <div className="large-content-row">
              <div className="content-card wide-card">
                <h2>Admin Control Center</h2>
                <p>Manage system configurations, register staff, view application logs, and monitor server database metrics.</p>
                <div className="quick-actions">
                  <button className="action-btn">Register New Staff</button>
                  <button className="action-btn secondary">View Application Logs</button>
                  <button className="action-btn secondary">Database Health</button>
                </div>
              </div>
            </div>
          </div>
        );

      case "doctor":
        return (
          <div className="dashboard-grid">
            <div className="stat-card gradient-purple">
              <div className="stat-info">
                <h3>Today's Appts</h3>
                <span className="stat-number">8</span>
                <span className="stat-trend positive">Next: 2:00 PM</span>
              </div>
              <FaCalendarCheck className="stat-icon" />
            </div>

            <div className="stat-card gradient-blue">
              <div className="stat-info">
                <h3>Active Patients</h3>
                <span className="stat-number">24</span>
                <span className="stat-trend stable">In therapy list</span>
              </div>
              <FaUserCheck className="stat-icon" />
            </div>

            <div className="stat-card gradient-cyan">
              <div className="stat-info">
                <h3>Pending Reports</h3>
                <span className="stat-number">5</span>
                <span className="stat-trend negative">3 urgent</span>
              </div>
              <FaRegFileAlt className="stat-icon" />
            </div>

            <div className="large-content-row">
              <div className="content-card wide-card">
                <h2>Doctor Appointment Queue</h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient Name</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>02:00 PM</td>
                      <td>Jane Cooper</td>
                      <td>Annual Physical Checkup</td>
                      <td><span className="badge status-pending">Waiting</span></td>
                      <td>
                        <button className="table-btn btn-primary">Start Consultation</button>
                      </td>
                    </tr>
                    <tr>
                      <td>03:30 PM</td>
                      <td>Robert Fox</td>
                      <td>Hypertension Follow-up</td>
                      <td><span className="badge status-scheduled">Scheduled</span></td>
                      <td>
                        <button className="table-btn btn-secondary">View History</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "patient":
        return (
          <div className="dashboard-grid">
            <div className="stat-card gradient-cyan">
              <div className="stat-info">
                <h3>My Appointments</h3>
                <span className="stat-number">1 Upcoming</span>
                <span className="stat-trend stable">Dr. Smith (Cardiology)</span>
              </div>
              <FaCalendarCheck className="stat-icon" />
            </div>

            <div className="stat-card gradient-blue">
              <div className="stat-info">
                <h3>Active Prescriptions</h3>
                <span className="stat-number">3 Medicines</span>
                <span className="stat-trend positive">Refills available</span>
              </div>
              <FaPrescriptionBottleAlt className="stat-icon" />
            </div>

            <div className="stat-card gradient-purple">
              <div className="stat-info">
                <h3>Medical Reports</h3>
                <span className="stat-number">4 Saved</span>
                <span className="stat-trend positive">Latest: Yesterday</span>
              </div>
              <FaFolderOpen className="stat-icon" />
            </div>

            <div className="large-content-row">
              <div className="content-card wide-card">
                <h2>Book A New Consultation</h2>
                <p>Select your specialized doctor, choose a date and time slot, and schedule your appointment seamlessly.</p>
                <div className="patient-quick-actions">
                  <button className="action-btn">Schedule New Appointment</button>
                  <button className="action-btn secondary">Contact Support</button>
                  <button className="action-btn secondary">Billing History</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <FaHospital className="brand-logo" />
          <span className="brand-name">MediConnect Pro</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <FaChartBar className="nav-icon" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <FaCalendarCheck className="nav-icon" />
            <span>Appointments</span>
          </a>
          <a href="#" className="nav-item">
            <FaFolderOpen className="nav-icon" />
            <span>Medical Records</span>
          </a>
          <a href="#" className="nav-item">
            <FaCog className="nav-icon" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {role.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{email.split("@")[0]}</span>
              <span className="user-role">{role}</span>
            </div>
          </div>
          <button className="logout-button" onClick={onLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main dashboard content area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search appointments, patients, reports..." />
          </div>

          <div className="header-actions">
            <button className="header-icon-btn">
              <FaBell />
              <span className="badge-notification"></span>
            </button>
            <div className="header-divider"></div>
            <div className="header-profile">
              <span className="header-profile-role">{role.toUpperCase()}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-body">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              {renderWelcomeMessage()}
              <p>We are dedicated to providing you with premium healthcare management tools. You are connected as <strong>{email}</strong>.</p>
            </div>
            <div className="welcome-badge">
              {role === "admin" && <FaUserShield className="welcome-role-icon" />}
              {role === "doctor" && <FaUserMd className="welcome-role-icon" />}
              {role === "patient" && <FaStethoscope className="welcome-role-icon" />}
            </div>
          </div>

          {/* Dynamic Content */}
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
