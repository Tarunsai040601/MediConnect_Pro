import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  FaUserShield,
  FaIdBadge,
  FaEnvelope,
  FaUserTag,
  FaUserMd,
  FaUsers,
  FaCircleNotch,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./AdminHome.css";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_BASE = "https://mediconnect-pro-gzv5.onrender.com/api";
const PALETTE = ["#14B8A6", "#0B1F3A", "#FF6B6B", "#F5A623", "#6366F1", "#22C55E", "#EC4899"];

// Groups an array of records by a key, falling back to "General" when missing.
// Checks both lowercase and capitalized variants since the API returns
// capitalized field names (Name, Email, Role) but doesn't currently send
// a specialization field at all — this will keep bucketing under "General"
// until the backend adds one.
const groupBy = (arr, key) => {
  const list = Array.isArray(arr) ? arr : [];
  const capKey = key.charAt(0).toUpperCase() + key.slice(1);
  return list.reduce((acc, item) => {
    const k = (item && (item[key] || item[capKey] || item.department || item.category)) || "General";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
};

// Unwraps common API response shapes: { details: [...] } | { doctors: [...] } | { data: [...] } | [...]
const unwrap = (payload, ...keys) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  for (const key of keys) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  return [];
};

// Lightweight replacement for react-countup — animates 0 -> value on mount/change.
const useCountUp = (end, duration = 1200) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let startTime = null;
    let raf;
    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  }, [end, duration]);
  return value;
};

const StatNumber = ({ value }) => <>{useCountUp(value)}</>;

// Pulls a display name off a record regardless of casing convention.
const getName = (obj) => obj?.Name || obj?.name || obj?.fullName || "—";
const getEmail = (obj) => obj?.Email || obj?.email || "—";

const sortByRecent = (arr) =>
  [...arr].sort((a, b) => {
    const da = new Date(a?.createdAt || a?.created_at || a?.date || 0).getTime();
    const db = new Date(b?.createdAt || b?.created_at || b?.date || 0).getTime();
    return db - da;
  });

/* Floating "patient space" — each logged-in patient is rendered as an orbiting
   node around a central core, sized and paced deterministically by index so
   the layout is stable across re-renders. */
const PatientOrbit = ({ patients }) => {
  const nodes = useMemo(() => patients.slice(0, 28), [patients]);

  return (
    <div className="orbit-space">
      <div className="orbit-ring orbit-ring-1" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-ring orbit-ring-3" />
      <div className="orbit-core">
        <FaUsers />
        <strong>{patients.length}</strong>
        <span>patients</span>
      </div>
      {nodes.map((p, i) => {
        const angle = (i / Math.max(nodes.length, 1)) * 2 * Math.PI;
        const radius = 26 + (i % 3) * 12;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle) * 0.85;
        const delay = (i % 7) * 0.35;
        const size = 30 + (i % 4) * 4;
        const label = getName(p) !== "—" ? getName(p) : getEmail(p);
        return (
          <div
            key={p?.id || p?._id || p?.Email || p?.email || i}
            className="orbit-bubble"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              background: PALETTE[i % PALETTE.length],
            }}
            title={label}
          >
            {label.charAt(0).toUpperCase()}
          </div>
        );
      })}
      {nodes.length === 0 && <p className="orbit-empty">No patient logins yet</p>}
    </div>
  );
};

