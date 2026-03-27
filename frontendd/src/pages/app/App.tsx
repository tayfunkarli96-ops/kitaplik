import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Navbar yolu
import Navbar from '../../components/app/Navbar'; 

// Ana Sayfa Importları
import HomePage from '../home/HomePage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import AboutPage from '../about/AboutPage';
import QuizPage from '../quiz/QuizPage';
import MovieDetailsPage from '../movies/MovieDetailsPage';

// --- FİLM YÖNETİMİ (NESTED) IMPORTLARI ---
import MoviesLayout from '../movies/MoviesLayout'; // Ana Düzen
import MoviesManagement from '../movies/nested/MoviesManagement'; // Film Listesi/Yönetimi
import AddMovie from '../movies/nested/AddMovie'; // Film Ekleme (Placeholder)
import MoviesStats from '../movies/nested/MoviesStats'; // İstatistikler (Placeholder)

function App() {
  return (
    <Router>
      {/* Senin orijinal Navbar'ın (CSS'ini bozmadan) */}
      <Navbar />

      {/* Rotalar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />

        {/* --- İŞTE O FORMATIN TEMELİ: İÇ İÇE ROTALAR --- */}
        <Route path="/movies" element={<MoviesLayout />}>
          {/* /movies yazınca doğrudan yönetime gitsin */}
          <Route index element={<Navigate to="management" replace />} /> 
          <Route path="management" element={<MoviesManagement />} />
          <Route path="add" element={<AddMovie />} />
          <Route path="stats" element={<MoviesStats />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
