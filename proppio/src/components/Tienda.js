// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importante para la navegación

export default function Tienda() {
  const [isStreetwear, setIsStreetwear] = useState(false);

  const toggleTheme = () => {
    const newMode = !isStreetwear;
    setIsStreetwear(newMode);
    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'streetwear');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const productos = [
    { id: 1, nombre: 'Camiseta Proppio Bordada', precio: '17.99€', img: 'public/unisex-classic-tee-white-front-and-back-69a5f36b451fd.png' },
    
  ];

  return (
    <div className="shop-wrapper">
      <nav className="navbar">
        {/* LOGO CON LINK A LA LANDING */}
        <Link to="/" className="logo-link">
          <div className="logo-studio">PROPPIO.</div>
        </Link>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="btn-customize">
            {isStreetwear ? 'MODO MINIMAL' : 'MODO STREETWEAR'}
          </button>
        </div>
      </nav>

      <header className="hero">
        <h1>{isStreetwear ? 'DROP 001: CYBER' : 'COLECCIÓN ESSENTIAL'}</h1>
        <p>Prendas diseñadas para el día a día, fabricadas para durar.</p>
      </header>

      <main className="grid-productos">
        {productos.map((prod) => (
          <div key={prod.id} className="card-producto">
            <div className="card-image-wrapper">
              <span className="product-tag">{prod.tag}</span>
              <img src={prod.img} alt={prod.nombre} />
            </div>
            <div className="card-info">
              <h3>{prod.nombre}</h3>
              <span className="precio">{prod.precio}</span>
              <button className="btn-tool-main">COMPRAR</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}