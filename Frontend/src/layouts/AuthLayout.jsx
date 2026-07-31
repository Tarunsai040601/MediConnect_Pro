import { Outlet } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation/BackgroundAnimation';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="authLayout">
      <BackgroundAnimation />
      <div className="authContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
