import React from 'react';

const UnderConstruction = () => {
  return (
    <div style={{
      backgroundColor: '#05050a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '50px',
        color: '#00f3ff',
        textShadow: '0 0 10px #00f3ff, 0 0 20px #00f3ff',
        margin: '0 0 20px 0'
      }}>
        SİSTEM GÜNCELLENİYOR
      </h1>
      <p style={{ color: '#aaa', fontSize: '20px', maxWidth: '600px', lineHeight: '1.6' }}>
        Bu modül siberpunk v2.0 güncellemesi için kısa süreliğine bakıma alınmıştır. Lütfen Filmler Arşivi üzerinden gezinmeye devam edin.
      </p>
      <div style={{ fontSize: '60px', marginTop: '30px', animation: 'pulse 2s infinite' }}>
        🚧
      </div>
    </div>
  );
};

export default UnderConstruction;
