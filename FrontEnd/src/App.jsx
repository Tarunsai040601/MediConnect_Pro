import React, { useState } from 'react';
import Register from './Components/Pages/Register/Register';
import Login from './Components/Pages/Login/Login';
import Dashboard from './Components/DashBoards/Dashboard';

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? 'dashboard' : 'login';
  });

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("patientToken");
    localStorage.removeItem("token");
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div>
      {currentPage === 'login' && (
        <Login onSwitch={() => setCurrentPage('register')} onLogin={handleLogin} />
      )}
      {currentPage === 'register' && (
        <Register onSwitch={() => setCurrentPage('login')} />
      )}
      {currentPage === 'dashboard' && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
