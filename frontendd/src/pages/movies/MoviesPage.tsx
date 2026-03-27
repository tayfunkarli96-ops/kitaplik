import React, { useState } from 'react';

const MEGA_ARSIV = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '2', title: "Inception", director: "Christopher Nolan", year: "2010", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: '3', title: "Lord of the Rings", director: "Peter Jackson", year: "2003", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '4', title: "The Matrix", director: "Wachowskis", year: "1999", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: '5', title: "Interstellar", director: "C. Nolan", year: "2014", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: '6', title: "The Dark Knight", director: "C. Nolan", year: "2008", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" },
  { id: '7', title: "Pulp Fiction", director: "Q. Tarantino", year: "1994", imdb: "8.9", poster: "https://image.tmdb.org/t/p/w500/fIE3lYDrK4S5I56yAAnAn5CAndY.jpg" },
  { id: '8', title: "The Godfather", director: "F. F. Coppola", year: "1972", imdb: "9.2", poster: "https://image.tmdb.org/t/p/w500/3bhb76346b96b42b6a555986b.jpg" },
  { id: '9', title: "Silence of the Lambs", director: "J. Demme", year: "1991", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg" },
  { id: '10', title: "Joker", director: "Todd Phillips", year: "2019", imdb: "8.4", poster: "https://image.tmdb.org/t/p/w500/udDcl707OTZ8AnAnAnAn.jpg" },
  { id: '11', title: "Seven", director: "David Fincher", year: "1995", imdb: "8.6", poster: "https://image.tmdb.org/t/p/w500/69AnAnAnAnAnAnAnAn.jpg" },
  { id: '12', title: "Blade Runner 2049", director: "D. Villeneuve", year: "2017", imdb: "8.0", poster: "https://m.media-amazon.com/images/I/71Y87B57XkL._AC_SL1200_.jpg" },
  { id: '13', title: "Parasite", director: "Bong Joon-ho", year: "2019", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/7IiTTjYlkAnAn5CAndAnCAndA.jpg" },
  { id: '14', title: "The Prestige", director: "C. Nolan", year: "2006", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/bdN3gvl98m96SpxYm8_3bhb.jpg" },
  { id: '15', title: "Gladiator", director: "Ridley Scott", year: "2000", imdb: "8.5", poster: "https://image.tmdb.org/t/p/w500/ty8Tj9He86p6o6o6o6o6o6.jpg" }
];

export default function MoviesPage() {
  const [ara, setAra] = useState("");
  const sonuclar = MEGA_ARSIV.filter(m => m.title.toLowerCase().includes(ara.toLowerCase()));

  return (
    <div style={{ background: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <style>{`
        .neon-mavi { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; margin-bottom: 20px; padding: 20px; }
        .neon-pembe { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 15px #ff00ff; margin-bottom: 20px; padding: 20px; }
        .inp-cyber { background: transparent; border: 1px solid #00f3ff; color: #fff; border-radius: 25px; padding: 12px 20px; width: 100%; outline: none; margin-bottom: 30px; }
        .btn-pembe { background: #ff00ff; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; width: 100%; box-shadow: 0 0 10px #ff00ff; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#00f3ff', textShadow: '0 0 10px #00f3ff', marginBottom: '40px' }}>🎬 CORNFLIX MEGA ARŞİV</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '30px' }}>
          
          {/* SOL: FİLMLER */}
          <div>
            <input className="inp-cyber" placeholder="Film Ara..." value={ara} onChange={(e) => setAra(e.target.value)} />
            {sonuclar.map((m, i) => (
              <div key={m.id} className={i % 2 === 0 ? "neon-pembe" : "neon-mavi"} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={m.poster} style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '10px' }} alt={m.title} />
                <div>
                  <h2 style={{ margin: 0 }}>{m.title}</h2>
                  <p style={{ color: '#ccc' }}>{m.director} | {m.year}</p>
                  <b style={{ color: '#f5c518' }}>⭐ {m.imdb}</b>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ: DASHBOARD (İŞTE BURADALAR!) */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="neon-pembe" style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Stats</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{sonuclar.length} Film Aktif</div>
            </div>

            <div className="neon-pembe" style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Comment</h3>
              <div style={{ fontSize: '50px' }}>💬</div>
              <p style={{ fontWeight: 'bold' }}>23 Görüş Bildirildi</p>
              <button className="btn-pembe">Görüş Bildir</button>
            </div>

            <div className="neon-mavi">
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Son Görüşler</h3>
              <div style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6' }}>
                <p>👤 "Arşiv resmen uçuyor moruk!"</p>
                <p>👤 "Siberpunk tasarım akıyor."</p>
                <p>👤 "Tayfun Karlı her yerde!"</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
