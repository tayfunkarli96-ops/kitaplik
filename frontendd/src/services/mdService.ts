// --- TAYFUN KARLI - REST API BAĞLANTISI (SON SÜRÜM) ---
const API_URL = 'https://cornflix-backend-mu.vercel.app/api';

// Sitenin çökmemesi için gerekli tipler
export interface MovieTeaserData {
  id: string;
  title: string;
  slug?: string; 
  poster_url: string | null;
  movieq_rating: number | null;
  release_date: string | null;
}

export interface MovieDetailData {
  id: string;
  title: string;
  release_date: string;
  plot_summary: string | null;
  poster_url: string | null;
  duration_minutes: number | null;
  trailer_url: string | null;
  movieq_rating: number | null;
  imdb_rating: number | null;
  letterboxd_rating: number | null;
  genres: any[];
  cast: any[];
  crew: any[];
  comments: any[];
}

// 1. Ana Sayfa: Filmleri Listele (Tıklama sorunu çözüldü)
const getSimilarMoviesByTitle = async (title: string, limit: number = 6): Promise<MovieTeaserData[] | null> => {
  try {
    const url = title ? `${API_URL}/movies?title=${title}` : `${API_URL}/movies`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.map((item: any) => ({
      id: item.id.toString(),
      slug: item.id.toString(), // Tıklama kilidini açan kısım
      title: item.title,
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix", // Geçici neon resim
      movieq_rating: item.rating,
      release_date: item.year?.toString(),
    }));
  } catch (error) {
    console.error("Film listesi çekilemedi:", error);
    return [];
  }
};

// 2. Detay Sayfası: Yazar, ISBN ve Yorumları Getir
const getMovieDetails = async (id: string, userId: string | null = null, skipUserData: boolean = false): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`);
    if (!response.ok) throw new Error("Film bulunamadı");
    
    const data = await response.json();
    
    return {
      id: data.id.toString(),
      title: data.title,
      release_date: data.year?.toString(),
      plot_summary: `Yazar/Yönetmen: ${data.author} | ISBN: ${data.isbn} | Tür: ${data.genre}`, // Hoca bunları görmek istiyor
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix",
      duration_minutes: 120,
      trailer_url: null,
      movieq_rating: data.rating,
      imdb_rating: data.rating,
      letterboxd_rating: data.rating,
      genres: [{ id: "1", name: data.genre }],
      cast: [],
      crew: [],
      comments: data.comments?.map((c: string, index: number) => ({
        id: index.toString(),
        content: c,
        user: { id: "1", username: "Ziyaretçi", avatar_url: null },
        created_at: new Date().toISOString(),
        likes_count: 0
      })) || [],
      similar: []
    };
  } catch (error) {
    console.error('Detay çekilemedi:', error);
    throw error;
  }
};

// 3. Yorum Ekleme Fonksiyonu
const addComment = async (input: { movieId: string, content: string }): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/movies/${input.movieId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: input.content })
    });
    return await response.json();
  } catch (error) {
    console.error("Yorum eklenemedi:", error);
    throw error;
  }
};

// --- Sitenin çökmemesi için içi boş bırakılan sahte fonksiyonlar ---
const rateMovie = async () => ({});
const toggleUserListMovie = async () => (true);
const updateComment = async () => ({});
const deleteComment = async () => (true);
const likeComment = async () => ({});
const unlikeComment = async () => ({});
const getUserLists = async () => ({ userFavorites: [], userWatched: [], userWatchlist: [] });
const getUserMovies = async () => ([]);

// Tüm fonksiyonları dışarı aktar
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
