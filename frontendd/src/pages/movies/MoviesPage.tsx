import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- 🎬 DEV SİBER ARŞİV (TAM 15 FİLM) ---
const devArsiv = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", genres: "Drama", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '2', title: "Inception", director: "Christopher Nolan", year: "2010", genres: "Sci-Fi", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: '3', title: "The Matrix", director: "Wachowskis", year: "1999", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: '4', title: "Interstellar", director: "C. Nolan", year: "2014", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: '5', title: "The Dark Knight", director: "C. Nolan", year: "2008", genres: "Action", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" },
  { id: '6', title: "Pulp Fiction", director: "Tarantino", year: "1994", genres: "Crime", imdb: "8.9", poster: "https://image.tmdb.org/t/p/w500/fIE3lYDrK4S5I56yAAnAn5CAndY.jpg" },
  { id: '7', title: "The Godfather", director: "Coppola", year: "1972", genres: "Crime", imdb: "9.2", poster: "https://image.tmdb.org/t/p/w500/3bhb76346b96b42b6a555986b.jpg" },
  { id: '8', title: "Lord of the Rings", director: "Peter Jackson", year: "2003", genres: "Adventure", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '9', title: "Silence of the Lambs", director: "Jonathan Demme", year: "1991", genres: "Thriller", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '10', title: "Joker", director: "Todd Phillips", year: "2019", genres: "Drama", imdb: "8.4", poster: "https://image.tmdb.org/t/p/w500/udDcl707OTZ8AnAnAnAn.jpg" },
  { id: '11', title: "Parasite", director: "Bong Joon-ho", year: "2019", genres: "Thriller", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/7IiTTjYlkAnAn5CAndAnCAndA.jpg" },
  { id: '12', title: "Seven", director: "David Fincher", year: "1995", genres: "Mystery", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/69AnAnAnAnAnAnAnAn.jpg" },
  { id: '13', title: "Blade Runner 2049", director: "Villeneuve", year: "2017", genres: "Sci-Fi", imdb: "8.0", poster: "https://m.media-amazon.com/images/I/71Y87B57XkL._AC_SL1200_.jpg" },
  { id: '14', title: "The Prestige", director: "C. Nolan", year: "2006", genres: "Drama", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/bdN3gvl98m96SpxYm8_3bhb.jpg" },
  { id: '15', title: "Gladiator", director: "Ridley Scott", year: "2000", genres: "Action", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/ty8Tj9He86p6o6o6o6o6o6.jpg" }
];

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Arama filtresi
  const filteredMovies = devArsiv.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 30px', fontFamily: 'sans-serif' }}>
      <style>{`
        .neon-box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; }
        .neon-box-pink { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 15px #ff00ff; }
        .btn-search { background: #ff00ff; color: #fff; border: none; padding: 10px 30px; border-radius: 20px; font-weight: bold; cursor: pointer; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 🔍 ARAMA ÇUBUĞU (Ekran görüntündeki tasarım) */}
        <div className="neon-box-cyan" style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px' }}>
          <input 
            type="text" 
            placeholder="Film Adı Ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '20px', outline: 'none' }}
          />
          <button className="btn-search">Search</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          
          {/* SOL: FİLM LİSTESİ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredMovies.map((movie, index) => (
              <div key={movie.id} className={index % 2 === 0 ? "neon-box-pink" : "neon-box-cyan"} style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center' }}>
                <img src={movie.poster} alt={movie.title} style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>{movie.title}</h2>
                  <p style={{ color: '#aaa', margin: 0 }}>Yönetmen: {movie.director} | Yıl: {movie.year}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ: STATS KUTUSU (Rakam artık otomatik değişecek!) */}
          <div className="neon-box-pink" style={{ padding: '40px', textAlign: 'center', height: 'fit-content', position: 'sticky', top: '120px' }}>
            <h3 style={{ color: '#00f3ff', margin: '0 0 20px 0' }}>Stats</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {filteredMovies.length} Film Bulundu
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
