import { useState, useEffect } from 'react';
import { User, LogOut, Package, History, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';

const Dashboard = () => {
  const { user, logout }  = useAuth();
  const navigate          = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    if (!user)         { navigate('/login'); return; }
    if (user.isAdmin)  { navigate('/admin'); return; }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res  = await fetch(API_URL + '/api/bookings/mybookings', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setBookings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const tabs = [
    { id: 'active',  label: 'Active Rides',      icon: <Package size={17} /> },
    { id: 'history', label: 'Your Recent Bikes',  icon: <History size={17} /> },
  ];

  const filtered = bookings.filter(b => {
    if (activeTab === 'active')  return b.status === 'Confirmed';
    if (activeTab === 'history') return ['Completed', 'Cancelled'].includes(b.status);
    return false;
  });

  const tabLabel = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh', padding: 'clamp(32px, 6vw, 64px) 0' }}>
      <div className="container">
        <div className="dashboard-layout">

          {/* ── Sidebar ── */}
          <aside className="dashboard-sidebar">
            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', marginBottom: '36px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--white)', boxShadow: 'var(--shadow-md)', background: 'var(--black)' }}>
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=000&color=fff&bold=true`}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--black)', margin: 0 }}>{user?.name}</h3>
                <p  style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: 600, marginTop: '2px' }}>Rider Account</p>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '13px 16px', borderRadius: '12px', width: '100%',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === tab.id ? 'var(--black)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--white)' : 'var(--text-gray)',
                    fontWeight: 700, fontSize: '14px', fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--black)'; }}
                  onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-gray)'; }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}

              <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }} />

              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '13px 16px', borderRadius: '12px', width: '100%',
                  border: 'none', cursor: 'pointer', background: 'transparent',
                  color: 'var(--red)', fontWeight: 700, fontSize: '14px', fontFamily: 'inherit',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <LogOut size={17} /> Logout
              </button>
            </nav>
          </aside>

          {/* ── Main ── */}
          <main className="dashboard-main">
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
              <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: 'var(--black)', margin: 0 }}>
                {tabLabel}
              </h1>
            </div>

            {/* Bookings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
                  <Loader2 className="animate-spin" size={32} color="var(--text-gray)" />
                </div>
              ) : filtered.length > 0 ? (
                filtered.map(booking => (
                  <div
                    key={booking._id}
                    className="card-hover dashboard-booking-card"
                    style={{ background: 'var(--white)', padding: 'clamp(16px, 3vw, 24px)', borderRadius: '20px', border: '1px solid var(--border)' }}
                  >
                    {/* Bike thumb */}
                    <div className="dashboard-bike-thumb">
                      <img
                        src={booking.bike?.image}
                        alt={booking.bike?.name || 'Bike'}
                        style={{ width: '100%', objectFit: 'contain', borderRadius: '8px' }}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', minWidth: 0 }}>
                      <div style={{ minWidth: '140px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {booking.bike?.brand}
                        </span>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '4px 0', color: 'var(--black)' }}>{booking.bike?.name}</h3>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--black)' }}>₹{booking.totalPrice}</span>
                      </div>

                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pickup</span>
                        <p style={{ fontWeight: 700, marginTop: '4px', fontSize: '14px' }}>
                          {new Date(booking.pickupDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</span>
                        <p style={{
                          fontWeight: 800,
                          marginTop: '4px',
                          fontSize: '14px',
                          color: booking.status === 'Confirmed' ? '#10b981' : booking.status === 'Cancelled' ? 'var(--red)' : 'var(--text-gray)',
                        }}>
                          {booking.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: 'clamp(40px, 6vw, 64px)', border: '2px dashed var(--border)', borderRadius: '20px' }}>
                  <p style={{ color: 'var(--text-gray)', fontWeight: 700, marginBottom: '12px' }}>
                    No {activeTab} rides found.
                  </p>
                  <Link to="/bikes" className="btn btn-black" style={{ borderRadius: '8px' }}>
                    Reserve your first ride →
                  </Link>
                </div>
              )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
