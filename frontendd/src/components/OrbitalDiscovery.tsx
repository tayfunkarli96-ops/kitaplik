import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- VERİ MODELİ VE GEREKSİNİMLER (REQ 3, 4, 8) ---
interface Movie {
  id: number;
  title: string;
  poster: string;
  matchRate: number; // REQ 8: AI Eşleşme Oranı
  category: string;  // REQ 4: Filtreleme Kategorisi
  director: string;  // REQ 3: Yönetmen Bilgisi
  plot: string;
  cast: { name: string, role: string }[]; // REQ 3: Oyuncu Bilgisi
}

// Garantili çalışan, patlamayan yüksek çözünürlüklü premium görseller eklendi.
const mockMovies: Movie[] = [
  { 
    id: 1, 
    title: 'Interstellar', 
    director: 'Christopher Nolan', 
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80', 
    matchRate: 99, 
    category: 'Sci-Fi',
    plot: "İnsanlığın geleceği tehlikedeyken, bir grup astronot solucan deliğinden geçerek yeni bir yuva arayışına çıkar.",
    cast: [{name: "M. McConaughey", role: "Cooper"}, {name: "Anne Hathaway", role: "Brand"}]
  },
  { 
    id: 2, 
    title: 'Inception', 
    director: 'Christopher Nolan', 
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80', 
    matchRate: 95, 
    category: 'Sci-Fi',
    plot: "Rüyalar içinde hırsızlık yapan bir uzman, 'inception' (fikir aşılama) adı verilen imkansız bir görevi kabul eder.",
    cast: [{name: "L. DiCaprio", role: "Cobb"}, {name: "Cillian Murphy", role: "Fischer"}]
  },
  { 
    id: 3, 
    title: 'Dune: Part Two', 
    director: 'Denis Villeneuve', 
    poster: 'https://images.unsplash.com/photo-1541873676-a18131494184?w=500&q=80', 
    matchRate: 88, 
    category: 'Action',
    plot: "Efsanevi bir yolculukta Paul Atreides, ailesini yok eden komploculara karşı intikam savaşına girer.",
    cast: [{name: "T. Chalamet", role: "Paul"}, {name: "Zendaya", role: "Chani"}]
  },
  { 
    id: 4, 
    title: 'Oppenheimer', 
    director: 'Christopher Nolan', 
    poster: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&q=80', 
    matchRate: 82, 
    category: 'Drama',
    plot: "Amerikalı bilim insanı J. Robert Oppenheimer'ın atom bombasını geliştirme sürecindeki rolü ve yaşadığı içsel çatışmalar.",
    cast: [{name: "Cillian Murphy", role: "Oppenheimer"}, {name: "Robert Downey Jr.", role: "Strauss"}]
  }
];

