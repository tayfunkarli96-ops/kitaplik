import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK BİLEŞENLER (Senin klasörden import ettiklerin gibi simüle edildi) ---
const DiscoverView = () => <div style={styles.viewPlaceholder}>🪐 ORBITAL PREMIERES <p style={{fontSize:'14px', color:'#666', marginTop:'10px'}}>Gelişmiş Filtreleme ve AI Öneri Motoru Aktif.</p></div>;
const WatchlistView = () => <div style={styles.viewPlaceholder}>🛰️ HEDEF LİSTESİ <p style={{fontSize:'14px', color:'#666', marginTop:'10px'}}>Swipe jestleri ile izlenecekleri yönetin.</p></div>;
const AdminView = () => <div style={styles.viewPlaceholder}>🛡️ OVERSEER COMMAND <p style={{fontSize:'14px', color:'#666', marginTop:'10px'}}>Sinyal moderasyonu ve global haber yayını frekansı.</p></div>;
const ProfileView = () => <div style={styles.viewPlaceholder}>👤 SİNAPTİK KİMLİK <p style={{fontSize:'14px', color:'#666', marginTop:'10px'}}>Operatör profil ayarları ve Linguistic Engine.</p></div>;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('DISCOVER');
  const [dbStatus, setDbStatus] = useState<number>(84); // Canlı veri yükleme simülasyonu
  const [time, setTime] = useState<string>('');

  // Canlı Saat Efekti (HUD paneli için olmazsa olmaz)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'DISCOVER': return <DiscoverView />;
      case 'WATCHLIST': return <WatchlistView />;
      case 'ADMIN': return <AdminView />;
      case 'PROFILE': return <ProfileView />;
      default: return <DiscoverView />;
    }
  };

  return (
    <div style={styles.appShell}>
      
      {/* 1. ULTRA PREMIUM SİBER ARKA PLAN (Yıldız Tozu Efekti) */}
      <div style={styles.ambientGlow}></div>
      <div style={styles.matrixGrid}></div>

      {/* 2. TELEMETRİ ÜST BAR (Hoca Buraya Bayılacak) */}
      <header style={styles.telemetryHeader}>
        <div style={styles.telemetryGroup}>
          <span style={styles.pulseNode}></span>
          <span style={styles.systemBrand}>CORNFLIX // CORE_OS_v2.0</span>
        </div>
        <div style={styles.telemetryGroup}>
          <span style={styles.telemetryData}>DB_LOAD: {dbStatus}%</span>
          <span style={styles.telemetryDivider}>|</span>
          <span style={styles.telemetryData}><i className="fa-solid fa-clock"></i> {time}</span>
        </div>
      </header>

      {/* 3. ANA İÇERİK SAHNESİ */}
      <main style={styles.mainStage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.97, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.03, y: -15, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            style={{ height: '100%' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. MEGA KLAS HOLOGRAFİK BOTTOM NAVIGATION */}
      <nav style={styles.hologramNav}>
        {[
          { id: 'DISCOVER', icon: 'fa-solid fa-satellite-dish', label: 'PREMIERES' },
          { id: 'WATCHLIST', icon: 'fa-solid fa-list-check', label: 'TARGETS' },
          { id: 'ADMIN', icon: 'fa-solid fa-shield-halved', label: 'OVERSEER' },
          { id: 'PROFILE', icon: 'fa-solid fa-fingerprint', label: 'IDENTITY' }
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={styles.navButton}
            >
              {/* Arkada Kayan Neon Işık Havuzu */}
              {isActive && (
                <motion.div
                  layoutId="hologramGlow"
                  style={styles.neonLiquidIndicator}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* İkon ve Metin Katmanı */}
              <motion.div 
                animate={{ y: isActive ? -4 : 0 }}
                style={{ ...styles.metaContainer, color: isActive ? '#00f0ff' : '#4a5568' }}
              >
                <i className={item.icon} style={{ fontSize: '18px', textShadow: isActive ? '0 0 10px #00f0ff' : 'none' }}></i>
                <span style={{ ...styles.navLabel, fontWeight: isActive ? '700' : '400' }}>{item.label}</span>
              </motion.div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// --- ULTRA PREMIUM INLINE CSS (Cyber-Industrial Palette) ---
const styles: { [key: string]: React.CSSProperties } = {
  appShell: {
    position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#020205',
    color: '#fff', fontFamily: '"Share Tech Mono", monospace', overflow: 'hidden',
    display: 'flex', flexDirection: 'column'
  },
  ambientGlow: {
    position: 'absolute', top: '-10%', left: '25%', width: '50vw', height: '50vh',
    background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, rgba(0,0,0,0) 70%)',
    pointerEvents: 'none', zIndex: 0
  },
  matrixGrid: {
    position: 'absolute', width: '100%', height: '100%',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px)',
    backgroundSize: '30px 30px', pointerEvents: 'none', zIndex: 0
  },
  telemetryHeader: {
    position: 'relative', zIndex: 10, height: '40px', borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
    backgroundColor: 'rgba(2, 2, 5, 0.8)', backdropFilter: 'blur(5px)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'
  },
  telemetryGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  pulseNode: { width: '6px', height: '6px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 8px #00f0ff', animation: 'blink 2s infinite' },
  systemBrand: { fontSize: '11px', letterSpacing: '2px', color: '#00f0ff', opacity: 0.8 },
  telemetryData: { fontSize: '11px', letterSpacing: '1px', color: '#4a5568' },
  telemetryDivider: { color: '#1a202c', fontSize: '11px' },
  
  mainStage: { flex: 1, position: 'relative', zIndex: 1, overflowY: 'auto', paddingBottom: '100px' },
  
  viewPlaceholder: { 
    height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    fontSize: '24px', letterSpacing: '3px', fontWeight: 'bold', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.1)'
  },

  hologramNav: {
    position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
    width: 'calc(100% - 40px)', maxWidth: '450px', height: '65px',
    backgroundColor: 'rgba(6, 11, 25, 0.7)', backdropFilter: 'blur(20px)',
    borderRadius: '20px', border: '1px solid rgba(0, 240, 255, 0.15)',
    display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 10px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.6), inset 0 0 15px rgba(0, 240, 255, 0.05)',
    zIndex: 1000
  },
  navButton: {
    position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', width: '75px', height: '50px', backgroundColor: 'transparent',
    border: 'none', cursor: 'pointer', WebkitTapHighlightColor: 'transparent'
  },
  metaContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, transition: 'color 0.3s' },
  navLabel: { fontSize: '9px', letterSpacing: '1px', marginTop: '5px' },
  
  // Sıvı Gibi Kayan Akıcı Neon Seçici Bölgesi
  neonLiquidIndicator: {
    position: 'absolute', width: '65px', height: '42px', backgroundColor: 'rgba(0, 240, 255, 0.08)',
    borderRadius: '14px', border: '1px solid rgba(0, 240, 255, 0.3)', zIndex: 1,
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.15), inset 0 0 8px rgba(0, 240, 255, 0.1)'
  }
};

export default App;
