import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Linke tıklayınca mobil menüyü otomatik kapatır
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="cyber-navbar">
      <div className="nav-container">
        
        {/* SOL TARAF: LOGO */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          CORNFLIX
        </Link>

        {/* ORTA/SAĞ TARAF: BİLGİSAYAR MENÜSÜ */}
        <div className="desktop-menu">
          <Link to="/" className="nav-link">Ana Sayfa</Link>
          <Link to="/movies" className="nav-link">Filmler Arşivi</Link>
          <Link to="/news" className="nav-link">Haberler</Link>
          <Link to="/about" className="nav-link">Hakkında</Link>
          <Link to="/contacts" className="nav-link">İletişim</Link>
        </div>

        {/* SAĞ TARAF: MOBİL HAMBURGER BUTONU */}
        <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ALT KISIM: MOBİL AÇILIR MENÜ */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={closeMenu}>Ana Sayfa</Link>
          <Link to="/movies" className="mobile-link" onClick={closeMenu}>Filmler Arşivi</Link>
          <Link to="/news" className="mobile-link" onClick={closeMenu}>Haberler</Link>
          <Link to="/about" className="mobile-link" onClick={closeMenu}>Hakkında</Link>
          <Link to="/contacts" className="mobile-link" onClick={closeMenu}>İletişim</Link>
        </div>
      )}

      {/* SİBERPUNK CSS (DIŞARIYA BAĞIMLI DEĞİL, HATA VERMEZ) */}
      <style>{`
        .cyber-navbar {
          background: rgba(5, 5, 10, 0.95);
          border-bottom: 2px solid #00f3ff;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999; /* Formların altında kalmasını engeller */
          box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
          font-family: 'sans-serif';
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }
        .nav-logo {
          color: #ff00ff;
          font-size: 26px;
          font-weight: bold;
          text-decoration: none;
          text-shadow: 0 0 10px #ff00ff;
          letter-spacing: 2px;
        }
        
        /* BİLGİSAYAR LİNKLERİ */
        .desktop-menu {
          display: none;
          gap: 25px;
        }
        .nav-link {
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          font-size: 15px;
          transition: 0.3s;
