import React from 'react';

const ContactsPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <style>{`
        .cyber-box { border: 2px solid #00f3ff; border-radius: 15px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 20px #00f3ff; width: 100%; max-width: 800px; padding: 50px; text-align: center; }
        .cyber-in { background: #111; border: 1px solid #ff00ff; color: #fff; border-radius: 8px; padding: 12px; outline: none; width: 100%; margin-bottom: 20px; }
        .cyber-btn { background: #00ff00; color: #000; border: none; padding: 15px 50px; border-radius: 30px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px #00ff00; font-size: 18px; }
        .neon-txt { color: #00ff00; text-shadow: 0 0 10px #00ff00; font-size: 45px; margin-bottom: 10px; }
      `}</style>

      <div className="cyber-box">
        <h1 className="neon-txt">Bize Ulaşın</h1>
        <p style={{ color: '#ccc', marginBottom: '40px' }}>Sorularınız mı var? Formu doldur, hemen dönelim moruk!</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input className="cyber-in" placeholder="Adınız" required />
          <input className="cyber-in" placeholder="E-posta" required />
          <textarea className="cyber-in" rows={5} placeholder="Mesajınız..." required />
          <button type="submit" className="cyber-btn">MESAJI ÇAK!</button>
        </form>

        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #222' }}>
          <p>📧 movieq3231@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
