import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Navbar yolu (Bunu zaten bulmuştuk)
import Navbar from '../../components/app/Navbar'; 

// Sayfa Importları
import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import MovieDetailsPage from '../movies/MovieDetailsPage';
import AboutPage from '../about/AboutPage';
import QuizPage from '../quiz/QuizPage';

/** * DİKKAT: Hata buradaydı! 
 * Eğer bu satır hata verirse (yani build yine kırmızı yanarsa), 
 * dosyanın adını '../contacts/Contact' olarak değiştirmeyi dene.
 */
import ContactPage from '../contacts/ContactPage'; 

function App() {
  return (
    <Router>
      {/* Orijinal Navbar'ın (CSS'ini bozmadan) */}
      <Navbar />

      {/* Sayfa Geçişleri (Arayüzü bozacak ek div'leri sildim) */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
