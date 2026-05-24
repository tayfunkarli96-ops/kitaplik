import React from 'react';

const Header = () => {
  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)', // Üstte hafif koyuluk
      color: '#e50914', // Cornflix kırmızısı
      padding: '20px 0',
      textAlign: 'center',
      position: 'fixed', // Ekranın en üstüne sabitledik
      top: 0,
      width: '100%',
      zIndex: 1000,
      fontFamily: "'Anton', sans-serif", // Daha agresif, film tarzı bir font simülasyonu
      letterSpacing: '2px',
    }}>
      <span style={{ fontSize: '32px', fontWeight: '900', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        CORNFLIX
      </span>
    </div>
  );
};

export default Header;
