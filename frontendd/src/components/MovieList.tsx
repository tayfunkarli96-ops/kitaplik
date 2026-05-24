import React, { useState, useEffect } from 'react';

// Film tipi tanımı
interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string; // Premium için tür ekledik
}

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // API simülasyonu (daha zengin veri)
    setTimeout(() => {
      const apiData = [
        { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi' },
        { id: 2, title: 'The Matrix', year: 1999, genre: 'Action' },
        { id: 3, title: 'Interstellar', year: 2014, genre: 'Drama' },
        { id: 4, title: 'The Dark Knight', year: 2008, genre: 'Action' },
      ];
      setMovies(apiData);
      setIsLoading(false);
    }, 1500); // Yüklenme süresini biraz daha gerçekçi yaptık
  }, []);

  // Premium Loading Animasyonu Simülasyonu
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: '#808080' }}>
        <div style={{ width: '50px', height: '50px', border: '5px solid #333', borderTop: '5px solid #e50914', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ marginTop: '15px', fontSize: '14px', letterSpacing: '1px' }}>İçerikler Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '80px' /* Header'ın altında kalmaması için */ }}>
      <h2 style={{ color: 'white', borderLeft: '4px solid #e50914', paddingLeft: '10px', fontSize: '20px' }}>
        Kütüphanedeki Filmler
      </h2>
      
      {movies.map((movie) => (
        <div key={movie.id} style={{ 
          backgroundColor: '#1a1a1a', 
          borderRadius: '8px', 
          margin: '15px 0', 
          display: 'flex', 
          alignItems: 'center',
          padding: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}>
          {/* Film Poster Simülasyonu (Kırmızı bir kutu) */}
          <div style={{ width: '60px', height: '90px', backgroundColor: '#333', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e50914', fontSize: '30px', fontWeight: 'bold' }}>
            {movie.title.substring(0, 1)}
          </div>

          {/* Film Bilgileri */}
          <div style={{ marginLeft: '15px', flex: 1 }}>
            <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{movie.title}</div>
            <div style={{ color: '#aaa', fontSize: '14px' }}>
              <span style={{ marginRight: '10px' }}>📅 {movie.year}</span>
              <span style={{ backgroundColor: '#333', color: '#e50914', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold' }}>{movie.genre}</span>
            </div>
          </div>
          
          <div style={{ color: '#e50914', fontSize: '24px' }}>▸</div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
