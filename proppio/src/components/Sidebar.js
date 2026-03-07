import React, { useState } from 'react'; // Importamos useState
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ categoriaActiva, setCategoriaActiva, isOpen, toggleSidebar }) {
  const location = useLocation();
  const isShop = location.pathname === '/shop';
  const categorias = ['TODOS', 'CAMISETAS', 'HOODIES', 'ACCESORIOS'];

  // Estado para el desplegable de categorías
  const [showCats, setShowCats] = useState(true);

  return (
    <>
      {!isOpen && (
        <button className="mobile-menu-btn" onClick={toggleSidebar}>☰</button>
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo-link" onClick={toggleSidebar}>
            <div className="logo-studio">PROPPIO.</div>
          </Link>
          <button className="close-sidebar" onClick={toggleSidebar}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={toggleSidebar}>INICIO</Link>
          <Link to="/shop" className="sidebar-link" onClick={toggleSidebar}>TIENDA</Link>
          
          {isShop && (
            <div className="sidebar-categories">
              {/* Título clickeable para desplegar */}
              <p 
                className="sidebar-label collapsible" 
                onClick={() => setShowCats(!showCats)}
              >
                CATEGORÍAS {showCats ? '−' : '+'}
              </p>
              
              {/* Lista que se oculta/muestra */}
              {showCats && (
                <div className="categories-list">
                  {categorias.map(cat => (
                    <button 
                      key={cat}
                      className={`sidebar-sublink ${categoriaActiva === cat ? 'active' : ''}`}
                      onClick={() => {
                        setCategoriaActiva(cat);
                        if(window.innerWidth < 768) toggleSidebar();
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </aside>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
}