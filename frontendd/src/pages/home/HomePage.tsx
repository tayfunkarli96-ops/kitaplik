
import { useState, useEffect } from "react";
import Footer from "@components/app/Footer";
import './HomePage.css'
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="movie-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* VİTRİN - CORNFLIX KARŞILAMA EKRANI */}
      <div 
        className="hero-section" 
        style={{ 
          padding: '100px 20px', 
          textAlign: 'center', 
          backgroundColor: '#000', 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1 style={{ fontSize: '4rem', color: '#fff', marginBottom: '20px' }}>
          Sınırsız Eğlence <span style={{ color: '#F5B301' }}>CornFlix'te</span>
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#ccc', maxWidth: '800px', margin: '0 auto 40px' }}>
          En yeni filmler, sürükleyici diziler ve sinema dünyasından son haberler için tek adresiniz.
        </p>
        <button 
          style={{
            padding: '15px 40px',
            fontSize: '1.2rem',
            backgroundColor: '#F5B301',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => alert("Yakında...")}
        >
          Keşfetmeye Başla
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
