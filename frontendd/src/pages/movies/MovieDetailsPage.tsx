import React from 'react';
import { useParams } from 'react-router-dom';
import { moviesData } from './MoviesPage'; // Veriyi MoviesPage'den çekiyoruz

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movie = moviesData.find(m => m.id === id);

  if (!movie) return <div className="p-20 text-white font-bold text-2xl text-center">Film bulunamadı moruk!</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sol: Poster */}
          <div className="w-full md:w-80 flex-shrink-0">
            <img src={movie.poster} alt={movie.title} className="w-full rounded-lg shadow-2xl border border-gray-800" />
          </div>

          {/* Sağ: Bilgiler */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">{movie.title}</h1>
            <div className="space-y-3 text-lg text-gray-300 font-medium">
              <p><span className="text-gray-500 mr-2">Gösterim Tarihi:</span> {movie.year}</p>
              <p><span className="text-gray-500 mr-2">Süre:</span> {movie.runtime}</p>
              <p><span className="text-gray-500 mr-2">Türler:</span> {movie.genres}</p>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-800">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 uppercase tracking-widest">CornFlix Rating:</span>
                <div className="flex text-green-500 text-3xl">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <span className="text-2xl font-bold ml-2">10 / 10</span>
              </div>

              {/* Butonlar */}
              <div className="flex flex-wrap gap-3 mt-8">
                <button className="flex-1 min-w-[120px] bg-[#1a1a1a] hover:bg-pink-600 border border-gray-700 p-3 rounded text-sm transition-all text-white">♡ Favori</button>
                <button className="flex-1 min-w-[120px] bg-[#1a1a1a] hover:bg-cyan-600 border border-gray-700 p-3 rounded text-sm transition-all text-white">+ İzleme Listesi</button>
                <button className="flex-1 min-w-[120px] bg-[#1a1a1a] hover:bg-gray-700 border border-gray-700 p-3 rounded text-sm transition-all text-white">▤ İzlenen</button>
              </div>
            </div>
          </div>
        </div>

        {/* Konu Özeti */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">Konu Özeti</h2>
          <p className="text-xl text-gray-300 leading-relaxed font-light italic">{movie.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
