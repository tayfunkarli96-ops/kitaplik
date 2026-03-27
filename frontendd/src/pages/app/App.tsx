import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/app/Navbar'; 
import HomePage from './pages/home/HomePage';
import MoviesPage from './pages/movies/MoviesPage'; 
import ContactsPage from './pages/contacts/ContactsPage'; 
// Diğer sayfaların importlarını buraya ekle (News, About vb.)

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          {/* Diğer Route'larını buraya ekle */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
