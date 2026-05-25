import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
interface Movie {
  id: number;
  title: string;
  poster: string;
  matchRate: number;
  category: string;
  director: string;
  plot: string;
  cast: { name: string, role: string }[];
}

// Gelişmiş Mock Data (Req 3 için Cast eklendi)
const mockMovies: Movie[] = [
  { 
    id: 1, 
    title: 'Interstellar', 
    director: 'Christopher Nolan', 
    poster: 'https://image.tmdb.org/t/p/w500/gEU2vW9scwUv6v07fsr3bYvY43r.jpg', 
    matchRate: 99, 
    category: 'Sci-Fi',
    plot: "İnsanlığın geleceği tehlikedeyken, bir grup astronot solucan deliğinden geçerek yeni bir yuva arayışına çıkar.",
    cast: [{name: "M. McConaughey", role: "Cooper"}, {name: "Anne Hathaway", role: "Brand"}]
  },
  { 
    id: 2, 
    title: 'Inception', 
    director: 'Christopher Nolan', 
    poster: 'https://image.tmdb.org/t/p/w500/o0pi034RdtN7FjWwF3u9M7H6737.jpg', 
    matchRate: 95, 
    category: 'Sci-Fi',
    plot: "Rüyalar içinde hırsızlık yapan bir uzman, bu sefer imkansız bir görev olan 'inception' (başlatma) ile karşı karşıyadır.",
    cast: [{name: "L. DiCaprio", role: "Cobb"}, {name: "Cillian Murphy", role: "Fischer"}]
  }
];

const OrbitalDiscovery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedMovie = mockMovies.find(m => m.id === selectedId);

  return (
    <div style={styles.viewContainer}>
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>ORBITAL EXPLORER</span>
        <span style={styles.reqBadge}>HERO ANIMATION // REQ 3</span>
      </div>

      {/* MOVIE GRID */}
      <div style={styles.movieGrid}>
        {mockMovies.map(movie => (
          <motion.div
            key={movie.id}
            layoutId={`card-${movie.id}`} // Sihirli geçişin anahtarı
            onClick={() => setSelectedId(movie.id)}
            style={styles.movieCard}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
                layoutId={`img-${movie.id}`} 
                src={movie.poster} 
                style={styles.posterImg} 
            />
            <motion.div style={styles.cardInfo}>
              <motion.h4 layoutId={`title-${movie.id}`} style={styles.movieTitle}>{movie.title}</motion.h4>
              <span style={styles.matchBadge}>{movie.matchRate}% MATCH</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* IMMERSIVE DETAIL OVERLAY (REQ 3 & HERO UI) */}
      <AnimatePresence>
        {selectedId && selectedMovie && (
          <div style={styles.overlay}>
            <motion.div 
              layoutId={`card-${selectedId}`} 
              style={styles.expandedCard}
            >
              <motion.button 
                onClick={() => setSelectedId(null)}
                style={styles.closeBtn}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >✕</motion.button>

              <motion.img 
                layoutId={`img-${selectedId}`} 
                src={selectedMovie.poster} 
                style={styles.expandedImg} 
              />
              
              <div style={styles.detailsContent}>
                <motion.h2 layoutId={`title-${selectedId}`} style={styles.expandedTitle}>{selectedMovie.title}</motion.h2>
                <p style={styles.directorName}>Yönetmen: {selectedMovie.director}</p>
                <p style={styles.plotText}>{selectedMovie.plot}</p>

                {/* REQ 3: CAST LIST (Holografik Polaroidler) */}
                <h3 style={styles.subHeader}>Sistem Verileri: Oyuncular</h3>
                <div style={styles.castGrid}>
                    {selectedMovie.cast.map((actor, index) => (
                        <div key={index} style={styles.castCard}>
                            <p style={styles.actorName}>{actor.name}</p>
                            <p style={styles.actorRole}>{actor.role}</p>
                        </div>
                    ))}
                </div>
                
                <button style={styles.actionBtn}>İZLEMEYE BAŞLA</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ULTRA PREMIUM STYLES ---
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff' },
  reqBadge: { fontSize: '10px', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #00f0ff' },
  
  movieGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  movieCard: { backgroundColor: '#090d16', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', position: 'relative' },
  posterImg: { width: '100%', height: '220px', objectFit: 'cover' },
  cardInfo: { padding: '10px' },
  movieTitle: { fontSize: '14px', margin: 0 },
  matchBadge: { fontSize: '9px', color: '#00f0ff', marginTop: '5px', display: 'block' },

  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  expandedCard: { width: '100%', maxWidth: '400px', height: '90vh', backgroundColor: '#020205', borderRadius: '24px', overflowY: 'auto', position: 'relative', border: '1px solid rgba(0,240,255,0.2)' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', zIndex: 10 },
  expandedImg: { width: '100%', height: '300px', objectFit: 'cover' },
  detailsContent: { padding: '25px' },
  expandedTitle: { fontSize: '28px', color: '#00f0ff', marginBottom: '5px' },
  directorName: { fontSize: '14px', color: '#888', marginBottom: '15px' },
  plotText: { fontSize: '15px', color: '#ccc', lineHeight: '1.6', marginBottom: '25px' },
  subHeader: { fontSize: '16px', color: '#00f0ff', marginBottom: '15px', borderBottom: '1px solid rgba(0,240,255,0.1)', paddingBottom: '5px' },
  castGrid: { display: 'flex', gap: '10px', marginBottom: '30px' },
  castCard: { padding: '10px', backgroundColor: '#091526', border: '1px solid #112240', borderRadius: '10px', flex: 1 },
  actorName: { fontSize: '12px', fontWeight: 'bold', margin: 0 },
  actorRole: { fontSize: '10px', color: '#45a29e', margin: 0 },
  actionBtn: { width: '100%', padding: '15px', backgroundColor: '#00f0ff', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '12px', cursor: 'pointer' }
};

export default OrbitalDiscovery;
