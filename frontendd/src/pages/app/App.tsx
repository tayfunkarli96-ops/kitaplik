import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Navbar yolu
import Navbar from '../../components/app/Navbar'; 

// Sayfa Importları
import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import MovieDetailsPage from '../movies/MovieDetailsPage';
import AboutPage from '../about/AboutPage';
import QuizPage from '../quiz/QuizPage';

// İŞTE DÜZELTİLEN SATIR: 'ContactsPage' (S harfi eklendi)
import ContactPage from '../contacts/ContactsPage'; 

function App() {
  return (
    <Router>
      {/* Arayüzü bozan 'flex' ve 'ml-64' gibi her şeyi sildim. 
          Senin orijinal CSS düzenin neyse site tam olarak öyle görünecek.
      */}
      <Navbar />

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
