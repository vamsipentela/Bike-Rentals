import React from 'react';
import { Bike } from 'lucide-react';

const Loader = ({ isLoading = true }) => {
  return (
    <div className={`loader-overlay ${!isLoading ? 'fade-out' : ''}`}>

      <div className="loader-content">
        <div className="loader-icon-box">
          <Bike size={40} />
        </div>
        <span className="loader-label">
          Loading Experience
        </span>
      </div>
    </div>
  );
};

export default Loader;

