import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useToast } from '../../utils/ToastContext';
import './Toast.css';

const icons = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle,
  warning: FaExclamationTriangle,
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="container" aria-live="polite">
      {toasts.map(({ id, message, type }) => {
        const Icon = icons[type] || FaInfoCircle;
        return (
          <div key={id} className={`toast ${type}`} role="alert">
            <Icon className="icon" aria-hidden="true" />
            <span className="message">{message}</span>
            <button className="close" onClick={() => removeToast(id)} aria-label="Dismiss">
              <FaTimes />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
