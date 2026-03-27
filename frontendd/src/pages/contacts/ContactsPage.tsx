import React from 'react';

const ContactsPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', border: '2px solid #00f3ff', borderRadius: '15px', background: 'rgba(0,15,25,0.8)', padding: '50px', boxShadow: '0 0 20px #00f3ff' }}>
        
        <h1 style={{ color: '#00ff00', textAlign: 'center', fontSize: '40px', marginBottom: '20px' }}>Bize Ulaşın</h1>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: '#ccc' }}>Sorularınız mı var? Aşağıdaki formu doldurun, size en kısa sürede döneceğiz.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input style={{ padding: '15px', background: '#111', border: '1px solid #ff00ff', color: '#fff', borderRadius: '8px' }} placeholder="Adınız" />
          <input style={{ padding: '15px', background: '#111', border: '1px solid #ff00ff', color: '#fff', borderRadius: '8px' }} placeholder="E-posta" />
          <textarea style={{ padding: '15px', background: '#111', border: '1px solid #ff00ff', color: '#fff', borderRadius: '8px', minHeight: '150px' }} placeholder="Mesajınız..." />
          <button style={{ padding: '15px', background: '#00ff00', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>Mesaj Gönder</button>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#aaa' }}>Genel sorular için: <span style={{ color: '#00ff00' }}>movieq3231@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
