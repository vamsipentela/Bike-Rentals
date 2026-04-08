import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, ShieldCheck, Wrench, Calendar, Clock, MapPin, Star } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import API_URL from '../config';

const FEATURES = [
  { icon: <Zap size={17} />, title: 'Instant-Go', desc: 'Ready in under 60 sec.' },
  { icon: <ShieldCheck size={17} />, title: 'Safety First', desc: '25-point daily check.' },
  { icon: <Wrench size={17} />, title: 'Pro Servicing', desc: 'Constant fleet tuning.' },
  { icon: <MapPin size={17} />, title: 'City-Wide', desc: 'Multiple pickup hubs.' },
];

const REVIEWS = [
  { name: 'Rahul S.', text: 'Best service in the city. Bikes are extremely well maintained.', rating: 5 },
  { name: 'Priya V.', text: 'Smooth booking process and very affordable prices.', rating: 5 },
];

const Home = () => {
  const [featuredBikes, setFeaturedBikes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const [bikeRes, bookingRes] = await Promise.all([
          fetch(API_URL + '/api/bikes'),
          fetch(API_URL + '/api/bookings')
        ]);

        if (bikeRes.ok) {
          const data = await bikeRes.json();
          setFeaturedBikes(data.slice(0, 3));
        }
        if (bookingRes.ok) setBookings(await bookingRes.json());
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Separate effect for hash scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = '/bikes';
  };

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>

      {/* ─── 1. HERO ────────────────────────────────── */}
      <section className="hero-section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="hero-inner">

            {/* Live Badge */}
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              Available Now · Amaravathi
            </div>

            {/* Headline */}
            <h1 className="hero-h1">
              Built for Riders Across India
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Premium petrol bikes &amp; scooters, verified and ready.
              Pick your ride and hit the road today.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hero-search-form">
              <div className="hero-search-field has-divider">
                <Calendar size={16} color="var(--text-gray)" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="hero-search-label">Pickup Date</span>
                  <input type="date" required className="hero-search-date-input" />
                </div>
              </div>

              <div className="hero-search-field">
                <Clock size={16} color="var(--text-gray)" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="hero-search-label">Dropoff Date</span>
                  <input type="date" required className="hero-search-date-input" />
                </div>
              </div>

              <div className="hero-search-btn-wrap">
                <button type="submit" className="hero-search-btn">Search Bikes</button>
              </div>
            </form>

            {/* Stats */}
            <div className="hero-stats">
              {[
                { num: '10k+', label: 'Happy Riders' },
                { num: '500+', label: 'Active Fleet' },
                { num: '4.9★', label: 'Avg Rating' },
              ].map((s, i) => (
                <div className="hero-stat" key={i}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. OUR STORY ───────────────────────────── */}
      <section id="our-story" className="story-section">
        <div className="container">
          <div className="story-grid">

            {/* Left — text */}
            <div className="story-text-col">
              <span className="section-eyebrow">The RideOn Mission</span>
              <h2 className="section-title">
                Redefining urban<br />mobility, one ride at a time.
              </h2>
              <p className="section-subtitle">
                We bridge the gap between personal ownership and public transport
                with flawlessly maintained machines ready at a moment's notice.
              </p>

              <div className="story-features">
                {FEATURES.map((f, i) => (
                  <div className="story-feature-item" key={i}>
                    <div className="story-feature-icon">{f.icon}</div>
                    <div>
                      <h4 style={{ marginBottom: '2px' }}>{f.title}</h4>
                      <p className="footer-link" style={{ color: 'var(--text-gray)', fontSize: '13px' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual panel */}
            <div className="story-visual">
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlrZXN8ZW58MHx8MHx8fDA%3D"
                alt="Premium Motorcycle"
                className="story-visual-img"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="story-visual-overlay" />

              {/* Fallback icon */}
              <div className="story-visual-fallback">
                <div style={{ fontSize: '64px', opacity: 0.12 }}>🏍️</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '8px' }}>
                  Premium Fleet
                </div>
              </div>

              {/* Floating stats */}
              <div className="story-visual-stats">
                {[{ num: '10k+', label: 'Happy Riders' }, { num: '500+', label: 'Active Fleet' }].map((s, i) => (
                  <div className="story-visual-stat" key={i}>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--black)', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '3px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. POPULAR RENTALS ─────────────────────── */}
      <section className="rentals-section">
        <div className="container">
          <div className="rentals-header">
            <span className="section-eyebrow">Top Picks</span>
            <h2 className="section-title">Popular Rentals</h2>
            <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
              Handpicked rides loved by our community — verified, maintained, and ready to go.
            </p>
          </div>

          {/* Cards */}
          <div className="grid-3" style={{ gap: '24px' }}>
            {loading ? (
               <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-gray)', padding: '40px 0' }}>Loading rentals…</p>
            ) : featuredBikes.length > 0 ? (
               featuredBikes.map(bike => {
                const id = bike._id || bike.id;
                const isOccupied = bookings.some(b =>
                  (b.bike?._id === id || b.bike === id) && b.status !== 'Completed' && b.status !== 'Cancelled'
                );
                return (
                  <BikeCard key={id} bike={bike} isOccupied={isOccupied} />
                );
              })
            ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 24px', backgroundColor: 'var(--light-gray)', borderRadius: '16px', border: '1.5px dashed var(--border)' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--black)', marginBottom: '8px' }}>No fleet available right now.</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '15px' }}>Our fleet is currently offline or fully booked. Please check back later.</p>
                </div>
            )}
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/bikes" className="btn btn-black btn-lg">
              Browse Complete Fleet
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. LOCATION + REVIEWS ──────────────────── */}
      <section id="location" className="location-section">
        <div className="container">
          <div className="location-grid">

            {/* Left — info + reviews */}
            <div className="location-text-col">
              <div>
                <span className="section-eyebrow">Find Us</span>
                <h2 className="section-title">Visit Our Hub</h2>
                <p className="section-subtitle">
                  We are located in the heart of Amaravathi, making it easy
                  for you to pick up and drop off your ride.
                </p>
                <div className="location-address-badge">
                  <div className="location-address-icon"><MapPin size={20} color="white" /></div>
                  <div>
                    <h5 style={{ marginBottom: '2px' }}>Main Terminal</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Velgapudi, Amaravathi, AP</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ marginBottom: '16px' }}>Rider Reviews</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {REVIEWS.map((rev, i) => (
                    <div className="review-card" key={i}>
                      <div className="review-stars">
                        {Array.from({ length: rev.rating }, (_, j) => (
                          <Star key={j} size={12} fill="var(--black)" color="var(--black)" />
                        ))}
                      </div>
                      <p className="footer-link" style={{ fontSize: '14px', lineHeight: 1.6 }}>"{rev.text}"</p>
                      <div style={{ fontSize: '13px', fontWeight: 800 }}>— {rev.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — map */}
            <div className="map-container">
              <iframe
                title="Velgapudi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15306.903673523737!2d80.473525!3d16.516480!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0fc913d89d9%3A0x6b63f6955d5069f9!2sVelgapudi%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1712338421000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Velgapudi+Amaravathi+Andhra+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="map-open-link"
              >
                Open in Google Maps ↗
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
