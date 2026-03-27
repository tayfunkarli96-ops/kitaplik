import React from 'react';
import { Link } from 'react-router-dom';

// 12 FİLMLİK DEV ARŞİV
export const moviesData = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", runtime: "149 min", genres: "Action, Thriller", imdb: "8.8", ltb: "9.9", miq: "9.9", summary: "Uykusuzluk çeken bir ofis çalışanı ve umursamaz bir sabun üreticisi, yeraltı dövüş kulübü kurarlar.", poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxZDYtMWJmNy00NzEwLThlODAtNWhmZWY0NWVkYTJlXkEyXkFqcGc@._V1_SX300.jpg" },
  { id: '2', title: "Spider-Man: Into the Spider-Verse", director: "Bob Persichetti", year: "2018", runtime: "117 min", genres: "Animation, Action", imdb: "8.4", ltb: "9.8", miq: "9.8", summary: "Genç Miles Morales, kendi evreninin Örümcek Adam'ı olur.", poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg" },
  { id: '3', title: "The Lord of the Rings: The Return of the King", director: "Peter Jackson", year: "2003", runtime: "201 min", genres: "Adventure, Drama", imdb: "9.0", ltb: "9.2", miq: "9.2", summary: "Gandalf ve Aragorn, İnsanlık Dünyası'na liderlik ederler.", poster: "https://m.media-amazon.com/images/M/MV5BMTZkN2ZlYmEtN2RjNi00Zjk5LWFhN2ItYjBkNmI1ZDFiYzBhXkEyXkFqcGc@._V1_SX300.jpg" },
  { id: '4', title: "The Dark Knight", director: "Christopher Nolan", year: "2008", runtime: "152 min", genres: "Action, Crime", imdb: "9.0", ltb: "9.5", miq: "9.5", summary: "Joker olarak bilinen tehdit, Gotham halkına kaos getirir.", poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
  { id: '5', title: "Interstellar", director: "Christopher Nolan", year: "2014", runtime: "169 min", genres: "Adventure, Sci-Fi", imdb: "8.7", ltb: "9.7", miq: "9.7", summary: "Bir kaşif ekibi uzaydaki bir solucan deliğinden geçer.", poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjNjYjZlY2Y3YWBiZGIL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" },
  { id: '6', title: "The Matrix", director: "Lana Wachowski", year: "1999", runtime: "136 min", genres: "Action, Sci-Fi", imdb: "8.7", ltb: "9.6", miq: "9.8", summary: "Bir bilgisayar korsanı, gerçeğin şok edici yüzünü keşfeder.", poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
  { id: '7', title: "Inception", director: "Christopher Nolan", year: "2010", runtime: "148 min", genres: "Action, Sci-Fi", imdb: "8.8", ltb: "9.4", miq: "9.5", summary: "Kurumsal sırları çalan bir hırsıza yeni bir görev verilir.", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
  { id: '8', title: "Pulp Fiction", director: "Quentin Tarantino", year: "1994", runtime: "154 min", genres: "Crime, Drama", imdb: "8.9", ltb: "9.8", miq: "9.6", summary: "Suç dünyasının farklı karakterlerinin hikayeleri kesişiyor.", poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTItNDJhNi00Mzc1LTgwZWEtNzFlYmEzN2QwMjc1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
  { id: '9', title: "Goodfellas", director: "Martin Scorsese", year: "1990", runtime: "145 min", genres: "Biography, Crime", imdb: "8.7", ltb: "9.5", miq: "9.4", summary: "Mafya içindeki yaşamın efsanevi hikayesi.", poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWE4OWEtN2M1MTRlNzkyZDg1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
  { id: '10', title: "Se7en", director: "David Fincher", year: "1995", runtime: "127 min", genres: "Crime, Mystery", imdb: "8.6", ltb: "9.3", miq: "9.4", summary: "İki dedektif zeki bir seri katilin peşine düşer.", poster: "https://m.media-amazon.com/images/M/MV5BMTkyNzA0MDYxNV5BMl5BanBnXkFtZTcwNjA2NzQwNA@@._V1_SX300.jpg" },
  { id: '11', title: "Gladiator", director: "Ridley Scott", year: "2000", runtime: "155 min", genres: "Action, Adventure", imdb: "8.5", ltb: "9.0", miq: "9.1", summary: "Eski bir general yozlaşmış imparatordan intikam alır.", poster: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODItNTNjYjBlNzIyNDI1XkEyXkFqcGdeQXVyNTIzOTk5OQ@@._V1_SX300.jpg" },
  { id: '12', title: "The Shawshank Redemption", director: "Frank Darabont", year: "1994", runtime: "142 min", genres: "Drama", imdb: "9.3", ltb: "9.9", miq: "9.9", summary: "İki mahkum yıllar boyunca ortak bir dostluk kurar.", poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg" }
];

const MoviesPage = () => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-24 pb-10 px-4 md:px-10 font-sans">
      
      {/* ÜST FİLTRELEME ÇUBUĞU (Birebir Fotoğraftaki Gibi) */}
      <div className="max-w-5xl mx-auto bg-[#1a1a1a] border border-[#2a2a2a] p-3 rounded-lg flex flex-wrap gap-3 items-center mb-6">
        <input type="text" placeholder="Başlığa göre ara..." className="bg-[#0f0f0f] border border-[#333] p-2.5 rounded text-sm flex-1 min-w-[150px] outline-none focus:border-[#00e676] text-gray-200" />
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sırala:</span>
          <select className="bg-[#0f0f0f] border border-[#333] p-2.5 rounded text-sm text-gray-300 outline-none w-48">
            <option>Puan (Yüksekten Düşüğe)</option>
          </select>
        </div>
        
        <input type="text" placeholder="Yıl (örn., 2023)" className="bg-[#0f0f0f] border border-[#333] p-2.5 rounded text-sm w-32 outline-none text-gray-200" />
        <input type="text" placeholder="Min. Puan (1-10)" className="bg-[#0f0f0f] border border-[#333] p-2.5 rounded text-sm w-32 outline-none text-gray-200" />
        
        <select className="bg-[#0f0f0f] border border-[#333] p-2.5 rounded text-sm text-gray-300 outline-none w-36">
            <option>Tüm Türler</option>
        </select>
        
        <button className="bg-[#00e676] hover:bg-[#00c853] text-black font-bold py-2.5 px-6 rounded text-sm transition-colors">
          Filtreleri Uygula
        </button>
      </div>

      {/* YATAY FİLM LİSTESİ (Birebir Fotoğraftaki Gibi) */}
      <div className="max-w-5xl mx-auto space-y-4">
        {moviesData.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="block group">
            <div className="flex bg-[#121212] border border-[#222] rounded-xl overflow-hidden hover:bg-[#1a1a1a] transition-all">
              
              {/* Poster */}
              <img src={movie.poster} alt={movie.title} className="w-[120px] h-[180px] object-cover flex-shrink-0" />
              
              {/* İçerik */}
              <div className="flex-1 p-5 flex flex-col justify-center relative">
                
                {/* Üst Kısım: Başlık ve Puan Rozetleri */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white tracking-wide">{movie.title}</h2>
                  
                  {/* Fotoğraftaki Birebir Renkli Rozetler */}
                  <div className="flex gap-2 text-[10px] font-bold">
                    <span className="bg-[#f5c518] text-black px-2 py-1 rounded">IMDb: {movie.imdb}</span>
                    <span className="bg-[#ef4444] text-white px-2 py-1 rounded">LTB: {movie.ltb}</span>
                    <span className="bg-[#0f172a] text-[#38bdf8] border border-[#0f172a] px-2 py-1 rounded">M iQ: {movie.miq}</span>
                  </div>
                </div>

                {/* Alt Kısım: Detaylar (Fotoğraftaki İkonlarla Birebir) */}
                <div className="space-y-1.5 text-xs text-gray-400">
                  <p className="flex items-center gap-2">
                    <span className="opacity-70">🎬</span> Director: {movie.director}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="opacity-70">📅</span> Year: {movie.year}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="opacity-70">🕒</span> Runtime: {movie.runtime}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="opacity-70">🎭</span> Genres: {movie.genres}
                  </p>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
