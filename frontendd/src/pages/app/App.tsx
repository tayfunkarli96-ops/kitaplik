import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Sidebar'; // Sidebar dosyanın adıyla aynı olduğundan emin ol
import HomePage from './pages/home/HomePage';
import MoviesPage from './pages/movies/MoviesPage';
import NewsPage from './pages/news/NewsPage'; // İşte o yeni haberler sayfan
import ProfilePage from './pages/profile/ProfilePage';
import MovieDetailsPage from './pages/movies/MovieDetailsPage';

function App() {
  return (
    <Router>
      <div className="flex bg-black min-h-screen">
        {/* Sol taraftaki menü (Sidebar) */}
        <Navbar />

        {/* Sağ taraftaki asıl içerik alanı */}
        <main className="flex-1 ml-64 p-4 text-white">
          <Routes>
            {/* Ana Sayfa */}
            <Route path="/" element={<HomePage />} />

            {/* Film Listesi */}
            <Route path="/movies" element={<MoviesPage />} />

            {/* RE-09: Haberler Sayfası */}
            <Route path="/news" element={<NewsPage />} />

            {/* RE-01: Profil Sayfası */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* RE-02/03/10: Film Detay Sayfası */}
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            
            {/* Eğer başka sayfaların varsa buraya ekleyebilirsin */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
