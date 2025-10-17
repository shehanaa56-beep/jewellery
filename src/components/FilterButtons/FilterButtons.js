import React from 'react';
import './FilterButtons.css';

const FilterButtons = ({ activeFilter, setActiveFilter }) => {

  const filters = [
    { name: 'Home' },
    { name: 'Watches', icon: '🕰' },
    { name: 'jewellery', icon: '⚜' },
    { name: 'Accessories', icon: '👜' },
  ];

  return (
    <div className="filter-buttons">
      <div className="filter-buttons-container">
        <div className="filter-options">
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`filter-button ${activeFilter === filter.name ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.name)}
            >
              {filter.icon} {filter.name}
            </button>
          ))}
        </div>

        <div className="upload-date-section">
          
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;
