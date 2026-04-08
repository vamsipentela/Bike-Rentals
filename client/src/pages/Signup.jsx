import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    try {
      await signup(formData.name, formData.email, formData.password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div style={{ backgroundColor: 'var(--white)', width: '100%', maxWidth: '440px', padding: '48px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 12px 32px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Header */}
        <div>
          <Link to="/" className="nav-hover-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: 'var(--text-gray)', marginBottom: '32px' }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '8px', color: 'var(--black)' }}>Create account.</h1>
          <p style={{ fontSize: '15px', color: 'var(--text-gray)', fontWeight: '500', lineHeight: 1.6, margin: 0 }}>Join RideOn and book your first verified ride today.</p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>
            {error}
          </div>
        )}

        {isSuccess && (
          <div style={{ padding: '12px 16px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Account Created! Fetching your dashboard...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
            <input type="text" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ height: '48px', padding: '0 16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--light-gray)', fontSize: '15px', outline: 'none', width: '100%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
            <input type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={{ height: '48px', padding: '0 16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--light-gray)', fontSize: '15px', outline: 'none', width: '100%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
            <input type="password" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={{ height: '48px', padding: '0 16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--light-gray)', fontSize: '15px', outline: 'none', width: '100%' }} />
          </div>

          <button type="submit" className="btn btn-black card-hover" style={{ height: '56px', width: '100%', fontSize: '16px', marginTop: '12px' }}>Create Account</button>
          <p style={{ fontSize: '12px', color: 'var(--text-gray)', textAlign: 'center', margin: 0, marginTop: '8px', fontWeight: '500' }}>By signing up, you agree to our Terms & Privacy Policy.</p>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-gray)' }}>Already have an account? </span>
          <Link to="/login" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--black)', textDecoration: 'none' }}>Log in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
