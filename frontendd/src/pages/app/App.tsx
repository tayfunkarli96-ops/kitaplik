import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import OrbitalDiscovery from '../../components/OrbitalDiscovery';
import PremiumWatchlist from '../../components/PremiumWatchlist';
import OverseerDashboard from '../../components/OverseerDashboard';
import ProfileIdentity from '../../components/ProfileIdentity';

import { FiRadio, FiCheckSquare, FiShield, FiUser } from 'react-icons/fi';

// --- YENİ EKLENEN: İŞLEMSEL YILDIZ TARLASI (PROCEDURAL STARFIELD) ---
const TwinklingStars = () => {
  const [stars, setStars] = useState<{id: number, top: string, left: string, size: number, duration: number, delay: number}[]>([]);

  useEffect(() => {
    // Ekran yüklendiğinde rastgele 50 adet yıldız üretir
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1px ile 3px arası büyüklük
      duration: Math.random() * 3 + 2, // 2s ile 5s arası parlama hızı
      delay: Math.random() * 2 // Rastgele başlama gecikmesi
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * 2}px #fff`,
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('DISCOVER');
  const [dbStatus, setDbStatus] = useState<number>(84);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'DISCOVER': return <OrbitalDiscovery />;
      case 'WATCHLIST': return <PremiumWatchlist />;
      case 'ADMIN': return <OverseerDashboard />;
      case 'PROFILE': return <ProfileIdentity />;
      default: return <OrbitalDiscovery />;
    }
  };

  return (
    <div style={styles.appShell}>
      
      {/* 1. SİBER ARKA PLAN VE PARLAYAN YILDIZLAR */}
      <div style={styles.ambientGlow}></div>
      <div style={styles.matrixGrid}></div>
      <TwinklingStars /> {/* YILDIZ MOTORU BURADA ÇALIŞIYOR */}

      {/* 2. TELEMETRİ ÜST BAR */}
      <header style={styles.telemetryHeader}>
        <div style={styles.telemetryGroup}>
          <span style={styles.pulseNode}></span>
          <span style={styles.systemBrand}>CORNFLIX // CORE_OS_v2.0</span>
        </div>
        <div style={styles.telemetryGroup}>
          <span style={styles.telemetryData}>DB_LOAD: {dbStatus}%</span>
          <span style={styles.telemetryDivider}>|</span>
          <span style={styles.telemetryData}>{time}</span>
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

      {/* 4. HOLOGRAFİK BOTTOM NAVIGATION */}
      <nav style={styles.hologramNav}>
        {[
          { id: 'DISCOVER', icon: <FiRadio size={18} />, label: 'PREMIERES' },
          { id: 'WATCHLIST', icon: <FiCheckSquare size={18} />, label: 'TARGETS' },
          { id: 'ADMIN', icon: <FiShield size={18} />, label: 'OVERSEER' },
          { id: 'PROFILE', icon: <FiUser size={18} />, label: 'IDENTITY' }
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={styles.navButton}
            >
              {isActive && (
                <motion.div
                  layoutId="hologramGlow"
                  style={styles.neonLiquidIndicator}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              <motion.div 
                animate={{ y: isActive ? -4 : 0 }}
                style={{ ...styles.metaContainer, color: isActive ? '#00f0ff' : '#4a5568' }}
              >
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', filter: isActive ? 'drop-shadow(0 0 8px #00f0ff)' : 'none' }}>
                  {item.icon}
                </div>
                <span style={{ ...styles.navLabel, fontWeight: isActive ? '700' : '400' }}>{item.label}</span>
              </motion.div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// --- CSS ---
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
  pulseNode: { width: '6px', height: '6px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 8px #00f0ff' },
  systemBrand: { fontSize: '11px', letterSpacing: '2px', color: '#00f0ff', opacity: 0.8 },
  telemetryData: { fontSize: '11px', letterSpacing: '1px', color: '#4a5568' },
  telemetryDivider: { color: '#1a202c', fontSize: '11px' },
  
  mainStage: { flex: 1, position: 'relative', zIndex: 1, overflowY: 'auto', paddingBottom: '100px' },

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
  
  neonLiquidIndicator: {
    position: 'absolute', width: '65px', height: '42px', backgroundColor: 'rgba(0, 240, 255, 0.08)',
    borderRadius: '14px', border: '1px solid rgba(0, 240, 255, 0.3)', zIndex: 1,
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.15), inset 0 0 8px rgba(0, 240, 255, 0.1)'
  }
};

export default App;
