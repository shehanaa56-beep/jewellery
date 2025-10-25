import React, { useState, useEffect } from "react";
import "./OrderHistory.css";

const OrderHistory = ({ loggedInUser }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const userOrders = allOrders.filter(order => order.userId === loggedInUser.id);
      setOrders(userOrders);
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <div>Please log in to view your order history.</div>;
  }

  return (
    <div className="order-history-page">
      <h1>Your Order History</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className="order-status">{order.status}</span>
              </div>
              <div className="order-details">
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-address">
                  <h4>Shipping Address:</h4>
                  <p>{order.address.name}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
