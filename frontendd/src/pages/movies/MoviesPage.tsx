import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// 🎬 6 FİLMLİK ANALİZ EDİLMİŞ DATA
const MOCK_DATA = [
  { id: 1, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genres: ["Drama"], poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg" },
  { id: 2, title: "The Godfather", year: 1972, rating: 9.2, genres: ["Crime", "Drama"], poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
  { id: 3, title: "Pulp Fiction", year: 1994, rating: 8.9, genres: ["Crime", "Drama"], poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
  { id: 4, title: "Inception", year: 2010, rating: 8.8, genres: ["Action", "Sci-Fi"], poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg" },
  { id: 5, title: "Interstellar", year: 2014, rating: 8.6, genres: ["Adventure", "Sci-Fi"], poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" },
  { id: 6, title: "The Dark Knight", year: 2008, rating: 9.0, genres: ["Action", "Crime"], poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg" }
];

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredMovies, setFilteredMovies] = useState(MOCK_DATA);
  const [sortBy, setSortBy] = useState("rating");

  // Filtreleme ve Sıralama (Senin profesyonel örneğindeki mantık)
  useEffect(() => {
    let results = [...MOCK_DATA];
    const query = searchParams.get('query')?.toLowerCase() || "";
    
    if (query) {
      results = results.filter(m => m.title.toLowerCase().includes(query));
    }

    results.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

    setFilteredMovies(results);
  }, [searchParams, sortBy]);

  return (
    <div style={{ background: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <style>{`
        .neon-mavi { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; margin-bottom: 25px; padding: 20px; }
        .neon-pembe { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 15px #ff00ff; margin-bottom: 25px; padding: 25px; }
        .cyber-select { background: #111; border: 1px solid #00f3ff; color: #fff; padding: 10px; border-radius: 10px; outline: none; }
        .btn-pembe { background: #ff00ff; color: #fff; border: none; padding: 10px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; box-shadow: 0 0 10px #ff00ff; width: 100%; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ÜST FİLTRE PANELİ */}
        <div className="neon-mavi" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: '#00f3ff', textShadow: '0 0 10px #00f3ff' }}>CORNFLIX ARŞİV</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <select className="cyber-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">İmdb Puanı</option>
              <option value="year">Yıl</option>
              <option value="title">İsim</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '30px' }}>
          
          {/* SOL: FİLM LİSTESİ */}
          <div>
            {filteredMovies.map((movie, i) => (
              <div key={movie.id} className={i % 2 === 0 ? "neon-pembe" : "neon-mavi"} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={movie.poster} style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '10px' }} alt={movie.title} />
                <div>
                  <h2 style={{ margin: 0, fontSize: '24px' }}>{movie.title}</h2>
                  <p style={{ color: '#ccc', margin: '5px 0' }}>Yönetmen: Tayfun Karlı | {movie.year}</p>
                  <b style={{ color: '#f5c518' }}>⭐ {movie.rating}</b>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ: DASHBOARD (STATLAR & YORUMLAR) */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            
            <div className="neon-pembe" style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Stats</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{filteredMovies.length} Film Aktif</div>
            </div>

            <div className="neon-pembe" style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Comment</h3>
              <div style={{ fontSize: '50px' }}>💬</div>
              <p style={{ fontWeight: 'bold' }}>23 Görüş Bildirildi</p>
              <button className="btn-pembe">Görüş Bildir</button>
            </div>

            <div className="neon-mavi">
              <h3 style={{ color: '#00f3ff', marginTop: 0, borderBottom: '1px solid #111', paddingBottom: '10px' }}>Son Görüşler</h3>
              <div style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.8' }}>
                <p>👤 "Arşiv resmen akıyor moruk!"</p>
                <p>👤 "Siberpunk tasarım çok yakışmış."</p>
                <p>👤 "Tayfun Karlı her yerde!"</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
