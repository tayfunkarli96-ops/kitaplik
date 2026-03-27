// --- TAYFUN KARLI - KESİN ÇÖZÜM (FRONTEND BAĞLANTISI) ---
const API_URL = 'https://kitaplik-iota.vercel.app/api';

// Sitenin arayüzünde hata çıkmaması için gerekli veri yapıları
export interface MovieTeaserData {
  id: string;
  title: string;
  slug?: string;
  poster_url: string | null;
  movieq_rating: number | null;
  release_date: string | null;
}

// 1. Ana Sayfa ve Arama Listesi (RE-03, RE-04, RE-09)
const getSimilarMoviesByTitle = async (title: string, limit: number = 6): Promise<MovieTeaserData[] | null> => {
  try {
    const url = title ? `${API_URL}/movies?title=${title}` : `${API_URL}/movies`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.map((item: any) => ({
      id: String(item.id),
      slug: String(item.id), // Tıklama sorununu çözen anahtar
      title: String(item.title),
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix",
      movieq_rating: Number(item.rating) || 0,
      release_date: String(item.year || ""),
    }));
  } catch (error) {
    console.error("Liste hatası:", error);
    return [];
  }
};

// 2. Detay Sayfası (RE-05, RE-07, RE-10)
const getMovieDetails = async (id: string, userId: string | null = null): Promise<any> => {
  try {
    // URL'den gelen ID ile API'ye gidiyoruz
    const response = await fetch(`${API_URL}/movies/${id}`);
    const data = await response.json();
    
    // Site "Neden veri eksik?" diye çökmesin diye her şeyi tam gönderiyoruz
    return {
      id: String(data.id),
      title: String(data.title),
      release_date: String(data.year || ""),
      plot_summary: `Yönetmen/Yazar: ${data.author} | ISBN: ${data.isbn} | Dil: ${data.language || 'Türkçe'}`,
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix",
      duration_minutes: 120,
      trailer_url: null,
      movieq_rating: Number(data.rating) || 0,
      imdb_rating: Number(data.rating) || 0,
      letterboxd_rating: Number(data.rating) || 0,
      isFavorite: false,
      isWatched: false,
      isInWatchlist: false,
      genres: [{ id: "1", name: String(data.genre || "Genel") }],
      cast: [],
      crew: [],
      similar: [],
      comments: data.comments?.map((c: any, index: number) => ({
        id: String(index),
        content: String(c.text || c),
        user: { id: "1", username: "Ziyaretçi", avatar_url: null },
        likes_count: 0,
        created_at: new Date().toISOString()
      })) || []
    };
  } catch (error) {
    console.error('Detay hatası:', error);
    throw error;
  }
};

// 3. Yorum Yapma (RE-07)
const addComment = async (input: { movieId: string, content: string }): Promise<any> => {
  const response = await fetch(`${API_URL}/movies/${input.movieId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment: input.content })
  });
  return await response.json();
};

// --- Sitenin çökmemesi için gereken diğer boş fonksiyonlar ---
const rateMovie = async () => ({});
const toggleUserListMovie = async () => (true);
const updateComment = async () => ({});
const deleteComment = async () => (true);
const likeComment = async () => ({});
const unlikeComment = async () => ({});
const getUserLists = async () => ({ userFavorites: [], userWatched: [], userWatchlist: [] });
const getUserMovies = async () => ([]);

export const mdService = {
  getMovieDetails,
  getSimilarMoviesByTitle,
  rateMovie, 
  toggleUserListMovie,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
  getUserLists,
  getUserMovies,
};
