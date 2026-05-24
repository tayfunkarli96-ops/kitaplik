import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPE DEFINITIONS ---
interface Movie {
  id: number;
  title: string;
  poster: string; // URL veya Placeholder
  matchRate: number; // Req 8 AI puanı
  category: string; // Req 4 Filtre
}

// Mock Data - Premium görsellerin placeholders (gerçek hayatta API'den gelir)
const mockMovies: Movie[] = [
  { id: 1, title: 'Interstellar', poster: 'https://image.tmdb.org/t/p/w500/gEU2vW9scwUv6v07fsr3bYvY43r.jpg', matchRate: 99, category: 'Sci-Fi' },
  { id: 2, title: 'Inception', poster: 'https://image.tmdb.org/t/p/w500/o0pi034RdtN7FjWwF3u9M7H6737.jpg', matchRate: 95, category: 'Sci-Fi' },
  { id: 3, title: 'Dune: Part Two', poster: 'https://image.tmdb.org/t/p/w500/czembW0RUDLhYbs8CUIw46D0S79.jpg', matchRate: 88, category: 'Action' },
  { id: 4, title: 'Oppenheimer', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', matchRate: 82, category: 'Drama' },
];

// --- PREMIUM ANIMATION VARIANTS (Sırrımız Burada) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Çocuklar sırayla gelir
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 } // Yumuşak yay efekti
  },
  hover: { scale: 1.05, y: -10, transition: { duration: 0.3 } } // Mobilde basılı tutunca
};

// --- COMPONENT MAIN ---
const OrbitalDiscovery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Req 4: Filtreleme mantığı
  const filteredMovies = activeFilter === 'All' 
    ? mockMovies 
    : mockMovies.filter(m => m.category === activeFilter);

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Orbital Premieres</h1>
      
      {/* Premium Filtre Barı (Req 4) */}
      <div style={styles.filterBar}>
        {['All', 'Sci-Fi', 'Action', 'Drama'].map(filter => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            style={{...styles.filterBtn, ...(activeFilter === filter ? styles.filterBtnActive : {})}}>
            {filter}
          </button>
        ))}
      </div>

      {/* Akıcı Kart Grid'i (Req 8 AI Puanlı) */}
      <motion.div 
        style={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <AnimatePresence> {/* Elemanlar değişirken animasyon */}
          {filteredMovies.map(movie => (
            <motion.div 
              key={movie.id} 
              style={styles.card}
              variants={cardVariants}
              whileHover="hover" // Mobilde dokunmatik tepki
              layout // Pozisyon değişimlerini otomatik filtrele
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}>
              
              {/* Premium Glow Efekti (REQ 8 Match Rate) */}
              <div style={styles.glowEffect}></div>
              
              <img src={movie.poster} alt={movie.title} style={styles.poster} />
              <div style={styles.cardMeta}>
                <p style={styles.movieTitle}>{movie.title}</p>
                <div style={styles.matchBadge}>{movie.matchRate}% AI Match</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// --- PREMIUM STYLING (JS Objects for copy-paste) ---
const styles: { [key: string]: React.CSSProperties } = {
  page: { backgroundColor: '#000408', minHeight: '100vh', padding: '20px', fontFamily: '"SF Pro Display", -apple-system, system-ui, sans-serif', color: '#fff', overflowX: 'hidden' },
  pageTitle: { fontSize: '28px', fontWeight: 'bold', letterSpacing: '-1px', marginBottom: '25px' },
  
  filterBar: { display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' },
  filterBtn: { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', cursor: 'pointer', transition: '0.3s' },
  filterBtnActive: { backgroundColor: '#fff', color: '#000', borderColor: '#fff' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '20px' },
  
  card: { position: 'relative', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#09101a', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', cursor: 'pointer' },
  poster: { width: '100%', height: '200px', objectFit: 'cover' },
  cardMeta: { padding: '12px' },
  movieTitle: { fontSize: '15px', fontWeight: 'bold', margin: '0 0 5px 0' },
  matchBadge: { display: 'inline-block', fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' },
  
  // Premium Arka Plan Işıltısı
  glowEffect: { position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none', z-index: 0 }
};

export default OrbitalDiscovery;
