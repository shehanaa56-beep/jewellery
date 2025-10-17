import React from 'react';
import './HomePage.css';
import FilterButtons from '../FilterButtons/FilterButtons';
import ImageSlider from './ImageSlider';

const HomePage = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="home-page">
      <div className="home-page-container">
        {/* Title and Description */}
        <div className="content-header">
          <h1 className="main-title">Welcome to Our Jewelry Store</h1>
        </div>

        {/* Filter Buttons */}
        <FilterButtons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <p className="main-description">
            Welcome to Timeless Elegance, where luxury meets everyday style. Discover a curated collection of premium watches, exquisite jewellery, and designer bags crafted to complement your individuality. Each piece is designed with precision, passion, and a touch of sophistication — because you deserve to shine in every moment.
          </p>
        {/* Welcome Text */}
       

        {/* Image Slider */}
        <ImageSlider />
         <p className="welcome-text">
          Explore our exclusive watches that redefine timekeeping with elegance, jewellery collections that capture beauty in every sparkle, and bags that blend functionality with fashion. Whether you're dressing for a casual day or a grand occasion, our pieces elevate every look with effortless grace.<br /><br />
          At Timeless Elegance, we believe style is personal and timeless. Choose pieces that reflect your story — and make every second, shimmer, and step unforgettable.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
