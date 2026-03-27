import React, { useState } from 'react';

const ALTI_FILM = [
  { id: 1, title: "Fight Club", director: "David Fincher", year: 1999, rating: 8.8, poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: 2, title: "Inception", director: "Christopher Nolan", year: 2010, rating: 8.8, poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: 3, title: "Lord of the Rings", director: "Peter Jackson", year: 2003, rating: 9.0, poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: 4, title: "The Matrix", director: "Wachowskis", year: 1999, rating: 8.7, poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: 5, title: "Interstellar", director: "Christopher Nolan", year: 2014, rating: 8.7, poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: 6, title: "The Dark Knight", director: "Christopher Nolan", year: 2008, rating: 9.0, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" }
];

export default function MoviesPage() {
  const [term, setTerm] = useState("");
  const filtered = ALTI_FILM.filter(m => m.title.toLowerCase().includes(term.toLowerCase()));

  return (
    <div style={{ background: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <style>{`
        .box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; margin-bottom: 20px; padding: 20px; }
        .box-pink { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 15px #ff00ff; margin-bottom: 20px; padding: 25px; }
        .btn-cyber { background: #ff00ff; color: #fff; border: none; padding: 12px; border-radius: 20px; font-weight: bold; cursor: pointer; width: 100%; box-shadow: 0 0 10px #ff00ff; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#00f3ff', textShadow: '0 0 10px #00f3ff', marginBottom: '40px' }}>🎬 CORNFLIX ARŞİV (6 FİLM)</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '30px' }}>
          {/* SOL: FİLMLER */}
          <div>
            <input style={{ width: '100%', padding: '12px', borderRadius: '20px', background: 'transparent', border: '1px solid #00f3ff', color: '#fff', marginBottom: '20px' }} 
                   placeholder="Film Ara..." value={term} onChange={(e) => setTerm(e.target.value)} />
            {filtered.map((m, i) => (
              <div key={m.id} className={i % 2 === 0 ? "box-pink" : "box-cyan"} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={m.poster} style={{ width: '90px', borderRadius: '10px' }} alt="" />
                <div><h2>{m.title}</h2><p>{m.director} | {m.year}</p><b>⭐ {m.rating}</b></div>
              </div>
            ))}
          </div>

          {/* SAĞ: İSTEDİĞİN YORUMLAR VE STATLAR */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="box-pink" style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Stats</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{filtered.length} Film Aktif</div>
            </div>

            <div className="box-pink" style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Comment</h3>
              <div style={{ fontSize: '50px' }}>💬</div>
              <p style={{ fontWeight: 'bold' }}>23 Görüş Bildirildi</p>
              <button className="btn-cyber">Görüş Bildir</button>
            </div>

            <div className="box-cyan">
              <h3 style={{ color: '#00f3ff', marginTop: 0 }}>Son Görüşler</h3>
              <div style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.6' }}>
                <p>👤 "Arşiv resmen uçuyor moruk!"</p>
                <p>👤 "Siberpunk tasarım akıyor."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
