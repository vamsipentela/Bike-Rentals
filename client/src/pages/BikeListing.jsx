import { useState, useEffect } from 'react';
import { Search as SearchIcon, SlidersHorizontal, X, PackageOpen } from 'lucide-react';
import VehicleCard from '../components/BikeCard';
import FilterSidebar from '../components/FilterSidebar';


const BikeListing = () => {
  const [filters, setFilters] = useState({ type: 'All', brand: 'All' });
  const [searchTerm, setSearchTerm] = useState('');
  const [pricingModel, setPricingModel] = useState('Hourly');
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [bikeRes, bookingRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/bikes`),
          fetch(`${import.meta.env.VITE_API_URL}/api/bookings`)
        ]);

        if (bikeRes.ok) setVehicles(await bikeRes.json());
        if (bookingRes.ok) setBookings(await bookingRes.json());
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = vehicles.filter(v => {
    const matchType = filters.type === 'All' || v.type === filters.type;
    const matchBrand = filters.brand === 'All' || v.brand === filters.brand;
    const matchSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchBrand && matchSearch;
  });

  const clearAll = () => {
    setFilters({ brand: 'All', type: 'All' });
    setSearchTerm('');
  };

  return (
    <div style={{ backgroundColor: 'var(--white)', minHeight: '100vh', padding: '100px 0 80px' }}>
      <div className="container">

        {/* Page header */}
        <div style={{ marginBottom: '48px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px', color: 'var(--black)' }}>
            Our Fleet
          </h1>
          <p style={{ color: 'var(--text-gray)', fontWeight: 500, fontSize: '15px', maxWidth: '600px', lineHeight: 1.5 }}>
            Choose from our range of verified and well-maintained vehicles. Every ride is cleaned and inspected daily.
          </p>
        </div>

        {/* Layout */}
        <div className="listing-layout">

          {/* Overlay for mobile drawer */}
          {filterOpen && (
            <div className="filter-drawer-overlay" onClick={() => setFilterOpen(false)} />
          )}

          {/* Sidebar */}
          <aside className={`listing-sidebar${filterOpen ? ' open' : ''}`}>
            {/* Mobile close row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
              className="show-mobile">
              <span style={{ fontWeight: 800, fontSize: '16px' }}>Filters</span>
              <button
                onClick={() => setFilterOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--black)', display: 'flex' }}
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main content */}
          <main className="listing-main">

            {/* Toolbar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--border)',
            }}>
              {/* Search */}
              <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
                <SearchIcon size={16} color="var(--black)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.6 }} />
                <input
                  type="text"
                  placeholder="Search brand, model or type…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="search-input-premium"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--border)',
                    backgroundColor: 'var(--white)',
                    fontSize: '14px',
                    fontWeight: 600,
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                />
              </div>

              {/* Results count & model label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--light-gray)', padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--black)', borderRadius: '50%' }} />
                  Standard Hourly Rate
                </div>
                {/* Filter toggle (tablet/mobile only) */}
                <button
                  onClick={() => setFilterOpen(o => !o)}
                  className="show-mobile btn btn-outline btn-sm"
                  style={{ gap: '8px', padding: '10px 20px', borderRadius: '12px', fontWeight: 700 }}
                >
                  <SlidersHorizontal size={15} /> Filters
                </button>
              </div>
            </div>

            {/* Results count text */}
            <div style={{ fontSize: '13px', fontWeight: 900, color: 'var(--black)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--text-gray)' }}>Results:</span>
              {loading ? 'Scanning fleet…' : `${filtered.length} total ride${filtered.length !== 1 ? 's' : ''}`}
            </div>

            {/* Grid or empty */}
            {loading ? (
              <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-gray)', fontWeight: 600 }}>
                Loading bikes…
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid-3" style={{ gap: '20px' }}>
                {filtered.map(v => {
                  const id = v._id || v.id;
                  const isOccupied = bookings.some(b => {
                    const bikeId = b.bike?._id || b.bike;
                    return bikeId === id && b.status !== 'Completed' && b.status !== 'Cancelled';
                  });
                  return (
                    <VehicleCard
                      key={id}
                      pricingModel={pricingModel}
                      isOccupied={isOccupied}
                      bike={{ ...v, pricePerHour: pricingModel === 'Daily' ? v.pricePerDay : v.pricePerHour }}
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                padding: 'clamp(48px, 8vw, 100px) 24px',
                background: 'var(--light-gray)',
                borderRadius: '16px',
                border: '1.5px dashed var(--border)',
                textAlign: 'center',
              }}>
                <PackageOpen size={44} color="var(--text-gray)" />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>No rides found</h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Try adjusting your filters or search term.</p>
                </div>
                <button onClick={clearAll} className="btn btn-black" style={{ marginTop: '8px', borderRadius: '8px' }}>
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BikeListing;
