
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. TİPLER VE VERİ ARAYÜZLERİ
// ==========================================
interface TargetMovie {
  id: number;
  title: string;
  year: string;
  poster: string;
  status: string;
  matchRate?: number;
}

// ==========================================
// 2. RADAR ANİMASYONU (BOŞ DURUM İÇİN)
// ==========================================
// Hedef listesi boş olduğunda sıradan bir metin yerine 
// dönen ve sinyal arayan siberpunk bir radar render edilir.
const RadarScanner: React.FC = () => {
  return (
    <div style={styles.radarContainer}>
      <div style={styles.radarRing1}></div>
      <div style={styles.radarRing2}></div>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={styles.radarSweep}
      />
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={styles.radarDot}
      />
      <p style={styles.radarText}>HEDEF BULUNAMADI. YENİ SİNYALLER TARANIYOR...</p>
    </div>
  );
};

// ==========================================
// 3. ANA BİLEŞEN: PREMIUM WATCHLIST
// ==========================================
const PremiumWatchlist: React.FC = () => {
  const [targets, setTargets] = useState<TargetMovie[]>([]);
  const [sortOrder, setSortOrder] = useState<'NEWEST' | 'ALPHABETICAL'>('NEWEST');
  const [isScanning, setIsScanning] = useState(true);

  // Sistem açılışında veritabanını (LocalStorage) okur ve hafif bir tarama gecikmesi (boot) ekler.
  useEffect(() => {
    const fetchTargets = () => {
      const savedTargets = JSON.parse(localStorage.getItem('cornflix_targets') || '[]');
      setTargets(savedTargets);
      setTimeout(() => setIsScanning(false), 800); // Sistem tarama simülasyonu
    };
    fetchTargets();
  }, []);

  // REQ 6: Jest ile Listeden Silme İşlemi
  const handleDismiss = (id: number) => {
    const updated = targets.filter(item => item.id !== id);
    setTargets(updated);
    localStorage.setItem('cornflix_targets', JSON.stringify(updated));
  };

  // Nöral Sıralama Algoritması (Memoized for Performance)
  const sortedTargets = useMemo(() => {
    const list = [...targets];
    if (sortOrder === 'ALPHABETICAL') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'NEWEST' varsayılan olarak eklendiği sıradır (LocalStorage dizilişi)
    return list.reverse(); 
  }, [targets, sortOrder]);

  return (
    <div style={styles.viewContainer}>
      
      {/* BAŞLIK VE KATEGORİ ETİKETİ */}
      <div style={styles.metaHeader}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={styles.sectionTitle}>TARGET WATCHLIST</span>
          <span style={styles.sectionSubtitle}>Sistem izleme ve operasyon merkezi</span>
        </div>
        <span style={styles.reqBadge}>REQ 6 // SWIPE ENGINE</span>
      </div>

      {/* TELEMETRİ VE İSTATİSTİK PANELİ (HUD) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={styles.statsPanel}
      >
        <div style={styles.statBox}>
          <span style={styles.statLabel}>KİLİTLİ HEDEF</span>
          <span style={styles.statValue}>{targets.length}</span>
        </div>
        <div style={styles.statDivider}></div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>AĞ DURUMU</span>
          <span style={{ ...styles.statValue, color: '#00ffaa' }}>SECURE</span>
        </div>
        <div style={styles.statDivider}></div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>ŞİFRELEME</span>
          <span style={{ ...styles.statValue, color: '#00f0ff' }}>256-BIT</span>
        </div>
      </motion.div>

      {/* TALİMAT VE SIRALAMA KONTROLLERİ */}
      <div style={styles.controlsRow}>
        <div style={styles.instructionBanner}>
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <span style={{ color: '#00f0ff', marginRight: '8px' }}>{'>>>'}</span>
          </motion.div>
          <span>Sinyali kesmek için kartları sağa kaydırın.</span>
        </div>

        <div style={styles.sortToggle}>
          <button 
            onClick={() => setSortOrder('NEWEST')}
            style={{...styles.sortBtn, ...(sortOrder === 'NEWEST' ? styles.activeSortBtn : {})}}
          >
            YENİ
          </button>
          <button 
            onClick={() => setSortOrder('ALPHABETICAL')}
            style={{...styles.sortBtn, ...(sortOrder === 'ALPHABETICAL' ? styles.activeSortBtn : {})}}
          >
            A-Z
          </button>
        </div>
      </div>

      {/* DİNAMİK LİSTE STACK'İ */}
      <div style={styles.listStack}>
        {isScanning ? (
          // Tarama (Yüklenme) Ekranı
          <div style={styles.loadingState}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={styles.spinner} />
            <p style={styles.loadingText}>VERİTABANI EŞLEŞTİRİLİYOR...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {targets.length === 0 ? (
              // Hedef Yoksa Radar Animasyonu Göster
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <RadarScanner />
              </motion.div>
            ) : (
              // Hedef Varsa Kartları Listele
              sortedTargets.map((movie, index) => (
                <motion.div
                  key={movie.id} 
                  layout 
                  initial={{ opacity: 0, x: -30, filter: 'blur(5px)' }} 
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)', transition: { delay: index * 0.05 } }} 
                  exit={{ x: '100%', opacity: 0, scale: 0.9, filter: 'blur(10px)', transition: { duration: 0.3 } }}
                  drag="x" 
                  dragConstraints={{ left: 0, right: 350 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    // Kaydırma Eşiği (Threshold): Kullanıcı kartı 120px'den fazla sağa çekerse silinir.
                    if (info.offset.x > 120) {
                      handleDismiss(movie.id);
                    }
                  }}
                  whileDrag={{ scale: 1.02, backgroundColor: 'rgba(255, 51, 102, 0.1)', borderColor: '#ff3366', zIndex: 10 }}
                  style={styles.dragCard}
                >
                  {/* SİLME İPUCU (Arka Planda Yazan Kırmızı Yazı) */}
                  <div style={styles.deleteHint}>
                    <span style={{ fontSize: '18px', marginRight: '10px' }}>⚠️</span>
                    SİNYAL KESİLİYOR...
                  </div>

                  {/* KARTIN ANA İÇERİĞİ */}
                  <div style={styles.cardContent}>
                    <div style={styles.thumbnailWrapper}>
                      <img src={movie.poster} alt={movie.title} style={styles.thumbnail} />
                      <div style={styles.thumbnailOverlay}></div>
                    </div>
                    
                    <div style={styles.cardBody}>
                      <h4 style={styles.movieTitle}>{movie.title}</h4>
                      <div style={styles.metaRow}>
                        <span style={styles.movieYear}>
                          <span style={{ color: '#00f0ff', marginRight: '4px' }}>📅</span> 
                          {movie.year}
                        </span>
                        <span style={styles.statusBadge}>
                          <span style={styles.statusDot}></span> {movie.status || 'LOCKED'}
                        </span>
                      </div>
                    </div>

                    <div style={styles.swipeIndicator}>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        {'>>'}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. ULTRA PREMIUM CSS MİMARİSİ
// ==========================================
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px' },
  
  // Başlık Bölümü
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '2px', textShadow: '0 0 10px rgba(0,240,255,0.4)', margin: '0 0 5px 0' },
  sectionSubtitle: { fontSize: '11px', color: '#64748b', letterSpacing: '0.5px' },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.3)', fontWeight: 'bold' },
  
  // Telemetri Paneli (HUD)
  statsPanel: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '16px', padding: '15px 20px', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  statBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  statLabel: { fontSize: '10px', color: '#64748b', marginBottom: '4px', letterSpacing: '1px' },
  statValue: { fontSize: '16px', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.2)' },
  statDivider: { width: '1px', height: '30px', backgroundColor: '#112240' },
  
  // Kontrol Satırı (Talimat ve Sıralama)
  controlsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '20px' },
  instructionBanner: { flex: 1, backgroundColor: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '10px', padding: '12px 15px', fontSize: '11px', color: '#00f0ff', display: 'flex', alignItems: 'center' },
  sortToggle: { display: 'flex', backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '10px', overflow: 'hidden' },
  sortBtn: { padding: '10px 15px', backgroundColor: 'transparent', border: 'none', color: '#64748b', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.3s' },
  activeSortBtn: { backgroundColor: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff' },
  
  // Liste ve Kart Yapısı
  listStack: { display: 'flex', flexDirection: 'column', gap: '16px' },
  dragCard: { backgroundColor: '#090d16', border: '1px solid #112240', borderRadius: '16px', position: 'relative', touchAction: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.4)' },
  deleteHint: { position: 'absolute', left: '25px', top: '0', height: '100%', display: 'flex', alignItems: 'center', color: '#ff3366', fontWeight: 'bold', letterSpacing: '2px', fontSize: '13px', zIndex: 0 },
  
  cardContent: { position: 'relative', zIndex: 1, backgroundColor: '#090d16', display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '16px', transition: 'background-color 0.3s' },
  thumbnailWrapper: { position: 'relative', width: '70px', height: '95px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' },
  thumbnail: { width: '100%', height: '100%', objectFit: 'cover' },
  thumbnailOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, rgba(0,240,255,0.2), transparent)' },
  
  cardBody: { flex: 1, marginLeft: '18px' },
  movieTitle: { fontSize: '16px', margin: '0 0 8px 0', color: '#fff', fontWeight: '700', letterSpacing: '0.5px' },
  metaRow: { display: 'flex', alignItems: 'center', gap: '15px' },
  movieYear: { fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center' },
  statusBadge: { fontSize: '9px', color: '#00ffaa', backgroundColor: 'rgba(0,255,170,0.1)', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(0,255,170,0.2)' },
  statusDot: { width: '6px', height: '6px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 5px #00ffaa' },
  
  swipeIndicator: { color: '#1e293b', fontSize: '16px', paddingRight: '15px', fontWeight: 'bold' },
  
  // Yüklenme ve Boş Durum (Radar) Stilleri
  loadingState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' },
  spinner: { width: '40px', height: '40px', border: '3px solid rgba(0,240,255,0.2)', borderTopColor: '#00f0ff', borderRadius: '50%', marginBottom: '20px' },
  loadingText: { color: '#00f0ff', fontSize: '12px', letterSpacing: '2px' },
  
  radarContainer: { position: 'relative', width: '100%', height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020205', border: '1px dashed #112240', borderRadius: '20px', marginTop: '20px', overflow: 'hidden' },
  radarRing1: { position: 'absolute', width: '150px', height: '150px', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '50%' },
  radarRing2: { position: 'absolute', width: '80px', height: '80px', border: '1px solid rgba(0,240,255,0.4)', borderRadius: '50%' },
  radarSweep: { position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(from 0deg, rgba(0,240,255,0.2) 0deg, transparent 60deg, transparent 360deg)' },
  radarDot: { position: 'absolute', top: '70px', right: '100px', width: '6px', height: '6px', backgroundColor: '#ff3366', borderRadius: '50%', boxShadow: '0 0 10px #ff3366' },
  radarText: { position: 'absolute', bottom: '25px', color: '#4a5568', fontSize: '11px', letterSpacing: '1px', fontWeight: 'bold' }
};

export default PremiumWatchlist;
