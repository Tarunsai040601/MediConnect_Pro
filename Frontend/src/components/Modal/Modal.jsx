import { FaTimes } from 'react-icons/fa';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2 id="modal-title">{title}</h2>
          <button className="closeBtn" onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </button>
        </div>
        <div className="body">{children}</div>
        {footer && <div className="footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
