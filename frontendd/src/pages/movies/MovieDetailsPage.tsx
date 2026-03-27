import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams(); // URL'deki /movie/:id kısmını yakalar

  // NOT: Burası normalde mdService.getMovieById(id) ile backend'den gelir.
  // Şimdilik o Fight Club formatını buraya çivileyelim:
  const movie = {
    title: "Fight Club",
    releaseDate: "June 21, 1999",
    duration: "2h 29m",
    genres: "Action, Thriller",
    rating: 10,
    summary: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    poster: "https://.../fightclub-poster.jpg"
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        
        {/* Sol: Afiş */}
        <div className="w-full md:w-1/3">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full rounded-2xl border-4 border-gray-800 shadow-[0_0_20px_rgba(236,72,193,0.3)]" 
          />
        </div>

        {/* Sağ: Bilgiler */}
        <div className="w-full md:w-2/3 space-y-6">
          <h1 className="text-5xl font-black text-cyan-400">{movie.title}</h1>
          
          <div className="space-y-2 text-gray-400 font-mono">
            <p><span className="text-white font-bold">Gösterim Tarihi:</span> {movie.releaseDate}</p>
            <p><span className="text-white font-bold">Süre:</span> {movie.duration}</p>
            <p><span className="text-white font-bold">Türler:</span> {movie.genres}</p>
          </div>

          <hr className="border-gray-800" />

          {/* Rating Bölümü */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400">CornFlix Rating:</span>
            <div className="flex text-green-500 text-2xl">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              <span className="text-gray-700">★</span>
            </div>
            <span className="text-xl font-bold">{movie.rating} / 10</span>
          </div>

          <hr className="border-gray-800" />

          <div>
            <h2 className="text-2xl font-bold mb-3">Konu Özeti</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.summary}
            </p>
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 pt-6">
            <button className="px-6 py-2 bg-gray-800 rounded-full text-sm hover:bg-pink-600 transition-all">+ İzleme Listesi</button>
            <button className="px-6 py-2 bg-gray-800 rounded-full text-sm hover:bg-cyan-600 transition-all">İzlenen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
