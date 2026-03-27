import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="cyber-vitrin-container">
      {/* İÇ CSS - TÜM SİBERPUNK ESTETİĞİNİ GÖMÜYORUZ */}
      <style>{`
        .cyber-vitrin-container {
          background-color: #05050a;
          min-height: 100vh;
          color: #fff;
          padding: 100px 40px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Siberpunk Arka Plan */
        .cyber-vitrin-container::before {
          content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 60%;
          background: 
            linear-gradient(rgba(5, 5, 10, 0.5), #05050a),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0,80 C150,110 350,20 500,80 C650,140 850,50 1000,80 L1000,100 L0,100 Z" fill="rgba(0,243,255,0.05)"/></svg>')
            bottom center / cover no-repeat;
          z-index: 0;
          perspective: 1000px;
          transform: rotateX(60deg);
        }

        /* Parçacık Efektleri */
        .cyber-vitrin-container::after {
          content: ''; position: absolute; top: -100px; left: -100px; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(0,0,0,0) 70%); z-index: 0;
        }

        .content-wrapper { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; text-align: center; }

        /* Dev Hoş Geldiniz Başlığı (Çok Renkli Neon) */
        .massive-cyber-title {
          font-size: 80px;
          font-weight: 900;
          margin: 40px 0 20px 0;
          line-height: 1.1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (max-width: 900px) { .massive-cyber-title { font-size: 60px; } }
        
        .title-line-1 { color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #00f3ff, 0 0 20px #00f3ff, 0 0 30px #00f3ff; }
        .title-line-2 { color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
        .title-line-3 { color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #facc15, 0 0 20px #facc15; }

        /* Alt Başlık */
        .cyber-sub-title { font-size: 20px; color: #aaa; margin-bottom: 50px; font-weight: normal; font-style: italic; }

        /* Entegre Profil ve Film Kartları (image_3.png ve image_6.png'den) */
        .cyber-integrated-cards { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; width: 100%; margin-top: 50px; }
        @media (max-width: 1000px) { .cyber-integrated-cards { grid-template-columns: 1fr; } }
        
        .integrated-neon-box-pink {
          border: 2px solid #ff00ff;
          border-radius: 12px;
          background: rgba(25, 0, 15, 0.7);
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.4), inset 0 0 15px rgba(255, 0, 255, 0.1);
          backdrop-filter: blur(5px);
          padding: 30px;
          text-align: left;
        }
        
        .integrated-neon-box-cyan {
          border: 2px solid #00f3ff;
          border-radius: 12px;
          background: rgba(0, 15, 25, 0.7);
          box-shadow: 0 0 15px rgba(0, 243, 255, 0.4), inset 0 0 15px rgba(0, 243, 255, 0.1);
          padding: 20px;
          text-align: left;
        }

        .cyber-label { font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; display: block; }
        .cyber-profile-name { font-size: 48px; font-weight: 900; color: #fff; text-shadow: 0 0 10px #fff, 0 0 20px #ec4899; }
        .cyber-email { font-size: 18px; color: #ccc; margin-top: 5px; }

        .btn-vitrin {
          background: #ff00ff; color: #fff; border: none; padding: 15px 40px;
          border-radius: 30px; font-weight: bold; font-size: 18px; cursor: pointer;
          box-shadow: 0 0 20px #ff00ff; transition: 0.3s;
          margin-top: 40px;
        }
        .btn-vitrin:hover { transform: scale(1.05); box-shadow: 0 0 30px #ff00ff; }
        
        /* Özet Kartları */
        .summary-info { font-size: 18px; color: #fff; font-weight: bold; margin-bottom: 5px; }
        .summary-count { font-size: 14px; color: #aaa; margin-top: 5px; }
      `}</style>

      <div className="content-wrapper">
        
        {/* DEV BAŞLIK (Fotoğraftaki gibi çok renkli neon) */}
        <h1 className="massive-cyber-title">
          <span className="title-line-1">CORNFLIX'E</span>
          <span className="title-line-2">HOŞ GELDİNİZ</span>
        </h1>
        <p className="cyber-sub-title">Türkiye'nin En Büyük Siber Film Arşivi</p>

        {/* Aksiyon Butonu */}
        <Link to="/movies" style={{ textDecoration: 'none' }}>
          <button className="btn-vitrin">🎬 Arşivi Keşfet</button>
        </Link>

        {/* ENTEGRE KARTLAR (Fotoğraftaki Birebir Tasarım) */}
        <div className="cyber-integrated-cards">
          
          {/* Sol: Geliştirici Profili (image_3.png'den) */}
          <div className="integrated-neon-box-pink">
            <span className="cyber-label">GELİŞTİRİCİ & ÜYE</span>
            <div className="cyber-profile-name">Tayfun Karlı</div>
            <div className="cyber-email">tayfun@cornflix.dev</div>
          </div>

          {/* Sağ: İstatistikler (image_3.png'den) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="integrated-neon-box-cyan">
              <div className="summary-info">İzleme Listesi Özet</div>
              <div className="summary-count">15 film</div>
            </div>
            <div className="integrated-neon-box-pink" style={{ padding: '20px', backgroundColor: 'rgba(25, 0, 15, 0.7)' }}>
              <div className="summary-info" style={{ color: '#ffc107' }}>Favori Filmler ★</div>
              <div className="summary-count">5 film</div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default HomePage;
