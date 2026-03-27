const API_URL = 'https://cornflix-backend-mu.vercel.app/api';

// 1. Ana Sayfa (Eksiksiz Teaser)
const getSimilarMoviesByTitle = async (title: string, limit: number = 6) => {
  try {
    const url = title ? `${API_URL}/movies?title=${title}` : `${API_URL}/movies`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.map((item: any) => ({
      id: String(item.id),
      slug: String(item.id), 
      title: String(item.title),
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix",
      movieq_rating: Number(item.rating) || 0,
      release_date: String(item.year || ""),
    }));
  } catch (error) {
    return [];
  }
};

// 2. Detay Sayfası (SİTENİN ÇÖKMESİNİ ENGELLEYEN KISIM)
const getMovieDetails = async (id: string, userId: string | null = null, skipUserData: boolean = false) => {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`);
    if (!response.ok) throw new Error("Film bulunamadı");
    const data = await response.json();
    
    return {
      id: String(data.id),
      title: String(data.title),
      release_date: String(data.year || ""),
      plot_summary: `Yazar/Yönetmen: ${data.author} | ISBN: ${data.isbn} | Tür: ${data.genre}`,
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix",
      duration_minutes: 120,
      trailer_url: null,
      movieq_rating: Number(data.rating) || 0,
      imdb_rating: Number(data.rating) || 0,
      letterboxd_rating: Number(data.rating) || 0,
      userRating: null,
      isFavorite: false,   // <--- Site buralarda çöküyordu!
      isWatched: false,    // <--- 
      isInWatchlist: false,// <---
      genres: [{ id: "1", name: String(data.genre || "Genel") }],
      cast: [],            // <--- Oyuncu listesi boş dizi (çökmeyi önler)
      crew: [],            // <--- 
      similar: [],         // <---
      comments: data.comments?.map((c: string, index: number) => ({
        id: String(index),
        content: String(c),
        user: { id: "1", username: "Anonim", avatar_url: null },
        parent_comment_id: null,
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })) || []
    };
  } catch (error) {
    throw error;
  }
};

const addComment = async (input: { movieId: string, content: string }) => {
  const response = await fetch(`${API_URL}/movies/${input.movieId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment: input.content })
  });
  return await response.json();
};

const rateMovie = async () => ({});
const toggleUserListMovie = async () => (true);
const updateComment = async () => ({});
const deleteComment = async () => (true);
const likeComment = async () => ({});
const unlikeComment = async () => ({});
const getUserLists = async () => ({ userFavorites: [], userWatched: [], userWatchlist: [] });
const getUserMovies = async () => ([]);

export const mdService = {
  getMovieDetails, getSimilarMoviesByTitle, rateMovie, toggleUserListMovie,
  addComment, updateComment, deleteComment, likeComment, unlikeComment,
  getUserLists, getUserMovies,
};
