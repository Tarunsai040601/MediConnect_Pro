import { Link } from 'react-router-dom';
import { FaHospital, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="brand">
            <Link to="/" className="logo">
              <FaHospital className="logoIcon" />
              <span>MediConnect <strong>Pro</strong></span>
            </Link>
            <p>Providing world-class healthcare with compassion, innovation, and excellence for over 30 years.</p>
            <div className="social">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>

          <div className="links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/departments">Departments</Link></li>
              <li><Link to="/doctors">Our Doctors</Link></li>
              <li><Link to="/book-appointment">Book Appointment</Link></li>
              <li><Link to="/emergency">Emergency</Link></li>
            </ul>
          </div>

          <div className="links">
            <h4>Services</h4>
            <ul>
              <li><Link to="/departments">Cardiology</Link></li>
              <li><Link to="/departments">Neurology</Link></li>
              <li><Link to="/departments">Pediatrics</Link></li>
              <li><Link to="/departments">Orthopedics</Link></li>
              <li><Link to="/departments">Emergency Care</Link></li>
            </ul>
          </div>

          <div className="contact">
            <h4>Contact Us</h4>
            <ul>
              <li><FaMapMarkerAlt /> 123 Healthcare Ave, Medical City, MC 12345</li>
              <li><FaPhone /> +1 (555) 000-1234</li>
              <li><FaEnvelope /> info@mediconnect.com</li>
            </ul>
          </div>
        </div>

        <div className="bottom">
          <p>&copy; {new Date().getFullYear()} MediConnect Pro. All rights reserved.</p>
          <div className="bottomLinks">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
