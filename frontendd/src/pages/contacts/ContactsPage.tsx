import React from 'react';

const ContactsPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '120px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif' }}>
      
      <style>{`
        .cyber-box { border: 2px solid #00f3ff; border-radius: 15px; background: rgba(0, 15, 25, 0.8); box-shadow: 0 0 20px #00f3ff; width: 100%; max-width: 600px; padding: 30px; }
        .cyber-in { background: #111; border: 1px solid #ff00ff; color: #fff; border-radius: 8px; padding: 12px; outline: none; width: 100%; margin-bottom: 20px; font-size: 16px; }
        .cyber-btn { background: #00ff00; color: #000; border: none; padding: 15px; border-radius: 30px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px #00ff00; width: 100%; font-size: 18px; }
        
        /* MOBİL AYARI */
        @media (max-width: 768px) {
          .cyber-box { padding: 20px; }
          h1 { font-size: 32px !important; }
        }
      `}</style>

      <div className="cyber-box">
        <h1 style={{ color: '#00ff00', textAlign: 'center', textShadow: '0 0 10px #00ff00', fontSize: '42px', marginBottom: '10px' }}>Bize Ulaşın</h1>
        <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px', fontSize: '14px' }}>Formu doldur, hemen dönelim moruk!</p>
        
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <input className="cyber-in" placeholder="Adınız" required />
          <input className="cyber-in" placeholder="E-posta" required />
          <textarea className="cyber-in" rows={4} placeholder="Mesajınız..." required />
          <button type="submit" className="cyber-btn">MESAJI ÇAK!</button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px' }}>
          <p style={{ fontSize: '12px' }}>📧 movieq3231@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
