import './Spinner.css';

const Spinner = ({ size = 'md', label, fullPage = false }) => {
  const content = (
    <div className="wrapper">
      <div className={`spinner ${size}`} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {label && <span className="label">{label}</span>}
    </div>
  );

  if (fullPage) return <div className="fullPage">{content}</div>;
  return content;
};

export default Spinner;
