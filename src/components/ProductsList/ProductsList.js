// src/components/ProductsList/ProductsList.js
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref as dbRef, onValue } from "firebase/database";
import "./ProductsList.css";

export default function ProductsList({ onAddToCart, activeFilter, favorites = [], onToggleFavorite, searchTerm }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = dbRef(database, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setProducts(list);
      } else {
        setProducts([]);
      }
    });
  }, []);

  // Start with all products
  let filteredProducts = products;

  // Apply search filter globally if search term exists
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredProducts = products.filter((product) => {
      // Search by first letter of category
      if (searchLower === 'w' && product.category.toLowerCase() === 'watches') return true;
      if (searchLower === 'j' && product.category.toLowerCase() === 'jewellery') return true;
      if ((searchLower === 'b' || searchLower === 'a') && product.category.toLowerCase() === 'accessories') return true;

      // Also search in name and description
      return product.name.toLowerCase().includes(searchLower) ||
             product.description.toLowerCase().includes(searchLower);
    });
  } else {
    // No search term, apply category filter
    filteredProducts = products.filter((product) => {
      if (activeFilter === 'All Watches') return true;
      return product.category === activeFilter;
    });
  }

  // If favorites view, show only favorites
  if (activeFilter === 'favorites') {
    filteredProducts = favorites;
  }

  const getHeading = () => {
    switch (activeFilter) {
      case 'Watches':
        return 'Watches';
      case 'jewellery':
        return 'Jewellery';
      case 'Accessories':
        return 'Accessories';
      default:
        return 'Products';
    }
  };

  return (
    <section className="products-list">
      <h2>{getHeading()}</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="favorite-icon" onClick={() => onToggleFavorite && onToggleFavorite(product)}>
                {favorites.some((fav) => fav.id === product.id) ? '❤️' : '🤍'}
              </div>
              <img
                src={product.image || "/images/placeholder.png"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price">₹{product.price}</div>
              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
