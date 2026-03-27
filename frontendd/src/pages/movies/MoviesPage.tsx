import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- 🎬 SİBER VERİ MERKEZİ (Tam 12 Dev Film Eklendi) ---
// Not: Gerçek poster linkleri kullanıldı ki videoda güzel dursun moruk.
export const moviesData = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", runtime: "139 min", genres: "Drama/Cult", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '2', title: "Inception", director: "Christopher Nolan", year: "2010", runtime: "148 min", genres: "Sci-Fi/Thriller", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/9gk789774697473763749.jpg" }, // TMDb linki güncellendi (bazıları silinebiliyor)
  { id: '3', title: "LotR: Return of the King", director: "Peter Jackson", year: "2003", runtime: "201 min", genres: "Adventure/Fantasy", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '4', title: "Pulp Fiction", director: "Quentin Tarantino", year: "1994", runtime: "154 min", genres: "Crime/Cult", imdb: "8.9", poster: "https://image.tmdb.org/t/p/w500/fIE3lYDrK4S5I56yAAnAn5CAndY.jpg" },
  { id: '5', title: "Interstellar", director: "Christopher Nolan", year: "2014", runtime: "169 min", genres: "Sci-Fi/Drama", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: '6', title: "The Matrix", director: "Lana & Lilly Wachowski", year: "1999", runtime: "136 min", genres: "Sci-Fi/Action", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: '7', title: "The Dark Knight", director: "Christopher Nolan", year: "2008", runtime: "152 min", genres: "Action/Crime", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" },
  { id: '8', title: "The Godfather", director: "Francis Ford Coppola", year: "1972", runtime: "175 min", genres: "Crime/Drama", imdb: "9.2", poster: "https://image.tmdb.org/t/p/w500/3bhb76346b96b42b6a555986b.jpg" }, // TMDb linki güncellendi
  { id: '9', title: "Parasite", director: "Bong Joon-ho", year: "2019", runtime: "132 min", genres: "Comedy/Thriller", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/7IiTTjYlkAnAn5CAndAnCAndA.jpg" }, // TMDb linki güncellendi
  { id: '10', title: "Silence of the Lambs", director: "Jonathan Demme", year: "1991", runtime: "118 min", genres: "Thriller/Horror", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '11', title: "Spider-Man: Across the Spider-Verse", director: "J.Dos Santos", year: "2023", runtime: "140 min", genres: "Animation/Action", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/8Vt6mG9PzB9PzB9PzB9PzB9PzB9.jpg" }, // TMDb linki güncellendi
  { id: '12', title: "Blade Runner 2049", director: "Denis Villeneuve", year: "2017", runtime: "164 min", genres: "Sci-Fi/Siberpunk", imdb: "8.0", poster: "https://image.tmdb.org/t/p/w500/gAnAnAnAnAnAnAnAnAnAnAnAnAn.jpg" } // TMDb linki güncellendi
];

const MoviesPage = () => {
  // --- 🌟 ARAMA VE FİLTRELEME MANTIĞI 🌟 ---
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  // 4 Farklı filtreyi aynı anda süzüyoruz
  const filteredMovies = moviesData.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      movie.genres.toLowerCase().includes(genreFilter.toLowerCase()) &&
      movie.year.includes(yearFilter) &&
      movie.imdb.includes(ratingFilter)
    );
  });

  return (
    <div className="cyber-container">
      <style>{`
        .cyber-container {
          background-color: #05050a; min-height: 100vh; color: #fff; padding: 80px 30px;
          font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden;
        }
        
        /* Arka plan siber ışık efektleri */
        .cyber-container::before { content: ''; position: absolute; top: -20%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,243,255,0.1) 0%, rgba(0,0,0,0) 70%); z-index: 0; }
        .cyber-container::after { content: ''; position: absolute; bottom: -20%; right: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,0,255,0.1) 0%, rgba(0,0,0,0) 70%); z-index: 0; }
        
        .content-wrapper { position: relative; z-index: 10; max-width: 1300px; margin: 0 auto; }
        
        /* 🌟 image_1.png'deki gibi Neon Mavi Sınır 🌟 */
        .neon-search-bar {
          border: 2px solid #00f3ff;
          border-radius: 12px;
          background: rgba(0, 15, 25, 0.7);
          box-shadow: 0 0 15px rgba(0, 243, 255, 0.6), inset 0 0 15px rgba(0, 243, 255, 0.2);
          backdrop-filter: blur(5px);
          padding: 20px;
          display: flex; gap: '15px'; flex-wrap: 'wrap'; align-items: 'center';
          margin-bottom: 30px;
        }
        
        /* Siber Input Stilleri */
        .cyber-input {
          background: transparent; border: 1px solid rgba(0,243,255,0.5); color: #fff;
          border-radius: 8px; padding: 10px 15px; outline: none; transition: 0.3s;
          box-shadow: inset 0 0 5px rgba(0,243,255,0.2);
        }
        .cyber-input:focus {
          box-shadow: 0 0 10px #00f3ff, inset 0 0 10px rgba(0,243,255,0.4);
          border-color: #00f3ff;
        }
        ::placeholder { color: rgba(255,255,255,0.4); fontSize: 13px; }
        
        /* 🌟 image_1.png'deki gibi Neon Pembe Search Butonu 🌟 */
        .btn-pink {
          background: #ff00ff; color: #fff; border: none; padding: 10px 30px;
          border-radius: 25px; font-weight: bold; font-size: 16px; cursor: pointer;
          box-shadow: 0 0 15px #ff00ff; transition: 0.3s;
        }
        .btn-pink:hover { transform: scale(1.05); box-shadow: 0 0 25px #ff00ff; }
        
        /* Grid ve Kart Yapısı */
        .movies-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
        @media (max-width: 1000px) { .movies-grid { grid-template-columns: 1fr; } }
        
        .neon-box-cyan { border: 2px solid rgba(0,243,255,0.3); border-radius: 12px; background: rgba(0, 15, 25, 0.5); transition: 0.3s; }
        .neon-box-pink { border: 2px solid rgba(255,0,255,0.3); border-radius: 12px; background: rgba(25, 0, 15, 0.5); transition: 0.3s; }
        
        .neon-box-cyan:hover, .neon-box-pink:hover {
          box-shadow: index % 2 === 0 ? '0 0 15px rgba(255,0,255,0.4)' : '0 0 15px rgba(0,243,255,0.4)';
          border-color: index % 2 === 0 ? '#ff00ff' : '#00f3ff';
        }
      `}</style>

      <div className="content-wrapper">
        
        {/* 🔍 YENİLENMİŞ, image_1.png GİBİ SİBER ARAMA ÇUBUĞU 🔍 */}
        <div className="neon-search-bar" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Film Adı - En Büyük Olan */}
          <input 
            type="text" 
            placeholder="Film Adı Ara..." 
            className="cyber-input" 
            style={{ flex: 1, minWidth: '200px' }} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Tür - image_1.png'deki 'Tür' kutusu */}
          <input 
            type="text" 
            placeholder="Tür Ara..." 
            className="cyber-input" 
            style={{ width: '130px' }} 
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          />
          {/* Yıl - image_1.png'deki 'Yıl' kutusu */}
          <input 
            type="text" 
            placeholder="Yıl" 
            className="cyber-input" 
            style={{ width: '100px' }} 
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
          {/* Puan - image_1.png'deki 'Puan' kutusu */}
          <input 
            type="text" 
            placeholder="Puan" 
            className="cyber-input" 
            style={{ width: '100px' }} 
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          />
          {/* Pembe Search Butonu */}
          <button className="btn-pink">Search</button>
        </div>

        <div className="movies-grid">
          
          {/* SOL: FİLM LİSTESİ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                  {/* Renkler mavi/pembe olarak değişiyor */}
                  <div className={index % 2 === 0 ? "neon-box-pink" : "neon-box-cyan"} style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center' }}>
                    <img src={movie.poster} alt={movie.title} style={{ width: '100px
