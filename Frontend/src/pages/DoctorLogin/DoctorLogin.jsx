import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import Button from '../../components/Button/Button';
import '../../css/forms.css';
import './DoctorLogin.css';

const DoctorLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password, 'doctor');

    if (result.success) {
      navigate('/doctor/dashboard');
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="doctorLogin">
      <div className="authCard">
        <h2>Doctor Login</h2>
        <p className="subtitle">Access your medical dashboard</p>

        <div className="demoHint">
          <strong>Demo:</strong> doctor@mediconnect.com / doctor123
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
              placeholder="doctor@mediconnect.com"
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

          <Button type="submit" full variant="secondary">Sign In</Button>
        </form>

        <div className="authFooter">
          <div className="loginLinks">
            <Link to="/patient/login">Patient Login</Link>
            <span className="divider">|</span>
            <Link to="/admin/login">Admin Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
