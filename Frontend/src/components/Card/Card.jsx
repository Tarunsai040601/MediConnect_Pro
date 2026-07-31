import './Card.css';

const Card = ({ children, className = '', glass = false, hover = true, header, footer, onClick }) => {
  const classes = [
    'card',
    glass ? 'glass' : '',
    !hover ? 'noHover' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {header && <div className="header">{header}</div>}
      <div className="body">{children}</div>
      {footer && <div className="footer">{footer}</div>}
    </div>
  );
};

export default Card;
