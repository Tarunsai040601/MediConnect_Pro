import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHospital, FaCalendarCheck, FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import TestimonialSlider from '../../components/TestimonialSlider/TestimonialSlider';
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import stats from '../../assets/data/stats.json';
import testimonials from '../../assets/data/testimonials.json';
import faqs from '../../assets/data/faqs.json';
import doctors from '../../assets/data/doctors.json';
import { SERVICES, WHY_CHOOSE_US } from '../../utils/constants';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  // Helper to dynamically get FA Icons by name
  const renderIcon = (iconName, className) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className={className} /> : <FaHospital className={className} />;
  };

  return (
    <div className="homePage">
      {/* Hero Section */}
      <section className="heroSection">
        <BackgroundAnimation />
        <div className="container heroInner">
          <div className="heroText">
            <span className="badge">Welcome to MediConnect Pro</span>
            <h1>
              Providing <span className="gradient-text">Exceptional Healthcare</span> for a Better Tomorrow
            </h1>
            <p>
              Your health is our priority. Connect with top medical specialists, schedule
              consultations, and manage your health records all in one premium, secure digital space.
            </p>
            <div className="heroButtons">
              <Button size="lg" onClick={() => navigate('/book-appointment')}>
                <FaCalendarCheck /> Book Appointment
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/emergency')}>
                <FaPhoneAlt /> Emergency 24/7
              </Button>
            </div>
          </div>
          <div className="heroIllustration">
            <svg viewBox="0 0 500 500" className="hospitalSvg">
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(14, 165, 233, 0.05)" strokeWidth="1" />
                </pattern>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Glowing background aura */}
              <circle cx="250" cy="250" r="180" fill="url(#grad1)" className="glowingAura" />

              {/* Hospital Main Building */}
              <rect x="150" y="140" width="200" height="260" rx="16" fill="var(--bg-secondary)" stroke="var(--primary)" strokeWidth="4" className="buildingBack" />
              <rect x="175" y="180" width="150" height="220" fill="var(--bg-primary)" rx="10" />

              {/* Hospital Accent Front Block */}
              <rect x="210" y="240" width="80" height="160" rx="8" fill="var(--bg-secondary)" stroke="var(--secondary)" strokeWidth="3" />

              {/* Cross Logo Sign */}
              <g className="hospitalLogo">
                <circle cx="250" cy="90" r="28" fill="var(--primary)" className="logoCircle" />
                <rect x="244" y="74" width="12" height="32" rx="4" fill="var(--white)" />
                <rect x="234" y="84" width="32" height="12" rx="4" fill="var(--white)" />
              </g>

              {/* ECG Waves overlay */}
              <path d="M 60 410 Q 110 410 130 380 T 150 430 T 170 360 T 190 410 L 440 410" fill="none" stroke="var(--primary)" strokeWidth="3" className="ecgLine" />

              {/* Windows glowing with keyframes */}
              <rect x="190" y="200" width="25" height="25" rx="4" className="window glow-1" />
              <rect x="225" y="200" width="25" height="25" rx="4" className="window glow-2" />
              <rect x="285" y="200" width="25" height="25" rx="4" className="window glow-3" />
              
              <rect x="190" y="240" width="25" height="25" rx="4" className="window glow-3" />
              <rect x="285" y="240" width="25" height="25" rx="4" className="window glow-1" />

              <rect x="190" y="280" width="25" height="25" rx="4" className="window glow-2" />
              <rect x="285" y="280" width="25" height="25" rx="4" className="window glow-3" />

              {/* Hospital Entrance Doors */}
              <rect x="235" y="340" width="15" height="60" rx="2" fill="var(--primary-light)" />
              <rect x="250" y="340" width="15" height="60" rx="2" fill="var(--primary-light)" />

              {/* Floating Shield and First Aid kit */}
              <g className="floatingCross animate-float">
                <circle cx="90" cy="180" r="18" fill="var(--accent)" />
                <rect x="87" y="170" width="6" height="20" fill="var(--white)" />
                <rect x="80" y="177" width="20" height="6" fill="var(--white)" />
              </g>

              <g className="floatingShield animate-float-reverse">
                <circle cx="410" cy="180" r="18" fill="var(--primary-light)" />
                <path d="M 402 172 L 418 172 L 418 180 Q 418 190 410 193 Q 402 190 402 180 Z" fill="var(--white)" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="statsSection">
        <div className="container statsGrid">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 100}>
              <Card className="statItem" glass>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section servicesSection">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Our Premium Services</h2>
              <p>Delivering high-tech and human-touch services spanning across multi-specialty care.</p>
            </div>
          </ScrollReveal>
          <div className="grid-3 servicesGrid">
            {SERVICES.map((srv, index) => (
              <ScrollReveal key={srv.title} delay={index * 100}>
                <Card className="serviceCard" glass hoverable>
                  <div className="serviceIconWrap">
                    {renderIcon(srv.icon, 'serviceIcon')}
                  </div>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section whyChooseUsSection">
        <div className="container whyChooseUsGrid">
          <ScrollReveal className="whyChooseUsImgWrap">
            <div className="featureBlobBg"></div>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=450&fit=crop"
              alt="Medical Team Working"
              className="whyChooseUsImg"
            />
          </ScrollReveal>
          <div className="whyChooseUsText">
            <ScrollReveal>
              <h2>Why Choose MediConnect Pro?</h2>
              <p className="subtitle">Outstanding clinic efficiency with an unmatched level of clinical excellence.</p>
            </ScrollReveal>
            <div className="featureList">
              {WHY_CHOOSE_US.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 100} className="featureItem">
                  <div className="featureIconWrap">
                    {renderIcon(item.icon, 'featureIcon')}
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Doctors Listing Section */}
      <section className="section doctorsSection">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Meet Our Specialist Doctors</h2>
              <p>Top medical professionals with years of experience and dedicated specialties.</p>
            </div>
          </ScrollReveal>
          <div className="grid-3 doctorsGrid">
            {doctors.slice(0, 3).map((doc, index) => (
              <ScrollReveal key={doc.id} delay={index * 120}>
                <Card className="doctorCardHome" glass hoverable>
                  <div className="docCardImgWrap">
                    <img src={doc.image} alt={doc.name} className="docHomeImg" />
                    <span className="docExperienceBadge">{doc.experience} Years Exp</span>
                  </div>
                  <div className="docCardBody">
                    <h4>{doc.name}</h4>
                    <span className="docSpecialty">{doc.specialty}</span>
                    <p>{doc.bio}</p>
                    <div className="docBottom">
                      <span className="docRating">⭐ {doc.rating}</span>
                      <Link to={`/doctors/${doc.id}`} className="docProfileLink">
                        View Profile <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
          <div className="viewAllDoctors">
            <Link to="/doctors">
              <Button variant="outline">View All Specialist Doctors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonialsSection">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Testimonials & Reviews</h2>
              <p>Read patient success stories and comments about their clinical journeys with us.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <TestimonialSlider testimonials={testimonials} />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs Accordion Section */}
      <section className="section faqsSection">
        <div className="container faqContainer">
          <ScrollReveal>
            <div className="section-header">
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about scheduling, billing, diagnostics and telemedicine.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="homeCta">
        <div className="container">
          <ScrollReveal>
            <Card glass className="homeCtaCard">
              <h2>Ready to Schedule Your Appointment?</h2>
              <p>Connect with our expert medical team online and plan your visits with zero waiting time.</p>
              <div className="ctaHomeButtons">
                <Button size="lg" onClick={() => navigate('/book-appointment')}>Book Appointment</Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>Contact Us</Button>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
