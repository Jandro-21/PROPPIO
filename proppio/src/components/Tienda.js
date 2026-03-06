import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Tienda() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isStreetwear, setIsStreetwear] = useState(false);

  const productos = [
    { 
      id: 1, 
      nombre: 'Camiseta Proppio Bordada', 
      precio: '17.99€', 
      // Añadimos un array de imágenes para el carrusel
      imgs: [
        'PROPPIO./JapanDropFront.png',
        '../JapanDropBack.png'
      ],
      descripcion: 'Algodón 100% orgánico con bordado de alta densidad.'
    },
  ];

  const nextImg = () => setCurrentImgIndex((prev) => (prev === 0 ? 1 : 0));

  return (
    <div className="shop-wrapper">
      <nav className="navbar">
        <Link to="/" className="logo-link"><div className="logo-studio">PROPPIO.</div></Link>
      </nav>

      <header className="hero">
        <h1>{isStreetwear ? 'DROP 001: CYBER' : 'COLECCIÓN ESSENTIAL'}</h1>
      </header>

      <main className="grid-productos">
        {productos.map((prod) => (
          <div key={prod.id} className="card-producto" onClick={() => { setSelectedProduct(prod); setCurrentImgIndex(0); }}>
            <div className="card-image-wrapper">
              <img src={prod.imgs[0]} alt={prod.nombre} />
            </div>
            <div className="card-info">
              <h3>{prod.nombre}</h3>
              <span className="precio">{prod.precio}</span>
            </div>
          </div>
        ))}
      </main>

      {/* VISTA DE DETALLE (Pestaña/Modal) */}
      {selectedProduct && (
        <div className="product-detail-overlay">
          <div className="product-detail-content">
            <button className="close-detail" onClick={() => setSelectedProduct(null)}>✕</button>
            
            <div className="detail-layout">
              {/* Carrusel */}
              <div className="carousel-container" onClick={nextImg}>
                <img src={selectedProduct.imgs[currentImgIndex]} alt="Detalle" />
                <div className="carousel-dots">
                  <span className={currentImgIndex === 0 ? 'active' : ''}></span>
                  <span className={currentImgIndex === 1 ? 'active' : ''}></span>
                </div>
                <small className="tap-hint">Toca para cambiar de foto</small>
              </div>

              {/* Info y Botón estilo Landing */}
              <div className="detail-info">
                <h2>{selectedProduct.nombre}</h2>
                <p className="detail-price">{selectedProduct.precio}</p>
                <p className="detail-desc">{selectedProduct.descripcion}</p>
                
                {/* Botón con la clase btn-proppio (el de la Landing) */}
                <button className="btn-proppio" style={{ marginTop: '20px' }}>
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