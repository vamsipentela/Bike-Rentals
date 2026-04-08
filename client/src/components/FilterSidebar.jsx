import { RotateCcw, Tag, IndianRupee, Fuel, Check } from 'lucide-react';

const FilterSidebar = ({ filters, setFilters }) => {
  const brands = ['All', 'Honda', 'TVS', 'Bajaj', 'Hero', 'Royal Enfield'];
  const types = ['All', 'Bike', 'Scooter'];

  const resetFilters = () => setFilters({ brand: 'All', type: 'All' });

  // Custom Styled Section Header Component
  const SectionHeader = ({ icon: Icon, title }) => (
    <h4 style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '13px',
      fontWeight: '800',
      marginBottom: '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--text-dark)'
    }}>
      <div style={{ color: 'var(--text-gray)' }}><Icon size={14} /></div>
      {title}
    </h4>
  );

  // Custom Styled Selection Item Component
  const SelectionItem = ({ label, checked, onChange }) => (
    <div
      onClick={onChange}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: '10px 12px',
        borderRadius: '8px',
        backgroundColor: checked ? 'var(--white)' : 'transparent',
        border: checked ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.25s ease',
        boxShadow: checked ? 'var(--shadow-sm)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!checked) e.currentTarget.style.backgroundColor = '#f0f0f0';
      }}
      onMouseLeave={(e) => {
        if (!checked) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <span style={{
        fontSize: '14px',
        fontWeight: checked ? '700' : '500',
        color: checked ? 'var(--black)' : 'var(--text-gray)'
      }}>
        {label}
      </span>
      {checked && <Check size={14} color="var(--black)" />}
    </div>
  );

  return (
    <div style={{
      position: 'sticky',
      top: '100px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      padding: '0 8px'
    }}>

      {/* 1. Header (Title + Minor Reset) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>Explore</h3>
        <button
          onClick={resetFilters}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: '13px', fontWeight: '700', color: 'var(--text-gray)',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'color 0.2s', padding: '6px'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--black)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-gray)'}
        >
          <RotateCcw size={14} /> Clear
        </button>
      </div>

      {/* Filter Sections Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* Type Section */}
        <div>
          <SectionHeader icon={Fuel} title="Vehicle Type" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {types.map(type => (
              <SelectionItem
                key={type}
                label={type}
                checked={filters.type === type}
                onChange={() => setFilters({ ...filters, type })}
              />
            ))}
          </div>
        </div>

        {/* Brand Section */}
        <div>
          <SectionHeader icon={Tag} title="Brand" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {brands.map(brand => (
              <SelectionItem
                key={brand}
                label={brand}
                checked={filters.brand === brand}
                onChange={() => setFilters({ ...filters, brand })}
              />
            ))}
          </div>
        </div>



      </div>

      {/* Main Reset Button at bottom - Only visible if filters active */}
      <button
        onClick={resetFilters}
        className="btn btn-black"
        style={{ width: '100%', padding: '14px', marginTop: '16px', fontSize: '13px', borderRadius: '8px' }}
      >
        Reset Filters
      </button>

    </div>
  );
};

export default FilterSidebar;
