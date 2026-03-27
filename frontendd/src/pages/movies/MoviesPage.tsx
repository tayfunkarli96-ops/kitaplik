import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Burası senin veri merkezin
export const moviesData = [
  { id: '1', title: "Fight Club", director: "Tayfun Karlı", year: "1999", runtime: "149 min", genres: "Action", imdb: "8.8", ltb: "9.9", miq: "9.9", summary: "Uykusuzluk çeken bir ofis çalışanı...", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '3', title: "Lord of the Rings", director: "Tayfun Karlı", year: "2003", runtime: "201 min", genres: "Adventure", imdb: "9.0", ltb: "9.2", miq: "9.2", summary: "Gandalf ve Aragorn...", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '10', title: "Silence of the Lambs", director: "Tayfun Karlı", year: "1991", runtime: "118 min", genres: "Thriller", imdb: "8.6", ltb: "9.3", miq: "9.4", summary: "Genç bir FBI ajanı...", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '5', title: "Interstellar", director: "Tayfun Karlı", year: "2014", runtime: "169 min", genres: "Sci-Fi", imdb: "8.7", ltb: "9.7", miq: "9.7", summary: "Bir kaşif ekibi...", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" }
];

const MoviesPage = () => {
  // --- 🌟 ARAMA MOTORUNUN KALBİ BURASI 🌟 ---
  const [searchTerm, setSearchTerm] = useState("");

  // Yazılan kelimeye göre filmleri süzüyoruz
  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cyber-container">
      <style>{`
        .cyber-container { background-color: #05050a; min-height: 100vh; color: #fff; padding: 80px 30px; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden; }
        .cyber-container::before { content: ''; position: absolute; top: -20%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(0,0,0,0) 70%); z-index: 0; }
        .content-wrapper { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; }
        .neon-box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 10px rgba(0, 243, 255, 0.5); backdrop-filter: blur(5px); }
        .neon-box-pink { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 10px rgba(255, 0, 255, 0.5); }
        .cyber-input { background: transparent; border: 1px solid #00f3ff; color: #fff; border-radius: 8px; padding: 10px 15px; outline: none; }
        .cyber-input:focus { box-shadow: 0 0 10px #00f3ff; }
        .btn-pink { background: #ff00ff; color: #fff; border: none; padding: 10px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px #ff00ff; }
        .movies-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-top: 30px; }
        @media (max-width: 900px) { .movies-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="content-wrapper">
        {/* ÜST ARAMA ÇUBUĞU */}
        <div className="neon-box-cyan" style={{ padding: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* 🔍 Buraya dikkat! value ve onChange ekledik */}
          <input 
            type="text" 
            placeholder="Film Adı Ara..." 
            className="cyber-input" 
            style={{ flex: 1, minWidth: '150px' }} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-pink">Search</button>
        </div>

        <div className="movies-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 🎬 moviesData yerine artık filteredMovies listesini dönüyoruz */}
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                  <div className={index % 2 === 0 ? "neon-box-pink" : "neon-box-cyan"} style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center' }}>
                    <img src={movie.poster} alt={movie.title} style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h2 style={{ color: '#fff', textShadow: index % 2 === 0 ? '0 0 10px #ff00ff' : '0 0 10px #00f3ff' }}>{movie.title}</h2>
                      <p style={{ color: '#ccc' }}>Yönetmen: {movie.director} | Yıl: {movie.year}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ textAlign: 'center', fontSize: '20px', color: '#ff00ff' }}>Aradığın film siber uzayda bulunamadı! 🛸</p>
            )}
          </div>

          {/* SAĞ TARAF (Sabit Kalan Kısım) */}
          <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center', height: 'fit-content' }}>
            <h3 style={{ color: '#00f3ff' }}>Stats</h3>
            <p style={{ fontSize: '24px' }}>{filteredMovies.length} Film Bulundu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
