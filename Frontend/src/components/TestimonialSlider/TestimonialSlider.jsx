import { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import './TestimonialSlider.css';

const TestimonialSlider = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="slider">
      <FaQuoteLeft className="quoteIcon" aria-hidden="true" />
      <div className="content">
        <p className="text">{t.text}</p>
        <div className="author">
          <img src={t.image} alt={t.name} className="avatar" />
          <div>
            <strong>{t.name}</strong>
            <span>{t.role}</span>
            <div className="stars">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar key={i} aria-hidden="true" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={prev} aria-label="Previous testimonial"><FaChevronLeft /></button>
        <div className="dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next testimonial"><FaChevronRight /></button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
