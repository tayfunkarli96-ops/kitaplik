import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/app/Navbar'; 
import HomePage from './pages/home/HomePage';
import MoviesPage from './pages/movies/MoviesPage'; 
import ContactsPage from './pages/contacts/ContactsPage'; 
import NewsPage from './pages/news/NewsPage'; 
import AboutPage from './pages/about/AboutPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
