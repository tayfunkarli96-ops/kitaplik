import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Dosya yollarını senin klasör yapına göre (../../) olarak güncelledim:
import Navbar from '../../components/Sidebar'; 
import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import MovieDetailsPage from '../movies/MovieDetailsPage';

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
