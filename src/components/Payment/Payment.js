import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Payment.css";

const Payment = ({ onSuccess, cartItems, loggedInUser, setCartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Generate UPI payment string
  const upiString = `upi://pay?pa=shanudairymilk-1@okhdfcbank&pn=Jewelry Store&am=${total}&cu=INR&tn=Payment for Order`;

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Simulate payment success
    const order = {
      id: Date.now(),
      userId: loggedInUser.id,
      items: cartItems,
      total: total.toFixed(2),
      paymentMethod,
      address: JSON.parse(localStorage.getItem("shippingAddress")),
      date: new Date().toISOString(),
      status: "Confirmed",
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart
    setCartItems([]);

    alert("Payment successful! Order placed.");
    onSuccess();
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="summary-item">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-total">
          <strong>Total: ₹{total.toFixed(2)}</strong>
        </div>
      </div>
      <div className="payment-options">
        <h2>Select Payment Method</h2>
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="upi"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="upi">UPI (Google Pay)</label>
          {paymentMethod === "UPI" && (
            <div className="upi-details">
              <p>Receiver UPI ID: <strong>shanudairymilk-1@okhdfcbank</strong></p>
              <div className="qr-code-container">
                <QRCodeCanvas value={upiString} size={200} />
                <p>Scan this QR code with your UPI app to pay</p>
              </div>

            </div>
          )}
        </div>
      </div>
      <button onClick={handlePayment} className="pay-btn">
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
