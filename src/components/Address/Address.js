import React, { useState } from "react";
import "./Address.css";

const Address = ({ onProceed }) => {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save address to localStorage or state
    localStorage.setItem("shippingAddress", JSON.stringify(address));
    onProceed();
  };

  return (
    <div className="address-page">
      <h1>Shipping Address</h1>
      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={address.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip">ZIP Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={address.zip}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="proceed-btn">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Address;
