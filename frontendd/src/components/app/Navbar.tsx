import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      backgroundColor: '#05050a', 
      borderBottom: '1px solid #222', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 40px', 
      zIndex: 1000, 
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.8)'
    }}>
      
      {/* LOGO */}
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

      {/* TERTEMİZ MENÜ LİNKLERİ (Sadece çalışanlar kaldı) */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>🏠 Ana Sayfa</Link>
        <Link to="/movies" style={linkStyle}>🎬 Filmler Arşivi</Link>
      </div>

      {/* GİRİŞ YAP BUTONU */}
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
        Üye Girişi
      </button>

    </nav>
  );
};

const linkStyle = {
  color: '#e2e8f0',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'color 0.3s',
  textShadow: '0 0 5px rgba(255,255,255,0.2)'
};

export default Navbar;
