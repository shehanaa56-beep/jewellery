import React from 'react';
import './ImageGrid.css';

const ImageGrid = () => {
  // Mock data for watch images
  const watchImages = [
    { id: 1, src: 'images/wa1.avif', alt: 'Classic Watch', type: 'photo' },
    { id: 2, src: 'https://via.placeholder.com/300x200/2F4F4F/FFFFFF?text=Watch+2', alt: 'Modern Watch', type: 'photo' },
    { id: 3, src: 'https://via.placeholder.com/300x200/DAA520/000000?text=Watch+3', alt: 'Gold Watch', type: 'vector' },
    { id: 4, src: 'https://via.placeholder.com/300x200/1E90FF/FFFFFF?text=Watch+4', alt: 'Blue Watch', type: 'illustration' },
    { id: 5, src: 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Watch+5', alt: 'Green Watch', type: 'photo' },
    { id: 6, src: 'https://via.placeholder.com/300x200/FF6347/FFFFFF?text=Watch+6', alt: 'Red Watch', type: 'vector' },
    { id: 7, src: 'https://via.placeholder.com/300x200/4B0082/FFFFFF?text=Watch+7', alt: 'Purple Watch', type: 'photo' },
    { id: 8, src: 'https://via.placeholder.com/300x200/FF1493/FFFFFF?text=Watch+8', alt: 'Pink Watch', type: 'illustration' },
    { id: 9, src: 'https://via.placeholder.com/300x200/00CED1/000000?text=Watch+9', alt: 'Turquoise Watch', type: 'vector' },
    { id: 10, src: 'https://via.placeholder.com/300x200/DC143C/FFFFFF?text=Watch+10', alt: 'Crimson Watch', type: 'photo' },
    { id: 11, src: 'https://via.placeholder.com/300x200/32CD32/000000?text=Watch+11', alt: 'Lime Watch', type: 'illustration' },
    { id: 12, src: 'https://via.placeholder.com/300x200/8A2BE2/FFFFFF?text=Watch+12', alt: 'Violet Watch', type: 'vector' },
    { id: 13, src: 'https://via.placeholder.com/300x200/FF8C00/000000?text=Watch+13', alt: 'Orange Watch', type: 'photo' },
    { id: 14, src: 'https://via.placeholder.com/300x200/20B2AA/FFFFFF?text=Watch+14', alt: 'Light Blue Watch', type: 'vector' },
    { id: 15, src: 'https://via.placeholder.com/300x200/FF69B4/000000?text=Watch+15', alt: 'Hot Pink Watch', type: 'illustration' },
    { id: 16, src: 'https://via.placeholder.com/300x200/2E8B57/FFFFFF?text=Watch+16', alt: 'Sea Green Watch', type: 'photo' }
  ];

  return (
    <div className="image-grid">
      <div className="image-grid-container">
        <div className="grid">
          {watchImages.map((image) => (
            <div key={image.id} className="grid-item">
              <div className="image-wrapper">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="grid-image"
                />
                <div className="image-overlay">
                  <div className="overlay-actions">
                    <button className="action-btn favorite-btn">♡</button>
                    <button className="action-btn download-btn">⬇</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
