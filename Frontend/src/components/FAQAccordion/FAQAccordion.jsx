import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './FAQAccordion.css';

const FAQAccordion = ({ items }) => {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="accordion">
      {items.map((item) => (
        <div key={item.id} className={`item ${openId === item.id ? 'open' : ''}`}>
          <button
            className="question"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            aria-expanded={openId === item.id}
          >
            <span>{item.question}</span>
            <FaChevronDown className="icon" aria-hidden="true" />
          </button>
          <div className="answer" role="region">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
