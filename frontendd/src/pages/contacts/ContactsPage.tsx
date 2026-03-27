import React, { useState } from 'react';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Buraya normalde mesajı gönderecek API isteği gelir.
    alert(`Mesajın Alındı Tatlım!\n\nİsim: ${formData.name}\nMesaj: ${formData.message.substring(0, 30)}...`);
    // Formu temizle
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <style>{`
        .neon-box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; margin-bottom: 20px; }
        .neon-label { display: block; margin-bottom: 10px; color: #00ff00; font-weight: bold; font-size: 14px; }
        .cyber-input { background: #111; border: 1px solid #ff00ff; color: #fff; border-radius: 8px; padding: 12px 20px; outline: none; width: 100%; transition: border-color 0.3s; }
        .cyber-input:focus { border-color: #00f3ff; }
        .btn-green-parlak { background: #00ff00; color: #05050a; border: none; padding: 15px 40px; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 0 20px #00ff00; transition: box-shadow 0.3s; font-size: 16px; margin-top: 20px; }
        .btn-green-parlak:hover { box-shadow: 0 0 30px #00ff00; }
        .sub-heading { color: #fff; text-align: center; margin-bottom: 40px; font-weight: bold; text-shadow: 0 0 5px #ff00ff; }
      `}</style>

      <div style={{ maxWidth: '800px', width: '100%' }} className="neon-box-cyan">
        <div style={{ padding: '60px' }}>
          
          {/* BAŞLIK (Örnekteki gibi) */}
          <h1 style={{ color: '#00ff00', textAlign: 'center', textShadow: '0 0 15px #00ff00', marginBottom: '20px', fontSize: '48px' }}>Bize Ulaşın</h1>
          <p className="sub-heading">Sorularınız, önerileriniz veya geri bildirimleriniz mi var? Sizden duymak isteriz! Aşağıdaki formu doldurun, en kısa sürede size geri döneceğiz.</p>
          
          {/* FORM */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <label htmlFor="name" className="neon-label">İsim</label>
              <input type="text" id="name" name="name" className="cyber-input" value={formData.name} onChange={handleChange} placeholder="Adınız" required />
            </div>
            
            <div style={{ width: '100%' }}>
              <label htmlFor="email" className="neon-label">E-posta</label>
              <input type="email" id="email" name="email" className="cyber-input" value={formData.email} onChange={handleChange} placeholder="emailiniz@ornek.com" required />
            </div>
            
            <div style={{ width: '100%' }}>
              <label htmlFor="subject" className="neon-label">Konu</label>
              <input type="text" id="subject" name="subject" className="cyber-input" value={formData.subject} onChange={handleChange} placeholder="Konu nedir?" />
            </div>
            
            <div style={{ width: '100%' }}>
              <label htmlFor="message" className="neon-label">Mesaj</label>
              <textarea id="message" name="message" className="cyber-input" rows={6} value={formData.message} onChange={handleChange} placeholder="Detaylı mesajınız..." required />
            </div>

            {/* GÖNDER BUTONU (Örnekteki gibi parlayan yeşil) */}
            <button type="submit" className="btn-green-parlak">
              Mesaj Gönder
            </button>
          </form>

          {/* DİĞER YOLLAR (Örnekteki gibi) */}
          <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #111', textAlign: 'center' }}>
            <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>Bize Ulaşmanın Diğer Yolları</h3>
            <p style={{ fontSize: '14px', color: '#ccc', marginTop: '15px' }}>Genel sorular için şu adresten de ulaşabilirsiniz: <span style={{ color: '#00ff00' }}>movieq3231@gmail.com</span></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
