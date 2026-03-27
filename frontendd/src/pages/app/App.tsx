import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// YOLLAR SENİN KLASÖR YAPINA GÖRE (src/pages/app/App.tsx) DÜZELTİLDİ:
// Navbar için 2 kat yukarı çıkıyoruz (src/ klasörüne gitmek için)
import Navbar from '../../components/app/Navbar'; 
// Diğer sayfalar için 1 kat yukarı çıkıp kendi klasörlerine giriyoruz
import HomePage from '../home/HomePage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import AboutPage from '../about/AboutPage';
import QuizPage from '../quiz/QuizPage';
import MovieDetailsPage from '../movies/MovieDetailsPage';
import MoviesPage from '../movies/MoviesPage'; 
import ContactPage from '../contacts/ContactsPage'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
