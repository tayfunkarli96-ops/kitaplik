import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. REQ 10: GELİŞMİŞ LINGUISTIC ENGINE (SÖZLÜK)
// ==========================================
// Sistemdeki her bir metin, başlık ve terminal logu dil motoruna bağlandı.
const dict = {
  TR: {
    pageTitle: 'SİNAPTİK KİMLİK',
    reqBadge: 'REQ 1, 10 // IDENTITY',
    langSelector: 'DİL FREKANSI (LINGUISTIC ENGINE)',
    idCardHeader: 'RESMİ OPERATÖR KARTI // CLASSIFIED',
    role: 'Baş Mimar (Lead Architect)',
    location: 'SDÜ Command Center, Isparta',
    status: 'SİSTEME BAĞLI',
    skillsTitle: 'NÖRAL YETENEK MATRİSİ',
    terminalTitle: 'SİSTEM GÜVENLİK LOGLARI',
    logoutBtn: 'SİSTEMDEN ÇIKIŞ YAP (BAĞLANTIYI KES)',
    logs: [
      "> Kimlik doğrulama başlatıldı...",
      "> 256-bit Kuantum şifreleme devrede.",
      "> Biyometrik veriler eşleşti: Tayfun Karlı.",
      "> Sunucu ping süresi: 18ms (Optimum)",
      "> SDÜ veritabanına güvenli bağlantı kuruldu.",
      "> Sistem komutları Baş Mimar'a devredildi."
    ]
  },
  EN: {
    pageTitle: 'SYNAPTIC IDENTITY',
    reqBadge: 'REQ 1, 10 // IDENTITY',
    langSelector: 'LANGUAGE FREQUENCY (LINGUISTIC ENGINE)',
    idCardHeader: 'OFFICIAL OPERATOR CARD // CLASSIFIED',
    role: 'Lead Architect',
    location: 'SDU Command Center, Isparta',
    status: 'CONNECTED',
    skillsTitle: 'NEURAL SKILL MATRIX',
    terminalTitle: 'SYSTEM SECURITY LOGS',
    logoutBtn: 'DISCONNECT FROM SYSTEM',
    logs: [
      "> Authentication initiated...",
      "> 256-bit Quantum encryption enabled.",
      "> Biometric data matched: Tayfun Karli.",
      "> Server ping: 18ms (Optimum)",
      "> Secure connection to SDU database established.",
      "> System commands handed over to Lead Architect."
    ]
  }
};

// ==========================================
// 2. YETENEK VERİTABANI
// ==========================================
const skillMatrix = [
  { id: 's1', name: 'React 19 & Hooks', level: 98, color: '#00f0ff' },
  { id: 's2', name: 'Spatial UI & UX', level: 95, color: '#00ffaa' },
  { id: 's3', name: 'Framer Motion', level: 92, color: '#ff3366' },
  { id: 's4', name: 'System Architecture', level: 99, color: '#f59e0b' }
];

