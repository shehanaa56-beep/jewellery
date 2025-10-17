import React from 'react';
import './MainContent.css';
import FilterButtons from '../FilterButtons/FilterButtons';

const MainContent = ({ activeFilter, setActiveFilter }) => {
  const getTitle = () => {
    switch (activeFilter) {
      case 'Home':
        return 'Welcome to Our Jewelry Store';
      case 'Watches':
        return 'Elegant Timepieces';
      case 'jewellery':
        return 'Exquisite Jewelry Collection';
      case 'Accessories':
        return 'Stylish Accessories';
      default:
        return 'Our Premium Collection';
    }
  };

  const getDescription = () => {
    switch (activeFilter) {
      case 'Home':
        return 'Welcome to Timeless Elegance, where luxury meets everyday style. Discover a curated collection of premium watches, exquisite jewellery, and designer bags crafted to complement your individuality. Each piece is designed with precision, passion, and a touch of sophistication — because you deserve to shine in every moment.\n\nExplore our exclusive watches that redefine timekeeping with elegance, jewellery collections that capture beauty in every sparkle, and bags that blend functionality with fashion. Whether you\'re dressing for a casual day or a grand occasion, our pieces elevate every look with effortless grace.\n\nAt Timeless Elegance, we believe style is personal and timeless. Choose pieces that reflect your story — and make every second, shimmer, and step unforgettable.';
      case 'Watches':
        return 'Discover our curated selection of luxury watches, from classic designs to modern masterpieces.';
      case 'jewellery':
        return 'Explore our stunning jewelry pieces, crafted with precision and elegance for every occasion.';
      case 'Accessories':
        return 'Complete your look with our premium accessories, designed to complement your style.';
      default:
        return 'Browse through our exclusive collection of premium watches, jewelry, and accessories.';
    }
  };

  return (
    <div className="main-content">
      <div className="main-content-container">
        {/* Title and Description */}
        <div className="content-header">
          <h1 className="main-title">{getTitle()}</h1>
          <p className="main-description">{getDescription()}</p>
        </div>

        {/* Filter Buttons */}
        <FilterButtons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Welcome Text for Home Page */}
        {activeFilter === 'Home' && (
          <p style={{ marginTop: '20px', lineHeight: '1.6', color: '#666', fontSize: '16px' }}>
            Welcome to Timeless Elegance, where luxury meets everyday style. Discover a curated collection of premium watches, exquisite jewellery, and designer bags crafted to complement your individuality. Each piece is designed with precision, passion, and a touch of sophistication — because you deserve to shine in every moment.<br /><br />
            Explore our exclusive watches that redefine timekeeping with elegance, jewellery collections that capture beauty in every sparkle, and bags that blend functionality with fashion. Whether you're dressing for a casual day or a grand occasion, our pieces elevate every look with effortless grace.<br /><br />
            At Timeless Elegance, we believe style is personal and timeless. Choose pieces that reflect your story — and make every second, shimmer, and step unforgettable.
          </p>
        )}
      </div>
    </div>
  );
};

export default MainContent;