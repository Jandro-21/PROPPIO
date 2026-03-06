import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-studio">PROPPIO.</div>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/" onClick={toggleSidebar} className="sidebar-link">
            INICIO
          </Link>
          <Link to="/shop" onClick={toggleSidebar} className="sidebar-link">
             TIENDA
          </Link>
          <div className="sidebar-link wip">
            PERFIL (WIP)
          </div>
        </nav>
      </aside>
    </>
  );
}