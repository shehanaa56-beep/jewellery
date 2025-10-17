import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const images = [
    'https://www.fastrack.in/on/demandware.static/-/Sites-titan-master-catalog/default/dwa3e8805a/images/Fastrack/Catalog/FV60024QM01W_1.jpg',
    'https://blogapi.perrian.com/wp-content/uploads/2022/03/5-Must-Have-Diamond-Jewellery-Pieces-You-Cant-Ignore.jpg',
    'https://images-cdn.ubuy.co.in/634f01612eaba779fe7c14c4-amazingeverything-y2k-bag-y2k-purse.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="image-slider">
      <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