const OrbitalDiscovery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedMovie = mockMovies.find(m => m.id === selectedId);

  // REQ 4: Kategorik Filtreleme Mantığı
  const filteredMovies = activeFilter === 'All' 
    ? mockMovies 
    : mockMovies.filter(m => m.category === activeFilter);

  return (
    <div style={styles.viewContainer}>
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>ORBITAL EXPLORER</span>
        <span style={styles.reqBadge}>REQ 3, 4, 8</span>
      </div>

      {/* REQ 4: FİLTRELEME BUTONLARI */}
      <div style={styles.filterContainer}>
        {['All', 'Sci-Fi', 'Action', 'Drama'].map(filter => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            style={{...styles.filterTab, ...(activeFilter === filter ? styles.activeFilterTab : {})}}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* FİLM KARTLARI (GRID) */}
      <div style={styles.movieGrid}>
        <AnimatePresence>
          {filteredMovies.map(movie => (
            <motion.div
              key={movie.id}
              layoutId={`card-${movie.id}`} // Sihirli "Hero Animation" Geçişi
              onClick={() => setSelectedId(movie.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={styles.movieCard}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,240,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img 
                  layoutId={`img-${movie.id}`} 
                  src={movie.poster} 
                  style={styles.posterImg} 
              />
              <motion.div style={styles.cardInfo}>
                <motion.h4 layoutId={`title-${movie.id}`} style={styles.movieTitle}>{movie.title}</motion.h4>
                <span style={styles.matchBadge}>{movie.matchRate}% AI MATCH</span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* REQ 3: DETAY EKRANI VE OYUNCU/YÖNETMEN VERİSİ (HERO ANIMATION) */}
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
              >
                ✕
              </motion.button>

              <motion.img 
                layoutId={`img-${selectedId}`} 
                src={selectedMovie.poster} 
                style={styles.expandedImg} 
              />
              
              <div style={styles.detailsContent}>
                <motion.h2 layoutId={`title-${selectedId}`} style={styles.expandedTitle}>{selectedMovie.title}</motion.h2>
                <p style={styles.directorName}><i className="fa-solid fa-clapperboard"></i> Yönetmen: {selectedMovie.director}</p>
                <p style={styles.plotText}>{selectedMovie.plot}</p>

                {/* REQ 3: OYUNCULAR (HOLOGRAFİK KARTLAR) */}
                <h3 style={styles.subHeader}>Sistem Kayıtları: Oyuncular</h3>
                <div style={styles.castGrid}>
                    {selectedMovie.cast.map((actor, index) => (
                        <div key={index} style={styles.castCard}>
                            <p style={styles.actorName}>{actor.name}</p>
                            <p style={styles.actorRole}>Rol: {actor.role}</p>
                        </div>
                    ))}
                </div>
                
                <button style={styles.actionBtn}>SİNYALİ BAŞLAT</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- KUSURSUZ MOBİL CSS AYARLARI ---
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff' },
  reqBadge: { fontSize: '10px', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #00f0ff' },
  
  filterContainer: { display: 'flex', gap: '8px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '5px' },
  filterTab: { backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid #1a202c', color: '#4a5568', padding: '6px 14px', borderRadius: '10px', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', fontSize: '12px', transition: '0.2s', whiteSpace: 'nowrap' },
  activeFilterTab: { backgroundColor: 'rgba(0, 240, 255, 0.05)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)' },

  // Kart boyutlarını sınırlandırıp düzene sokan grid ayarı
  movieGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' },
  movieCard: { backgroundColor: '#090d16', border: '1px solid #111927', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  posterImg: { width: '100%', height: '220px', objectFit: 'cover' },
  cardInfo: { padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  movieTitle: { fontSize: '14px', margin: '0 0 5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  matchBadge: { fontSize: '10px', color: '#00f0ff', display: 'inline-block', backgroundColor: 'rgba(0,240,255,0.1)', padding: '2px 6px', borderRadius: '4px' },

  // Detay ekranı ayarları
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2,2,5,0.9)', backdropFilter: 'blur(10px)', zIndex: 2000, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  expandedCard: { width: '100%', maxWidth: '450px', maxHeight: '85vh', backgroundColor: '#050a14', borderRadius: '20px', overflowY: 'auto', position: 'relative', border: '1px solid rgba(0,240,255,0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' },
  closeBtn: { position: 'absolute', top: '15px', right: '15px', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', zIndex: 10, fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  expandedImg: { width: '100%', height: '280px', objectFit: 'cover' },
  detailsContent: { padding: '20px' },
  expandedTitle: { fontSize: '24px', color: '#00f0ff', margin: '0 0 5px 0' },
  directorName: { fontSize: '12px', color: '#888', margin: '0 0 15px 0' },
  plotText: { fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 20px 0' },
  subHeader: { fontSize: '14px', color: '#00f0ff', margin: '0 0 10px 0', borderBottom: '1px solid rgba(0,240,255,0.1)', paddingBottom: '5px' },
  castGrid: { display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '5px' },
  castCard: { padding: '10px 15px', backgroundColor: '#0a1526', border: '1px solid #112240', borderRadius: '8px', minWidth: '120px' },
  actorName: { fontSize: '12px', fontWeight: 'bold', margin: '0 0 3px 0', color: '#fff' },
  actorRole: { fontSize: '10px', color: '#45a29e', margin: 0 },
  actionBtn: { width: '100%', padding: '14px', backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', letterSpacing: '1px' }
};

export default OrbitalDiscovery;
