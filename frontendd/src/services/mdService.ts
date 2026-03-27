// --- TAYFUN KARLI - REST API BAĞLANTISI ---
const API_URL = 'https://cornflix-backend-mu.vercel.app/api';

// Arayüzün (UI) bozulmaması için gerekli tipler (Eskisiyle aynı bırakıldı)
export interface MovieTeaserData {
  id: string;
  title: string;
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
  movieq_rating: number | null;
  genres: any[];
  cast: any[];
  crew: any[];
  comments: any[];
}

// 1. RE-03 & RE-09: Filmleri/Kitapları Listele ve Ara
const getSimilarMoviesByTitle = async (title: string, limit: number = 6): Promise<MovieTeaserData[] | null> => {
  try {
    const url = title ? `${API_URL}/movies?title=${title}` : `${API_URL}/movies`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Gelen veriyi sitenin beklediği formata çeviriyoruz
    return data.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      poster_url: null, // Şimdilik poster yok
      movieq_rating: item.rating,
      release_date: item.year?.toString(),
    }));
  } catch (error) {
    console.error("Film listesi çekilemedi:", error);
    return [];
  }
};

// 2. RE-05: Film/Kitap Detay Sayfası
const getMovieDetails = async (id: string, userId: string | null = null): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`);
    const data = await response.json();
    
    return {
      id: data.id.toString(),
      title: data.title,
      release_date: data.year?.toString(),
      plot_summary: `Yazar/Yönetmen: ${data.author} | ISBN: ${data.isbn}`, // Hocanın istediği yazar ve barkod bilgisi
      poster_url: null,
      movieq_rating: data.rating,
      genres: [{ id: "1", name: data.genre }],
      cast: [],
      crew: [],
      comments: data.comments?.map((c: string, index: number) => ({
        id: index.toString(),
        content: c,
        user: { username: "Anonim", avatar_url: null },
        created_at: new Date().toISOString()
      })) || []
    };
  } catch (error) {
    console.error('Detay çekilemedi:', error);
    throw error;
  }
};

// 3. RE-07: Yorum Yapma
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

// Diğer kullanılmayan ama sayfanın çökmemesi için gereken boş fonksiyonlar
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
