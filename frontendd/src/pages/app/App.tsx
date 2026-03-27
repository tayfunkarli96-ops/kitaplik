
  import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from '../../components/app/Navbar'; 
import HomePage from '../home/HomePage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import AboutPage from '../about/AboutPage';
import QuizPage from '../quiz/QuizPage';
import MovieDetailsPage from '../movies/MovieDetailsPage';

// FİLM YÖNETİMİ DOSYALARI
import MoviesPage from '../movies/MoviesPage'; 
import MoviesManagement from '../movies/nested/MoviesManagement'; 
import AddMovie from '../movies/nested/AddMovie'; 
import MoviesStats from '../movies/nested/MoviesStats'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />

        {/* İÇ İÇE ROTALAR (SOL MENÜ İÇİN) */}
        <Route path="/movies" element={<MoviesPage />}>
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
