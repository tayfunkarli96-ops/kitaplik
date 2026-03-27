import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 🎬 15 FİLMLİK DEV LİSTE (Tayfun Karlı Yönetmenliğinde!)
const FILMLER = [
  { id: '1', title: "Fight Club", director: "Tayfun Karlı", year: "1999", genres: "Action/Drama", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '2', title: "Inception", director: "Tayfun Karlı", year: "2010", genres: "Sci-Fi", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: '3', title: "Lord of the Rings", director: "Tayfun Karlı", year: "2003", genres: "Adventure", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '4', title: "The Matrix", director: "Tayfun Karlı", year: "1999", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: '5', title: "Interstellar", director: "Tayfun Karlı", year: "2014", genres: "Sci-Fi", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: '6', title: "The Dark Knight", director: "Tayfun Karlı", year: "2008", genres: "Action", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" },
  { id: '7', title: "Pulp Fiction", director: "Tayfun Karlı", year: "1994", genres: "Crime", imdb: "8.9", poster: "https://image.tmdb.org/t/p/w500/fIE3lYDrK4S5I56yAAnAn5CAndY.jpg" },
  { id: '8', title: "The Godfather", director: "Tayfun Karlı", year: "1972", genres: "Crime", imdb: "9.2", poster: "https://image.tmdb.org/t/p/w500/3bhb76346b96b42b6a555986b.jpg" },
  { id: '9', title: "Silence of the Lambs", director: "Tayfun Karlı", year: "1991", genres: "Thriller", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '10', title: "Joker", director: "Tayfun Karlı", year: "2019", genres: "Drama", imdb: "8.4", poster: "https://image.tmdb.org/t/p/w500/udDcl707OTZ8AnAnAnAn.jpg" },
  { id: '11', title: "Seven", director: "Tayfun Karlı", year: "1995", genres: "Mystery", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/69AnAnAnAnAnAnAnAn.jpg" },
  { id: '12', title: "Blade Runner 2049", director: "Tayfun Karlı", year: "2017", genres: "Sci-Fi", imdb: "8.0", poster: "https://m.media-amazon.com/images/I/71Y87B57XkL._AC_SL1200_.jpg" },
  { id: '13', title: "Parasite", director: "Tayfun Karlı", year: "2019", genres: "Thriller", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/7IiTTjYlkAnAn5CAndAnCAndA.jpg" },
  { id: '14', title: "The Prestige", director: "Tayfun Karlı", year: "2006", genres: "Drama", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/bdN3gvl98m96SpxYm8_3bhb.jpg" },
  { id: '15', title: "Gladiator", director: "Tayfun Karlı", year: "2000", genres: "Action", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/ty8Tj9He86p6o6o6o6o6o6.jpg" }
];

const MoviesPage = () => {
  const [term, setTerm] = useState("");
  const filtered = FILMLER.filter(f => f.title.toLowerCase().includes(term.toLowerCase()));

  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '80px 30px', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`
        .neon-box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 12px #00f3ff; margin-bottom: 20px; }
        .neon-box-pink { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 12px #ff00ff; margin-bottom: 20px; }
        .cyber-input { background: transparent; border: 1px solid #00f3ff; color: #fff; border-radius: 20px; padding: 12px 20px; outline: none; flex: 1; }
        .btn-pink { background: #ff00ff; color: #fff; border: none; padding: 10px 25px; border-radius: 25px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px #ff00ff; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ARAMA ÇUBUĞU */}
        <div className="neon-box-cyan" style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input type="text" placeholder="Film Ara..." className="cyber-input" value={term} onChange={(e) => setTerm(e.target.value)} />
          <button className="btn-pink">Search</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginTop: '30px' }}>
          
          {/* SOL: FİLMLER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filtered.map((m, i) => (
              <div key={m.id} className={i % 2 === 0 ? "neon-box-pink" : "neon-box-cyan"} style={{ display: 'flex', padding: '15px', gap: '20px', alignItems: 'center' }}>
                <img src={m.poster} alt={m.title} style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h2 style={{ margin: '0 0 5px 0', textShadow: i % 2 === 0 ? '0 0 8px #ff00ff' : '0 0 8px #00f3ff' }}>{m.title}</h2>
                  <p style={{ color: '#ccc', margin: 0 }}>Yönetmen: {m.director} | Yıl: {m.year}</p>
                  <div style={{ marginTop: '10px', color: '#f5c518', fontWeight: 'bold' }}>⭐ {m.imdb}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ: STATS, COMMENT VE GÖRÜŞLER (ESKİ HALİNE DÖNDÜ) */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff' }}>Stats</h3>
              <div style={{ fontSize: '30px', fontWeight: 'bold' }}>{filtered.length} Film Bulundu</div>
            </div>

            <div className="neon-box-pink" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', fontSize: '22px' }}>Comment</h3>
              <p style={{ fontSize: '40px' }}>💬</p>
              <p style={{ fontWeight: 'bold' }}>23 Görüş Bildirildi</p>
              <button className="btn-pink" style={{ width: '100%' }}>Görüş Bildir</button>
            </div>

            <div className="neon-box-cyan" style={{ padding: '20px' }}>
              <h3 style={{ color: '#00f3ff', fontSize: '18px' }}>Son Görüşler</h3>
              <div style={{ fontSize: '13px', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ borderBottom: '1px solid #111', paddingBottom: '8px' }}>👤 "Tayfun Karlı farkı moruk!"</div>
                <div>👤 "Arama motoru akıyor."</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
