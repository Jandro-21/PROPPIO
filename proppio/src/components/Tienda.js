import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Tienda() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Esta variable detecta automáticamente si estás en local o en GitHub Pages
  const publicPath = process.env.PUBLIC_URL;

  const productos = [
    { 
      id: 1, 
      nombre: 'Camiseta Proppio Bordada', 
      precio: '17.99€', 
      // Usamos `${publicPath}` antes de cada nombre de archivo
      imgs: [

        `${publicPath}/public/JapanDropFront.png`, 
        `${publicPath}/public/JapanDropBack.png` 

      ],
      descripcion: 'Algodón 100% orgánico con bordado de alta densidad.'
    },
  ];

  const nextImg = (e) => {
    e.stopPropagation(); 
    setCurrentImgIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="shop-wrapper">
      <nav className="navbar">
        <Link to="/" className="logo-link"><div className="logo-studio">PROPPIO.</div></Link>
      </nav>

      <main className="grid-productos">
        {productos.map((prod) => (
          <div key={prod.id} className="card-producto" onClick={() => { setSelectedProduct(prod); setCurrentImgIndex(0); }}>
            <div className="card-image-wrapper">
              {/* Aquí la imagen cargará con la ruta corregida */}
              <img src={prod.imgs[0]} alt={prod.nombre} />
            </div>
            <div className="card-info">
              <h3>{prod.nombre}</h3>
              <span className="precio">{prod.precio}</span>
            </div>
          </div>
        ))}
      </main>

      {selectedProduct && (
        <div className="product-detail-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-detail-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-detail" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="detail-layout">
              <div className="carousel-container" onClick={nextImg}>
                <img src={selectedProduct.imgs[currentImgIndex]} alt="Detalle" />
                <div className="carousel-dots">
                  <span className={currentImgIndex === 0 ? 'active' : ''}></span>
                  <span className={currentImgIndex === 1 ? 'active' : ''}></span>
                </div>
              </div>
              <div className="detail-info">
                <h2>{selectedProduct.nombre}</h2>
                <p className="detail-price">{selectedProduct.precio}</p>
                <p className="detail-desc">{selectedProduct.descripcion}</p>
                <button className="btn-proppio" style={{ marginTop: '20px', width: '100%' }}>
                  COMPRAR AHORA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}