import React from 'react';
import { useParams } from 'react-router-dom';

// VERİYİ BURAYA DA GÖMDÜK (MoviesPage'deki ile aynı liste)
const moviesData = [
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

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movie = moviesData.find(m => m.id === id);

  if (!movie) return <div className="p-10 text-white font-bold text-2xl">Film bulunamadı moruk!</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
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
          <p className="text-xl text-gray-300 leading-relaxed font-light italic">
            {movie.summary}
          </p>
        </div>

        {/* Yorumlar */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-2">Yorumlar (0)</h3>
          <div className="h-[2px] w-full bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
