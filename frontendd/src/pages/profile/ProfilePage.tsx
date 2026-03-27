import React, { useState } from 'react';

const ProfilePage = () => {
  const [name, setName] = useState('Tayfun Karlı');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage("Profil başarıyla güncellendi! (RE-01)");
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-container">
      {/* NÜKLEER İÇ CSS - HİÇBİR CONFIG GEREKTİRMEZ */}
      <style>{`
        @keyframes neon-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes border-pulse {
          0%, 100% { border-color: rgba(236, 72, 153, 0.5); box-shadow: 0 0 10px rgba(236, 72, 153, 0.3); }
          50% { border-color: rgba(236, 72, 153, 1); box-shadow: 0 0 25px rgba(236, 72, 153, 0.7); }
        }
        .profile-container {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
          padding: 60px 40px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
        }
        .flashy-title {
          font-size: 80px;
          font-weight: 900;
          text-align: center;
          background: linear-gradient(to right, #ec4899, #8b5cf6, #06b6d4, #ec4899);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: neon-flow 5s ease infinite;
          margin-bottom: 5px;
        }
        .cyber-card {
          background: #111;
          border: 2px solid #ec4899;
          border-radius: 20px;
          padding: 30px;
          margin: 20px 0;
          animation: border-pulse 4s infinite;
        }
        .cyan-glow-input {
          width: 100%;
          padding: 15px;
          background: #000;
          border: 1px solid #06b6d4;
          border-radius: 10px;
          color: #fff;
          font-size: 18px;
          transition: 0.3s;
        }
        .cyan-glow-input:focus {
          outline: none;
          border-color: #ec4899;
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.7);
        }
        .neon-pink-button {
          width: 100%;
          padding: 15px;
          margin-top: 25px;
          background: #ec4899;
          border: none;
          border-radius: 50px;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          text-transform: uppercase;
        }
        .neon-pink-button:hover {
          background: #f472b6;
          box-shadow: 0 0 25px #ec4899;
        }
        .creator-section {
          text-align: center;
          margin-top: 60px;
          padding: 40px;
          border: 2px dashed #ec4899;
          border-radius: 100px;
        }
        .superstar-name {
          font-size: 60px;
          font-weight: bold;
          background: linear-gradient(to r, #ec4899, #fff, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px rgba(236, 72, 153, 1), 0 0 20px rgba(236, 72, 153, 0.7);
          margin-top: 10px;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Ana Başlık (Flowing Neon) */}
        <h1 className="flashy-title">CornFlix</h1>
        <p className="text-center text-cyan-300 font-mono tracking-widest mb-16 uppercase">Üye Profili Düzenleme</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Sol Kolon - Bilgiler */}
          <div className="cyber-card">
            <h2 className="text-pink-400 text-3xl font-bold mb-6 border-b border-gray-800 pb-2">👤 Bilgilerim</h2>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2 font-mono text-sm uppercase">Kullanıcı Adı</label>
              <input 
                type="text" 
                className="cyan-glow-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2 font-mono text-sm uppercase">E-posta (Devre Dışı)</label>
              <input 
                type="email" 
                className="cyan-glow-input"
                value="tayfun@cornflix.dev"
                disabled 
                style={{ opacity: 0.5, borderColor: '#333' }}
              />
            </div>
          </div>

          {/* Sağ Kolon - Profili Düzenle */}
          <div className="cyber-card" style={{ animationDelay: '2s' }}>
            <h2 className="text-pink-400 text-3xl font-bold mb-6 border-b border-gray-800 pb-2">✏️ Profili Düzenle</h2>
            <p className="text-gray-300 text-lg mb-4">Profil ismini ve diğer ayarları buradan değiştirebilirsin.</p>
            <p className="text-gray-400 italic">CornFlix, siber dünyada güvenli bir deneyim sunar!</p>
            
            <button onClick={handleSave} className="neon-pink-button">💾 Değişiklikleri Kaydet</button>

            {message && (
              <div className="mt-6 p-4 bg-cyan-900 border border-cyan-400 text-cyan-100 text-center rounded-lg font-mono animate-pulse">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Proje Detayları (Aynı Stil) */}
        <div className="cyber-card" style={{ borderColor: '#8b5cf6', animation: 'none', borderStyle: 'dotted' }}>
          <h2 className="text-purple-400 text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Proje Detayları</h2>
          <p className="text-gray-400 font-mono">Kategori: <span className="text-white">Film İnceleme & Topluluk</span></p>
          <p className="text-gray-400 font-mono">Web Sitesi: <span className="text-pink-500 hover:text-cyan-400 cursor-pointer">cornflix.dev</span></p>
        </div>

        {/* SADECE TAYFUN KARLI: OLUŞTURAN (RENGARENK VE ŞEKİLLİ) */}
        <div className="creator-section">
          <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-2">Geliştirici & Üye</h3>
          <div className="superstar-name">Tayfun Karlı</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
