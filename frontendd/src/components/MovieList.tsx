import React from 'react';

// Örnek film verisi
const movies = [
  { id: 1, title: 'Inception', year: 2010 },
  { id: 2, title: 'The Matrix', year: 1999 },
  { id: 3, title: 'Interstellar', year: 2014 },
];

const MovieList = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h1>Cornflix Film Listesi</h1>
      <p>Mevcut kütüphanemizdeki popüler filmler:</p>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ margin: '10px 0', padding: '10px', background: '#fff' }}>
            <strong>{movie.title}</strong> ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
