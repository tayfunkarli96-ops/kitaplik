import React from 'react';

export default function ContactsPage() {
  return (
    <div style={{ background: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', display: 'flex', justifyContent: 'center' }}>
      <style>{`
        .form-box { border: 2px solid #00f3ff; border-radius: 15px; background: rgba(0, 15, 25, 0.8); padding: 50px; width: 100%; max-width: 800px; box-shadow: 0 0 20px #00f3ff; }
        .form-inp { background: #111; border: 1px solid #ff00ff; color: #fff; padding: 12px; border-radius: 8px; width: 100%; margin-bottom: 20px; outline: none; }
        .form-btn { background: #00ff00; color: #000; border: none; padding: 15px 40px; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px #00ff00; width: 100%; font-size: 16px; }
        .form-label { color: #00ff00; font-weight: bold; margin-bottom: 8px; display: block; }
      `}</style>
      <div className="form-box">
        <h1 style={{ color: '#00ff00', textAlign: 'center', fontSize: '45px', textShadow: '0 0 10px #00ff00' }}>Bize Ulaşın</h1>
        <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px' }}>Sorularınız mı var? Formu doldur tatlım!</p>
        <form>
          <label className="form-label">İsim</label>
          <input className="form-inp" placeholder="Adınız" />
          <label className="form-label">E-posta</label>
          <input className="form-inp" placeholder="emailiniz@ornek.com" />
          <label className="form-label">Mesaj</label>
          <textarea className="form-inp" rows={5} placeholder="Detaylı mesajınız..." />
          <button type="button" className="form-btn">MESAJ GÖNDER</button>
        </form>
        <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px', fontSize: '14px', color: '#aaa' }}>
          📧 movieq3231@gmail.com
        </div>
      </div>
    </div>
  );
}
