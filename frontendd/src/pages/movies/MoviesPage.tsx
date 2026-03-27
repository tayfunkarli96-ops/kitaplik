import React from 'react';
import { Link } from 'react-router-dom';

export const moviesData = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", runtime: "149 min", genres: "Action, Thriller", imdb: "8.8", ltb: "9.9", miq: "9.9", summary: "Uykusuzluk çeken bir ofis çalışanı ve umursamaz bir sabun üreticisi, yeraltı dövüş kulübü kurarlar.", poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxZDYtMWJmNy00NzEwLThlODAtNWhmZWY0NWVkYTJlXkEyXkFqcGc@._V1_SX300.jpg" },
  { id: '2', title: "Spider-Man: Into the Spider-Verse", director: "Bob Persichetti", year: "2018", runtime: "117 min", genres: "Animation, Action", imdb: "8.4", ltb: "9.8", miq: "9.8", summary: "Genç Miles Morales, kendi evreninin Örümcek Adam'ı olur.", poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg" },
  { id: '3', title: "The Lord of the Rings: The Return of the King", director: "Peter Jackson", year: "2003", runtime: "201 min", genres: "Adventure, Drama", imdb: "9.0", ltb: "9.2", miq: "9.2", summary: "Gandalf ve Aragorn, İnsanlık Dünyası'na liderlik ederler.", poster: "https://m.media-amazon.com/images/M/MV5BMTZkN2ZlYmEtN2RjNi00Zjk5LWFhN2ItYjBkNmI1ZDFiYzBhXkEyXkFqcGc@._V1_SX300.jpg" },
  { id: '4', title: "The Dark Knight", director: "Christopher Nolan", year: "2008", runtime: "152 min", genres: "Action, Crime", imdb: "9.0", ltb: "9.5", miq: "9.5", summary: "Joker olarak bilinen tehdit, Gotham halkına kaos getirir.", poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
  { id: '5', title: "Interstellar", director: "Christopher Nolan", year: "2014", runtime: "169 min", genres: "Adventure, Sci-Fi", imdb: "8.7", ltb: "9.7", miq: "9.7", summary: "Bir kaşif ekibi uzaydaki bir solucan deliğinden geçer.", poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjNjYjZlY2Y3YWBiZGIL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" },
  { id: '6', title: "The Matrix", director: "Lana Wachowski", year: "1999", runtime: "136 min", genres: "Action, Sci-Fi", imdb: "8.7", ltb: "9.6", miq: "9.8", summary: "Bir bilgisayar korsanı, gerçeğin şok edici yüzünü keşfeder.", poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
  { id: '7', title: "Inception", director: "Christopher Nolan", year: "2010", runtime: "148 min", genres: "Action, Sci-Fi", imdb: "8.8", ltb: "9.4", miq: "9.5", summary: "Kurumsal sırları çalan bir hırsıza yeni bir görev verilir.", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
  { id: '8', title: "Pulp Fiction", director: "Quentin Tarantino", year: "1994", runtime: "154 min", genres: "Crime, Drama", imdb: "8.9", ltb: "9.8", miq: "9.6", summary: "Suç dünyasının farklı karakterlerinin hikayeleri kesişiyor.", poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTItNDJhNi00Mzc1LTgwZWEtNzFlYmEzN2QwMjc1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" }
];

const MoviesPage = () => {
  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white', padding: '100px 40px', fontFamily: 'sans-serif' }}>
      
      {/* ÜST FİLTRELEME ÇUBUĞU (Kendi iç stiliyle, bozulmaz) */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 40px auto', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', padding: '15px', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
        <input type="text" placeholder="Başlığa göre ara..." style={{ backgroundColor: '#0f0f0f', border: '1px solid #333', padding: '10px', borderRadius: '5px', color: 'white', flex: '1', minWidth: '150px' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#999' }}>Sırala:</span>
          <select style={{ backgroundColor: '#0f0f0f', border: '1px solid #333', padding: '10px', borderRadius: '5px', color: '#ddd' }}>
            <option>Puan (Yüksekten Düşüğe)</option>
          </select>
        </div>
        
        <input type="text" placeholder="Yıl (örn., 2023)" style={{ backgroundColor: '#0f0f0f', border: '1px solid #333', padding: '10px', borderRadius: '5px', color: 'white', width: '120px' }} />
        <input type="text" placeholder="Min. Puan" style={{ backgroundColor: '#0f0f0f', border: '1px solid #333', padding: '10px', borderRadius: '5px', color: 'white', width: '100px' }} />
        
        <select style={{ backgroundColor: '#0f0f0f', border: '1px solid #333', padding: '10px', borderRadius: '5px', color: '#ddd' }}>
            <option>Tüm Türler</option>
        </select>
        
        <button style={{ backgroundColor: '#00e676', border: 'none', padding: '10px 20px', borderRadius: '5px', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
          Filtreleri Uygula
        </button>
      </div>

      {/* YATAY FİLM LİSTESİ (Kendi iç stiliyle, bozulmaz) */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {moviesData.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ display: 'flex', backgroundColor: '#141414', border: '1px solid #222', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer' }}>
              
              {/* Poster */}
              <img src={movie.poster} alt={movie.title} style={{ width: '130px', height: '190px', objectFit: 'cover' }} />
              
              {/* İçerik */}
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                
                {/* Üst Kısım: Başlık ve Rozetler */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{movie.title}</h2>
                  
                  {/* Fotoğraftaki Renkli Rozetler */}
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 'bold' }}>
                    <span style={{ backgroundColor: '#f5c518', color: 'black', padding: '4px 8px', borderRadius: '4px' }}>IMDb: {movie.imdb}</span>
                    <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>LTB: {movie.ltb}</span>
                    <span style={{ backgroundColor: '#0f172a', color: '#38bdf8', border: '1px solid #1e293b', padding: '4px 8px', borderRadius: '4px' }}>M iQ: {movie.miq}</span>
                  </div>
                </div>

                {/* Alt Kısım: Detaylar */}
                <div style={{ fontSize: '13px', color: '#999', lineHeight: '1.8' }}>
                  <p style={{ margin: '0' }}>🎬 Director: {movie.director}</p>
                  <p style={{ margin: '0' }}>📅 Year: {movie.year}</p>
                  <p style={{ margin: '0' }}>🕒 Runtime: {movie.runtime}</p>
                  <p style={{ margin: '0' }}>🎭 Genres: {movie.genres}</p>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
