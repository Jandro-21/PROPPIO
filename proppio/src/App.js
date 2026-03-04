import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing.js'; // Importamos la Landing
import Tienda from './components/Tienda.js';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* 1. La ruta raíz ahora muestra la Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* 2. La Tienda ahora está en /shop (o /catalogo) */}
          <Route 
            path="/shop" 
            element={<Tienda cartCount={cart.length} addToCart={addToCart} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;