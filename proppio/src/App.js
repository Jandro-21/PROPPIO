import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.js'; 
import Landing from './components/Landing.js'; 
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
        {/* Sidebar global */}
        <Sidebar /> 

        <main className="main-content">
          <Routes>
            {/* Solo las rutas de archivos que existen actualmente */}
            <Route path="/" element={<Landing />} />
            <Route 
              path="/shop" 
              element={<Tienda cartCount={cart.length} addToCart={addToCart} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;