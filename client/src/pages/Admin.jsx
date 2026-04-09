import { useState, useEffect } from 'react';

import {
  Package, Plus, Edit2, Trash2, X, Fuel, Gauge,
  IndianRupee, Tag, Type, Image as ImageIcon,
  Users, Calendar, CheckCircle, BarChart3, TrendingUp,
  Activity, ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bikes');
  const [bikes, setBikes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBike, setEditingBike] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Scooter',
    brand: 'Honda',
    fuel: 'Petrol',
    mileage: '',
    pricePerHour: '',
    pricePerDay: '',
    image: '',
    description: '',
    specs: [{ label: '', value: '' }]
  });

  const brands = ['Honda', 'TVS', 'Bajaj', 'Hero', 'Royal Enfield', 'Yamaha', 'Suzuki'];
  const types = ['Scooter', 'Bike'];
  const fuelTypes = ['Petrol', 'Electric'];

  useEffect(() => {
    if (activeTab === 'bikes') fetchBikes();
    if (activeTab === 'bookings') fetchBookings();
    if (activeTab === 'users') fetchUsers();
  }, [activeTab]);

  const fetchBikes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bikes`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setBikes(data);
    } catch (err) {
      console.error('Error fetching bikes:', err);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    setFormData(prev => ({ ...prev, specs: newSpecs }));
  };

  const addSpecRow = () => {
    setFormData(prev => ({ ...prev, specs: [...prev.specs, { label: '', value: '' }] }));
  };

  const removeSpecRow = (index) => {
    const newSpecs = formData.specs.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, specs: newSpecs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingBike
        ? `${import.meta.env.VITE_API_URL}/api/bikes/${editingBike._id}`
        : `${import.meta.env.VITE_API_URL}/api/bikes`;
      const method = editingBike ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to save bike on local server.');
      await fetchBikes();
      setShowModal(false);
      setEditingBike(null);
      setFormData({ 
        name: '', type: 'Scooter', brand: 'Honda', fuel: 'Petrol', mileage: '', 
        pricePerHour: '', pricePerDay: '', image: '', description: '',
        specs: [{ label: '', value: '' }]
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteBike = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bikes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (!response.ok) throw new Error('Failed to delete bike on local server.');
      fetchBikes();
    } catch (err) {
      alert(err.message);
    }
  };

  const endRide = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}/complete`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.ok) fetchBookings();
    } catch (err) {
      alert('Error ending ride');
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ride?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.ok) fetchBookings();
    } catch (err) {
      alert('Error deleting ride');
    }
  };

  const openEditModal = (bike) => {
    setEditingBike(bike);
    setFormData({
      ...bike,
      specs: bike.specs && bike.specs.length > 0 ? bike.specs : [{ label: '', value: '' }]
    });
    setShowModal(true);
  };

  const stats = [
    { name: 'Total Fleet', value: bikes.length, icon: <Package size={20} />, trend: '+4%' },
    { name: 'Active Bookings', value: bookings.filter(b => b.status !== 'Completed').length, icon: <TrendingUp size={20} />, trend: '+12%' },
    { name: 'Total Users', value: users.length, icon: <Users size={20} />, trend: '+2%' },
  ];

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', padding: '100px 0 40px 0' }}>
      <div className="container">

        {/* TOP COMMAND PANEL */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1.5px', color: 'var(--black)', margin: 0 }}>Command Center</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', fontWeight: '600', marginTop: '4px' }}>Welcome back, {user?.name}. Manage your fleet and operations.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => { setEditingBike(null); setShowModal(true); }} className="btn btn-black" style={{ borderRadius: '14px', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Plus size={18} /> Add New Vehicle
            </button>
          </div>
        </div>

        {/* ANALYTICS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '24px', marginBottom: '48px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'var(--light-gray)', padding: '12px', borderRadius: '12px', color: 'var(--black)' }}>{stat.icon}</div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: stat.trend.includes('+') ? '#10b981' : 'var(--text-gray)', backgroundColor: stat.trend.includes('+') ? '#dcfce7' : 'var(--light-gray)', padding: '4px 8px', borderRadius: '6px', height: 'fit-content' }}>{stat.trend}</span>
              </div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.name}</h4>
              <p style={{ fontSize: '28px', fontWeight: '900', margin: '4px 0', color: 'var(--black)', letterSpacing: '-1px' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* NAVIGATION TABS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', backgroundColor: 'var(--light-gray)', padding: '6px', borderRadius: '16px', width: 'fit-content', marginBottom: '32px' }}>
          {[
            { id: 'bikes', label: 'Fleet Management', icon: <Package size={16} /> },
            { id: 'bookings', label: 'Live Bookings', icon: <Calendar size={16} /> },
            { id: 'users', label: 'Access Control', icon: <Users size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '800',
                backgroundColor: activeTab === tab.id ? 'var(--white)' : 'transparent',
                color: activeTab === tab.id ? 'var(--black)' : 'var(--text-gray)',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ backgroundColor: 'var(--white)', borderRadius: '28px', border: '1px solid var(--border)', overflowX: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
          {activeTab === 'bikes' && (
            <div style={{ minWidth: '900px' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px', backgroundColor: '#FAFAFA' }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Fleet Member</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Specifications</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Pricing</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Status</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', textAlign: 'right' }}>Action</span>
              </div>
              <div>
                {bikes.map((bike) => (
                  <div key={bike._id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px', padding: '24px 32px', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '14px', backgroundColor: 'var(--light-gray)', padding: '8px', border: '1px solid var(--border)' }}>
                        <img src={bike.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '900', fontSize: '16px', color: 'var(--black)' }}>{bike.name}</div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-gray)' }}>{bike.brand} • {bike.type}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700' }}><Fuel size={12} color="var(--text-gray)" /> {bike.fuel}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700' }}><Gauge size={12} color="var(--text-gray)" /> {bike.mileage}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: '900', fontSize: '15px' }}>₹{bike.pricePerHour}/hr</div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-gray)' }}>₹{bike.pricePerDay}/day</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', backgroundColor: '#dcfce7', color: '#10b981', padding: '6px 12px', borderRadius: '100px' }}>Online</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button onClick={() => openEditModal(bike)} style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', transition: 'all 0.2s' }} className="nav-hover-link"><Edit2 size={16} /></button>
                      <button onClick={() => deleteBike(bike._id)} style={{ padding: '10px', borderRadius: '10px', border: 'none', background: '#ffebeb', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div style={{ minWidth: '900px' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 80px', backgroundColor: '#FAFAFA' }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Renter Details</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Fleet Choice</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Booking Info</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Billing</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Status</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', textAlign: 'right' }}>Action</span>
              </div>
              {bookings.filter(b => b.status !== 'Completed').map((booking) => (
                <div key={booking._id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 80px', padding: '24px 32px', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: '800' }}>{booking.user?.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: '600' }}>{booking.user?.email}</div>
                  </div>
                  <div style={{ fontWeight: '800' }}>{booking.bike?.name}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700' }}><Calendar size={14} color="var(--text-gray)" /> {new Date(booking.pickupDate).toLocaleDateString()}</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '900' }}>₹{booking.totalPrice}</div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '100px', backgroundColor: booking.status === 'Confirmed' ? '#dcfce7' : '#f3f4f6', color: booking.status === 'Confirmed' ? '#10b981' : '#6b7280' }}>{booking.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    {booking.status === 'Confirmed' && (
                      <>
                        <button onClick={() => endRide(booking._id)} style={{ padding: '8px', backgroundColor: 'var(--black)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '11px' }}>End</button>
                        <button onClick={() => cancelBooking(booking._id)} style={{ padding: '8px', color: '#ff4d4d', background: '#ffebeb', borderRadius: '8px', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div style={{ minWidth: '700px' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', backgroundColor: '#FAFAFA' }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Full Name</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Account ID</span>
                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Access Role</span>
              </div>
              {users.map((u) => (
                <div key={u._id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', padding: '24px 32px', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: u.isAdmin ? 'var(--black)' : '#E9ECEF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '10px' }}>{u.name.charAt(0)}</div>
                    <span style={{ fontWeight: '800' }}>{u.name}</span>
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--text-gray)' }}>{u.email}</span>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '100px', backgroundColor: u.isAdmin ? '#F1F3F5' : '#F1F3F5', color: u.isAdmin ? 'var(--black)' : 'var(--text-gray)' }}>{u.isAdmin ? 'Super Admin' : 'Standard User'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD/EDIT FLEET */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '750px', borderRadius: '32px', padding: '48px', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '32px', right: '32px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-gray)' }}><X size={28} /></button>
            <h2 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px' }}>{editingBike ? 'Optimize Fleet Member' : 'Integrate New Fleet Member'}</h2>
            <p style={{ color: 'var(--text-gray)', fontWeight: '600', marginBottom: '32px' }}>Define the specifications and pricing for your fleet.</p>

            <div style={{ maxHeight: 'calc(90vh - 200px)', overflowY: 'auto', paddingRight: '12px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Model Designation</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Honda Activa Premium Edition" style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }} className="input-focus" />
                </div>
                
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Fleet Overview (Description)</label>
                  <textarea required name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the vehicle's unique character and performance..." style={{ width: '100%', minHeight: '100px', padding: '16px 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '600', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Vehicle Class</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }}>
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Brand Ecosystem</label>
                  <select name="brand" value={formData.brand} onChange={handleInputChange} style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }}>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Fuel Type</label>
                  <select name="fuel" value={formData.fuel} onChange={handleInputChange} style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }}>
                    {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Performance Index</label>
                  <input required name="mileage" value={formData.mileage} onChange={handleInputChange} placeholder="e.g. 50 km/l" style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Utility Hourly Rate (₹)</label>
                  <input required type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleInputChange} style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Utility Daily Rate (₹)</label>
                  <input required type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleInputChange} style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Digital Asset (Image URL)</label>
                  <input required name="image" value={formData.image} onChange={handleInputChange} placeholder="CDN URL for high-res asset" style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '16px', border: '1.5px solid var(--border)', fontSize: '16px', fontWeight: '700', outline: 'none' }} />
                </div>

                {/* DYNAMIC SPECS SECTION */}
                <div style={{ gridColumn: 'span 2', marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Technical Specifications</label>
                    <button type="button" onClick={addSpecRow} style={{ color: 'var(--black)', background: 'var(--light-gray)', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Plus size={14} /> Add Spec
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {formData.specs.map((spec, index) => (
                      <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <input
                          placeholder="Label (e.g. Engine)"
                          value={spec.label}
                          onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                          style={{ flex: 1, height: '48px', padding: '0 16px', borderRadius: '12px', border: '1.5px solid var(--border)', fontSize: '14px', fontWeight: '700', outline: 'none' }}
                        />
                        <input
                          placeholder="Value (e.g. 110cc)"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                          style={{ flex: 1, height: '48px', padding: '0 16px', borderRadius: '12px', border: '1.5px solid var(--border)', fontSize: '14px', fontWeight: '700', outline: 'none' }}
                        />
                        {formData.specs.length > 1 && (
                          <button type="button" onClick={() => removeSpecRow(index)} style={{ padding: '10px', color: '#ff4d4d', background: '#ffebeb', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '16px', marginTop: '32px', position: 'sticky', bottom: 0, backgroundColor: 'white', padding: '20px 0', borderTop: '1px solid var(--border)' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, height: '60px', borderRadius: '16px', border: '1.5px solid var(--border)', background: 'transparent', fontWeight: '800', cursor: 'pointer', fontSize: '15px' }}>Discard</button>
                  <button type="submit" className="btn btn-black" style={{ flex: 2, height: '60px', borderRadius: '16px', fontWeight: '800', fontSize: '15px' }}>Sync to Fleet</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
