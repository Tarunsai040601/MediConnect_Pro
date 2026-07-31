import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import Button from '../../components/Button/Button';
import '../../css/forms.css';
import './AdminLogin.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password, 'admin');

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="adminLogin">
      <div className="authCard">
        <h2>Admin Login</h2>
        <p className="subtitle">Manage hospital operations</p>

        <div className="demoHint">
          <strong>Demo:</strong> admin@mediconnect.com / admin123
        </div>

        {error && <div className="errorMsg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@mediconnect.com"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" full>Sign In</Button>
        </form>

        <div className="authFooter">
          <div className="loginLinks">
            <Link to="/patient/login">Patient Login</Link>
            <span className="divider">|</span>
            <Link to="/doctor/login">Doctor Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
