import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [review, setReview] = useState('');
  const location = useLocation();

  // Hide footer on login/signup pages
  if (['/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  const handleReviewSubmit = () => {
    if (!review.trim()) return;
    const whatsappMsg = `Hi RideOn, here is my review: ${review}`;
    window.open(`https://wa.me/919676543828?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    setReview('');
  };

  return (
    <footer className="footer-root">
      <div className="container">

        {/* Grid */}
        <div className="footer-grid">

          {/* Company */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <div className="footer-links">
              <a href="/#our-story" className="footer-link">Our Story</a>
              <Link to="/careers" className="footer-link">Careers</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-col-title">Support</h4>
            <div className="footer-links">
              <Link to="/faq" className="footer-link">Help Center</Link>
              <Link to="/terms" className="footer-link">Terms &amp; Conditions</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </div>
          </div>

          {/* Review Column (Single-Line Horizontal) */}
          <div>
            <h4 className="footer-col-title">Leave a Review</h4>
            <p className="footer-link" style={{ fontSize: '13.5px', marginBottom: '16px', opacity: 0.9 }}>
              Tell us about your recent ride experience with RideOn.
            </p>
            <div className="footer-input-row">
              <input
                type="text"
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="Write your review…"
                className="footer-email-input"
              />
              <button
                onClick={handleReviewSubmit}
                className="btn btn-white btn-sm"
              >
                Send
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} RideOn Rentals · Velgapudi, Amaravathi, AP
        </div>
      </div>
    </footer>
  );
};

export default Footer;
