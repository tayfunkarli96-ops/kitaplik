import React from 'react';

const Header = () => {
  return (
    <div style={{
      backgroundColor: '#e50914', // Cornflix kırmızısı
      color: 'white',
      padding: '15px 20px',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      🍿 Cornflix
    </div>
  );
};

export default Header;
