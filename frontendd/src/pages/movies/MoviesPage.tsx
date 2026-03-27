import React, { useState } from 'react';

const ALTI_FILM = [
  { id: 1, title: "Fight Club", director: "David Fincher", year: 1999, rating: 8.8, poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: 2, title: "Inception", director: "C. Nolan", year: 2010, rating: 8.8, poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: 3, title: "Lord of the Rings", director: "Peter Jackson", year: 2003, rating: 9.0, poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: 4, title: "The Matrix", director: "Wachowskis", year: 1999, rating: 8.7, poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" },
  { id: 5, title: "Interstellar", director: "C. Nolan", year: 2014, rating: 8.7, poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepVNzMU5cBPklsR6G.jpg" },
  { id: 6, title: "The Dark Knight", director: "C. Nolan", year: 2008, rating: 9.0, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDw954Y72Vd5S4WvUE.jpg" }
];

export default function MoviesPage() {
  const [ara, setAra] = useState("");
  const sonuclar = ALTI_FILM.filter(m => m.title.toLowerCase().includes(ara.toLowerCase()));

  return (
    <div style={{ background: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <style>{`
        .box-cyan { border: 2px solid #00f3ff; border-radius: 12px; background: rgba(0, 15, 25, 0.7); box-shadow: 0 0 15px #00f3ff; margin-bottom: 20px; padding: 20px; }
        .box-pink { border: 2px solid #ff00ff; border-radius: 12px; background: rgba(25, 0, 15, 0.7); box-shadow: 0 0 15px #ff00ff; margin-bottom: 20px; padding: 25px; }
        .cyber-inp { background: transparent; border: 1px solid #00f3ff; color: #fff; border-radius: 20px; padding: 12px; width: 100%; outline: none; margin-bottom: 30px; }
        .btn-pink { background: #ff00ff; color: #fff; border: none; padding: 10px 30px; border-radius: 20px; font-weight: bold; cursor: pointer; width: 100%; }
      `}</style>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#00f3ff', textShadow: '0 0 10px #00f3ff', marginBottom: '40px' }}>🎬 CORNFLIX ARŞİV</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '30px' }}>
          <div>
            <input className="cyber-inp" placeholder="Film Ara..." value={ara} onChange={(e) => setAra(e.target.value)} />
            {sonuclar.map((m, i) => (
              <div key={m.id} className={i % 2 === 0 ? "box-pink" : "box-cyan"} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={m.poster} style={{ width: '90px', borderRadius: '10px' }} alt="" />
                <div><h2>{m.title}</h2><p>{m.director} | {m.year}</p><b>⭐ {m.rating}</b></div>
              </div>
            ))}
          </div>
          
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="box-pink" style={{ textAlign: 'center' }}><h3>Stats</h3><p style={{ fontSize: '24px' }}>{sonuclar.length} Film</p></div>
            <div className="box-pink" style={{ textAlign: 'center' }}><h3>Comment</h3><p style={{ fontSize: '40px' }}>💬</p><button className="btn-pink">Görüş Bildir</button></div>
            <div className="box-cyan"><h3>Son Görüşler</h3><p style={{ fontSize: '13px' }}>👤 "Siberpunk tasarım akıyor moruk!"</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
