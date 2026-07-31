import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const DUMMY_USERS = {
  admin: { email: 'admin@mediconnect.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  doctor: { email: 'doctor@mediconnect.com', password: 'doctor123', role: 'doctor', name: 'Dr. Sarah Mitchell' },
  patient: { email: 'patient@mediconnect.com', password: 'patient123', role: 'patient', name: 'John Doe' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password, role) => {
    // API PLACEHOLDER: POST /api/auth/login
    const dummyUser = DUMMY_USERS[role];
    if (dummyUser && dummyUser.email === email && dummyUser.password === password) {
      const userData = { email, role, name: dummyUser.name };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (formData) => {
    // API PLACEHOLDER: POST /api/auth/register
    const userData = {
      email: formData.email,
      role: 'patient',
      name: `${formData.firstName} ${formData.lastName}`,
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    // API PLACEHOLDER: POST /api/auth/logout
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
