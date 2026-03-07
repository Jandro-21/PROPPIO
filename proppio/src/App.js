import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.js'; 
import Landing from './components/Landing.js'; 
import Tienda from './components/Tienda.js';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('TODOS');
  // Estado para abrir/cerrar el menú en móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <Router basename="/PROPPIO">
      <div className="app-container">
        {/* Pasamos los estados y funciones al Sidebar */}
        <Sidebar 
          categoriaActiva={categoriaActiva} 
          setCategoriaActiva={setCategoriaActiva}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        /> 

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route 
              path="/shop" 
              element={
                <Tienda 
                  categoriaActiva={categoriaActiva} 
                  cartCount={cart.length} 
                  addToCart={addToCart} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;