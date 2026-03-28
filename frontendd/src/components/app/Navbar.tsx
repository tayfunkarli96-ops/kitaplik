import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ 
      background: 'rgba(5, 5, 10, 0.95)', 
      borderBottom: '2px solid #00f3ff', 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 1000, 
      boxShadow: '0 0 15px rgba(0, 243, 255, 0.3)',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        
        {/* LOGO */}
        <Link to="/" style={{ color: '#ff00ff', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', textShadow: '0 0 10px #ff00ff' }}>
          CORNFLIX
        </Link>

        {/* DESKTOP MENU */}
        <div style={{ display: 'none', gap: '30px' }} className="desktop-nav">
          <Link to="/" className="nav-link">Ana Sayfa</Link>
          <Link to="/movies" className="nav-link">Filmler Arşivi</Link>
          <Link to="/contacts" className="nav-link">İletişim</Link>
          {/* Diğer linklerin varsa buraya ekle */}
        </div>

        {/* MOBILE TOGGLE (HAMBURGER) */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: '#00f3ff', fontSize: '28px', cursor: 'pointer' }} className="mobile-toggle">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{ background: '#05050a', borderBottom: '2px solid #ff00ff', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Ana Sayfa</Link>
          <Link to="/movies" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Filmler Arşivi</Link>
          <Link to="/contacts" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>İletişim</Link>
        </div>
      )}

      <style>{`
        .nav-link { color: #fff; text-decoration: none; font-weight: bold; transition: 0.3s; }
        .nav-link:hover { color: #00f3ff; text-shadow: 0 0 10px #00f3ff; }
        
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
