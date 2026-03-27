import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* İÇ CSS - HİÇBİR CONFIG GEREKTİRMEZ */}
      <style>{`
        @keyframes flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-neon {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5), inset 0 0 10px rgba(236, 72, 153, 0.2); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8), inset 0 0 20px rgba(236, 72, 153, 0.4); }
        }
        .about-container {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
          padding: 40px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
        }
        .neon-title {
          font-size: 80px;
          font-weight: 900;
          text-align: center;
          background: linear-gradient(to right, #ec4899, #8b5cf6, #06b6d4, #ec4899);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: flow 5s ease infinite;
          margin-bottom: 10px;
        }
        .cyber-card {
          background: #111;
          border: 2px solid #ec4899;
          border-radius: 20px;
          padding: 30px;
          margin: 20px 0;
          animation: pulse-neon 3s infinite;
        }
        .green-title { color: #10b981; font-size: 28px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #333; }
        .pink-title { color: #ec4899; font-size: 28px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #333; }
        .list-item { color: #ccc; margin-bottom: 10px; display: flex; align-items: center; }
        .list-item::before { content: '✦'; color: #ec4899; margin-right: 10px; }
        .creator-section {
          text-align: center;
          margin-top: 60px;
          padding: 40px;
          border: 2px dashed #ec4899;
          border-radius: 100px;
        }
        .creator-name {
          font-size: 50px;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 40px #ec4899;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Ana Başlık */}
        <h1 className="neon-title">CornFlix</h1>
        <p className="text-center text-cyan-400 font-mono tracking-widest mb-12 uppercase">Siber Sinema Platformu</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Misyon */}
          <div className="cyber-card">
            <h2 className="pink-title">Misyonumuz</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              CornFlix, film tutkunları için tasarlanmış siberpunk bir evrendir. 
              Amacımız, sinema yolculuğunuzu neon ışıkları altında keşfetmenize yardımcı olmaktır.
            </p>
          </div>

          {/* Sunulanlar */}
          <div className="cyber-card" style={{ borderColor: '#06b6d4' }}>
            <h2 className="text-cyan-400 text-2xl font-bold mb-4 border-bottom border-gray-800 pb-2">Neler Sunuyoruz</h2>
            <div className="list-item">Güncel siber film haberleri.</div>
            <div className="list-item">Puanlama ve siber yorumlar.</div>
            <div className="list-item">Kişisel izleme listeleri.</div>
            <div className="list-item">Favori film yönetimi.</div>
          </div>
        </div>

        {/* Proje Detayları */}
        <div className="cyber-card" style={{ borderColor: '#8b5cf6' }}>
          <h2 className="text-purple-400 text-2xl font-bold mb-4">Proje Detayları</h2>
          <p className="text-gray-400 font-mono">Kategori: <span className="text-white">Film İnceleme & Topluluk</span></p>
          <p className="text-gray-400 font-mono">İlham: <span className="text-white">IMDb, Rotten Tomatoes</span></p>
          <p className="text-gray-400 font-mono">Web: <span className="text-pink-500">cornflix.com.tr</span></p>
        </div>

        {/* SADECE SEN: OLUŞTURAN */}
        <div className="creator-section">
          <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-2">Geliştirici & Tasarımcı</h3>
          <div className="creator-name">Tayfun Karlı</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
