import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdShoppingCart, MdPerson } from 'react-icons/md';
import './Header.css';

const Header = ({ onCartClick, onLoginClick, cartCount, searchTerm, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Search Bar */}
        <div className="search-bar">
          <AiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for flavors or cones..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Right Side Icons */}
        <div className="header-icons">
          <button className="icon-btn cart-btn" onClick={onCartClick}>
            <MdShoppingCart className="icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button className="icon-btn profile-btn" onClick={onLoginClick}>
            <MdPerson className="icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
