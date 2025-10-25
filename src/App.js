import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/Admin/AdminLogin";
import HomePage from "./components/HomePage/HomePage";
import MainContent from "./components/MainContent/MainContent";
import ProductsList from "./components/ProductsList/ProductsList";
import Login from "./components/Login/Login";
import Address from "./components/Address/Address";
import Payment from "./components/Payment/Payment";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [activeTab, setActiveTab] = useState("home");
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Login modal state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Home');

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleFavorite = (product) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((item) => item.id === product.id);
      if (isFavorite) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleCartClick = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const handleUserLogin = (userData) => {
    console.log("Logged in user:", userData);
    if (userData.isAdmin) {
      setIsAdminLoggedIn(true);
      closeLogin();
      setCurrentView("admin");
      setActiveTab("settings");
    } else {
      // Regular user login does not grant admin access
      setLoggedInUser(userData);
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      closeLogin();
      // Stay on home view after user login
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "home") {
      setCurrentView("home");
    } else if (tabId === "cart") {
      setIsCartOpen(true);
    } else if (tabId === "orders") {
      setCurrentView("orderHistory");
    } else if (tabId === "favorites") {
      setCurrentView("favorites");
    } else if (tabId === "settings") {
      setCurrentView("admin");
    }
  };

  const handleCheckout = () => {
    if (!loggedInUser) {
      openLogin();
      return;
    }
    setIsCartOpen(false);
    setCurrentView("address");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "admin":
        return isAdminLoggedIn ? (
          <Admin />
        ) : (
          <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
        );
      case "favorites":
        return (
          <div className="favorites-page">
            <h1>Your Favorites</h1>
            <ProductsList
              onAddToCart={handleAddToCart}
              activeFilter="favorites"
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              searchTerm={searchTerm}
            />
          </div>
        );
      case "address":
        return <Address onProceed={() => setCurrentView("payment")} />;
      case "payment":
        return <Payment onSuccess={() => setCurrentView("orderHistory")} cartItems={cartItems} loggedInUser={loggedInUser} setCartItems={setCartItems} />;
      case "orderHistory":
        return <OrderHistory loggedInUser={loggedInUser} />;
      case "home":
      default:
        return (
          <>
            {activeFilter === 'Home' ? (
              <HomePage activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            ) : (
              <MainContent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            )}
            {activeFilter !== 'Home' && (
              <ProductsList
                onAddToCart={handleAddToCart}
                activeFilter={activeFilter}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                searchTerm={searchTerm}
              />
            )}
          </>
        );
    }
  };

  return (
    <>
      <Header
        onCartClick={handleCartClick}
        onLoginClick={openLogin} // Login button opens modal
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="main-content-wrapper">
        {renderCurrentView()}
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        setCartItems={setCartItems}
        onCheckout={handleCheckout}
      />

      <Login
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onLogin={handleUserLogin}
      />

      <Footer activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}

export default App;
