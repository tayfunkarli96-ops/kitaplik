import React from 'react';

export default function ContactsPage() {
  return (
    // paddingTop: '120px' verdim ki Navbar'ın altında kalıp mobilde "boş" görünmesin!
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', paddingTop: '120px', paddingBottom: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'sans-serif' }}>
      
      <style>{`
        .contact-box {
          border: 2px solid #00f3ff;
          border-radius: 15px;
          background: rgba(0, 15, 25, 0.8);
          box-shadow: 0 0 20px #00f3ff;
          width: 90%;
          max-width: 600px;
          padding: 40px;
        }
        .cyber-inp {
          background: #111;
          border: 1px solid #ff00ff;
          color: #fff;
          border-radius: 8px;
          padding: 15px;
          width: 100%;
          margin-bottom: 20px;
          outline: none;
          box-sizing: border-box; /* Mobilde taşmayı önler */
        }
        .cyber-btn {
          background: #00ff00;
          color: #000;
          border: none;
          padding: 15px;
          border-radius: 30px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 15px #00ff00;
          width: 100%;
          font-size: 16px;
          text-transform: uppercase;
        }
        /* MOBİL EKRANLAR İÇİN ÖZEL AYAR */
        @media (max-width: 768px) {
          .contact-box { padding: 20px; width: 95%; }
          .neon-title { font-size: 32px !important; }
        }
      `}</style>

      <div className="contact-box">
        <h1 className="neon-title" style={{ color: '#00ff00', textAlign: 'center', textShadow: '0 0 10px #00ff00', fontSize: '45px', margin: '0 0 10px 0' }}>Bize Ulaşın</h1>
        <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px', fontSize: '15px' }}>Sorularınız mı var? Formu doldur, hemen dönelim!</p>
        
        <form onSubmit={(e) => { e.preventDefault(); alert("Mesajın başarıyla alındı moruk!"); }}>
          <input className="cyber-inp" type="text" placeholder="Adınız" required />
          <input className="cyber-inp" type="email" placeholder="E-posta Adresiniz" required />
          <textarea className="cyber-inp" rows={5} placeholder="Mesajınız..." required style={{ resize: 'vertical' }}></textarea>
          <button type="submit" className="cyber-btn">Mesajı Gönder</button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#aaa', margin: 0 }}>Genel sorular için:</p>
          <p style={{ fontSize: '16px', color: '#00f3ff', fontWeight: 'bold', margin: '5px 0' }}>movieq3231@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
