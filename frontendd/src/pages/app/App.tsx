import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/app/Navbar'; 
import HomePage from './pages/home/HomePage';
import NewsPage from './pages/news/NewsPage'; 
import ProfilePage from './pages/profile/ProfilePage';
import AboutPage from './pages/about/AboutPage';
import QuizPage from './pages/quiz/QuizPage';
import MovieDetailsPage from './pages/movies/MovieDetailsPage';
import MoviesPage from './pages/movies/MoviesPage'; 
// --- YENİ EKLENEN KAPI ---
import ContactsPage from './pages/contacts/ContactsPage'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/login" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* --- İŞTE BU KADAR, SİSTEMİ BOZMAZ --- */}
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
