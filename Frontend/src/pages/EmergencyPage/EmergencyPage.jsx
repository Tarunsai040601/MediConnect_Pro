import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaAmbulance, FaHeartbeat, FaInfoCircle, FaShieldAlt, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Swal from 'sweetalert2';

import './EmergencyPage.css';

const FIRST_AID_GUIDE = [
  { id: 1, title: 'Cardiac Arrest (CPR)', desc: '1. Check responsiveness and breathing.\n2. Call emergency services immediately.\n3. Push hard and fast in the center of the chest (100-120 compressions per minute).\n4. Continue CPR until professional help arrives.' },
  { id: 2, title: 'Severe Bleeding', desc: '1. Apply direct pressure to the wound with a clean cloth.\n2. Maintain continuous pressure.\n3. Elevate the injured limb above heart level if possible.\n4. Do not remove the cloth if soaked; add another on top.' },
  { id: 3, title: 'Choking', desc: '1. Ask the person if they are choking.\n2. Stand behind them and wrap your arms around their waist.\n3. Make a fist and place it slightly above the navel.\n4. Perform quick, upward abdominal thrusts (Heimlich maneuver).' },
  { id: 4, title: 'Heat Stroke', desc: '1. Move the person to a cool, shaded area.\n2. Call emergency response immediately.\n3. Cool the body quickly by spraying cold water or applying ice packs to the neck, armpits, and groin.\n4. Do not give them anything to drink if they are semi-conscious.' }
];

