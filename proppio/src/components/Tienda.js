import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Tienda({ categoriaActiva }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const CLOUDFLARE_WORKER_URL = 'https://proppio-api.alejandrodurillovargas21.workers.dev';

  useEffect(() => {
    setLoading(true);
    fetch(CLOUDFLARE_WORKER_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos brutos de la API:", data);

        if (data && data.result && Array.isArray(data.result)) {
          const productosProcesados = data.result.map((item) => {
            // Caso 1: El Worker te da detalles completos (sync_product existe)
            if (item.sync_product) {
              return {
                id: item.sync_product.id,
                nombre: item.sync_product.name,
                precio: item.sync_variants[0].retail_price + '€',
                imgs: [item.sync_product.thumbnail_url],
                variantId: item.sync_variants[0].id,
                descripcion: 'Producto oficial PROPPIO.'
              };
            } 
            // Caso 2: El Worker te da la lista básica (p.id existe directamente)
            return {
              id: item.id,
              nombre: item.name,
              precio: '17.99€', // Precio de seguridad
              imgs: [item.thumbnail_url],
              variantId: item.id, // Usamos el ID normal si no hay variante
              descripcion: 'Producto oficial PROPPIO.'
            };
          });
          setProductos(productosProcesados);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando:", err);
        setLoading(false);
      });
  }, []);

  const handleBuy = (product) => {
    // Si tenemos el ID de variante, el enlace al checkout suele ser este:
    const checkoutUrl = `https://www.printful.com/checkout/create-from-product/${product.variantId}`;
    window.open(checkoutUrl, '_blank');
  };

  if (loading) return <div className="shop-wrapper"><header className="hero"><h1>CARGANDO...</h1></header></div>;

  return (
    <div className="shop-wrapper">
      <nav className="navbar">
        <Link to="/" className="logo-link"><div className="logo-studio">PROPPIO.</div></Link>
      </nav>

      <header className="hero">
        <h1>{categoriaActiva || 'SHOP'}</h1>
      </header>

      <main className="grid-productos">
        {productos.length > 0 ? (
          productos.map((prod) => (
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
          <p style={{textAlign: 'center', gridColumn: '1/-1'}}>No se encontraron productos. Revisa la consola (F12).</p>
        )}
      </main>

      {selectedProduct && (
        <div className="product-detail-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-detail-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-detail" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="detail-layout">
              <div className="carousel-container">
                <img src={selectedProduct.imgs[0]} alt="Detalle" />
              </div>
              <div className="detail-info">
                <h2>{selectedProduct.nombre}</h2>
                <p className="detail-price">{selectedProduct.precio}</p>
                <p className="detail-desc">{selectedProduct.descripcion}</p>
                <button className="btn-proppio" style={{ marginTop: '20px', width: '100%' }} onClick={() => handleBuy(selectedProduct)}>
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
