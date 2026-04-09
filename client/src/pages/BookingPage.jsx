import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Calendar, MapPin, ArrowLeft, CreditCard } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const bikeId = queryParams.get('bikeId');
  const pickup = queryParams.get('pickup');
  const dropoff = queryParams.get('dropoff');
  const total = queryParams.get('total');
  const bikeName = queryParams.get('bikeName');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        bike: bikeId,
        pickupDate: pickup,
        dropoffDate: dropoff,
        totalPrice: parseFloat(total),
      }, config);

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bikeId) return <div className="container">Invalid booking details. <Link to="/bikes">Browse Bikes</Link></div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)', padding: '48px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <Link to={`/bikes/${bikeId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-gray)', marginBottom: '32px' }}>
          <ArrowLeft size={14} /> Back to Details
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }} className="mobile-col">
          
          {/* Left: Booking Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>Confirm Reservation</h1>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '80px', height: '60px', backgroundColor: 'var(--light-gray)', borderRadius: '8px', flexShrink: 0, padding: '8px' }}>
                    <img src="https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1000" alt="bike" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{bikeName || 'Selected Vehicle'}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-gray)', fontWeight: '600' }}>Verified Performance</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={18} color="var(--text-gray)" />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Rental Period</div>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>{pickup} — {dropoff}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={18} color="var(--text-gray)" />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Pickup Location</div>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>Main Hub (Self Pickup)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ShieldCheck size={24} color="#15803d" />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800' }}>Insurance Included</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: '600' }}>Basic damage cover included in your rental.</p>
              </div>
            </div>
          </div>

          {/* Right: Payment Sidebar */}
          <aside>
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Price Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-gray)', fontWeight: '600' }}>Subtotal</span>
                  <span style={{ fontWeight: '800' }}>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-gray)', fontWeight: '600' }}>Security Deposit</span>
                  <span style={{ fontWeight: '800' }}>₹0</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800' }}>Total (INR)</span>
                  <span style={{ fontSize: '24px', fontWeight: '800' }}>₹{total}</span>
                </div>
              </div>

              {error && (
                <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '13px', fontWeight: '500' }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', fontSize: '13px', fontWeight: '500' }}>
                  Booking successful! Redirecting to dashboard...
                </div>
              )}

              <button 
                onClick={handleConfirmBooking}
                disabled={loading || success}
                className="btn btn-black" 
                style={{ width: '100%', height: '56px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                {loading ? 'Processing...' : <><CreditCard size={18} /> Confirm & Pay</>}
              </button>
              
              <p style={{ fontSize: '11px', color: 'var(--text-gray)', textAlign: 'center', fontWeight: '600', lineHeight: 1.5 }}>
                By clicking Confirm, you agree to our Terms of Service and Rental Policy.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;
