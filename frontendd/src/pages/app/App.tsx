import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Senin Navbar dosyanın yeri
import Navbar from '../../components/app/Navbar'; 

// Sayfa Importları (Klasör isimlerine göre harf harfine ayarladım)
import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import MovieDetailsPage from '../movies/MovieDetailsPage';
import AboutPage from '../about/AboutPage';
import ContactPage from '../contacts/ContactPage'; // Klasörün "contacts" idi
import QuizPage from '../quiz/QuizPage';

function App() {
  return (
    <Router>
      <div className="flex bg-black min-h-screen">
        {/* Yan Menü (Navbar) */}
        <Navbar />

        {/* Ana İçerik Alanı */}
        {/* NOT: ml-64 arayüzü bozuyorsa buradaki "ml-64" yazısını silebilirsin */}
        <main className="flex-1 ml-64 p-4 text-white min-h-screen">
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
        </main>
      </div>
    </Router>
  );
}

export default App;
