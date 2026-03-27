import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Navbar yolu (En son bulduğumuz doğru yol)
import Navbar from '../../components/app/Navbar'; 

// Sayfa Importları
import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage';
import NewsPage from '../news/NewsPage'; 
import ProfilePage from '../profile/ProfilePage';
import MovieDetailsPage from '../movies/MovieDetailsPage';
import AboutPage from '../about/AboutPage';
import QuizPage from '../quiz/QuizPage';

/** * 🚨 HATA BURADAYDI: Vercel 'contacts' klasörünü bulamıyor. 
 * Büyük ihtimalle klasörün adı 'contact' (tekil) ya da dosyanın adı farklı.
 * Eğer build yine hata verirse aşağıdaki satırı şu şekilde dene:
 * import ContactPage from '../contact/ContactPage'; 
 */
import ContactPage from '../contacts/ContactPage'; 

function App() {
  return (
    <Router>
      {/* Orijinal Navbar (Tasarımını bozmaması için dışarı aldım) */}
      <Navbar />

      {/* Sayfa İçerikleri (Arayüzü kaydıran div'leri temizledim) */}
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
