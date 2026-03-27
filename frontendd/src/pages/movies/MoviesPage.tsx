import React from 'react';
// 1. Link'i import etmeyi unutma!
import { Link } from 'react-router-dom'; 

const MoviesPage = () => {
  // Örnek film verisi (Senin backend'den veya mdService'den geliyordur)
  const movies = [
    { id: '1', title: 'Fight Club', poster: 'https://.../fight-club.jpg' },
    // ...diğer filmler
  ];

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">🎬 Filmler</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          // 2. İŞTE BURASI: Her kartı Link içine alıyoruz
          <Link 
            to={`/movie/${movie.id}`} 
            key={movie.id}
            className="group cursor-pointer transition-transform hover:scale-105"
          >
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group-hover:border-pink-500 shadow-lg">
              <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
              <div className="p-3 text-center">
                <p className="font-bold text-sm">{movie.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
