import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const moviesData = [
  { id: '1', title: "Fight Club", director: "Tayfun Karlı", year: "1999", runtime: "149 min", genres: "Action", imdb: "8.8", ltb: "9.9", miq: "9.9", summary: "Uykusuzluk çeken bir ofis çalışanı...", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '3', title: "Lord of the Rings", director: "Tayfun Karlı", year: "2003", runtime: "201 min", genres: "Adventure", imdb: "9.0", ltb: "9.2", miq: "9.2", summary: "Gandalf ve Aragorn...", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '10', title: "Silence of the Lambs", director: "Tayfun Karlı", year: "1991", runtime: "118 min", genres: "Thriller", imdb: "8.6", ltb: "9.3", miq: "9.4", summary: "Genç bir FBI ajanı...", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '5', title: "Interstellar", director: "Tayfun Karlı", year: "2014", runtime: "169 min", genres: "Sci-Fi", imdb: "8.7", ltb: "9.7", miq: "9.7", summary: "Bir kaşif ekibi...", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" }
];

const MoviesPage = () => {
  return (
    <div className="cyber-container">
      {/* İÇ CSS - HİÇBİR DIŞ AYAR GEREKTİRMEZ */}
      <style>{`
        .cyber-container {
          background-color: #05050a;
          min-height: 100vh;
          color: #fff;
          padding: 80px 30px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow: hidden;
        }
        /* Arka plan ışıkları */
        .cyber-container::before {
          content: ''; position: absolute; top: -20%; left: -10%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(0,0,0,0) 70%); z-index: 0;
        }
        .cyber-container::after {
          content: ''; position: absolute; bottom: -20%; right: -10%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,0,255,0.15) 0%, rgba(0,0,0,0) 70%); z-index: 0;
        }
        
        .content-wrapper { position: relative; z-index: 10; max-w-width: 1200px; margin: 0 auto; }
        
        /* Neon Sınırlar ve Kutular */
        .neon-box-cyan {
          border: 2px solid #00f3ff;
          border-radius: 12px;
          background: rgba(0, 15, 25, 0.7);
          box-shadow: 0 0 10px rgba(0, 243, 255, 0.5), inset 0 0 10px rgba(0, 243, 255, 0.2);
          backdrop-filter: blur(5px);
        }
        .neon-box-pink {
          border: 2px solid #ff00ff;
          border-radius: 12px;
          background: rgba(25, 0, 15, 0.7);
          box-shadow: 0 0 10px rgba(255, 0, 255, 0.5), inset 0 0 10px rgba(255, 0, 255, 0.2);
        }
        
        /* Yazılar */
        .neon-text-cyan { color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #00f3ff, 0 0 20px #00f3ff; }
        .neon-text-pink { color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #ff00ff, 0 0 20px #ff00ff; }
        
        /* Inputlar ve Butonlar */
        .cyber-input {
          background: transparent; border: 1px solid #00f3ff; color: #fff; border-radius: 8px;
          padding: 10px 15px; outline: none; box-shadow: inset 0 0 5px rgba(0,243,255,0.3);
        }
        .cyber-input:focus { box-shadow: 0 0 10px #00f3ff, inset 0 0 10px #00f3ff; }
        
        .btn-pink {
          background: #ff00ff; color: #fff; border: none; padding: 10px 30px;
          border-radius: 25px; font-weight: bold; font-size: 16px; cursor: pointer;
          box-shadow: 0 0 15px #ff00ff; transition: 0.3s;
        }
        .btn-pink:hover { transform: scale(1.05); box-shadow: 0 0 25px #ff00ff; }
        
        .btn-outline-cyan {
          background: transparent; color: #00f3ff; border: 1px solid #00f3ff;
          padding: 6px 20px; border-radius: 20px; font-size: 14px; cursor: pointer;
          box-shadow: 0 0 8px rgba(0,243,255,0.4);
        }
        .btn-outline-cyan:hover { background: rgba(0,243,255,0.2); }
        
        /* Grid Yapısı */
        .movies-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-top: 30px; }
        @media (max-width: 900px) { .movies-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="content-wrapper">
        
        {/* ÜST ARAMA ÇUBUĞU */}
        <div className="neon-box-cyan" style={{ padding: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="Film Adı" className="cyber-input" style={{ flex: 1, minWidth: '150px' }} />
          <input type="text" placeholder="Tür" className="cyber-input" style={{ width: '120px' }} />
          <input type="text" placeholder="Yıl" className="cyber-input" style={{ width: '100px' }} />
          <input type="text" placeholder="Puan" className="cyber-input" style={{ width: '100px' }} />
          <button className="btn-pink">Search</button>
        </div>

        <div className="movies-grid">
          
          {/* SOL TARAF: FİLM LİSTESİ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {moviesData.map((movie, index) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                <div className={index % 2 === 0 ? "neon-box-pink" : "neon-box-cyan"} style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center', transition: '0.3s' }}>
                  <img src={movie.poster} alt={movie.title} style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px', border: index % 2 === 0 ? '1px solid #ff00ff' : '1px solid #00f3ff' }} />
                  
                  <div style={{ flex: 1 }}>
                    <h2 className={index % 2 === 0 ? "neon-text-pink" : "neon-text-cyan"} style={{ margin: '0 0 10px 0', fontSize: '24px' }}>{movie.title}</h2>
                    <span style={{ backgroundColor: '#f5c518', color: '#000', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>IMDb: {movie.imdb}</span>
                    
                    <div style={{ color: '#ccc', fontSize: '14px', marginTop: '10px', lineHeight: '1.6' }}>
                      <p style={{ margin: 0 }}>Yönetmen: <span style={{ color: '#fff' }}>{movie.director}</span></p>
                      <p style={{ margin: 0 }}>Yıl: {movie.year} &nbsp; Tür: {movie.genres}</p>
                    </div>
                    
                    <div style={{ marginTop: '15px' }}>
                      <button className="btn-outline-cyan">İncele</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* SAĞ TARAF: SABİT YORUMLAR / İSTATİSTİK KUTUSU (Görseldeki gibi) */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Yorum Özeti Kutusu */}
            <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 className="neon-text-cyan" style={{ fontSize: '24px', margin: '0 0 15px 0' }}>Comment</h3>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>💬</div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 20px 0' }}>23 Görüş</p>
              <button className="btn-pink" style={{ width: '100%' }}>Görüş Bildir</button>
            </div>

            {/* Canlı Akış Kutusu */}
            <div className="neon-box-cyan" style={{ padding: '20px' }}>
              <h3 className="neon-text-cyan" style={{ fontSize: '20px', margin: '0 0 20px 0', borderBottom: '1px solid rgba(0,243,255,0.3)', paddingBottom: '10px' }}>Görüşler</h3>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#00f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>👤</div>
                <input type="text" placeholder="Düşüncelerini paylaş..." className="cyber-input" style={{ flex: 1, padding: '5px 10px' }} />
                <button className="btn-pink" style={{ padding: '5px 15px', fontSize: '12px' }}>Yayınla</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ff00ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff00ff' }}>👤</div>
                  <div style={{ border: '1px solid rgba(0,243,255,0.3)', padding: '8px 15px', borderRadius: '20px', color: '#ccc', fontSize: '13px', flex: 1 }}>Mükemmel bir film, senaryo harika!</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #00f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f3ff' }}>👤</div>
                  <div style={{ border: '1px solid rgba(255,0,255,0.3)', padding: '8px 15px', borderRadius: '20px', color: '#ccc', fontSize: '13px', flex: 1 }}>Siberpunk atmosferinde daha güzel olmuş.</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MoviesPage;
