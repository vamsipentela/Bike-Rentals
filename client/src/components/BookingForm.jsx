import { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck, Zap, Info, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import API_URL from '../config';

const BookingCalculator = ({ vehicle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [durationInHours, setDurationInHours] = useState(1);
  const [isFullDay, setIsFullDay] = useState(false);
  const [pricing, setPricing] = useState({ type: 'Hourly', base: 0, tax: 0, total: 0 });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOccupied, setIsOccupied] = useState(false);

  // Check Availability
  useEffect(() => {
    if (!vehicle?._id) return;

    const checkAvailability = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bookings?t=${Date.now()}`);
        if (!response.ok) return;
        const bookingsData = await response.json();

        // Robust check for ID format or Object format
        const activeBooking = bookingsData.find(b => {
          const bikeId = b.bike?._id || b.bike;
          // Only show as occupied if NOT completed and NOT cancelled
          return bikeId === vehicle._id && b.status !== 'Completed' && b.status !== 'Cancelled';
        });

        setIsOccupied(!!activeBooking);
      } catch (err) {
        console.error('Availability check failed:', err);
      }
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 5000); // Re-check every 5s
    return () => clearInterval(interval);
  }, [vehicle]);

  // Live Pricing Logic
  useEffect(() => {
    if (!vehicle) return;

    const perHour = vehicle.pricePerHour || 30;
    const perDay = 600; // Updated as per user request

    if (isFullDay) {
      setPricing({ type: 'Full Day', base: perDay, tax: 0, total: perDay });
    } else {
      if (durationInHours < 24) {
        const base = perHour * durationInHours;
        const tax = 0;
        setPricing({ type: 'Hourly', base, tax, total: base + tax });
      } else {
        const days = Math.ceil(durationInHours / 24);
        const base = perDay * days;
        const tax = 0;
        setPricing({ type: 'Daily', base, tax, total: base + tax });
      }
    }
  }, [durationInHours, isFullDay, vehicle]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 🚨 AGGRESSIVE DOUBLE-BOOKING PREVENTION
      const availabilityRes = await fetch(`${API_URL}/api/bookings?t=${Date.now()}`);
      if (availabilityRes.ok) {
        const currentBookings = await availabilityRes.json();
        const stillOccupied = currentBookings.some(b => {
          const bikeId = b.bike?._id || b.bike;
          // Check if ANYONE has an active/confirmed booking for this bike
          return bikeId === vehicle._id && b.status !== 'Completed' && b.status !== 'Cancelled';
        });

        if (stillOccupied) {
          const msg = '⚠️ STOP: This bike is already booked! You cannot book it until the admin ends the previous ride.';
          alert(msg);
          setError(msg);
          setIsOccupied(true);
          setLoading(false);
          return;
        }
      }

      const response = await fetch(API_URL + '/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          bike: vehicle._id,
          pickupDate,
          dropoffDate: dropDate,
          totalPrice: pricing.total,
          status: 'Confirmed'
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Booking failed');

      setSuccess(true);
      setIsOccupied(true); // Lock it out for this session immediately

      const whatsappMsg = `Hello RideOn, I have just reserved a ${vehicle.name} from ${pickupDate} to ${dropDate}. Please confirm!`;
      window.open(`https://wa.me/919676543828?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>Reserve Ride</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase' }}>
            <ShieldCheck size={14} color="var(--black)" /> Guaranteed Booking
          </div>
        </div>

        {/* FULL DAY SPECIAL OPTION */}
        <div 
          onClick={() => setIsFullDay(!isFullDay)}
          style={{ 
            backgroundColor: isFullDay ? 'var(--black)' : 'var(--light-gray)', 
            padding: '16px', 
            borderRadius: '12px', 
            cursor: 'pointer',
            border: isFullDay ? 'none' : '1.5px dashed var(--border)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              backgroundColor: isFullDay ? 'rgba(255,255,255,0.2)' : 'var(--white)', 
              padding: '10px', 
              borderRadius: '10px',
              color: isFullDay ? 'white' : 'var(--black)'
            }}>
              <Zap size={18} fill={isFullDay ? 'white' : 'transparent'} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: isFullDay ? 'white' : 'var(--black)' }}>Full Day Special</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: isFullDay ? 'rgba(255,255,255,0.7)' : 'var(--text-gray)' }}>9:00 AM to 7:30 PM</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', color: isFullDay ? 'white' : 'var(--black)' }}>₹600</div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: isFullDay ? 'rgba(255,255,255,0.7)' : 'var(--text-gray)' }}>{isFullDay ? 'Selected' : 'Select'}</div>
          </div>
        </div>

        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', opacity: isOccupied ? 0.5 : 1, pointerEvents: isOccupied ? 'none' : 'auto' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-gray)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Pickup</label>
              <input type="date" required disabled={isOccupied} style={{ width: '100%', height: '40px', padding: '0 12px', backgroundColor: 'var(--light-gray)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '13px', fontWeight: '600', color: 'var(--black)', outline: 'none' }} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-gray)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Dropoff</label>
              <input type="date" required disabled={isOccupied} style={{ width: '100%', height: '40px', padding: '0 12px', backgroundColor: 'var(--light-gray)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '13px', fontWeight: '600', color: 'var(--black)', outline: 'none' }} value={dropDate} onChange={(e) => setDropDate(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', opacity: (isOccupied || isFullDay) ? 0.5 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>{isFullDay ? 'Standard Package Duration' : 'Custom Duration'}</label>
              <span style={{ fontSize: '13px', fontWeight: '900', padding: '6px 14px', backgroundColor: 'var(--black)', color: 'var(--white)', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>{isFullDay ? '10.5 Hours' : `${durationInHours} Hours`}</span>
            </div>
            <input
              type="range"
              min="1"
              max="72"
              disabled={isOccupied || isFullDay}
              style={{ 
                width: '100%', 
                cursor: (isOccupied || isFullDay) ? 'not-allowed' : 'pointer', 
                height: '6px', 
                backgroundColor: 'var(--border)', 
                borderRadius: '4px', 
                accentColor: 'var(--black)',
                appearance: 'none',
                outline: 'none'
              }}
              value={isFullDay ? 10.5 : durationInHours}
              onChange={(e) => setDurationInHours(parseInt(e.target.value))}
            />
            {isFullDay ? (
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-gray)', textAlign: 'center' }}>
                <Info size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Package hours fixed: 9 AM - 7:30 PM
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <span>1h</span>
                  <span>24h</span>
                  <span>48h</span>
                  <span>72h</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: 'var(--light-gray)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', opacity: isOccupied ? 0.7 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-gray)' }}>{isFullDay ? 'Package Rate' : `Rate (₹${vehicle.pricePerHour}/hr)`}</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--black)' }}>₹{pricing.base.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '-0.5px' }}>Total Amount</h3>
              <h3 style={{ fontSize: '20px', fontWeight: '900', color: 'var(--black)' }}>₹{pricing.total.toFixed(0)}</h3>
            </div>
          </div>

          {isOccupied && (
            <div style={{ padding: '12px', backgroundColor: '#fff7ed', color: '#9a3412', borderRadius: '4px', fontSize: '13px', fontWeight: '700', textAlign: 'center', border: '1px solid #ffedd5' }}>
              ⚠️ Vehicle currently on a ride
            </div>
          )}

          {error && (
            <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '4px', fontSize: '13px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '12px', border: '1px solid #bcf0da', textAlign: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800' }}>🎉 Reservation Sent!</h3>
              <p style={{ fontSize: '13px', fontWeight: '600' }}>Opening WhatsApp for confirmation...</p>
            </div>
          )}

          {!success && (
            <button
              type="submit"
              disabled={loading || isOccupied}
              className="btn btn-black card-hover"
              style={{
                width: '100%',
                height: '48px',
                fontSize: '14px',
                borderRadius: '4px',
                opacity: (loading || isOccupied) ? 0.6 : 1,
                cursor: (loading || isOccupied) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : isOccupied ? 'Currently Unavailable' : user ? 'Reserve Ride' : <><Lock size={14} /> Login to Book</>}
            </button>
          )}
        </form>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        message="Please log in to continue with your bike reservation."
      />
    </>
  );
};

export default BookingCalculator;
