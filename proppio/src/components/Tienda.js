import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Tienda({ categoriaActiva }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // URL corregida de tu Worker
  const CLOUDFLARE_WORKER_URL = 'https://proppio-api.alejandrodurillovargas21.workers.dev';

  useEffect(() => {
    setLoading(true);
    
    fetch(CLOUDFLARE_WORKER_URL)
      .then((res) => {
        // Si el servidor da error (401, 404, 500), lo capturamos aquí
        if (!res.ok) {
          return res.json().then(err => { throw new Error(JSON.stringify(err)) });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos que llegan:", data);

        // SOLO si data.result existe y es una lista, hacemos el map
        if (data && data.result && Array.isArray(data.result)) {
          const productosPrintful = data.result.map((p) => ({
            id: p.id,
            nombre: p.name,
            precio: '19.99€',
            categoria: 'CAMISETAS',
            imgs: [p.thumbnail_url],
            descripcion: 'Producto original de la colección PROPPIO.'
          }));
          setProductos(productosPrintful);
        } else {
          console.warn("La respuesta no tiene el formato esperado:", data);
          setProductos([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error capturado:", err.message);
        setLoading(false);
      });
  }, []);
  
  // Lógica de filtrado
  const productosFiltrados = categoriaActiva === 'TODOS' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  const nextImg = (e) => {
    e.stopPropagation(); 
    setCurrentImgIndex((prev) => (prev === 0 ? 1 : 0));
  };

  if (loading) {
    return (
      <div className="shop-wrapper">
        <header className="hero"><h1>CARGANDO DROP...</h1></header>
      </div>
    );
  }

  return (
    <div className="shop-wrapper">
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <div className="logo-studio">PROPPIO.</div>
        </Link>
      </nav>

      <header className="hero">
        <h1>{categoriaActiva === 'TODOS' ? 'SHOP' : categoriaActiva}</h1>
      </header>

      <main className="grid-productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
            <div 
              key={prod.id} 
              className="card-producto" 
              onClick={() => { setSelectedProduct(prod); setCurrentImgIndex(0); }}
            >
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
          <div className="no-products">
            <p>No se han podido cargar los productos.</p>
            <p style={{fontSize: '0.8rem', marginTop: '10px', color: '#666'}}>
              Revisa la consola (F12) para ver el error de la API.
            </p>
          </div>
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
                {selectedProduct.imgs.length > 1 && (
                  <div className="carousel-dots">
                    <span className={currentImgIndex === 0 ? 'active' : ''}></span>
                    <span className={currentImgIndex === 1 ? 'active' : ''}></span>
                  </div>
                )}
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
