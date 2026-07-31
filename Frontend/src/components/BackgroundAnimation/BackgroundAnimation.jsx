import { FaHeartbeat, FaStethoscope, FaPills, FaSyringe, FaUserMd, FaHospital } from 'react-icons/fa';
import './BackgroundAnimation.css';

const icons = [
  { Icon: FaHeartbeat, top: '10%', left: '5%', delay: '0s', size: '2rem' },
  { Icon: FaStethoscope, top: '20%', right: '8%', delay: '1s', size: '2.5rem' },
  { Icon: FaPills, top: '60%', left: '3%', delay: '2s', size: '1.8rem' },
  { Icon: FaSyringe, top: '75%', right: '5%', delay: '0.5s', size: '2rem' },
  { Icon: FaUserMd, top: '40%', left: '8%', delay: '1.5s', size: '2.2rem' },
  { Icon: FaHospital, top: '85%', left: '12%', delay: '2.5s', size: '2.8rem' },
  { Icon: FaHeartbeat, top: '30%', right: '15%', delay: '3s', size: '1.5rem' },
  { Icon: FaStethoscope, top: '55%', right: '12%', delay: '1.8s', size: '2rem' },
];

const BackgroundAnimation = () => {
  return (
    <div className="bgAnimation" aria-hidden="true">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
      {icons.map(({ Icon, top, left, right, delay, size }, i) => (
        <div
          key={i}
          className="floatingIcon"
          style={{ top, left, right, animationDelay: delay, fontSize: size }}
        >
          <Icon />
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
