import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaArrowRight, FaCalendarCheck } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import doctors from '../../assets/data/doctors.json';
import departments from '../../assets/data/departments.json';

import './DoctorsListing.css';

const DoctorsListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedExp, setSelectedExp] = useState('');
  const [minRating, setMinRating] = useState('');

  // Extract all unique departments dynamically for fallback/safety
  const deptList = useMemo(() => {
    return departments.map(d => d.name);
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchDept = selectedDept === '' || doc.department === selectedDept;
      
      let matchExp = true;
      if (selectedExp === 'junior') matchExp = doc.experience < 10;
      else if (selectedExp === 'mid') matchExp = doc.experience >= 10 && doc.experience < 16;
      else if (selectedExp === 'senior') matchExp = doc.experience >= 16;

      const matchRating = minRating === '' || doc.rating >= parseFloat(minRating);

      return matchSearch && matchDept && matchExp && matchRating;
    });
  }, [searchTerm, selectedDept, selectedExp, minRating]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDept('');
    setSelectedExp('');
    setMinRating('');
  };

  return (
    <div className="doctorsListingPage">
      <section className="pageHero doctorsHero">
        <BackgroundAnimation />
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Doctors</span>
          </nav>
          <h1>Our Specialist Doctors</h1>
          <p>
            Consult with our world-class healthcare specialists and clinical professors.
            Filter and book appointments instantly.
          </p>
        </div>
      </section>

      <section className="section searchFilterSection">
        <div className="container">
          <div className="searchFilterBar glass">
            {/* Search Input */}
            <div className="searchGroup">
              <FaSearch className="searchIcon" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Department Filter */}
            <div className="filterGroup">
              <FaFilter className="filterIcon" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter by department"
              >
                <option value="">All Departments</option>
                {deptList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div className="filterGroup">
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                aria-label="Filter by experience"
              >
                <option value="">Any Experience</option>
                <option value="junior">Under 10 Years</option>
                <option value="mid">10 - 15 Years</option>
                <option value="senior">16+ Years</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="filterGroup">
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                aria-label="Filter by rating"
              >
                <option value="">Any Rating</option>
                <option value="4.8">⭐ 4.8+</option>
                <option value="4.9">⭐ 4.9+</option>
              </select>
            </div>

            {/* Reset Button */}
            {(searchTerm || selectedDept || selectedExp || minRating) && (
              <button className="clearBtn" onClick={clearFilters}>
                Clear
              </button>
            )}
          </div>

          <div className="listingResultsInfo">
            <p>Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}</p>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="noResultsBox glass">
              <h3>No Doctors Found</h3>
              <p>Try resetting the search filters or searching for alternative medical keywords.</p>
              <Button onClick={clearFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="doctorsGrid listingGrid">
              {filteredDoctors.map((doc, idx) => (
                <ScrollReveal key={doc.id} delay={(idx % 3) * 80}>
                  <Card className="doctorSearchCard" glass hoverable>
                    <div className="docListImgWrap">
                      <img src={doc.image} alt={doc.name} className="docListImg" />
                      <span className="docExperience">{doc.experience} Yrs Experience</span>
                    </div>
                    <div className="docListBody">
                      <div className="docListMeta">
                        <span className="docCategory">{doc.specialty}</span>
                        <span className="docRatings">⭐ {doc.rating}</span>
                      </div>
                      <h3>{doc.name}</h3>
                      <p className="docBio">{doc.bio}</p>
                      
                      <div className="docDetailsList">
                        <div className="detailRow">
                          <span>Consultation Fee:</span>
                          <strong>${doc.consultationFee}</strong>
                        </div>
                        <div className="detailRow">
                          <span>Education:</span>
                          <span>{doc.education}</span>
                        </div>
                      </div>

                      <div className="docCardActions">
                        <Link to={`/doctors/${doc.id}`} className="viewProfileBtn">
                          View Profile <FaArrowRight />
                        </Link>
                        <Link to={`/book-appointment?doctorId=${doc.id}`} className="bookSlotBtn">
                          <Button size="sm"><FaCalendarCheck /> Book</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DoctorsListing;
