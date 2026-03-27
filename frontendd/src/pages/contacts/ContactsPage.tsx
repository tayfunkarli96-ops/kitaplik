import React from 'react';

const ContactsPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <style>{`
        .cyber-card { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; width: 100%; max-width: 800px; padding: 40px; }
        .cyber-input { background: #111; border: 1px solid #ff00ff; color: #fff; border-radius: 8px; padding: 12px; outline: none; width: 100%; margin-bottom: 20px; }
        .cyber-btn { background: #00ff00; color: #000; border: none; padding: 15px 40px; border-radius: 25px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px #00ff00; }
        .cyber-label { color: #00ff00; display: block; margin-bottom: 8px; font-weight: bold; font-size: 14px; }
      `}</style>

      <div className="cyber-card">
        <h1 style={{ color: '#00ff00', textAlign: 'center', textShadow: '0 0 10px #00ff00', fontSize: '42px', marginBottom: '10px' }}>Bize Ulaşın</h1>
        <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px' }}>Sorularınız, önerileriniz mi var? Sizden duymak isteriz!</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            <label className="cyber-label">İsim</label>
            <input type="text" className="cyber-input" placeholder="Adınız" />
          </div>
          <div style={{ width: '100%' }}>
            <label className="cyber-label">E-posta</label>
            <input type="email" className="cyber-input" placeholder="emailiniz@ornek.com" />
          </div>
          <div style={{ width: '100%' }}>
            <label className="cyber-label">Mesaj</label>
            <textarea className="cyber-input" rows={5} placeholder="Detaylı mesajınız..." />
          </div>
          <button type="submit" className="cyber-btn">Mesaj Gönder</button>
        </form>

        <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#aaa' }}>Genel sorular için: <span style={{ color: '#00ff00' }}>movieq3231@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
