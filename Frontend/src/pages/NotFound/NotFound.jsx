import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaHospital } from 'react-icons/fa';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notFoundPage">
      <BackgroundAnimation />
      <div className="container notFoundContainer">
        <ScrollReveal>
          <div className="errorGraphic">
            <h1 className="errorNum animate-heartbeat">404</h1>
            <div className="notFoundCross">
              <FaHospital className="crossLogo" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="errorTextBox glass">
            <h2>Page Not Found</h2>
            <p>
              The path you requested could not be resolved. It may have been renamed,
              removed, or does not exist on this medical portal.
            </p>
            
            <div className="notFoundActions">
              <Button variant="outline" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Go Back
              </Button>
              <Link to="/">
                <Button>
                  <FaHome /> Return Home
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default NotFound;
