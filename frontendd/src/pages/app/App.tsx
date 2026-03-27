import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// İŞTE KATİL BURADAYMIŞ: components'ten sonra bir de "app" klasörü varmış!
import Navbar from '../../components/app/Navbar'; 

import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import MovieDetailsPage from '../movies/MovieDetailsPage';

function App() {
  return (
    <Router>
      <div className="flex bg-black min-h-screen">
        {/* Yan Menü (Navbar) */}
        <Navbar />

        {/* Ana İçerik Alanı */}
        <main className="flex-1 ml-64 p-8 text-white min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