// ==========================================
// 3. CANLI TERMİNAL BİLEŞENİ
// ==========================================
const LiveTerminal: React.FC<{ logs: string[] }> = ({ logs }) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  // Logların daktilo gibi sırayla ekranda belirmesini sağlar
  useEffect(() => {
    setVisibleLogs([]);
    let currentIndex = 0;
    const logInterval = setInterval(() => {
      if (currentIndex < logs.length) {
        setVisibleLogs(prev => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 600); // Her 600ms'de bir yeni log satırı basar

    return () => clearInterval(logInterval);
  }, [logs]);

  return (
    <div style={styles.terminalContainer}>
      <div style={styles.terminalHeader}>
        <div style={styles.terminalDots}>
          <span style={{...styles.dot, backgroundColor: '#ff3366'}}></span>
          <span style={{...styles.dot, backgroundColor: '#f59e0b'}}></span>
          <span style={{...styles.dot, backgroundColor: '#00ffaa'}}></span>
        </div>
        <span style={styles.terminalTitleText}>root@cornflix_os:~</span>
      </div>
      <div style={styles.terminalBody}>
        <AnimatePresence>
          {visibleLogs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={styles.terminalLogLine}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={styles.terminalCursor}
        />
      </div>
    </div>
  );
};

// ==========================================
// 4. ANA BİLEŞEN: PROFILE IDENTITY
// ==========================================
const ProfileIdentity: React.FC = () => {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const t = dict[lang];

  return (
    <div style={styles.viewContainer}>
      
      {/* BAŞLIK VE GEREKSİNİM KÜNYESİ */}
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>{t.pageTitle}</span>
        <span style={styles.reqBadge}>{t.reqBadge}</span>
      </div>

      {/* REQ 10: DİL MOTORU DEĞİŞTİRİCİSİ */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={styles.langPanel}
      >
        <div style={styles.langHeader}>
          <span style={styles.pulseNode}></span>
          <p style={styles.panelTitle}>{t.langSelector}</p>
        </div>
        
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
            ENGLISH (GLOBAL)
          </button>
        </div>
      </motion.div>

      {/* REQ 1: KULLANICI KİMLİĞİ VE OPERATÖR KARTI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
        style={styles.idCardContainer}
      >
        {/* Dekoratif Siberpunk Çizgiler ve Izgara */}
        <div style={styles.idCardGrid}></div>
        <div style={styles.idCardGlow}></div>

        <div style={styles.cardHeaderRow}>
          <span style={styles.cardHeaderText}>{t.idCardHeader}</span>
          <div style={styles.statusIndicator}>
            <span style={styles.statusDotAnimated}></span>
            <span style={styles.statusText}>{t.status}</span>
          </div>
        </div>
        
        <div style={styles.profileContentRow}>
          <div style={styles.avatarWrapper}>
            <div style={styles.avatarScanline}></div>
            <div style={styles.avatarInitials}>TK</div>
          </div>
          
          <div style={styles.userInfoCol}>
            <h2 style={styles.userName}>Tayfun Karlı</h2>
            <p style={styles.userRole}>{t.role}</p>
            <p style={styles.userLocation}>📍 {t.location}</p>
            
            {/* Siberpunk Barkod Simülasyonu */}
            <div style={styles.barcodeWrapper}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: '20px',
                  backgroundColor: 'rgba(0, 240, 255, 0.4)',
                  marginRight: '2px'
                }}></div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* NÖRAL YETENEK MATRİSİ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={styles.skillsPanel}
      >
        <h3 style={styles.subSectionTitle}>{t.skillsTitle}</h3>
        <div style={styles.skillsList}>
          {skillMatrix.map((skill, index) => (
            <div key={skill.id} style={styles.skillItem}>
              <div style={styles.skillHeader}>
                <span style={styles.skillName}>{skill.name}</span>
                <span style={{...styles.skillLevel, color: skill.color}}>{skill.level}%</span>
              </div>
              <div style={styles.skillTrack}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: 0.3 + (index * 0.2), type: 'spring' }}
                  style={{...styles.skillFill, backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}`}}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CANLI SİSTEM LOGLARI */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 style={styles.subSectionTitle}>{t.terminalTitle}</h3>
        <LiveTerminal logs={t.logs} />
      </motion.div>

      {/* ÇIKIŞ BUTONU */}
      <motion.button 
        whileTap={{ scale: 0.95 }}
        style={styles.logoutBtn}
      >
        <span style={{ marginRight: '10px' }}>⚡</span> {t.logoutBtn}
      </motion.button>

    </div>
  );
};

// ==========================================
// 5. ULTRA PREMIUM CSS MİMARİSİ
// ==========================================
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px', overflowX: 'hidden' },
  
  // Üst Başlıklar
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid rgba(0,240,255,0.2)', paddingBottom: '15px' },
  sectionTitle: { fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff', textShadow: '0 0 15px rgba(0,240,255,0.3)' },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '5px 10px', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.3)' },
  subSectionTitle: { fontSize: '14px', color: '#00f0ff', marginBottom: '15px', letterSpacing: '1px', borderBottom: '1px dashed #112240', paddingBottom: '5px' },
  
  // Dil Motoru Paneli
  langPanel: { backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '16px', padding: '20px', marginBottom: '25px', boxShadow: '0 5px 20px rgba(0,0,0,0.4)' },
  langHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' },
  pulseNode: { width: '8px', height: '8px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 10px #00ffaa', animation: 'blink 1.5s infinite' },
  panelTitle: { margin: 0, fontSize: '12px', color: '#64748b', letterSpacing: '1px' },
  langToggleGroup: { display: 'flex', gap: '15px' },
  langBtn: { flex: 1, padding: '14px', backgroundColor: 'transparent', border: '1px solid #1a202c', color: '#64748b', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s', fontSize: '12px', fontWeight: 'bold', fontFamily: '"Share Tech Mono", monospace' },
  langBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.08)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 20px rgba(0,240,255,0.15)' },

  // Sinaptik ID Kartı
  idCardContainer: { backgroundColor: 'rgba(9, 13, 22, 0.75)', backdropFilter: 'blur(15px)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '20px', padding: '25px', marginBottom: '30px', boxShadow: '0 15px 40px rgba(0,240,255,0.1)', position: 'relative', overflow: 'hidden' },
  idCardGrid: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none', zIndex: 0 },
  idCardGlow: { position: 'absolute', right: '-20%', bottom: '-20%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)', filter: 'blur(20px)', zIndex: 0 },
  cardHeaderRow: { position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' },
  cardHeaderText: { fontSize: '10px', color: '#94a3b8', letterSpacing: '2px' },
  statusIndicator: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(0,255,170,0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(0,255,170,0.2)' },
  statusDotAnimated: { width: '6px', height: '6px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 8px #00ffaa' },
  statusText: { fontSize: '9px', color: '#00ffaa', fontWeight: 'bold', letterSpacing: '1px' },
  profileContentRow: { position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '25px' },
  avatarWrapper: { position: 'relative', width: '90px', height: '90px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,0,0,0.5))', border: '1px solid rgba(0,240,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,240,255,0.2)' },
  avatarScanline: { position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'rgba(0,240,255,0.5)', filter: 'blur(2px)', animation: 'scan 2s linear infinite' },
  avatarInitials: { fontSize: '32px', color: '#fff', fontWeight: 'bold', textShadow: '0 0 15px #00f0ff' },
  userInfoCol: { flex: 1 },
  userName: { margin: '0 0 6px 0', fontSize: '24px', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' },
  userRole: { margin: '0 0 8px 0', fontSize: '13px', color: '#00f0ff', fontWeight: 'bold' },
  userLocation: { margin: '0 0 15px 0', fontSize: '11px', color: '#94a3b8' },
  barcodeWrapper: { display: 'flex', alignItems: 'center', opacity: 0.7 },

  // Yetenek Matrisi
  skillsPanel: { backgroundColor: 'transparent', marginBottom: '30px' },
  skillsList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  skillItem: { display: 'flex', flexDirection: 'column', gap: '6px' },
  skillHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' },
  skillName: { color: '#cbd5e1', fontWeight: 'bold', letterSpacing: '0.5px' },
  skillLevel: { fontWeight: 'bold' },
  skillTrack: { width: '100%', height: '6px', backgroundColor: '#112240', borderRadius: '3px', overflow: 'hidden' },
  skillFill: { height: '100%', borderRadius: '3px' },

  // Canlı Terminal Logları
  terminalContainer: { backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' },
  terminalHeader: { backgroundColor: '#0a1526', padding: '10px 15px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #112240' },
  terminalDots: { display: 'flex', gap: '6px', marginRight: '15px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%' },
  terminalTitleText: { color: '#64748b', fontSize: '11px', fontFamily: '"Share Tech Mono", monospace' },
  terminalBody: { padding: '15px', minHeight: '120px', display: 'flex', flexDirection: 'column', gap: '8px' },
  terminalLogLine: { color: '#00ffaa', fontSize: '11px', fontFamily: '"Share Tech Mono", monospace', textShadow: '0 0 5px rgba(0,255,170,0.4)' },
  terminalCursor: { width: '8px', height: '12px', backgroundColor: '#00ffaa', display: 'inline-block', marginTop: '5px' },

  // Çıkış Butonu
  logoutBtn: { width: '100%', padding: '18px', backgroundColor: 'rgba(255, 51, 102, 0.08)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(255,51,102,0.1)' }
};

export default ProfileIdentity;
