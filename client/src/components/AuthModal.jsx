import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose, message = "Please login to proceed with your booking." }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }} onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            backgroundColor: 'var(--white)',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '24px',
            padding: '40px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            textAlign: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-gray)',
              padding: '8px'
            }}
          >
            <X size={20} />
          </button>

          {/* Icon Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--light-gray)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--black)'
            }}>
              <ShieldCheck size={32} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', margin: 0 }}>Authentication Required</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', fontWeight: '500', lineHeight: 1.5, margin: 0 }}>
                {message}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => { navigate('/login'); onClose(); }}
              className="btn btn-black card-hover"
              style={{
                height: '56px',
                width: '100%',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '12px'
              }}
            >
              <LogIn size={18} /> Sign In to Account
            </button>
            <button 
              onClick={() => { navigate('/signup'); onClose(); }}
              className="btn card-hover"
              style={{
                height: '56px',
                width: '100%',
                fontSize: '15px',
                fontWeight: '700',
                border: '2px solid var(--black)',
                backgroundColor: 'transparent',
                color: 'var(--black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '12px'
              }}
            >
              <UserPlus size={18} /> Create New Account
            </button>
          </div>

          {/* Footer Text */}
          <p style={{ fontSize: '12px', color: 'var(--text-gray)', margin: 0, fontWeight: '500' }}>
            Browsing is always free. Login only needed for bookings.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
