import React from 'react';
import { Link } from 'react-router-dom';

// VERİYİ DİREKT BURAYA GÖMDÜK (Hata ihtimali SIFIR)
export const moviesData = [
  { id: '1', title: "Fight Club", director: "David Fincher", year: "1999", runtime: "149 min", genres: "Action, Thriller", imdb: "8.8", ltb: "9.9", miq: "9.9", summary: "Uykusuzluk çeken bir ofis çalışanı ve umursamaz bir sabun üreticisi, giderek çok daha fazlasına dönüşen bir yeraltı dövüş kulübü kurarlar.", poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxZDYtMWJmNy00NzEwLThlODAtNWhmZWY0NWVkYTJlXkEyXkFqcGc@._V1_SX300.jpg" },
  { id: '2', title: "Spider-Man: Into the Spider-Verse", director: "Bob Persichetti", year: "2018", runtime: "117 min", genres: "Animation, Action", imdb: "8.4", ltb: "9.8", miq: "9.8", summary: "Genç Miles Morales, kendi evreninin Örümcek Adam'ı olur ve tüm gerçekliklere yönelik bir tehdidi durdurmak için boyutlar arası bir ekip kurar.", poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg" },
  { id: '3', title: "The Lord of the Rings", director: "Peter Jackson", year: "2003", runtime: "201 min", genres: "Adventure, Drama", imdb: "9.0", ltb: "9.2", miq: "9.2", summary: "Gandalf ve Aragorn, Tek Yüzük ile Hüküm Dağı'na yaklaşan Frodo ve Sam'den Sauron'un bakışlarını uzaklaştırmak için İnsanlık Dünyası'na liderlik ederler.", poster: "https://m.media-amazon.com/images/M/MV5BMTZkN2ZlYmEtN2RjNi00Zjk5LWFhN2ItYjBkNmI1ZDFiYzBhXkEyXkFqcGc@._V1_SX300.jpg" },
  { id: '4', title: "The Dark Knight", director: "Christopher Nolan", year: "2008", runtime: "152 min", genres: "Action, Crime", imdb: "9.0", ltb: "9.5", miq: "9.5", summary: "Joker olarak bilinen tehdit, Gotham halkına kaos ve yıkım getirdiğinde, Batman adaletsizlikle savaşma yeteneğinin en büyük testini kabul etmelidir.", poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
  { id: '5', title: "Interstellar", director: "Christopher Nolan", year: "2014", runtime: "169 min", genres: "Adventure, Sci-Fi", imdb: "8.7", ltb: "9.7", miq: "9.7", summary: "Bir kaşif ekibi, insanlığın hayatta kalmasını sağlamak amacıyla uzaydaki bir solucan deliğinden geçerek yeni bir ev arayışına çıkar.", poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjNjYjZlY2Y3YWBiZGIL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" },
  { id: '6', title: "The Matrix", director: "Lana Wachowski", year: "1999", runtime: "136 min", genres: "Action, Sci-Fi", imdb: "8.7", ltb: "9.6", miq: "9.8", summary: "Bir bilgisayar korsanı, bildiği hayatın kötü niyetli bir siber-zekanın ayrıntılı bir aldatmacası olduğu şok edici gerçeğini keşfeder.", poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
  { id: '7', title: "Inception", director: "Christopher Nolan", year: "2010", runtime: "148 min", genres: "Action, Sci-Fi", imdb: "8.8", ltb: "9.4", miq: "9.5", summary: "Rüya paylaşım teknolojisi kullanarak kurumsal sırları çalan bir hırsıza, bir CEO'nun zihnine bir fikir yerleştirme görevi verilir.", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
  { id: '8', title: "Pulp Fiction", director: "Quentin Tarantino", year: "1994", runtime: "154 min", genres: "Crime, Drama", imdb: "8.9", ltb: "9.8", miq: "9.6", summary: "İki mafya tetikçisi, bir boksör, bir gangster ve eşi ile bir çift restoran soyguncusunun şiddet ve kurtuluşla örülü dört hikayesi kesişiyor.", poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTItNDJhNi00Mzc1LTgwZWEtNzFlYmEzN2QwMjc1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
  { id: '9', title: "Goodfellas", director: "Martin Scorsese", year: "1990", runtime: "145 min", genres: "Biography, Crime", imdb: "8.7", ltb: "9.5", miq: "9.4", summary: "Henry Hill'in ve İtalyan-Amerikan suç sendikasındaki ortakları ile birlikte mafya içindeki yaşamının efsanevi hikayesi.", poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWE4OWEtN2M1MTRlNzkyZDg1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
  { id: '10', title: "Se7en", director: "David Fincher", year: "1995", runtime: "127 min", genres: "Crime, Mystery", imdb: "8.6", ltb: "9.3", miq: "9.4", summary: "İki dedektif, yedi ölümcül günahı cinayetleri için sebep olarak kullanan zeki bir seri katilin peşine düşer.", poster: "https://m.media-amazon.com/images/M/MV5BMTkyNzA0MDYxNV5BMl5BanBnXkFtZTcwNjA2NzQwNA@@._V1_SX300.jpg" }
];

const MoviesPage = () => {
  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-5xl mx-auto space-y-4">
        {moviesData.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="block group">
            <div className="flex bg-[#141414] border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500 transition-all shadow-lg">
              {/* Poster */}
              <img src={movie.poster} alt={movie.title} className="w-32 h-44 object-cover flex-shrink-0" />
              
              {/* İçerik */}
              <div className="flex-1 p-5 relative">
                <div className="flex flex-col md:flex-row justify-between items-start">
                  <h2 className="text-2xl font-bold group-hover:text-pink-500 transition-colors">{movie.title}</h2>
                  {/* Puanlar */}
                  <div className="flex gap-2 text-[10px] font-bold mt-2 md:mt-0">
                    <span className="bg-[#f5c518] text-black px-2 py-1 rounded">IMDb: {movie.imdb}</span>
                    <span className="bg-red-600 text-white px-2 py-1 rounded">LTB: {movie.ltb}</span>
                    <span className="bg-cyan-500 text-black px-2 py-1 rounded">M iQ: {movie.miq}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm text-gray-400 font-mono">
                  <p>🎬 Director: {movie.director}</p>
                  <p>📅 Year: {movie.year}</p>
                  <p>🕒 Runtime: {movie.runtime}</p>
                  <p>🎭 Genres: {movie.genres}</p>
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
