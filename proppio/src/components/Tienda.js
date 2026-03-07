import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Recibimos la categoría activa desde el componente padre (App.js)
export default function Tienda({ categoriaActiva }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  const publicPath = process.env.PUBLIC_URL;

  // Array de productos con la categoría "CAMISETAS" asignada
  const productos = [
    { 
      id: 1, 
      nombre: 'Camiseta Proppio Bordada', 
      precio: '17.99€', 
      categoria: 'CAMISETAS', // Debe coincidir con el nombre en el Sidebar
      imgs: [
        `${publicPath}/JapanDropFront.png`, 
        `${publicPath}/JapanDropBack.png` 
      ],
      descripcion: 'Algodón 100% orgánico con bordado de alta densidad.'
    }
  ];

  // Lógica de filtrado: si es 'TODOS' muestra todo, si no, filtra por categoría
  const productosFiltrados = categoriaActiva === 'TODOS' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  const nextImg = (e) => {
    e.stopPropagation(); 
    setCurrentImgIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="shop-wrapper">
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <div className="logo-studio">PROPPIO.</div>
        </Link>
      </nav>

      <header className="hero">
        {/* El título cambia según lo que elijas en el Sidebar */}
        <h1>{categoriaActiva === 'TODOS' ? 'SHOP' : categoriaActiva}</h1>
      </header>

      <main className="grid-productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
            <div key={prod.id} className="card-producto" onClick={() => { setSelectedProduct(prod); setCurrentImgIndex(0); }}>
              <div className="card-image-wrapper">
                <img src={prod.imgs[0]} alt={prod.nombre} />
              </div>
              <div className="card-info">
                <h3>{prod.nombre}</h3>
                <span className="precio">{prod.precio}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No hay productos en esta categoría.</p>
        )}
      </main>

      {/* MODAL DE DETALLE */}
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