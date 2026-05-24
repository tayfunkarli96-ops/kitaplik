import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WatchlistItem {
  id: number;
  title: string;
  category: string;
  status: 'pending' | 'watched';
}

const initialList: WatchlistItem[] = [
  { id: 1, title: 'The Matrix', category: 'Sci-Fi', status: 'pending' },
  { id: 2, title: 'The Godfather', category: 'Crime', status: 'pending' },
  { id: 3, title: 'Pulp Fiction', category: 'Action', status: 'pending' },
];

const PremiumWatchlist: React.FC = () => {
  const [list, setList] = useState<WatchlistItem[]>(initialList);

  // Sola kaydırınca (Sil)
  const handleRemove = (id: number) => {
    setList(prev => prev.filter(item => item.id !== id));
  };

  // Sağa kaydırınca (İzlendi olarak işaretle)
  const handleWatched = (id: number) => {
    setList(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'watched' } : item
    ));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Kişisel Uydu Linki (Req 6)</h2>
      <p style={styles.subtext}>Aksiyon için öğeleri sağa veya sola kaydırın.</p>

      <div style={styles.listWrapper}>
        <AnimatePresence>
          {list.map(movie => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: movie.status === 'watched' ? 200 : -200 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={styles.itemContainer}
            >
              {/* Arka plandaki ikonlar (Sağda ve Solda) */}
              <div style={{ ...styles.actionBackground, backgroundColor: '#ff003c', left: 0 }}>
                <span style={styles.actionText}>SİLİNİYOR</span>
              </div>
              <div style={{ ...styles.actionBackground, backgroundColor: '#00f0ff', right: 0 }}>
                <span style={styles.actionText}>İZLENDİ</span>
              </div>

              {/* Sürüklenebilir Kart */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Bırakınca ortaya döner
                dragElastic={0.8} // Kaydırma direnci (lastik hissi)
                onDragEnd={(e, info) => {
                  if (info.offset.x > 100) handleWatched(movie.id); // Sağa çok kaydırıldıysa
                  else if (info.offset.x < -100) handleRemove(movie.id); // Sola çok kaydırıldıysa
                }}
                style={{
                  ...styles.card,
                  borderColor: movie.status === 'watched' ? '#00f0ff' : 'rgba(255,255,255,0.1)',
                  opacity: movie.status === 'watched' ? 0.5 : 1
                }}
              >
                <div>
                  <h3 style={styles.title}>{movie.title}</h3>
                  <span style={styles.badge}>{movie.category}</span>
                </div>
                {movie.status === 'watched' && <span style={styles.watchedIcon}>✓</span>}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.emptyText}>
            İzlenecekler listeniz boş. Yeni hedefler ekleyin.
          </motion.p>
        )}
      </div>
    </div>
  );
};

// --- STYLES ---
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '20px', backgroundColor: '#050a14', minHeight: '50vh', color: '#fff', fontFamily: '"Inter", sans-serif' },
  header: { fontSize: '20px', color: '#fff', margin: '0 0 5px 0', letterSpacing: '1px' },
  subtext: { fontSize: '12px', color: '#888', marginBottom: '20px' },
  listWrapper: { display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' },
  itemContainer: { position: 'relative', width: '100%', height: '70px', borderRadius: '12px' },
  actionBackground: { position: 'absolute', top: 0, bottom: 0, width: '100%', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 20px', zIndex: 0 },
  actionText: { fontSize: '12px', fontWeight: 'bold', color: '#000', letterSpacing: '2px' },
  card: { 
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
    backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    padding: '0 20px', zIndex: 1, cursor: 'grab', boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
  },
  title: { margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' },
  badge: { fontSize: '10px', padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', textTransform: 'uppercase' },
  watchedIcon: { color: '#00f0ff', fontSize: '20px', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: '20px', fontSize: '14px' }
};

export default PremiumWatchlist;
