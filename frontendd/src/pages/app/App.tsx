import React from 'react';
import Header from '../../components/Header';
import MovieList from '../../components/MovieList';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#141414', // Cornflix koyu arka planı
      minHeight: '100vh', // Ekranın tamamını kaplaması için
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    }}>
      {/* Üst Kırmızı Menü */}
      <Header />
      
      {/* İçerik Alanı (Mobil ekrana tam oturması için ortalandı) */}
      <div style={{ 
        maxWidth: '500px', // Telefon ekranı genişliği simülasyonu
        margin: '0 auto', // Ortalamak için
        padding: '15px'
      }}>
        <MovieList />
      </div>
    </div>
  );
}

export default App;
