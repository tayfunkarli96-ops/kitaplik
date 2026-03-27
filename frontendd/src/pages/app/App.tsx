import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '../../components/app/Navbar'; 
import HomePage from '../home/HomePage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import AboutPage from '../about/AboutPage';
import QuizPage from '../quiz/QuizPage';
import MovieDetailsPage from '../movies/MovieDetailsPage';
import MoviesPage from '../movies/MoviesPage'; 

// İŞTE BURASI: ContactsPage (s harfi eklendi, Vercel artık çökmeyecek!)
import ContactPage from '../contacts/ContactsPage'; 

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
        <Route path="/contact" element={<ContactPage />} /> {/* İletişim sayfasını geri ekledim */}
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
