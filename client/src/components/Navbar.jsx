import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (['/login', '/signup'].includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  // Helper to determine active state
  const isActive = (path, hash = '') => {
    if (path === '/') {
      if (location.pathname !== '/') return false;
      if (!hash || hash === '#top') return !location.hash || location.hash === '#top';
      return location.hash === hash;
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Home', to: '/', hash: '#top' },
    { label: 'Our Story', to: '/', hash: '#our-story' },
    { label: 'Bikes', to: '/bikes', hash: '' },
    { label: 'Location', to: '/', hash: '#location' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault(); // Stop standard routing completely

    closeMenu(); // Close mobile drawer immediately

    // Wrap in a minimal timeout to ensure state update doesn't block routing
    setTimeout(() => {
      const targetHash = link.hash === '#top' ? '' : link.hash;
      const fullPath = targetHash ? `${link.to}${targetHash}` : link.to;

      if (location.pathname === link.to) {
        window.history.replaceState({}, '', fullPath || '/');
        if (!targetHash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetHash.substring(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        // Different page: manually force navigation
        navigate(fullPath);
      }
    }, 10);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">

          {/* LOGO AREA */}
          <div className="nav-brand">
            <Link to="/" className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              RideOn
            </Link>
            <div className="location-badge lg-only">
              <MapPin size={12} />
              <span>Amaravathi</span>
            </div>
          </div>

          {/* DESKTOP LINKS */}
          <div className="nav-links desktop-only">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.hash ? `${link.to}${link.hash}` : link.to}
                className={`nav-hover-link ${isActive(link.to, link.hash) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ACTIONS AREA */}
          <div className="nav-actions">
            {user ? (
              <div className="desktop-only" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {user.isAdmin && (
                  <Link to="/admin" className="nav-action-link">
                    <User size={16} /> Admin
                  </Link>
                )}
                <Link to="/dashboard" className="nav-action-link">
                  <User size={16} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="nav-logout-btn">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="desktop-only" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link to="/login" className="nav-hover-link">Login</Link>
                <Link to="/signup" className="btn btn-black btn-sm">Sign Up</Link>
              </div>
            )}

            {/* HAMBURGER TOGGLE */}
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <div /> {/* Spacer to keep close button on the right */}
            <button className="close-drawer-btn" onClick={closeMenu}>
              <X size={24} />
            </button>
          </div>

          {user ? (
            <div className="mobile-drawer-user">
              <div className="mobile-user-avatar">
                {user.name.charAt(0)}
              </div>
              <div className="mobile-user-info">
                <span className="mobile-user-name">{user.name}</span>
                <span className="mobile-user-email">{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="mobile-drawer-user">
              <div className="mobile-user-avatar" style={{ background: 'var(--border)', color: 'var(--text-gray)' }}>
                <User size={24} />
              </div>
              <div className="mobile-user-info">
                <span className="mobile-user-name">Guest User</span>
                <span className="mobile-user-email">Login for full access</span>
              </div>
            </div>
          )}


          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.hash ? `${link.to}${link.hash}` : link.to}
                className={`mobile-nav-link ${isActive(link.to, link.hash) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
                <ChevronRight size={16} className="arrow" />
              </Link>
            ))}
          </div>


          <div className="mobile-drawer-footer">
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/dashboard" className="btn btn-outline btn-full" onClick={closeMenu}>Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-black btn-full">Logout</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/login" className="btn btn-outline btn-full" onClick={closeMenu}>Login</Link>
                <Link to="/signup" className="btn btn-black btn-full" onClick={closeMenu}>Create Account</Link>
              </div>
            )}
          </div>
        </div>
        <div className="mobile-drawer-backdrop" onClick={closeMenu} />
      </div>
    </>
  );
};

export default Navbar;
