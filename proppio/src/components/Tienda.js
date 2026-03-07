import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Tienda() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  // 1. Estado para la categoría seleccionada (por defecto 'TODOS')
  const [categoriaActiva, setCategoriaActiva] = useState('TODOS');

  const publicPath = process.env.PUBLIC_URL;

  // 2. Array de categorías (aquí puedes añadir más en el futuro)
  const categorias = ['TODOS', 'CAMISETAS', 'HOODIES', 'ACCESORIOS'];

  const productos = [
    { 
      id: 1, 
      nombre: 'Camiseta Proppio Bordada', 
      precio: '17.99€', 
      categoria: 'CAMISETAS', // Asignamos categoría
      imgs: [
        `${publicPath}/unisex-classic-tee-white-front-and-back-69a5f36b451fd.png`, 
        `${publicPath}/unisex-classic-tee-white-front-and-back-69a5f36b451fd.png` 
      ],
      descripcion: 'Algodón 100% orgánico con bordado de alta densidad.'
    },
    // Aquí irían más productos...
  ];

  // 3. Lógica de filtrado
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
        <Link to="/" className="logo-link"><div className="logo-studio">PROPPIO.</div></Link>
      </nav>

      <header className="hero">
        <h1>SHOP</h1>
        
        {/* 4. Selector de Categorías */}
        <div className="categorias-container">
          {categorias.map(cat => (
            <button 
              key={cat}
              className={`btn-categoria ${categoriaActiva === cat ? 'active' : ''}`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="grid-productos">
        {productosFiltrados.map((prod) => (
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

      {/* MODAL DE DETALLE (Se mantiene igual) */}
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