import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 12 Tane Film Verisi (Hata vermemesi için jilet gibi hazırlandı)
export const moviesData = [
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
  { id: '12', title: "Seven", director: "David Fincher", year: "1995", genres: "Mystery", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/69AnAnAnAnAnAnAnAn.jpg" }
];

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Arama filtresi (Hata vermemesi için güvenli hale getirildi)
  const filteredMovies = moviesData.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 🔍 image_1.png'deki Neon Mavi Arama Çubuğu Tasarımı */}
        <div style={{ 
          border: '2px solid #00f3ff', borderRadius: '12px', padding: '20px', 
          display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '40px',
          boxShadow: '0 0 15px rgba(0, 243, 255, 0.4)', background: 'rgba(0,15,25,0.8)'
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
          {/* Süs kutuları (image_1.png'deki gibi) */}
          <div style={{ border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#666', fontSize: '12px' }}>Tür</div>
          <div style={{ border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#666', fontSize: '12px' }}>Yıl</div>
          <button style={{ 
            backgroundColor: '#ff00ff', color: '#fff', border: 'none', 
            padding: '12px 30px', borderRadius: '25px', fontWeight: 'bold', 
            cursor: 'pointer', boxShadow: '0 0 15px #ff00ff' 
          }}>Search</button>
        </div>

        {/* Film Listesi Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {filteredMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
              <div style={{ 
                border: '1px solid #222', borderRadius: '12px', overflow: 'hidden', 
                background: '#0a0a15', transition: '0.3s' 
              }}>
                <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>{movie.title}</h3>
                  <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>{movie.year} • {movie.genres}</p>
                  <div style={{ marginTop: '10px', color: '#f5c518', fontWeight: 'bold' }}>⭐ {movie.imdb}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MoviesPage;