const EmergencyPage = () => {
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('Critical Trauma');
  const [dispatchStatus, setDispatchStatus] = useState(null); // 'idle', 'dispatched', 'arrived'
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (dispatchStatus === 'dispatched' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setDispatchStatus('arrived');
            Swal.fire({
              title: 'Ambulance Arrived!',
              text: 'The emergency medical response team has reached your location.',
              icon: 'success',
              confirmButtonColor: 'var(--primary)',
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [dispatchStatus, countdown]);

  const handleRequestAmbulance = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      Swal.fire('Address Required', 'Please supply your exact current address for ambulance routing.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Dispatch Ambulance?',
      text: `Confirm emergency ambulance dispatch for: ${category} to address: ${address}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: 'var(--gray-500)',
      confirmButtonText: 'Yes, dispatch now!',
    }).then((result) => {
      if (result.isConfirmed) {
        setDispatchStatus('dispatched');
        setCountdown(480); // 8 minutes = 480 seconds
        Swal.fire({
          title: 'Ambulance Dispatched!',
          text: 'An emergency paramedic vehicle has been dispatched to your coordinates.',
          icon: 'info',
          confirmButtonColor: 'var(--primary)',
        });
      }
    });
  };

  const handleCancelDispatch = () => {
    Swal.fire({
      title: 'Cancel Dispatch?',
      text: 'Are you sure you want to cancel the emergency ambulance response?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: 'var(--gray-500)',
      confirmButtonText: 'Yes, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        setDispatchStatus(null);
        setCountdown(0);
        Swal.fire('Cancelled', 'Ambulance dispatch has been terminated.', 'success');
      }
    });
  };

  const formatCountdownTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs} Min`;
  };

  return (
    <div className="emergencyPage">
      <section className="pageHero emergencyHero">
        <BackgroundAnimation />
        <div className="container">
          <h1>24/7 Emergency Care</h1>
          <p>Instant medical assistance, emergency contacts, ambulance dispatch, and quick first-aid advice.</p>
        </div>
      </section>

      <section className="section emergencyMainSection">
        <div className="container emergencyLayout">
          {/* Left panel: Quick Emergency Call & Dispatcher */}
          <div className="emergencyLeftCol">
            <ScrollReveal>
              <Card className="emergencyCallCard">
                <div className="callHeader">
                  <FaPhoneAlt className="emergencyPhoneIcon animate-heartbeat" />
                  <h2>Emergency Helpline</h2>
                </div>
                <p>Call our hotlines immediately for stroke, trauma, accident, or serious breathing distress.</p>
                <a href="tel:15559110000" className="emergencyNumberDial">
                  +1 (555) 911-0000
                </a>
                <p className="backupHotline">Backup Hotline: +1 (555) 000-9111</p>
              </Card>
            </ScrollReveal>

            {/* Request Ambulance Dispatch Form */}
            <ScrollReveal delay={100}>
              <Card glass className="ambulanceDispatchCard">
                <h3>🚑 Request Ambulance Dispatch</h3>
                
                {dispatchStatus === null ? (
                  <form onSubmit={handleRequestAmbulance} className="ambulanceForm">
                    <div className="formField">
                      <label htmlFor="eAddress">Current Physical Address</label>
                      <input
                        type="text"
                        id="eAddress"
                        placeholder="Street, Building, Landmark, City..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="formField">
                      <label htmlFor="eCategory">Emergency Category</label>
                      <select
                        id="eCategory"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Critical Trauma / Accident">Critical Trauma / Accident</option>
                        <option value="Heart Stroke / Chest Pain">Heart Stroke / Chest Pain</option>
                        <option value="Breathing Distress">Breathing Distress</option>
                        <option value="Maternity Emergency / Labor">Maternity Emergency / Labor</option>
                        <option value="Other Severe Medical Condition">Other Severe Medical Condition</option>
                      </select>
                    </div>

                    <Button type="submit" className="dangerSubmitBtn">Request Ambulance</Button>
                  </form>
                ) : (
                  <div className="ambulanceActiveStatus animate-scale-in">
                    {dispatchStatus === 'dispatched' ? (
                      <>
                        <div className="statusRing animate-pulse">
                          <span>ETA Countdown</span>
                          <strong>{formatCountdownTime(countdown)}</strong>
                        </div>
                        <h4>Ambulance is En Route</h4>
                        <p>Paramedics have been dispatched to: <strong>{address}</strong></p>
                        <Button variant="outline" className="dangerCancelBtn" onClick={handleCancelDispatch}>
                          <FaTimes /> Cancel Request
                        </Button>
                      </>
                    ) : (
                      <div className="ambulanceArrivedState">
                        <FaAmbulance className="arrivedBigIcon" />
                        <h4>Emergency Vehicle Arrived!</h4>
                        <p>Our paramedics are at your address. Keep your lines active.</p>
                        <Button onClick={() => setDispatchStatus(null)}>Request Another Dispatch</Button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </ScrollReveal>
          </div>

          {/* Right panel: First Aid Instructions Accordion */}
          <div className="emergencyRightCol">
            <ScrollReveal>
              <Card glass className="firstAidGuidesCard">
                <h3>💡 Emergency First-Aid Guidelines</h3>
                <p className="sectionHint">Do not panic. Follow these simple steps while waiting for the emergency response vehicle.</p>
                
                <div className="guideAccordion">
                  {FIRST_AID_GUIDE.map((guide) => (
                    <details key={guide.id} className="guideDetails">
                      <summary className="guideSummary">
                        <FaHeartbeat className="guideIcon" />
                        <span>{guide.title}</span>
                      </summary>
                      <div className="guideBody">
                        <p>{guide.desc}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            {/* Nearby Emergency Centers */}
            <ScrollReveal delay={120}>
              <Card glass className="nearbyCentersCard">
                <h3>📍 Nearby Emergency Trauma Centers</h3>
                <div className="centersList">
                  <div className="centerRow">
                    <div className="centerName">
                      <strong>MediConnect Center Campus (HQ)</strong>
                      <span>Medical District Area</span>
                    </div>
                    <span className="distanceTag">0.0 km (Here)</span>
                  </div>
                  <div className="centerRow">
                    <div className="centerName">
                      <strong>St. Jude Trauma Hospital</strong>
                      <span>Downtown Boulevard, North</span>
                    </div>
                    <span className="distanceTag">4.2 km (12 mins)</span>
                  </div>
                  <div className="centerRow">
                    <div className="centerName">
                      <strong>Mercy Emergency Center</strong>
                      <span>Westside Valley Expressway</span>
                    </div>
                    <span className="distanceTag">6.8 km (18 mins)</span>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyPage;
