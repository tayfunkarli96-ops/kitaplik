import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- 🎬 YENİ VE DEV LİSTE (15 FİLM) ---
// İsmini 'yeniFilmler' yaptım ki eskisiyle karışmasın moruk.
const yeniFilmler = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", genres: "Drama", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '2', title: "Inception", director: "Christopher Nolan", year: "2010", genres: "Sci-Fi", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: '3', title: "The Matrix", director: "Wachowskis", year: "1999", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: '4', title: "Interstellar", director: "C. Nolan", year: "2014", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: '5', title: "The Dark Knight", director: "C. Nolan", year: "2008", genres: "Action", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" },
  { id: '6', title: "Pulp Fiction", director: "Tarantino", year: "1994", genres: "Crime", imdb: "8.9", poster: "https://image.tmdb.org/t/p/w500/fIE3lYDrK4S5I56yAAnAn5CAndY.jpg" },
  { id: '7', title: "The Godfather", director: "Coppola", year: "1972", genres: "Crime", imdb: "9.2", poster: "https://image.tmdb.org/t/p/w500/3bhb76346b96b42b6a555986b.jpg" },
  { id: '8', title: "The Prestige", director: "C. Nolan", year: "2006", genres: "Drama", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/bdN3gvl98m96SpxYm8_3bhb.jpg" },
  { id: '9', title: "Gladiator", director: "Ridley Scott", year: "2000", genres: "Action", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/ty8Tj9He86p6o6o6o6o6o6.jpg" },
  { id: '10', title: "The Departed", director: "Scorsese", year: "2006", genres: "Crime", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/3ueAnAnAnAnAnAnAnAn.jpg" },
  { id: '11', title: "Joker", director: "Todd Phillips", year: "2019", genres: "Drama", imdb: "8.4", poster: "https://image.tmdb.org/t/p/w500/udDcl707OTZ8AnAnAnAn.jpg" },
  { id: '12', title: "Seven", director: "David Fincher", year: "1995", genres: "Mystery", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/69AnAnAnAnAnAnAnAn.jpg" },
  { id: '13', title: "Parasite", director: "Bong Joon-ho", year: "2019", genres: "Thriller", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/7IiTTjYlkAnAn5CAndAnCAndA.jpg" },
  { id: '14', title: "Blade Runner 2049", director: "Denis Villeneuve", year: "2017", genres: "Siberpunk", imdb: "8.0", poster: "https://m.media-amazon.com/images/I/71Y87B57XkL._AC_SL1200_.jpg" },
  { id: '15', title: "The Shawshank Redemption", director: "Frank Darabont", year: "1994", genres: "Drama", imdb: "9.3", poster: "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_.jpg" }
];

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 Arama filtresi (yeniFilmler üzerinden çalışıyor)
  const filteredMovies = yeniFilmler.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 🌟 image_1.png'deki Neon Mavi Arama Çubuğu 🌟 */}
        <div style={{ 
          border: '2px solid #00f3ff', borderRadius: '12px', padding: '20px', 
          display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '40px',
          boxShadow: '0 0 20px rgba(0, 243, 255, 0.5)', background: 'rgba(0,15,25,0.8)',
          flexWrap: 'wrap'
        }}>
          <input 
            type="text" 
            placeholder="Film Adı Ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              flex: 1, background: 'transparent', border: '1px solid #00f3ff', 
              color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none'
            }}
          />
          <button style={{ 
            backgroundColor: '#ff00ff', color: '#fff', border: 'none', 
            padding: '12px 30px', borderRadius: '25px', fontWeight: 'bold', 
            cursor: 'pointer', boxShadow: '0 0 20px #ff00ff' 
          }}>Search</button>
        </div>

        {/* 🎬 Film Gridi */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
          {filteredMovies.map((movie) => (
            <div key={movie.id} style={{ border: '1px solid #222', borderRadius: '12px', overflow: 'hidden', background: '#0a0a15' }}>
              <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <h3 style={{ color: '#fff', margin: '0', fontSize: '18px' }}>{movie.title}</h3>
                <p style={{ color: '#666', fontSize: '13px' }}>{movie.year} • {movie.genres}</p>
                <div style={{ color: '#f5c518', fontWeight: 'bold' }}>⭐ {movie.imdb}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MoviesPage;
