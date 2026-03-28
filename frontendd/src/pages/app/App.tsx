import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/app/Navbar'; 
import HomePage from './pages/home/HomePage';
import MoviesPage from './pages/movies/MoviesPage'; 
import ContactsPage from './pages/contacts/ContactsPage'; 
// Varsa NewsPage, AboutPage falan onları da buraya import et

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          {/* İŞTE İLETİŞİM SAYFASININ KİLİDİ BURASI */}
          <Route path="/contacts" element={<ContactsPage />} />
          {/* Diğer Route'larını da buraya ekle */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
