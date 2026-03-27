import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// YOLLAR DÜZELTİLDİ: Artık Vercel hata vermeyecek!
import Navbar from './components/app/Navbar'; 
import HomePage from './pages/home/HomePage';
import NewsPage from './pages/news/NewsPage'; 
import ProfilePage from './pages/profile/ProfilePage';
import AboutPage from './pages/about/AboutPage';
import QuizPage from './pages/quiz/QuizPage';
import MovieDetailsPage from './pages/movies/MovieDetailsPage';
import MoviesPage from './pages/movies/MoviesPage'; 
import ContactPage from './pages/contacts/ContactsPage'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}> {/* Navbar'ın altında kalmasın diye */}
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
