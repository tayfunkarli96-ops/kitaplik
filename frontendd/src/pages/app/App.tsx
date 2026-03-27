import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** * MORUK DİKKAT: 
 * Eğer Navbar hala hata verirse, bu satırı silip şunu dene:
 * import Navbar from '../../Navbar.tsx'; 
 * (Yani Navbar belki bir klasörün içinde değil de src'nin içindedir)
 */
import Navbar from '../../components/Navbar.tsx'; 

import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import MovieDetailsPage from '../movies/MovieDetailsPage';

function App() {
  return (
    <Router>
      <div className="flex bg-black min-h-screen">
        <Navbar />
        <main className="flex-1 ml-64 p-8 text-white">
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
