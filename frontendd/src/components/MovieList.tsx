import React, { useState, useEffect } from 'react';

// Film verisinin tipini (TypeScript için) belirliyoruz
interface Movie {
  id: number;
  title: string;
  year: number;
}

const MovieList = () => {
  // Değişkenlerimizi tanımlıyoruz: Biri filmler listesi, diğeri yüklenme durumu
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sayfa ilk açıldığında çalışacak arka plan görevi
  useEffect(() => {
    // API'den veri çekmeyi simüle etmek için 2 saniyelik (2000ms) bir gecikme ekliyoruz
    setTimeout(() => {
      const apiData = [
        { id: 1, title: 'Inception', year: 2010 },
        { id: 2, title: 'The Matrix', year: 1999 },
        { id: 3, title: 'Interstellar', year: 2014 },
      ];
      setMovies(apiData);
      setIsLoading(false); // Veri geldiğinde loading durumunu kapatıyoruz
    }, 2000);
  }, []);

  // Eğer veri hala yükleniyorsa ekranda bu kısım görünür
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
        <h2>⏳ Cornflix İçerikleri Hazırlanıyor...</h2>
      </div>
    );
  }

  // Veri yüklendiğinde asıl film listemiz görünür
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h1 style={{ color: '#e50914' }}>Cornflix Film Listesi</h1>
      <p>Mevcut kütüphanemizdeki popüler filmler:</p>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ margin: '10px 0', padding: '15px', background: '#fff', borderLeft: '5px solid #e50914', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <strong>{movie.title}</strong> <span style={{ color: 'gray' }}>({movie.year})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
