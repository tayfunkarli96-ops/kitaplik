import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// 🚨 YOLLAR DÜZELTİLDİ! Senin dosya yapına özel:
import Navbar from '../../components/app/Navbar'; 
import HomePage from '../home/HomePage';
import MoviesPage from '../movies/MoviesPage'; 
import ContactsPage from '../contacts/ContactsPage'; 
// (Eğer NewsPage falan varsa onları da "../news/NewsPage" diye ekle)

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          {/* Varsa diğer rotaların */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
