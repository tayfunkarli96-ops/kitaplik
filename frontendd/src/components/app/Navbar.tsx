import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      backgroundColor: '#0a0a0a', 
      borderBottom: '1px solid #222', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 40px', 
      zIndex: 1000, 
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
    }}>
      
      {/* LOGO KISMI (Neon Pembe) */}
      <Link to="/" style={{ 
        fontSize: '28px', 
        fontWeight: '900', 
        color: '#ec4899', 
        textDecoration: 'none', 
        letterSpacing: '1px', 
        textShadow: '0 0 10px rgba(236, 72, 153, 0.6)' 
      }}>
        CornFlix
      </Link>

      {/* MENÜ LİNKLERİ */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>🏠 Ana Sayfa</Link>
        <Link to="/movies" style={linkStyle}>🎬 Filmler</Link>
        <Link to="/news" style={linkStyle}>📰 Haberler</Link>
        <Link to="/profile" style={linkStyle}>👤 Profil</Link>
        <Link to="/contact" style={linkStyle}>📞 İletişim</Link>
      </div>

      {/* GİRİŞ YAP BUTONU (Siber Yeşil) */}
      <button style={{ 
        backgroundColor: '#00e676', 
        color: 'black', 
        border: 'none', 
        padding: '10px 24px', 
        borderRadius: '6px', 
        fontWeight: 'bold', 
        cursor: 'pointer', 
        fontSize: '14px', 
        boxShadow: '0 0 12px rgba(0, 230, 118, 0.4)' 
      }}>
        Giriş Yap
      </button>

    </nav>
  );
};

// Linklerin ortak stili (Kodu kalabalıklaştırmasın diye buraya aldım)
const linkStyle = {
  color: '#e2e8f0',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'color 0.3s'
};

export default Navbar;
