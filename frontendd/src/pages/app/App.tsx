import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- BİLEŞEN İÇE AKTARIMLARI ---
import OrbitalDiscovery from '../../components/OrbitalDiscovery';
import PremiumWatchlist from '../../components/PremiumWatchlist';
import OverseerDashboard from '../../components/OverseerDashboard';
import ProfileIdentity from '../../components/ProfileIdentity';

// --- İKONLAR (REACT ICONS) ---
import { FiRadio, FiCheckSquare, FiShield, FiUser, FiCpu, FiHardDrive, FiActivity } from 'react-icons/fi';

// ==========================================
// 1. SİSTEM AÇILIŞ (BOOT) SİMÜLASYONU
// ==========================================
const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // %100 olduktan sonra hafif bekleme
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }} 
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={styles.bootScreen}
    >
      <div style={styles.bootContent}>
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={styles.bootLogo}
        >
          CORNFLIX // OS
        </motion.div>
        <div style={styles.bootText}>NÖRAL AĞA BAĞLANILIYOR... LEAD ARCHITECT PROTOKOLÜ AKTİF.</div>
        <div style={styles.progressBarContainer}>
          <motion.div 
            style={{ ...styles.progressBarFill, width: `${progress}%` }} 
            layout 
          />
        </div>
        <div style={styles.bootPercentage}>{progress >= 100 ? 'SİSTEM ÇEVRİMİÇİ' : `YÜKLENİYOR: %${progress}`}</div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. PARALLAX YILDIZ MOTORU (PROCEDURAL)
