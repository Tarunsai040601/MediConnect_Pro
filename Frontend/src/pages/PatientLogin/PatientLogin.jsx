import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import Button from '../../components/Button/Button';
import '../../css/forms.css';
import './PatientLogin.css';

const PatientLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password, 'patient');

    if (result.success) {
      navigate('/patient/dashboard');
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="patientLogin">
      <div className="authCard">
        <h2>Patient Login</h2>
        <p className="subtitle">Sign in to manage your appointments</p>

        <div className="demoHint">
          <strong>Demo:</strong> patient@mediconnect.com / patient123
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
              placeholder="patient@mediconnect.com"
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
          <p>
            Don&apos;t have an account? <Link to="/patient/register">Register</Link>
          </p>
          <div className="loginLinks">
            <Link to="/doctor/login">Doctor Login</Link>
            <span className="divider">|</span>
            <Link to="/admin/login">Admin Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
