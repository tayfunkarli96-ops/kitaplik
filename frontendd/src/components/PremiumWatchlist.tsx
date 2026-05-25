import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- VERİ MODELİ VE MOCK DATA ---
interface TargetMovie {
  id: number;
  title: string;
  year: string;
  poster: string;
  status: 'LOCKED' | 'PENDING';
}

const initialTargets: TargetMovie[] = [
  { 
    id: 101, 
    title: 'Blade Runner 2049', 
    year: '2017', 
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80',
    status: 'LOCKED' 
  },
  { 
    id: 102, 
    title: 'Cyberpunk: Edgerunners', 
    year: '2022', 
    poster: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=500&q=80',
    status: 'LOCKED' 
  },
  { 
    id: 103, 
    title: 'The Matrix', 
    year: '1999', 
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    status: 'PENDING' 
  },
];

const PremiumWatchlist: React.FC = () => {
  const [targets, setTargets] = useState<TargetMovie[]>(initialTargets);

  // REQ 6: Kaydırma Jestleriyle (Swipe) Listeden Çıkarma Mantığı
  const handleDismiss = (id: number) => {
    setTargets(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div style={styles.viewContainer}>
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>TARGET WATCHLIST</span>
        <span style={styles.reqBadge}>REQ 6 // SWIPE ENGINE</span>
      </div>

      <div style={styles.instructionBanner}>
        <i className="fa-solid fa-angles-right" style={{ color: '#00f0ff' }}></i>
        <span> Sinyali kesmek için kartları sağa kaydırın.</span>
      </div>

      <div style={styles.listStack}>
        <AnimatePresence mode="popLayout">
          {targets.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              style={styles.emptyState}
            >
              <i className="fa-solid fa-radar" style={{ fontSize: '32px', color: '#112240', marginBottom: '15px', display: 'block' }}></i>
              Aktif hedef bulunamadı. Yeni sinyaller bekleniyor...
            </motion.div>
          ) : (
            targets.map(movie => (
              <motion.div
                key={movie.id}
                layout // Eleman silinince altındakilerin pürüzsüzce yukarı kaymasını sağlar
                drag="x" // Sadece yatay eksende sürüklenebilir
                dragConstraints={{ left: 0, right: 300 }} // Sola kaydırmayı engeller, sadece sağa izin verir
                onDragEnd={(_, info) => {
                  // Kullanıcı kartı X ekseninde 120px'den fazla sağa çekerse tetiklenir
                  if (info.offset.x > 120) {
                    handleDismiss(movie.id);
                  }
                }}
                whileDrag={{ scale: 1.02, backgroundColor: 'rgba(255, 51, 102, 0.1)', borderColor: '#ff3366' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ x: '100%', opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                style={styles.dragCard}
              >
                {/* Sol Taraftaki Silme İpucu (Kart sağa çekildikçe altından kırmızı ışık çıkar) */}
                <div style={styles.deleteHint}>SİL</div>

                {/* Ana Kart İçeriği */}
                <div style={styles.cardContent}>
                  <img src={movie.poster} alt={movie.title} style={styles.thumbnail} />
                  
                  <div style={styles.cardBody}>
                    <h4 style={styles.movieTitle}>{movie.title}</h4>
                    <span style={styles.movieYear}>
                      <i className="fa-solid fa-satellite"></i> {movie.year} // SYSTEM_QUEUE
                    </span>
                  </div>

                  <div style={styles.swipeIcon}>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- PREMIUM SİBERPUNK CSS ---
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #1a202c', paddingBottom: '10px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff' },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.2)' },
  
  instructionBanner: { backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '8px', padding: '10px 15px', fontSize: '11px', color: '#888', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.05)' },
  
  listStack: { display: 'flex', flexDirection: 'column', gap: '15px' },
  
  dragCard: {
    backgroundColor: '#090d16', border: '1px solid #112240', borderRadius: '12px', overflow: 'hidden', cursor: 'grab', position: 'relative', touchAction: 'none' // Mobilde kaydırmanın sorunsuz çalışması için touchAction şart
  },
  deleteHint: { position: 'absolute', left: '20px', top: '0', height: '100%', display: 'flex', alignItems: 'center', color: '#ff3366', fontWeight: 'bold', letterSpacing: '2px', fontSize: '14px', zIndex: 0 },
  
  cardContent: { position: 'relative', zIndex: 1, backgroundColor: '#090d16', display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '12px' },
  thumbnail: { width: '60px', height: '85px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' },
  cardBody: { flex: 1, marginLeft: '15px' },
  movieTitle: { fontSize: '15px', margin: '0 0 8px 0', color: '#fff', fontFamily: 'sans-serif', fontWeight: 'bold', letterSpacing: '0.5px' },
  movieYear: { fontSize: '10px', color: '#4a5568' },
  swipeIcon: { color: '#112240', fontSize: '16px', marginLeft: '10px' },
  
  emptyState: { textAlign: 'center', padding: '60px 20px', color: '#4a5568', fontSize: '12px', border: '1px dashed #112240', borderRadius: '12px' }
};

export default PremiumWatchlist;
