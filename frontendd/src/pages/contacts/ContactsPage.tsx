import React from 'react';

const ContactPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: 'white', padding: '120px 40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <h1 style={{ color: '#ff00ff', textShadow: '0 0 10px #ff00ff', fontSize: '48px', marginBottom: '40px', textAlign: 'center' }}>
          İLETİŞİME GEÇ
        </h1>
        
        <div style={{ border: '2px solid #00f3ff', borderRadius: '12px', padding: '40px', background: 'rgba(0,15,25,0.7)', boxShadow: '0 0 15px rgba(0,243,255,0.4)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ color: '#888', display: 'block', marginBottom: '8px', fontSize: '14px' }}>İSİM SOYİSİM</label>
            <input type="text" placeholder="Siber Adın..." style={{ width: '100%', padding: '15px', backgroundColor: '#0f0f15', border: '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ color: '#888', display: 'block', marginBottom: '8px', fontSize: '14px' }}>E-POSTA</label>
            <input type="email" placeholder="E-posta adresin..." style={{ width: '100%', padding: '15px', backgroundColor: '#0f0f15', border: '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ color: '#888', display: 'block', marginBottom: '8px', fontSize: '14px' }}>MESAJ</label>
            <textarea placeholder="Sinyali gönder..." style={{ width: '100%', height: '120px', padding: '15px', backgroundColor: '#0f0f15', border: '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none', boxSizing: 'border-box' }}></textarea>
          </div>

          <button style={{ backgroundColor: '#00e676', border: 'none', padding: '15px', borderRadius: '8px', color: 'black', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 0 15px rgba(0, 230, 118, 0.4)', marginTop: '10px' }}>
            Sinyali Gönder
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
