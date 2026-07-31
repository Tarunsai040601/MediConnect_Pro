import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBookOpen, FaHeart, FaChevronRight } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import './HealthTips.css';

const ARTICLES = [
  {
    id: 1,
    title: '10 Habits for a Strong and Healthy Heart',
    category: 'Heart Health',
    summary: 'Simple nutritional guidelines and exercises to keep your cardiovascular system running efficiently.',
    readTime: '5 min read',
    content: 'Keeping your heart healthy is a lifelong commitment. To prevent cardiovascular issues:\n\n1. Move regularly: Aim for at least 150 minutes of moderate aerobic exercise weekly.\n2. Choose healthy fats: Focus on olive oil, nuts, and avocados while limiting saturated fats.\n3. Cut back on salt: Reducing sodium intake keeps blood pressure normal.\n4. Manage stress: Deep breathing exercises or yoga can protect blood vessels from high cortisol.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Understanding Anxiety & How to Manage It Daily',
    category: 'Mental Wellbeing',
    summary: 'A brief guide on identifying signs of stress and implementing daily mindfulness protocols.',
    readTime: '8 min read',
    content: 'Anxiety is a natural response to stress, but chronic anxiety can impair physical health. Try these routines:\n\n1. 4-7-8 Breathing: Inhale for 4s, hold for 7s, exhale for 8s to calm the nervous system.\n2. Limit caffeine: High stimulants trigger physical symptoms of panic.\n3. Keep a journal: Writing down worries helps externalize anxiety.\n4. Professional talk therapy: Consulting a therapist is critical for chronic symptoms.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'The Role of Hydration in Metabolic Functions',
    category: 'Nutrition',
    summary: 'Why drinking enough water controls energy levels, digestion, and cognitive productivity.',
    readTime: '4 min read',
    content: 'Water is essential for every single cell function. Hydration benefits include:\n\n1. Joint lubrication: Prevents friction and protects cartilage.\n2. Kidney efficiency: Filters metabolic waste products and toxins.\n3. Cognition: Even mild dehydration reduces focus and short-term memory.\n4. Daily guideline: Try to consume at least 2.5-3 liters of water spread out through the day.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Strength Training Basics for Beginners',
    category: 'Fitness',
    summary: 'How to build lean muscle safely, correct body alignment, and avoid orthopedic injuries.',
    readTime: '6 min read',
    content: 'Strength training improves bone density and boosts fat burning metabolism. Essential tips:\n\n1. Master form: Start with bodyweight movements (squats, pushups) before adding weights.\n2. Warm up: Always spend 5-10 minutes preparing muscles with dynamic stretching.\n3. Rest periods: Allow muscle groups 48 hours to recover between training sessions.\n4. Quality over quantity: Focus on slow, controlled repetitions.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=300&fit=crop'
  }
];

const HealthTips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'Heart Health', 'Mental Wellbeing', 'Nutrition', 'Fitness'];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === 'All' || art.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="healthTipsPage">
      <section className="pageHero blogHero">
        <BackgroundAnimation />
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Health Tips</span>
          </nav>
          <h1>Health & Wellness Blog</h1>
          <p>Expert medical insights, nutritional tips, fitness advice, and mental health protocols.</p>
        </div>
      </section>

      <section className="section blogMainSection">
        <div className="container">
          {/* Search and Category filters */}
          <div className="blogFiltersBar glass">
            <div className="blogSearch">
              <FaSearch className="searchIcon" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="categoryFilters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`catFilterBtn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          {filteredArticles.length === 0 ? (
            <div className="noArticles glass">
              <h3>No Articles Found</h3>
              <p>Try searching for keywords like "heart", "hydration", or "exercise".</p>
            </div>
          ) : (
            <div className="grid-2 articlesGrid">
              {filteredArticles.map((art, idx) => (
                <ScrollReveal key={art.id} delay={idx * 100}>
                  <Card className="articleCard" glass hoverable>
                    <div className="articleImgWrap">
                      <img src={art.image} alt={art.title} className="articleImg" />
                      <span className="articleCategoryTag">{art.category}</span>
                    </div>
                    <div className="articleBody">
                      <div className="articleMeta">
                        <span>{art.readTime}</span>
                      </div>
                      <h3>{art.title}</h3>
                      <p>{art.summary}</p>
                      
                      <button className="readMoreBtn" onClick={() => setSelectedArticle(art)}>
                        Read Article <FaChevronRight />
                      </button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article reading popup modal */}
      {selectedArticle && (
        <div className="articleModalOverlay animate-fade-in" onClick={() => setSelectedArticle(null)}>
          <div className="articleModalContent glass animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="closeModalBtn" onClick={() => setSelectedArticle(null)}>×</button>
            <div className="modalImgWrap">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <span className="modalCatTag">{selectedArticle.category}</span>
            </div>
            <div className="modalTextBody">
              <h2>{selectedArticle.title}</h2>
              <span className="modalReadTime">{selectedArticle.readTime}</span>
              <div className="articleContentText">
                {selectedArticle.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTips;
