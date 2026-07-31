import { Link } from 'react-router-dom';
import {
  FaEye, FaBullseye, FaHeart, FaShieldAlt, FaUsers, FaLightbulb,
  FaHandshake, FaAward,
} from 'react-icons/fa';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import './About.css';

const timeline = [
  { year: '1994', title: 'Foundation', desc: 'MediConnect Pro was founded with a vision to deliver accessible, world-class healthcare.' },
  { year: '2005', title: 'Expansion', desc: 'Opened our state-of-the-art cardiac center and expanded to 200 beds.' },
  { year: '2015', title: 'Innovation Hub', desc: 'Launched digital health records and telemedicine services across all departments.' },
  { year: '2020', title: 'Global Recognition', desc: 'Awarded JCI accreditation and ranked among the top 50 hospitals nationally.' },
  { year: '2026', title: 'Future Forward', desc: 'Pioneering AI-assisted diagnostics and personalized medicine programs.' },
];

const leadership = [
  {
    name: 'Dr. Richard Hayes',
    role: 'Chief Medical Officer',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop',
    bio: '30+ years in healthcare leadership with a focus on patient-centered care.',
  },
  {
    name: 'Sarah Whitfield',
    role: 'Hospital Administrator',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    bio: 'MBA in Healthcare Management, driving operational excellence and innovation.',
  },
  {
    name: 'Dr. Anita Kapoor',
    role: 'Director of Research',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
    bio: 'Leading clinical trials and medical research initiatives worldwide.',
  },
  {
    name: 'James Morrison',
    role: 'Chief Nursing Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    bio: 'Champion of nursing excellence and compassionate patient care standards.',
  },
];

const values = [
  { icon: FaHeart, title: 'Compassion', desc: 'Every patient receives care with empathy, dignity, and respect.' },
  { icon: FaShieldAlt, title: 'Integrity', desc: 'We uphold the highest ethical standards in all we do.' },
  { icon: FaLightbulb, title: 'Innovation', desc: 'Embracing cutting-edge technology to improve outcomes.' },
  { icon: FaUsers, title: 'Collaboration', desc: 'Multidisciplinary teams working together for your health.' },
  { icon: FaHandshake, title: 'Trust', desc: 'Building lasting relationships through transparency and reliability.' },
  { icon: FaAward, title: 'Excellence', desc: 'Continuous improvement in clinical quality and service.' },
];

const About = () => {
  return (
    <div className="aboutPage">
      <section className="pageHero aboutHero">
        <BackgroundAnimation />
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </nav>
          <h1>About MediConnect Pro</h1>
          <p>
            For over three decades, we have been dedicated to healing, hope, and
            health — combining advanced medicine with genuine human connection.
          </p>
        </div>
      </section>

      <section className="section missionSection">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Our Purpose</h2>
              <p>Driven by a commitment to transform lives through exceptional healthcare</p>
            </div>
          </ScrollReveal>
          <div className="missionGrid">
            <ScrollReveal delay={100}>
              <Card glass className="missionCard">
                <div className="missionIcon"><FaBullseye /></div>
                <h3>Our Mission</h3>
                <p>
                  To provide accessible, high-quality healthcare that improves the
                  health and wellbeing of our community through compassionate service,
                  clinical excellence, and continuous innovation.
                </p>
              </Card>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Card glass className="missionCard">
                <div className="missionIcon"><FaEye /></div>
                <h3>Our Vision</h3>
                <p>
                  To be the most trusted healthcare institution — recognized globally
                  for outstanding patient outcomes, pioneering research, and a culture
                  where every individual feels valued and cared for.
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section timelineSection">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Our Journey</h2>
              <p>Three decades of milestones in healthcare excellence</p>
            </div>
          </ScrollReveal>
          <div className="timeline">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 100}>
                <div className="timelineItem">
                  <div className="timelineDot" />
                  <div className="timelineContent">
                    <span className="timelineYear">{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section leadershipSection">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Leadership Team</h2>
              <p>Experienced professionals guiding our hospital&apos;s vision</p>
            </div>
          </ScrollReveal>
          <div className="leadershipGrid">
            {leadership.map((leader, i) => (
              <ScrollReveal key={leader.name} delay={i * 80}>
                <Card glass className="leaderCard">
                  <div className="leaderImage">
                    <img src={leader.image} alt={leader.name} loading="lazy" />
                  </div>
                  <h3>{leader.name}</h3>
                  <span className="leaderRole">{leader.role}</span>
                  <p>{leader.bio}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section valuesSection">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Our Core Values</h2>
              <p>The principles that define who we are and how we care</p>
            </div>
          </ScrollReveal>
          <div className="valuesGrid">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 60}>
                <Card glass className="valueCard">
                  <div className="valueIcon"><Icon /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section aboutCta">
        <div className="container">
          <ScrollReveal>
            <Card glass className="ctaCard">
              <h2>Experience Care That Makes a Difference</h2>
              <p>Join thousands of patients who trust MediConnect Pro for their healthcare needs.</p>
              <div className="ctaActions">
                <Link to="/book-appointment">
                  <Button size="lg">Book an Appointment</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">Contact Us</Button>
                </Link>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
