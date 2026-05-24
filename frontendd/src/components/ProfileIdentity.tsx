import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- LINGUISTIC ENGINE (Req 10) ---
const translations = {
  TR: {
    title: "SİNAPTİK KİMLİK",
    rank: "RÜTBE: BAŞ MİMAR",
    nameLabel: "OPERATÖR ADI",
    langLabel: "SİSTEM DİLİ",
    updateBtn: "BİLGİLERİ GÜNCELLE",
    status: "SİSTEM ÇEVRİMİÇİ",
  },
  EN: {
    title: "SYNAPTIC IDENTITY",
    rank: "RANK: LEAD ARCHITECT",
    nameLabel: "OPERATOR NAME",
    langLabel: "SYSTEM LANGUAGE",
    updateBtn: "UPDATE PROTOCOLS",
    status: "SYSTEM ONLINE",
  }
};

const ProfileIdentity: React.FC = () => {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const [name, setName] = useState('TAYFUN KARLI');
  const [isEditing, setIsEditing] = useState(false);

  const t = translations[lang];

  return (
    <div style={styles.container}>
      {/* ÜST DURUM ÇUBUĞU */}
      <div style={styles.statusLine}>
        <div style={styles.pulseDot}></div>
        <span style={styles.statusText}>{t.status}</span>
      </div>

      <motion.div 
        layout
        style={styles.idCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 style={styles.cardHeader}>{t.title}</h2>
        
        {/* AVATAR BÖLÜMÜ */}
        <div style={styles.avatarSection}>
          <div style={styles.avatarCircle}>
            <span style={{fontSize: '24px', fontWeight: 'bold', color: '#00f0ff'}}>TK</span>
            <svg style={styles.svgRing} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="10 5" />
            </svg>
          </div>
          <div style={styles.rankInfo}>
            <p style={styles.rankText}>{t.rank}</p>
            <p style={styles.clearance}>LEVEL 10 // ENCRYPTED</p>
          </div>
        </div>

        {/* REQ 1: PROFİL DÜZENLEME FORMU */}
        <div style={styles.formGroup}>
          <label style={styles.label}>{t.nameLabel}</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* REQ 10: DİL SEÇENEKLERİ (TOGGLE) */}
        <div style={styles.formGroup}>
          <label style={styles.label}>{t.langLabel}</label>
          <div style={styles.langToggle}>
            <button 
              onClick={() => setLang('TR')} 
              style={{...styles.langBtn, ...(lang === 'TR' ? styles.langBtnActive : {})}}
            >TR</button>
            <button 
              onClick={() => setLang('EN')} 
              style={{...styles.langBtn, ...(lang === 'EN' ? styles.langBtnActive : {})}}
            >EN</button>
          </div>
        </div>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => setIsEditing(false), 2000);
          }}
          style={styles.updateButton}
        >
          {isEditing ? "..." : t.updateBtn}
        </motion.button>
      </motion.div>

      {/* FOOTER DECORATION */}
      <p style={styles.footerInfo}>SDR_LINK_ESTABLISHED // PORT: 8080</p>
    </div>
  );
};

// --- STYLES ---
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '30px 20px', backgroundColor: '#02050a', minHeight: '60vh', fontFamily: '"Space Mono", monospace' },
  statusLine: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' },
  pulseDot: { width: '8px', height: '8px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 10px #00f0ff' },
  statusText: { fontSize: '10px', color: '#00f0ff', letterSpacing: '2px' },
  
  idCard: { 
    backgroundColor: 'rgba(11, 22, 40, 0.4)', backdropFilter: 'blur(15px)', 
    border: '1px solid rgba(0, 240, 255, 0.2)', padding: '25px', borderRadius: '20px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)' 
  },
  cardHeader: { fontSize: '18px', color: '#fff', margin: '0 0 25px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' },
  
  avatarSection: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  avatarCircle: { width: '70px', height: '70px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  svgRing: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', animation: 'spin 10s linear infinite' },
  rankInfo: { display: 'flex', flexDirection: 'column' },
  rankText: { fontSize: '13px', color: '#fff', margin: 0, fontWeight: 'bold' },
  clearance: { fontSize: '10px', color: '#45a29e', margin: 0, marginTop: '4px' },

  formGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '10px', color: '#888', marginBottom: '8px', textTransform: 'uppercase' },
  input: { width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid #112240', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', outline: 'none' },
  
  langToggle: { display: 'flex', gap: '10px' },
  langBtn: { flex: 1, padding: '10px', backgroundColor: '#050a14', border: '1px solid #112240', color: '#666', cursor: 'pointer', borderRadius: '8px', transition: '0.3s' },
  langBtnActive: { borderColor: '#00f0ff', color: '#00f0ff', backgroundColor: 'rgba(0, 240, 255, 0.05)' },
  
  updateButton: { width: '100%', padding: '15px', backgroundColor: '#00f0ff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  footerInfo: { textAlign: 'center', fontSize: '9px', color: '#333', marginTop: '30px', letterSpacing: '1px' }
};

export default ProfileIdentity;
