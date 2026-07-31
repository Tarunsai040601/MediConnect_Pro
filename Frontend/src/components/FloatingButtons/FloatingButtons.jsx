import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FloatingButtons.css';

const FloatingButtons = () => {
  return (
    <div className="floatingBtns">
      <a
        href="https://wa.me/15550001234"
        target="_blank"
        rel="noopener noreferrer"
        className="fab whatsapp"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <Link to="/emergency" className="fab emergency" aria-label="Emergency call">
        <FaPhoneAlt />
        <span className="pulse"></span>
      </Link>
    </div>
  );
};

export default FloatingButtons;
