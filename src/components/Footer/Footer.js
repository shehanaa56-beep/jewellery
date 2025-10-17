import React from 'react';
import { AiOutlineHome, AiOutlineHeart, AiOutlineSetting } from 'react-icons/ai';
import { MdShoppingCart, MdOutlineAssignment } from 'react-icons/md';
import './Footer.css';

const Footer = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: AiOutlineHome },
    { id: 'cart', label: 'Cart', icon: MdShoppingCart },
    { id: 'orders', label: 'Orders', icon: MdOutlineAssignment },
    { id: 'favorites', label: 'Favorites', icon: AiOutlineHeart },
    { id: 'settings', label: 'Settings', icon: AiOutlineSetting },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`footer-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <IconComponent className="footer-icon" />
              <span className="footer-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