const AdminHome = () => {
  const [admin, setAdmin] = useState(null);
  const [doctorsCreated, setDoctorsCreated] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  // Decode the logged-in admin's details straight from the JWT.
  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("adminToken") ||
      localStorage.getItem("accessToken");

    if (!token) {
      console.warn(
        "AdminHome: no token found in localStorage under 'token' / 'authToken' / 'adminToken' / 'accessToken'. " +
          "Check the exact key your login flow saves the JWT under."
      );
      return;
    }

    try {
      const decoded = jwtDecode(token);
      // Some backends nest the profile under decoded.user / decoded.admin.
      const payload = decoded.user || decoded.admin || decoded;
      setAdmin({
        id: payload.id || payload._id || payload.userId || payload.adminId || "N/A",
        name: payload.name || payload.Name || payload.fullName || "Admin",
        email: payload.email || payload.Email || "N/A",
        role: payload.role || payload.Role || "admin",
        image: payload.image || payload.avatar || "",
      });
    } catch (err) {
      console.error("AdminHome: failed to decode token —", err.message);
    }
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("adminToken") ||
        localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      setLoading(true);
      setError("");
      try {
        const [createdRes, fetchRes, patientsRes] = await Promise.allSettled([
          axios.get(`${API_BASE}/doctor`, { headers }),
          axios.get(`${API_BASE}/doctor/fetch`, { headers }),
          axios.get(`${API_BASE}/booking/allPatients`, { headers }),
        ]);

        // API responses come back as { details: [...] } — also accept
        // { doctors: [...] } / { data: [...] } / { patients: [...] } in case
        // the shape differs across endpoints or changes later.
        if (createdRes.status === "fulfilled") {
          setDoctorsCreated(unwrap(createdRes.value.data, "details", "doctors", "data"));
        }
        if (fetchRes.status === "fulfilled") {
          setAllDoctors(unwrap(fetchRes.value.data, "details", "doctors", "data"));
        }
        if (patientsRes.status === "fulfilled") {
          setPatients(unwrap(patientsRes.value.data, "details", "patients", "data"));
        }

        if (
          createdRes.status === "rejected" &&
          fetchRes.status === "rejected" &&
          patientsRes.status === "rejected"
        ) {
          setError("Couldn't reach the server. Check that the API is running on localhost:8080.");
        }
      } catch (err) {
        setError("Something went wrong while loading dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const specializationCreated = useMemo(() => groupBy(doctorsCreated, "specialization"), [doctorsCreated]);
  const specializationAll = useMemo(() => groupBy(allDoctors, "specialization"), [allDoctors]);
  const recentDoctors = useMemo(() => sortByRecent(allDoctors).slice(0, 5), [allDoctors]);
  const recentPatients = useMemo(() => sortByRecent(patients).slice(0, 5), [patients]);

  const doughnutData = {
    labels: Object.keys(specializationCreated).length ? Object.keys(specializationCreated) : ["No data"],
    datasets: [
      {
        data: Object.values(specializationCreated).length ? Object.values(specializationCreated) : [1],
        backgroundColor: PALETTE,
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const barData = {
    labels: Object.keys(specializationAll).length ? Object.keys(specializationAll) : ["No data"],
    datasets: [
      {
        label: "Doctors",
        data: Object.values(specializationAll).length ? Object.values(specializationAll) : [0],
        backgroundColor: "#14B8A6",
        borderRadius: 8,
        maxBarThickness: 34,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 }, color: "#64748B" } },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#64748B", font: { size: 11 } } },
      y: { beginAtZero: true, ticks: { precision: 0, color: "#64748B" }, grid: { color: "#EEF1F5" } },
    },
  };

  return (
    <div className="admin-home">
      {loading && (
        <div className="admin-loading-overlay">
          <FaCircleNotch className="spin" />
          <p>Loading dashboard…</p>
        </div>
      )}

      <div className="admin-layout">
        <aside className="admin-rail" data-aos="fade-right">
          <div className="admin-avatar-wrap">
            {admin?.image ? (
              <img src={admin.image} alt={admin.name} className="admin-avatar" />
            ) : (
              <FaUserShield className="admin-avatar-fallback" />
            )}
          </div>
          <h2 className="admin-name">{admin?.name || "Admin"}</h2>
          <span className="admin-role-badge">{admin?.role || "admin"}</span>

          <ul className="admin-meta-list">
            <li>
              <FaIdBadge className="meta-icon" />
              <div>
                <span>Admin ID</span>
                <p>{admin?.id || "—"}</p>
              </div>
            </li>
            <li>
              <FaEnvelope className="meta-icon" />
              <div>
                <span>Email</span>
                <p>{admin?.email || "—"}</p>
              </div>
            </li>
            <li>
              <FaUserTag className="meta-icon" />
              <div>
                <span>Role</span>
                <p>{admin?.role || "—"}</p>
              </div>
            </li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header" data-aos="fade-down">
            <h1>Dashboard Overview</h1>
            <p>Live snapshot of doctors and patients across the platform</p>
          </header>

          {error && (
            <div className="dashboard-error" data-aos="fade-up">
              <FaExclamationTriangle />
              <span>{error}</span>
            </div>
          )}

          <section className="stat-cards">
            <div className="stat-card teal" data-aos="fade-up">
              <FaUserMd className="stat-icon" />
              <div className="stat-text">
                <h3>
                  <StatNumber value={allDoctors.length} />
                </h3>
                <p>Total Doctors</p>
              </div>
            </div>
            <div className="stat-card coral" data-aos="fade-up" data-aos-delay="100">
              <FaUsers className="stat-icon" />
              <div className="stat-text">
                <h3>
                  <StatNumber value={patients.length} />
                </h3>
                <p>Total Patients</p>
              </div>
            </div>
          </section>

          <section className="chart-grid">
            <div className="chart-card" data-aos="fade-up">
              <h4>
                Doctors Created <span>by specialization</span>
              </h4>
              <div className="chart-box">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
            <div className="chart-card" data-aos="fade-up" data-aos-delay="100">
              <h4>
                Doctors List Analysis <span>all registered</span>
              </h4>
              <div className="chart-box">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </section>

          <section className="orbit-section" data-aos="fade-up">
            <h4>
              Patient Space Analysis <span>logged-in patients</span>
            </h4>
            <PatientOrbit patients={patients} />
          </section>

          <section className="tables-grid" data-aos="fade-up">
            <div className="table-card">
              <h4>Recent Doctors</h4>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDoctors.length ? (
                      recentDoctors.map((d, i) => (
                        <tr key={d?.id || d?._id || i}>
                          <td>{getName(d)}</td>
                          <td>{d?.specialization || d?.Specialization || "General"}</td>
                          <td>
                            <span className={`status-pill ${d?.status === "inactive" ? "off" : "on"}`}>
                              {d?.status || d?.Status || "active"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="empty-row">
                          No doctors yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="table-card">
              <h4>Recent Patients</h4>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Booked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPatients.length ? (
                      recentPatients.map((p, i) => (
                        <tr key={p?.id || p?._id || i}>
                          <td>{getName(p)}</td>
                          <td className="email-cell">{getEmail(p)}</td>
                          <td>{p?.doctorName || p?.department || "—"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="empty-row">
                          No patients yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;