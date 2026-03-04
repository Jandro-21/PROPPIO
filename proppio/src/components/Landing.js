import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const changeTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'streetwear') {
      html.removeAttribute('data-theme');
      console.log("Modo Minimalista");
    } else {
      html.setAttribute('data-theme', 'streetwear');
      console.log("Modo Streetwear");
    }
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo-studio">Proppio.</div>
        <button onClick={changeTheme} className="btn-customize">
          PERSONALÍZAME
        </button>
      </nav>
      
      <main className="hero">
        <h1>La mejor forma de hacerlo<br/> es hacerlo tú.</h1>
        <p>Diseña sin fricciones, produce con propósito.</p>
        <Link to="/shop">
        <button className="btn-proppio">EMPEZAR A CREAR</button>
        </Link>
      </main>
    </div>
  );
}