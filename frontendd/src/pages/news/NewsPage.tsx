import React from 'react';

const NewsPage = () => {
  return (
    <div className="news-page-container">
      {/* İÇ CSS - HİÇBİR CONFIG GEREKTİRMEZ */}
      <style>{`
        @keyframes neon-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes story-pulse {
          0%, 100% { border-color: rgba(6, 182, 212, 0.4); box-shadow: 0 0 15px rgba(6, 182, 212, 0.3); }
          50% { border-color: rgba(6, 182, 212, 0.8); box-shadow: 0 0 30px rgba(6, 182, 212, 0.6); }
        }
        @keyframes news-banner-flow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .news-page-container {
          background-color: #000;
          color: #fff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
        }
        /* Instagram Story Tarzı Kart (image_2.png formatı) */
        .story-card {
          width: 380px; /* Yaklaşık telefon boyutu */
          height: 680px;
          background-color: #111;
          border: 4px solid #06b6d4; /* Neon Cyan */
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          animation: story-pulse 4s infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        /* Siber Şehir Gecesi Manzarası (image_2.png vibe'ı) */
        .story-image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #000 0%, #031c2c 50%, #1a011a 100%);
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        .story-image-placeholder::after {
          content: 'Siber Gecesi Manzarası';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #222;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
        }
        /* Başlık (CORNFLIX HABERLER) */
        .story-title {
          font-size: 32px;
          font-weight: 900;
          text-align: center;
          color: #fff;
          margin-top: 80px;
          margin-bottom: 5px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }
        /* Rengarenk Haber Bandı (image_2.png'deki bar) */
        .news-banner-bar {
          width: 250px;
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(to right, #ec4899, #8b5cf6, #06b6d4, #ec4899);
          background-size: 200% auto;
          animation: news-banner-flow 3s linear infinite;
          position: relative;
