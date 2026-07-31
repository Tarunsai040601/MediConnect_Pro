import { useRef } from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) return;

    const btn = btnRef.current;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.(e);
  };

  const classes = [
    'button',
    variant,
    size !== 'md' ? size : '',
    full ? 'full' : '',
    disabled ? 'disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={btnRef}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
