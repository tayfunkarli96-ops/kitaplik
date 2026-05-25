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
    langTitle: 'Dil Motoru Frekansı',
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
    langTitle: 'Linguistic Engine protocol',
    sysLogs: 'System Logs',
    encryption: '256-bit Quantum Encryption',
    logout: 'DISCONNECT'
  }
};

const ProfileIdentity: React.FC = () => {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const t = dict[lang]; // Seçili dile göre metin protokolünü anında günceller

  return (
    <div style={styles.container}>
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>{t.header}</span>
        <span style={styles.reqBadge}>{t.reqBadge}</span>
      </div>

      {/* REQ 10: DİL DEĞİŞTİRME MOTORU (MUTLAK GEREKSİNİM) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.settingsPanel}
      >
        <p style={styles.panelTitle}><i className="fa-solid fa-language"></i> {t.langTitle}</p>
        <div style={styles.langToggleGroup}>
          <button 
            onClick={() => setLang('TR')} 
            style={{...styles.langBtn, ...(lang === 'TR' ? styles.langBtnActive : {})}}
          >
            TÜRKÇE (TR)
          </button>
          <button 
            onClick={() => setLang('EN')} 
            style={{...styles.langBtn, ...(lang === 'EN' ? styles.langBtnActive : {})}}
          >
            ENGLISH (EN)
          </button>
        </div>
      </motion.div>

      {/* REQ 1: SİNAPTİK ID KARTI (KULLANICI KİMLİĞİ) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
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

      {/* SİSTEM TELEMETRİSİ */}
      <div style={styles.sysInfoList}>
        <div style={styles.sysItem}><span>{t.sysLogs}</span> <span style={styles.sysValue}>OK // SECURE</span></div>
        <div style={styles.sysItem}><span>{t.encryption}</span> <span style={styles.sysValue}>ONLINE</span></div>
      </div>

      <button style={styles.logoutBtn}>
        {t.logout}
      </button>
    </div>
  );
};

// --- ULTRA PREMIUM CSS PALETTE ---
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #1a202c', paddingBottom: '10px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff' },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.2)' },
  
  idCardContainer: { backgroundColor: 'rgba(9, 13, 22, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '16px', padding: '20px', marginBottom: '25px', boxShadow: '0 10px 30px rgba(0,240,255,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' },
  cardHeaderText: { fontSize: '10px', color: '#4a5568', letterSpacing: '1px' },
  statusDot: { width: '8px', height: '8px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 10px #00ffaa' },
  
  profileSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  avatarWrapper: { width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(45deg, rgba(0,240,255,0.15), rgba(0,0,0,0))', border: '1px solid #00f0ff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 15px rgba(0,240,255,0.2)' },
  avatarHologram: { fontSize: '28px', color: '#00f0ff', fontWeight: 'bold', textShadow: '0 0 10px #00f0ff' },
  userInfo: { flex: 1 },
  userName: { margin: '0 0 5px 0', fontSize: '22px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' },
  userRole: { margin: '0 0 8px 0', fontSize: '12px', color: '#00f0ff' },
  userLocation: { margin: '0 0 10px 0', fontSize: '10px', color: '#64748b' },
  statusBadge: { display: 'inline-block', padding: '4px 8px', backgroundColor: 'rgba(0, 255, 170, 0.1)', color: '#00ffaa', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(0,255,170,0.3)' },

  settingsPanel: { backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '14px', padding: '15px', marginBottom: '25px' },
  panelTitle: { margin: '0 0 12px 0', fontSize: '13px', color: '#4a5568', letterSpacing: '0.5px' },
  langToggleGroup: { display: 'flex', gap: '10px' },
  langBtn: { flex: 1, padding: '12px', backgroundColor: 'transparent', border: '1px solid #112240', color: '#4a5568', borderRadius: '8px', cursor: 'pointer', transition: '0.3s', fontSize: '12px', fontWeight: 'bold', fontFamily: '"Share Tech Mono", monospace' },
  langBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.08)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 15px rgba(0,240,255,0.1)' },

  sysInfoList: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' },
  sysItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 15px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '8px', fontSize: '12px', color: '#4a5568' },
  sysValue: { color: '#00f0ff' },

  logoutBtn: { width: '100%', padding: '15px', backgroundColor: 'rgba(255, 51, 102, 0.05)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', fontFamily: '"Share Tech Mono", monospace' }
};

export default ProfileIdentity;
