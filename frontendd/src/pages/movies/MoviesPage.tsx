import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- 🎬 VERİ MERKEZİ ---
export const moviesData = [
  { id: '1', title: "Fight Club", director: "Tayfun Karlı", year: "1999", genres: "Action", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '3', title: "Lord of the Rings", director: "Tayfun Karlı", year: "2003", genres: "Adventure", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '10', title: "Silence of the Lambs", director: "Tayfun Karlı", year: "1991", genres: "Thriller", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '5', title: "Interstellar", director: "Tayfun Karlı", year: "2014", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: '6', title: "The Matrix", director: "Tayfun Karlı", year: "1999", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" }
];

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Arama filtresi (Dinamik)
  const filteredMovies = moviesData.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cyber-container">
      {/* CSS DOKUNUŞLARI */}
      <style>{`
        .cyber-container { background-color: #05050a; min-height: 100vh; color: #fff; padding: 100px 40px; font-family: 'Segoe UI', sans-serif; }
        .content-wrapper { max-width: 1200px; margin: 0 auto; position: relative; z-index: 10; }
        .neon-box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; backdrop-filter: blur(5px); }
        .neon-box-pink { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 15px #ff00ff; }
        .cyber-input { background: transparent; border: 1px solid #00f3ff; color: #fff; border-radius: 8px; padding: 12px; outline: none; flex: 1; }
        .btn-pink { background: #ff00ff; color: #fff; border: none; padding: 10px 25px; border-radius: 20px; font-weight: bold; cursor: pointer; box-shadow: 0 0 12px #ff00ff; }
        .movies-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-top: 30px; }
        @media (max-width: 950px) { .movies-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="content-wrapper">
        
        {/* 🔍 SİBER ARAMA ÇUBUĞU */}
        <div className="neon-box-cyan" style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Arşivde ara (Örn: Matrix)..." 
            className="cyber-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-pink">Search</button>
        </div>

        <div className="movies-grid">
          
          {/* 🎬 SOL TARAF: FİLM LİSTESİ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredMovies.map((movie, index) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={index % 2 === 0 ? "neon-box-pink" : "neon-box-cyan"} style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center', transition: '0.3s' }}>
                  <img src={movie.poster} alt={movie.title} style={{ width: '100px', height: '145px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', textShadow: index % 2 === 0 ? '0 0 10px #ff00ff' : '0 0 10px #00f3ff' }}>{movie.title}</h2>
                    <p style={{ color: '#ccc', margin: 0 }}>Yönetmen: {movie.director} | Yıl: {movie.year}</p>
                    <div style={{ marginTop: '10px', background: '#f5c518', color: '#000', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', fontSize: '12px' }}>IMDb: {movie.imdb}</div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredMovies.length === 0 && <p style={{textAlign: 'center', color: '#ff00ff', fontSize: '20px'}}>Siber uzayda böyle bir film yok moruk! 🛸</p>}
          </div>

          {/* 📊 SAĞ TARAF: DASHBOARD (İSTEDİĞİN TÜM PARÇALAR) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 📈 Stats */}
            <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', fontSize: '22px', margin: '0 0 10px 0' }}>Stats</h3>
              <div style={{ fontSize: '32px', fontWeight: '900' }}>{filteredMovies.length} Film Bulundu</div>
              <p style={{ color: '#888', margin: '10px 0 0 0' }}>CornFlix Veritabanı</p>
            </div>

            {/* 💬 Comment & Evaluation */}
            <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', fontSize: '24px', margin: '0 0 15px 0' }}>Comment</h3>
              <div style={{ fontSize: '50px', marginBottom: '10px' }}>💬</div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 15px 0' }}>23 Görüş Bildirildi</p>
              <button className="btn-pink" style={{ width: '100%' }}>Görüş Bildir</button>
            </div>

            {/* 📡 Son Görüşler (Review Feed) */}
            <div className="neon-box-cyan" style={{ padding: '20px' }}>
              <h3 style={{ color: '#00f3ff', fontSize: '20px', margin: '0 0 15px 0', borderBottom: '1px solid #111', paddingBottom: '10px' }}>Son Görüşler</h3>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input type="text" placeholder="Düşüncen ne?" className="cyber-input" style={{ fontSize: '12px', padding: '8px' }} />
                <button className="btn-pink" style={{ padding: '8px 15px', fontSize: '12px' }}>OK</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#bbb' }}>
                <div style={{ borderBottom: '1px solid #222', paddingBottom: '8px' }}>👤 "Tayfun Karlı yönetmenliği bir başka moruk!"</div>
                <div style={{ borderBottom: '1px solid #222', paddingBottom: '8px' }}>👤 "Siberpunk arayüz akıyor, helal."</div>
                <div>👤 "Arşiv genişlesin, takipteyiz."</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
