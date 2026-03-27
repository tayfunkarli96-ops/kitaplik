import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- 🎬 EFSANE ARŞİV (12 FİLM - YÖNETMENLER GÜNCELLENDİ) ---
const filmVerisi = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", genres: "Drama", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '3', title: "Lord of the Rings", director: "Peter Jackson", year: "2003", genres: "Adventure", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '10', title: "Silence of the Lambs", director: "Jonathan Demme", year: "1991", genres: "Thriller", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '5', title: "Interstellar", director: "Christopher Nolan", year: "2014", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: '6', title: "The Matrix", director: "Wachowskis", year: "1999", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: '2', title: "Inception", director: "Christopher Nolan", year: "2010", genres: "Sci-Fi", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: '7', title: "The Dark Knight", director: "C. Nolan", year: "2008", genres: "Action", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" },
  { id: '8', title: "Pulp Fiction", director: "Tarantino", year: "1994", genres: "Crime", imdb: "8.9", poster: "https://image.tmdb.org/t/p/w500/fIE3lYDrK4S5I56yAAnAn5CAndY.jpg" },
  { id: '9', title: "The Godfather", director: "Coppola", year: "1972", genres: "Crime", imdb: "9.2", poster: "https://image.tmdb.org/t/p/w500/3bhb76346b96b42b6a555986b.jpg" },
  { id: '11', title: "Joker", director: "Todd Phillips", year: "2019", genres: "Drama", imdb: "8.4", poster: "https://image.tmdb.org/t/p/w500/udDcl707OTZ8AnAnAnAn.jpg" },
  { id: '12', title: "Seven", director: "David Fincher", year: "1995", genres: "Mystery", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/69AnAnAnAnAnAnAnAn.jpg" },
  { id: '13', title: "Blade Runner 2049", director: "Villeneuve", year: "2017", genres: "Sci-Fi", imdb: "8.0", poster: "https://m.media-amazon.com/images/I/71Y87B57XkL._AC_SL1200_.jpg" }
];

const MoviesPage = () => {
  const [ara, setAra] = useState("");

  const filtrelenenler = filmVerisi.filter(f => 
    f.title.toLowerCase().includes(ara.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '80px 20px', fontFamily: 'sans-serif' }}>
      <style>{`
        .neon-box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; margin-bottom: 20px; }
        .neon-box-pink { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 15px #ff00ff; margin-bottom: 20px; }
        .cyber-input { background: transparent; border: 1px solid #00f3ff; color: #fff; border-radius: 20px; padding: 12px 20px; outline: none; flex: 1; }
        .btn-pink { background: #ff00ff; color: #fff; border: none; padding: 10px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px #ff00ff; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 🛠️ BU YAZIYI GÖRÜYORSAN DOĞRU DOSYADAYIZ MORUK */}
        <h1 style={{ color: '#ff00ff', textShadow: '0 0 10px #ff00ff', textAlign: 'center', marginBottom: '40px' }}>⚡ ARAYÜZ GÜNCELLENDİ - 2026</h1>

        {/* 🔍 ARAMA ÇUBUĞU */}
        <div className="neon-box-cyan" style={{ padding: '20px', display: 'flex', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Film Ara (Hadi Şov Başlasın)..." 
            className="cyber-input" 
            value={ara}
            onChange={(e) => setAra(e.target.value)}
          />
          <button className="btn-pink">SEARCH</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginTop: '30px' }}>
          
          {/* SOL: FİLMLER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filtrelenenler.map((m, i) => (
              <div key={m.id} className={i % 2 === 0 ? "neon-box-pink" : "neon-box-cyan"} style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center' }}>
                <img src={m.poster} alt={m.title} style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', color: '#fff' }}>{m.title}</h2>
                  <p style={{ color: '#ccc' }}>Yönetmen: <span style={{color: '#00f3ff'}}>{m.director}</span> | Yıl: {m.year}</p>
                  <div style={{ marginTop: '10px', color: '#f5c518', fontWeight: 'bold' }}>⭐ {m.imdb}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ: İSTEDİĞİN YORUMLAR VE STATS (GERİ GELDİ!) */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 📊 Stats */}
            <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', margin: '0 0 10px 0' }}>Stats</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{filtrelenenler.length} Film Bulundu</div>
            </div>

            {/* 💬 Comment & Görüş Bildir */}
            <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', fontSize: '24px', margin: '0 0 15px 0' }}>Comment</h3>
              <p style={{ fontSize: '40px' }}>💬</p>
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>23 Görüş Bildirildi</p>
              <button className="btn-pink" style={{ width: '100%', marginTop: '15px' }}>Görüş Bildir</button>
            </div>

            {/* 📡 Son Görüşler Feed */}
            <div className="neon-box-cyan" style={{ padding: '20px' }}>
              <h3 style={{ color: '#00f3ff', marginBottom: '15px' }}>Son Görüşler</h3>
              <div style={{ fontSize: '14px', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ borderBottom: '1px solid #111', paddingBottom: '8px' }}>👤 "Siberpunk arayüz akıyor, Tayfun Karlı yapmış!"</div>
                <div>👤 "Arama motoru sonunda canlanmış, helal."</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
