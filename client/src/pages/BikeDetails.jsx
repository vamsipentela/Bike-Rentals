import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, CheckCircle2, ArrowLeft, Fuel, Gauge, Zap } from 'lucide-react';
import BookingCalculator from '../components/BookingForm';


const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bikes/${id}`);
        if (!response.ok) throw new Error('Database offline');
        const data = await response.json();
        setVehicle(data);
        setLoading(false);
      } catch (error) {
        // Fallback mock
        setVehicle({
          _id: id,
          name: 'Honda Activa 6G',
          type: 'Scooter',
          brand: 'Honda',
          pricePerHour: 100,
          pricePerDay: 600,
          rating: 4.9,
          mileage: '50 km/l',
          fuel: 'Petrol',
          image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1000',
          images: ['https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=1000'],
          location: 'Hyderabad Hub',
          description: 'The definitive choice for city commuting. Reliable and smooth.',
          specs: [
            { label: 'Engine', value: '109.51 cc' },
            { label: 'Fuel Type', value: 'Petrol' }
          ],
          rentRules: [
            'Driving License Required.',
            'Helmet must be worn.',
            'Return with same fuel level.'
          ]
        });
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--light-gray)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-gray)' }}>Loading details...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--light-gray)', minHeight: '100vh', padding: '100px 0 48px 0' }}>
      <div className="container">

        <Link to="/bikes" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-gray)', marginBottom: '24px' }}>
          <ArrowLeft size={14} /> Back to Fleet
        </Link>

        {/* 2-Column Split Layout */}
        <div className="flex mobile-col" style={{ gap: '32px', alignItems: 'flex-start', width: '100%' }}>

          {/* LEFT */}
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '100%', height: '400px', backgroundColor: 'var(--white)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={vehicle.images ? vehicle.images[activeImage] : vehicle.image} alt={vehicle.name} style={{ flexShrink: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '24px' }} />
              </div>

              {/* Thumbnails */}
              {vehicle.images && vehicle.images.length > 0 && (
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                  {vehicle.images.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImage(idx)} style={{ flexShrink: 0, width: '80px', height: '60px', backgroundColor: 'var(--white)', borderRadius: '4px', padding: '8px', cursor: 'pointer', border: activeImage === idx ? '2px solid var(--black)' : '1px solid var(--border)' }}>
                      <img src={img} alt="T" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '56px' }}>

              {/* TECHNICAL SPECS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }}>Technical Specs</h2>
                  <div style={{ height: '2px', flex: 1, backgroundColor: 'var(--light-gray)' }} />
                </div>

                {vehicle.specs && vehicle.specs.length > 0 && vehicle.specs[0].label ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
                    {vehicle.specs.map((spec, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        backgroundColor: 'var(--white)',
                        padding: '20px',
                        borderRadius: '16px',
                        border: '1px solid rgba(0,0,0,0.05)',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s ease'
                      }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <span style={{ fontSize: '10px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>{spec.label}</span>
                        <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--black)' }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '32px', border: '1.5px dashed var(--border)', borderRadius: '16px', textAlign: 'center', color: 'var(--text-light)' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600' }}>No detailed specifications available for this model yet.</p>
                  </div>
                )}
              </div>

              {/* OVERVIEW / DESCRIPTION */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }}>Overview</h2>
                  <div style={{ height: '2px', flex: 1, backgroundColor: 'var(--light-gray)' }} />
                </div>
                <p style={{
                  color: 'var(--text-gray)',
                  lineHeight: 1.7,
                  fontWeight: '500',
                  fontSize: '15px',
                  maxWidth: '700px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {vehicle.description || "Experience the perfect balance of performance and reliability with this premium fleet member. Expertly maintained and ready for your next journey."}
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <aside style={{ flex: 1, width: '100%', position: 'sticky', top: '100px' }}>
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h1 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-0.8px', color: 'var(--black)', marginBottom: '6px' }}>{vehicle.name}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-gray)', fontSize: '13px', fontWeight: '700' }}>
                    <MapPin size={14} /> {vehicle.location || 'Main Terminal'}
                  </div>
                </div>
                <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '6px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {vehicle.rating || '4.9'} <Star size={12} fill="white" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', gap: '24px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '4px' }}>Hourly Rate</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800' }}>₹</span>
                    <span style={{ fontSize: '24px', fontWeight: '900' }}>{vehicle.pricePerHour}</span>
                  </div>
                </div>
                <div style={{ width: '1px', backgroundColor: 'var(--border)', height: '40px' }} />
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '4px' }}>Daily Rate (9 AM - 7:30 PM)</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800' }}>₹</span>
                    <span style={{ fontSize: '24px', fontWeight: '900' }}>{vehicle.pricePerDay === 100 ? 600 : (vehicle.pricePerDay || 600)}</span>
                  </div>
                </div>
              </div>
            </div>

            <BookingCalculator vehicle={vehicle} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