// ==========================================
// Yıldızları tek bir düzlemde değil, 3 farklı derinlikte (Yakın, Orta, Uzak) üreterek
// 3D uzay hissi yaratır. GPU optimizasyonu için framer-motion kullanılmıştır.
const ParallaxStarfield: React.FC = () => {
  const [stars, setStars] = useState<{ id: number, top: string, left: string, size: number, duration: number, delay: number, layer: string }[]>([]);

  useEffect(() => {
    const generateStars = (count: number, layer: 'far' | 'mid' | 'near', sizeMultiplier: number, durationBase: number) => {
      return Array.from({ length: count }).map((_, i) => ({
        id: Math.random(),
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: (Math.random() * 1.5 + 0.5) * sizeMultiplier,
        duration: Math.random() * 3 + durationBase,
        delay: Math.random() * 5,
        layer
      }));
    };

    const farStars = generateStars(40, 'far', 0.8, 4);
    const midStars = generateStars(25, 'mid', 1.5, 3);
    const nearStars = generateStars(15, 'near', 2.5, 1.5);

    setStars([...farStars, ...midStars, ...nearStars]);
  }, []);

  return (
    <div style={styles.starfieldContainer}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.layer === 'near' ? '#00f0ff' : '#fff',
            borderRadius: '50%',
            boxShadow: star.layer === 'near' ? `0 0 ${star.size * 3}px #00f0ff` : `0 0 ${star.size}px #fff`,
            zIndex: star.layer === 'near' ? 3 : star.layer === 'mid' ? 2 : 1,
            filter: star.layer === 'far' ? 'blur(1px)' : 'none'
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 3. CANLI TELEMETRİ HUD (HEAD-UP DISPLAY)
// ==========================================
const TelemetryHUD: React.FC = () => {
  const [time, setTime] = useState('');
  const [cpu, setCpu] = useState(12);
  const [ping, setPing] = useState(24);

  useEffect(() => {
    // Saat Güncellemesi
    const clockTimer = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    }, 1000);

    // Sahte Sensör Verileri (Siberpunk Hissiyatı İçin)
    const sensorTimer = setInterval(() => {
      setCpu(Math.floor(Math.random() * 15) + 10); // %10 - %25 arası
      setPing(Math.floor(Math.random() * 8) + 18); // 18ms - 26ms arası
    }, 2500);

    return () => {
      clearInterval(clockTimer);
      clearInterval(sensorTimer);
    };
  }, []);

  return (
    <header style={styles.telemetryHeader}>
      <div style={styles.telemetryGroup}>
        <motion.span 
          animate={{ opacity: [1, 0.2, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          style={styles.pulseNode}
        />
        <span style={styles.systemBrand}>CORNFLIX // CORE_v2.0</span>
      </div>
      
      <div style={styles.telemetryMetrics}>
        <span style={styles.metricItem}><FiCpu /> {cpu}%</span>
        <span style={styles.telemetryDivider}>|</span>
        <span style={styles.metricItem}><FiActivity /> {ping}ms</span>
        <span style={styles.telemetryDivider}>|</span>
        <span style={styles.metricTime}>{time}</span>
      </div>
    </header>
  );
};

// ==========================================
// 4. ANA UYGULAMA KABUĞU (APP SHELL)
// ==========================================
const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('DISCOVER');

  // Geçiş Animasyonu Varyantları (Framer Motion)
  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 200, damping: 20 } },
    exit: { opacity: 0, y: -20, scale: 0.98, filter: 'blur(8px)', transition: { duration: 0.2 } }
  };

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
      
      {/* SİSTEM BOOT EKRANI */}
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* ARKA PLAN MOTORLARI */}
      <div style={styles.ambientGlow}></div>
      <div style={styles.matrixGrid}></div>
      <ParallaxStarfield />

      {/* ÜST BİLGİ PANELİ (Sadece Boot bittikten sonra görünür) */}
      {!isBooting && <TelemetryHUD />}

      {/* DİNAMİK İÇERİK SAHNESİ */}
      {!isBooting && (
        <main style={styles.mainStage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={styles.pageContainer}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      )}

      {/* HOLOGRAFİK ALT NAVİGASYON (BOTTOM NAV) */}
      {!isBooting && (
        <nav style={styles.hologramNav}>
          {[
            { id: 'DISCOVER', icon: <FiRadio size={20} />, label: 'KEŞFET' },
            { id: 'WATCHLIST', icon: <FiCheckSquare size={20} />, label: 'HEDEFLER' },
            { id: 'ADMIN', icon: <FiShield size={20} />, label: 'YÖNETİM' },
            { id: 'PROFILE', icon: <FiUser size={20} />, label: 'KİMLİK' }
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={styles.navButton}
              >
                {/* Aktif Buton Arkasındaki Kayan Neon Efekti */}
                {isActive && (
                  <motion.div
                    layoutId="hologramGlow"
                    style={styles.neonLiquidIndicator}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                )}
                
                {/* İkon ve Metin İçeriği */}
                <motion.div 
                  animate={{ y: isActive ? -6 : 0, scale: isActive ? 1.1 : 1 }}
                  style={{ ...styles.metaContainer, color: isActive ? '#00f0ff' : '#4a5568' }}
                >
                  <div style={{ ...styles.iconWrapper, filter: isActive ? 'drop-shadow(0 0 8px #00f0ff)' : 'none' }}>
                    {item.icon}
                  </div>
                  <span style={{ ...styles.navLabel, fontWeight: isActive ? '700' : '500', opacity: isActive ? 1 : 0.7 }}>
                    {item.label}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

// ==========================================
// 5. DETAYLI VE KAPSAMLI CSS MİMARİSİ
// ==========================================
const styles: { [key: string]: React.CSSProperties } = {
  appShell: {
    position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#020205',
    color: '#fff', fontFamily: '"Share Tech Mono", monospace', overflow: 'hidden',
    display: 'flex', flexDirection: 'column'
  },
  
  // Arka Plan Katmanları
  ambientGlow: {
    position: 'absolute', top: '-20%', left: '10%', width: '80vw', height: '80vh',
    background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(0,0,0,0) 70%)',
    pointerEvents: 'none', zIndex: 0
  },
  matrixGrid: {
    position: 'absolute', width: '100%', height: '100%',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
    backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0
  },
  starfieldContainer: {
    position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 1
  },

  // Boot Ekranı Stilleri
  bootScreen: {
    position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: '#020205', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  bootContent: { width: '80%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  bootLogo: { fontSize: '32px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '4px', marginBottom: '20px', textShadow: '0 0 20px rgba(0,240,255,0.5)' },
  bootText: { fontSize: '11px', color: '#64748b', marginBottom: '20px', textAlign: 'center', letterSpacing: '1px' },
  progressBarContainer: { width: '100%', height: '4px', backgroundColor: '#112240', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' },
  progressBarFill: { height: '100%', backgroundColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff' },
  bootPercentage: { fontSize: '12px', color: '#00f0ff', fontWeight: 'bold', fontFamily: 'monospace' },

  // Telemetri HUD Stilleri
  telemetryHeader: {
    position: 'relative', zIndex: 10, height: '45px', borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
    backgroundColor: 'rgba(2, 2, 5, 0.85)', backdropFilter: 'blur(10px)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
  },
  telemetryGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
  pulseNode: { width: '8px', height: '8px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 12px #00ffaa' },
  systemBrand: { fontSize: '12px', letterSpacing: '3px', color: '#00f0ff', fontWeight: 'bold' },
  telemetryMetrics: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#64748b' },
  metricItem: { display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1' },
  telemetryDivider: { color: '#1e293b' },
  metricTime: { color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1px' },
  
  // Ana Sahne
  mainStage: { flex: 1, position: 'relative', zIndex: 5, overflowY: 'auto', paddingBottom: '110px' },
  pageContainer: { height: '100%' },

  // Holografik Navigasyon Stilleri
  hologramNav: {
    position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)',
    width: 'calc(100% - 40px)', maxWidth: '500px', height: '70px',
    backgroundColor: 'rgba(6, 11, 25, 0.75)', backdropFilter: 'blur(25px)',
    borderRadius: '24px', border: '1px solid rgba(0, 240, 255, 0.2)',
    display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 15px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0, 240, 255, 0.05)',
    zIndex: 1000
  },
  navButton: {
    position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', width: '80px', height: '55px', backgroundColor: 'transparent',
    border: 'none', cursor: 'pointer', WebkitTapHighlightColor: 'transparent'
  },
  metaContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, transition: 'all 0.3s ease' },
  iconWrapper: { position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: '10px', letterSpacing: '1.5px', marginTop: '6px', transition: 'opacity 0.3s' },
  
  // Seçili Buton Neon Efekti
  neonLiquidIndicator: {
    position: 'absolute', width: '70px', height: '50px', backgroundColor: 'rgba(0, 240, 255, 0.12)',
    borderRadius: '16px', border: '1px solid rgba(0, 240, 255, 0.4)', zIndex: 1,
    boxShadow: '0 0 20px rgba(0, 240, 255, 0.25), inset 0 0 10px rgba(0, 240, 255, 0.15)'
  }
};

export default App;
