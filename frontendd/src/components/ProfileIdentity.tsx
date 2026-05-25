import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- REQ 10: LINGUISTIC ENGINE (Sözlük Motoru) ---
const dict = {
  TR: {
    header: 'SİNAPTİK KİMLİK',
    reqBadge: 'REQ 1, 10',
    idCard: 'RESMİ OPERATÖR KARTI',
    name: 'Tayfun Karlı',
    role: 'Baş Mimar (Lead Architect)',
    location: 'SDÜ Command Center, Isparta',
    status: 'SİSTEME BAĞLI',
    langTitle: 'Dil Motoru (Req 10)',
    sysLogs: 'Sistem Kayıtları',
    encryption: '256-bit Kuantum Şifreleme',
    logout: 'BAĞLANTIYI KES'
  },
  EN: {
    header: 'SYNAPTIC IDENTITY',
    reqBadge: 'REQ 1, 10',
    idCard: 'OFFICIAL OPERATOR CARD',
    name: 'Tayfun Karli',
    role: 'Lead Architect',
    location: 'SDU Command Center, Isparta',
    status: 'CONNECTED',
    langTitle: 'Linguistic Engine (Req 10)',
    sysLogs: 'System Logs',
    encryption: '256-bit Quantum Encryption',
    logout: 'DISCONNECT'
  }
};

const ProfileIdentity: React.FC = () => {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const t = dict[lang]; // Seçili dile göre metinleri çeker

  return (
    <div style={styles.container}>
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>{t.header}</span>
        <span style={styles.reqBadge}>{t.reqBadge}</span>
      </div>

      {/* REQ 1: SYNAPTIC ID CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={styles.idCardContainer}
      >
        <div style={styles.cardHeader}>
          <span style={styles.cardHeaderText}>{t.idCard}</span>
          <div style={styles.statusDot}></div>
        </div>
        
        <div style={styles.profileSection}>
          <div style={styles.avatarWrapper}>
            <div style={styles.avatarHologram}>TK</div>
          </div>
          <div style={styles.userInfo}>
            <h2 style={styles.userName}>{t.name}</h2>
            <p style={styles.userRole}>{t.role}</p>
            <p style={styles.userLocation}><i className="fa-solid fa-location-crosshairs"></i> {t.location}</p>
            <div style={styles.statusBadge}>{t.status}</div>
          </div>
        </div>
      </motion.div>

      {/* REQ 10: LINGUISTIC ENGINE CONTROLS */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
        style={styles.settingsPanel}
      >
        <h3 style={styles.panelTitle}>{t.langTitle}</h3>
        <div style={styles.langToggleGroup}>
          <button 
            onClick={() => setLang('TR')} 
            style={{...styles.langBtn, ...(lang === 'TR' ? styles.langBtnActive : {})}}
          >
            TÜRKÇE
          </button>
          <button 
            onClick={() => setLang('EN')} 
            style={{...styles.langBtn, ...(lang === 'EN' ? styles.langBtnActive : {})}}
          >
            ENGLISH
          </button>
        </div>
      </motion.div>

      {/* SYSTEM INFO (Visual Fluff) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={styles.sysInfoList}
      >
        <div style={styles.sysItem}><span>{t.sysLogs}</span> <span style={styles.sysValue}>OK</span></div>
        <div style={styles.sysItem}><span>{t.encryption}</span> <span style={styles.sysValue}>AKTİF</span></div>
      </motion.div>

      <motion.button 
        whileTap={{ scale: 0.95 }}
        style={styles.logoutBtn}
      >
        {t.logout}
      </motion.button>
    </div>
  );
};

// --- PREMIUM INLINE CSS ---
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #1a202c', paddingBottom: '10px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff' },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.2)' },
  
  idCardContainer: { backgroundColor: 'rgba(9, 13, 22, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '16px', padding: '20px', marginBottom: '25px', boxShadow: '0 10px 30px rgba(0,240,255,0.05)', position: 'relative', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' },
  cardHeaderText: { fontSize: '10px', color: '#4a5568', letterSpacing: '1px' },
  statusDot: { width: '8px', height: '8px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 10px #00ffaa' },
  
  profileSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  avatarWrapper: { width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(45deg, rgba(0,240,255,0.2), rgba(0,0,0,0))', border: '1px solid #00f0ff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 15px rgba(0,240,255,0.2)' },
  avatarHologram: { fontSize: '28px', color: '#00f0ff', fontWeight: 'bold', textShadow: '0 0 10px #00f0ff' },
  userInfo: { flex: 1 },
  userName: { margin: '0 0 5px 0', fontSize: '22px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' },
  userRole: { margin: '0 0 8px 0', fontSize: '12px', color: '#00f0ff' },
  userLocation: { margin: '0 0 10px 0', fontSize: '10px', color: '#64748b' },
  statusBadge: { display: 'inline-block', padding: '4px 8px', backgroundColor: 'rgba(0, 255, 170, 0.1)', color: '#00ffaa', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(0,255,170,0.3)' },

  settingsPanel: { backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '12px', padding: '15px', marginBottom: '20px' },
  panelTitle: { margin: '0 0 15px 0', fontSize: '14px', color: '#888' },
  langToggleGroup: { display: 'flex', gap: '10px' },
  langBtn: { flex: 1, padding: '12px', backgroundColor: 'transparent', border: '1px solid #112240', color: '#666', borderRadius: '8px', cursor: 'pointer', transition: '0.3s', fontSize: '12px', fontWeight: 'bold' },
  langBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.1)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 15px rgba(0,240,255,0.1)' },

  sysInfoList: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' },
  sysItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 15px', backgroundColor: '#020205', border: '1px solid #0f172a', borderRadius: '8px', fontSize: '12px', color: '#4a5568' },
  sysValue: { color: '#00f0ff' },

  logoutBtn: { width: '100%', padding: '15px', backgroundColor: 'rgba(255, 51, 102, 0.1)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }
};

export default ProfileIdentity;
