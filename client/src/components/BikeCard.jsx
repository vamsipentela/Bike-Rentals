import { Link } from 'react-router-dom';
import { Fuel, Gauge } from 'lucide-react';

const BikeCard = ({ bike, isOccupied = false }) => {
  // Ensure the standardized ₹600 daily rate as requested
  const bikeId = bike._id || bike.id;
  const perDay = bike.pricePerDay === 100 ? 600 : (bike.pricePerDay || 600);

  return (
    <div className={`vehicle-card ${isOccupied ? 'occupied' : ''}`} style={{ opacity: isOccupied ? 0.7 : 1 }}>
      <div className="vehicle-card-image">
        <img src={bike.image} alt={bike.name} style={{ filter: isOccupied ? 'grayscale(1)' : 'none' }} />
      </div>
      <div className="vehicle-card-content">
        <h3 className="vehicle-card-title">{bike.name}</h3>
        <div className="vehicle-card-specs">
          <span className="spec-pill"><Fuel size={12} /> {bike.fuel}</span>
          <span className="spec-pill"><Gauge size={12} /> {bike.mileage}</span>
        </div>
        <div className="vehicle-card-footer">
          <div className="vehicle-card-price">
            <div className="price-primary">₹{bike.pricePerHour || 100}<span>/ hr</span></div>
            <div className="price-secondary">₹{perDay} (9am-7:30pm)</div>
          </div>
          {isOccupied ? (
            <span className="btn-occupied">Occupied</span>
          ) : (
            <Link to={`/bikes/${bikeId}`} className="btn-explore">Explore ride</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
