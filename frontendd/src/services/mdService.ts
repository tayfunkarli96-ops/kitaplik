const API_URL = 'https://kitaplik-iota.vercel.app/api';

export const mdService = {
  // Filmler
  getSimilarMoviesByTitle: async (title: string) => {
    const r = await fetch(`${API_URL}/movies`);
    const data = await r.json();
    return data.map((m: any) => ({
      id: String(m.id), slug: String(m.id), title: m.title,
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix",
      movieq_rating: m.rating, release_date: String(m.year)
    }));
  },
  getMovieDetails: async (id: string) => {
    const r = await fetch(`${API_URL}/movies/${id}`);
    const data = await r.json();
    return {
      ...data,
      id: String(data.id),
      plot_summary: `Yönetmen: ${data.author} | ISBN: ${data.isbn} | Dil: ${data.language}`,
      poster_url: "https://via.placeholder.com/300x450/1a1a2e/ff007f?text=CornFlix",
      genres: [{ id: "1", name: data.genre }],
      comments: [], cast: [], crew: [], similar: []
    };
  },
  
  // HABERLER (RE-09 İÇİN YENİ EKLENDİ)
  getNews: async () => {
    const r = await fetch(`${API_URL}/news`);
    return await r.json();
  },
  updateNews: async (id: number, content: any) => {
    const r = await fetch(`${API_URL}/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    return await r.json();
  },

  // Boş fonksiyonlar (Hata vermemesi için)
  rateMovie: async () => ({}),
  toggleUserListMovie: async () => (true),
  addComment: async () => ({}),
  updateComment: async () => ({}),
  deleteComment: async () => (true),
  likeComment: async () => ({}),
  unlikeComment: async () => ({}),
  getUserLists: async () => ({ userFavorites: [], userWatched: [], userWatchlist: [] }),
  getUserMovies: async () => ([]),
};
