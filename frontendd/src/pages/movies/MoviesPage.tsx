import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ARSIV = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: '2', title: "Inception", director: "Christopher Nolan", year: "2010", imdb: "8.8", poster: "https://image.tmdb.org/t/p/w500/edv5bs1pUeeS0S1Ym6Q6o1pD9v5.jpg" },
  { id: '3', title: "Lord of the Rings", director: "Peter Jackson", year: "2003", imdb: "9.0", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
  { id: '4', title: "The Matrix", director: "Wachowskis", year: "1999", imdb: "8.7", poster: "https://image.tmdb.org/t/p/w500/f89U3w7n4YAnChtv0bInB662NUE.jpg" }
];

const MoviesPage = () => {
  const [term, setTerm] = useState("");
  const filtered = ARSIV.filter(f => f.title.toLowerCase().includes(term.toLowerCase()));

  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', padding: '100px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ARAMA VE STATS KISMI */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          
          <div>
            <input 
              style={{ width: '100%', padding: '12px', borderRadius: '20px', background: 'rgba(0,0,0,0.5)', border: '2px solid #00f3ff', color: '#fff', marginBottom: '20px', outline: 'none' }}
              placeholder="Film Ara..." 
              value={term} 
              onChange={(e) => setTerm(e.target.value)} 
            />
            
            {filtered.map((m, i) => (
              <div key={m.id} style={{ border: '2px solid #ff00ff', padding: '15px', borderRadius: '12px', marginBottom: '15px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 0 10px #ff00ff' }}>
                <img src={m.poster} alt={m.title} style={{ width: '80px', borderRadius: '8px' }} />
                <div>
                  <h2 style={{ margin: 0 }}>{m.title}</h2>
                  <p style={{ color: '#ccc', margin: '5px 0' }}>Yönetmen: {m.director}</p>
                  <span style={{ color: '#f5c518', fontWeight: 'bold' }}>⭐ {m.imdb}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '2px solid #00f3ff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 0 10px #00f3ff' }}>
              <h3>Stats</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{filtered.length} Film</p>
            </div>
            <div style={{ border: '2px solid #ff00ff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 0 10px #ff00ff' }}>
              <h3>Comment</h3>
              <p style={{ fontSize: '40px' }}>💬</p>
              <button style={{ background: '#ff00ff', color: '#fff', border: 'none', padding: '10px', width: '100%', borderRadius: '10px', cursor: 'pointer' }}>Görüş Bildir</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- İŞTE O SİHİRLİ SATIR (BU OLMAZSA GÜNCELLENMEZ) ---
export default MoviesPage;
