import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    try {
      const userRes = await login(email, password);
      setIsSuccess(true);
      setTimeout(() => {
        if (userRes && userRes.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
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
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '8px', color: 'var(--black)' }}>Welcome back.</h1>
          <p style={{ fontSize: '15px', color: 'var(--text-gray)', fontWeight: '500', lineHeight: 1.6, margin: 0 }}>Log in to track your rides and manage your verification status.</p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>
            {error}
          </div>
        )}

        {isSuccess && (
          <div style={{ padding: '12px 16px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>
            Verification Successful. Loading your workspace...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ height: '48px', padding: '0 16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--light-gray)', fontSize: '15px', outline: 'none', width: '100%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ height: '48px', padding: '0 16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--light-gray)', fontSize: '15px', outline: 'none', width: '100%' }} />
          </div>

          <button type="submit" className="btn btn-black card-hover" style={{ height: '56px', width: '100%', fontSize: '16px', marginTop: '12px' }}>Log In</button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-gray)' }}>Don't have an account? </span>
          <Link to="/signup" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--black)', textDecoration: 'none' }}>Sign up now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
