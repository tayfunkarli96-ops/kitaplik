import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. REQ 10: KAPSAMLI LİNGUİSTİK MOTOR
// ==========================================
const dict = {
  TR: {
    pageTitle: 'SİNAPTİK KİMLİK & KONTROL MERKEZİ', reqBadge: 'REQ 1, 10 // IDENTITY', 
    langSelector: 'DİL FREKANSI KONTROLÜ', idCardHeader: 'RESMİ OPERATÖR KARTI // CLASSIFIED TIER 1', 
    skillsTitle: 'NÖRAL YETENEK MATRİSİ', terminalTitle: 'SİSTEM GÜVENLİK & TERMİNAL LOGLARI', 
    sessionTitle: 'SON OTURUM KAYITLARI', logoutBtn: 'SİSTEMDEN GÜVENLİ ÇIKIŞ YAP', 
    editBtn: 'KİMLİĞİ GÜNCELLE', saveBtn: 'VERİLERİ ŞİFRELE VE KAYDET', cancelBtn: 'İŞLEMİ İPTAL ET',
    labels: { name: 'Operatör Adı', role: 'Sistem Rütbesi', loc: 'Fiziksel Lokasyon', bio: 'Biyometrik İmza / Biyografi' },
    logs: [
      "> [INIT] Kimlik doğrulama sekansı başlatıldı...", 
      "> [SECURE] 256-bit Kuantum şifreleme anahtarı devrede.", 
      "> [BIOMETRIC] Retina taraması onaylandı: Tayfun Karlı.", 
      "> [NETWORK] SDÜ Command Center ana sunucusuna ping atılıyor... 12ms.",
      "> [AUTH] Sistem komutları ve kök (root) erişimi Baş Mimar'a devredildi.",
      "> [SYSTEM] Bekleyen sinyal yok, modüller çevrimiçi."
    ]
  },
  EN: {
    pageTitle: 'SYNAPTIC IDENTITY & COMMAND CENTER', reqBadge: 'REQ 1, 10 // IDENTITY', 
    langSelector: 'LANGUAGE FREQUENCY CONTROL', idCardHeader: 'OFFICIAL OPERATOR CARD // CLASSIFIED TIER 1', 
    skillsTitle: 'NEURAL SKILL MATRIX', terminalTitle: 'SYSTEM SECURITY & TERMINAL LOGS', 
    sessionTitle: 'RECENT SESSION LOGS', logoutBtn: 'SECURE DISCONNECT FROM SYSTEM', 
    editBtn: 'UPDATE IDENTITY', saveBtn: 'ENCRYPT & SAVE DATA', cancelBtn: 'ABORT OPERATION',
    labels: { name: 'Operator Name', role: 'System Rank', loc: 'Physical Location', bio: 'Biometric Signature / Bio' },
    logs: [
      "> [INIT] Authentication sequence initiated...", 
      "> [SECURE] 256-bit Quantum encryption key engaged.", 
      "> [BIOMETRIC] Retinal scan verified: Tayfun Karli.", 
      "> [NETWORK] Pinging SDU Command Center mainframe... 12ms.",
      "> [AUTH] System commands and root access handed over to Lead Architect.",
      "> [SYSTEM] No pending signals, all modules online."
    ]
  }
};

const skillMatrix = [
  { id: 's1', name: 'React 19 & Spatial UX', level: 98, color: '#00f0ff' },
  { id: 's2', name: 'Framer Motion Dynamics', level: 95, color: '#00ffaa' },
  { id: 's3', name: 'System Architecture', level: 99, color: '#f59e0b' },
  { id: 's4', name: 'Quantum Encryption', level: 88, color: '#ff3366' }
];

const sessionHistory = [
  { id: 1, ip: '192.168.1.104', loc: 'SDÜ Campus', time: '14 Mins ago', status: 'VERIFIED' },
  { id: 2, ip: '10.0.4.22', loc: 'Isparta Node', time: '2 Days ago', status: 'VERIFIED' },
  { id: 3, ip: 'Unknown_Relay', loc: 'Proxy Server', time: '5 Days ago', status: 'BLOCKED' }
];

// ==========================================
// 2. ALT BİLEŞEN: CANLI TERMİNAL (Sub-Component)
// ==========================================
const LiveTerminal: React.FC<{ logs: string[] }> = ({ logs }) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  useEffect(() => {
    setVisibleLogs([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) { setVisibleLogs(prev => [...prev, logs[i]]); i++; } 
      else clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div style={styles.terminalContainer}>
      <div style={styles.terminalHeader}>
        <div style={styles.terminalDots}>
          <span style={{...styles.dot, backgroundColor: '#ff3366'}}></span>
          <span style={{...styles.dot, backgroundColor: '#f59e0b'}}></span>
          <span style={{...styles.dot, backgroundColor: '#00ffaa'}}></span>
        </div>
        <span style={styles.terminalTitleText}>root@cornflix_os:~/secure_logs</span>
      </div>
      <div style={styles.terminalBody}>
        <AnimatePresence>
          {visibleLogs.map((log, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={styles.terminalLogLine}>
              <span style={{ color: log.includes('SECURE') || log.includes('AUTH') ? '#00f0ff' : log.includes('BIOMETRIC') ? '#00ffaa' : '#cbd5e1' }}>{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={styles.terminalCursor} />
      </div>
    </div>
  );
};

// ==========================================
// 3. ANA BİLEŞEN: PROFILE IDENTITY
// ==========================================
const ProfileIdentity: React.FC = () => {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const t = dict[lang];

  // Profil Düzenleme State'leri
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ 
    name: 'Tayfun Karlı', 
    role: 'Baş Mimar (Lead Architect)', 
    location: 'SDÜ Command Center, Isparta',
    bio: 'Cornflix Core OS v2.0 geliştiricisi. Sistem mimarisi ve uzamsal UI tasarımı uzmanı.'
  });
  const [editForm, setEditForm] = useState(profileData);

  useEffect(() => {
    const saved = localStorage.getItem('cornflix_profile_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfileData(parsed);
      setEditForm(parsed);
    }
  }, []);

  const handleSaveProfile = () => {
    if(editForm.name.trim() === '') return alert("İsim boş bırakılamaz.");
    setProfileData(editForm);
    localStorage.setItem('cornflix_profile_v2', JSON.stringify(editForm));
    setIsEditing(false);
  };

  // Framer Motion Varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div style={styles.viewContainer}>
      {/* BAŞLIK */}
      <div style={styles.metaHeader}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={styles.sectionTitle}>{t.pageTitle}</span>
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>System Operator Module v2.0</span>
        </div>
        <span style={styles.reqBadge}>{t.reqBadge}</span>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        
        {/* DİL MOTORU PANELİ */}
        <motion.div variants={itemVariants} style={styles.langPanel}>
          <div style={styles.langHeader}><span style={styles.pulseNode}></span><p style={styles.panelTitle}>{t.langSelector}</p></div>
          <div style={styles.langToggleGroup}>
            <button onClick={() => setLang('TR')} style={{...styles.langBtn, ...(lang === 'TR' ? styles.langBtnActive : {})}}>TÜRKÇE [TR]</button>
            <button onClick={() => setLang('EN')} style={{...styles.langBtn, ...(lang === 'EN' ? styles.langBtnActive : {})}}>ENGLISH [EN]</button>
          </div>
        </motion.div>

        {/* KİMLİK KARTI (HERO KART) */}
        <motion.div variants={itemVariants} style={styles.idCardContainer}>
          <div style={styles.cardHeaderRow}>
            <span style={styles.cardHeaderText}>{t.idCardHeader}</span>
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
              <span style={{ marginRight: '5px' }}>⚙️</span> {t.editBtn}
            </button>
          </div>
          
          <div style={styles.profileContentRow}>
            <div style={styles.avatarWrapper}>
              <div style={styles.avatarScanline}></div>
              <div style={styles.avatarInitials}>{profileData.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}</div>
            </div>
            <div style={styles.userInfoCol}>
              <h2 style={styles.userName}>{profileData.name}</h2>
              <p style={styles.userRole}>{profileData.role}</p>
              <p style={styles.userLocation}>📍 {profileData.location}</p>
              <p style={styles.userBio}>"{profileData.bio}"</p>
              <div style={styles.barcodeWrapper}>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} style={{ width: `${Math.random() * 3 + 1}px`, height: '15px', backgroundColor: 'rgba(0, 240, 255, 0.5)', marginRight: '2px' }}></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* NÖRAL YETENEK MATRİSİ */}
        <motion.div variants={itemVariants} style={styles.skillsPanel}>
          <h3 style={styles.subSectionTitle}>{t.skillsTitle}</h3>
          <div style={styles.skillsList}>
            {skillMatrix.map((skill, i) => (
              <div key={skill.id} style={styles.skillItem}>
                <div style={styles.skillHeader}><span style={styles.skillName}>{skill.name}</span><span style={{...styles.skillLevel, color: skill.color}}>{skill.level}%</span></div>
                <div style={styles.skillTrack}><motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }} style={{...styles.skillFill, backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}`}} /></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* OTURUM GEÇMİŞİ TABLOSU */}
        <motion.div variants={itemVariants} style={{ marginBottom: '30px' }}>
          <h3 style={styles.subSectionTitle}>{t.sessionTitle}</h3>
          <div style={styles.sessionTable}>
            {sessionHistory.map(session => (
              <div key={session.id} style={styles.sessionRow}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>IP: {session.ip}</span>
                  <span style={{ color: '#64748b', fontSize: '10px' }}>{session.loc} | {session.time}</span>
                </div>
                <span style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px', backgroundColor: session.status === 'VERIFIED' ? 'rgba(0,255,170,0.1)' : 'rgba(255,51,102,0.1)', color: session.status === 'VERIFIED' ? '#00ffaa' : '#ff3366', border: `1px solid ${session.status === 'VERIFIED' ? 'rgba(0,255,170,0.3)' : 'rgba(255,51,102,0.3)'}` }}>
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CANLI TERMİNAL */}
        <motion.div variants={itemVariants}>
          <h3 style={styles.subSectionTitle}>{t.terminalTitle}</h3>
          <LiveTerminal logs={t.logs} />
        </motion.div>

        {/* ÇIKIŞ BUTONU */}
        <motion.button variants={itemVariants} whileTap={{ scale: 0.95 }} style={styles.logoutBtn}>
          ⚡ {t.logoutBtn}
        </motion.button>
      </motion.div>

      {/* ========================================== */}
      {/* PROFİL DÜZENLEME MODALI (OVERLAY) */}
      {/* ========================================== */}
      <AnimatePresence>
        {isEditing && (
          <div style={styles.overlay}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} style={styles.editModal}>
              <h3 style={styles.modalTitle}>KİMLİK PROTOKOLÜNÜ GÜNCELLE</h3>
              
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>{t.labels.name}</label>
                <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={styles.inputField} />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>{t.labels.role}</label>
                <input value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} style={styles.inputField} />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>{t.labels.loc}</label>
                <input value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} style={styles.inputField} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>{t.labels.bio}</label>
                <textarea value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} style={{...styles.inputField, height: '80px', resize: 'none'}} />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                <button onClick={handleSaveProfile} style={styles.saveBtn}>✅ {t.saveBtn}</button>
                <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>✕ {t.cancelBtn}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 4. DEVEASA CSS MİMARİSİ
// ==========================================
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', borderBottom: '1px solid rgba(0,240,255,0.2)', paddingBottom: '15px' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '2px', textShadow: '0 0 10px rgba(0,240,255,0.4)', margin: 0 },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.3)', fontWeight: 'bold' },
  subSectionTitle: { fontSize: '13px', color: '#00f0ff', marginBottom: '15px', borderBottom: '1px dashed #112240', paddingBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' },
  
  langPanel: { backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '16px', padding: '20px', marginBottom: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.3)' },
  langHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' },
  pulseNode: { width: '8px', height: '8px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 10px #00ffaa', animation: 'blink 1.5s infinite' },
  panelTitle: { margin: 0, fontSize: '11px', color: '#64748b', letterSpacing: '1px' },
  langToggleGroup: { display: 'flex', gap: '15px' },
  langBtn: { flex: 1, padding: '14px', backgroundColor: 'transparent', border: '1px solid #1a202c', color: '#64748b', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', transition: 'all 0.3s', fontFamily: '"Share Tech Mono", monospace' },
  langBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.08)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 20px rgba(0,240,255,0.15)' },
  
  idCardContainer: { backgroundColor: 'rgba(9, 13, 22, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '24px', padding: '30px', marginBottom: '35px', position: 'relative', boxShadow: '0 15px 40px rgba(0,240,255,0.1)' },
  cardHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' },
  cardHeaderText: { fontSize: '10px', color: '#94a3b8', letterSpacing: '2px' },
  editBtn: { backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s', fontFamily: '"Share Tech Mono", monospace' },
  profileContentRow: { display: 'flex', alignItems: 'flex-start', gap: '25px' },
  avatarWrapper: { position: 'relative', width: '100px', height: '100px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,0,0,0.5))', border: '1px solid rgba(0,240,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,240,255,0.3)' },
  avatarScanline: { position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'rgba(0,240,255,0.6)', filter: 'blur(2px)', animation: 'scan 2.5s linear infinite' },
  avatarInitials: { fontSize: '36px', color: '#fff', fontWeight: 'bold', textShadow: '0 0 20px #00f0ff' },
  userInfoCol: { flex: 1 }, 
  userName: { margin: '0 0 8px 0', fontSize: '26px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' },
  userRole: { margin: '0 0 10px 0', fontSize: '14px', color: '#00f0ff', fontWeight: 'bold' }, 
  userLocation: { margin: '0 0 10px 0', fontSize: '11px', color: '#94a3b8' },
  userBio: { margin: '0 0 15px 0', fontSize: '12px', color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.5' },
  barcodeWrapper: { display: 'flex', alignItems: 'center', opacity: 0.6 },
  
  sessionTable: { display: 'flex', flexDirection: 'column', gap: '10px' },
  sessionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050a14', border: '1px solid #112240', padding: '12px 15px', borderRadius: '10px' },
  
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 2, 5, 0.95)', backdropFilter: 'blur(15px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  editModal: { width: '100%', maxWidth: '450px', backgroundColor: '#050a14', borderRadius: '24px', padding: '30px', border: '1px solid #00f0ff', boxShadow: '0 25px 60px rgba(0,240,255,0.15)' },
  modalTitle: { color: '#00f0ff', margin: '0 0 25px 0', fontSize: '18px', borderBottom: '1px solid rgba(0,240,255,0.2)', paddingBottom: '15px', letterSpacing: '1px' },
  inputGroup: { marginBottom: '15px' },
  inputLabel: { display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' },
  inputField: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', transition: 'border-color 0.3s', outline: 'none' },
  saveBtn: { flex: 1, padding: '15px', backgroundColor: 'rgba(0,255,170,0.1)', border: '1px solid #00ffaa', color: '#00ffaa', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', transition: 'all 0.3s', fontFamily: '"Share Tech Mono", monospace' },
  cancelBtn: { flex: 1, padding: '15px', backgroundColor: 'rgba(255,51,102,0.1)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', transition: 'all 0.3s', fontFamily: '"Share Tech Mono", monospace' },
  
  skillsPanel: { marginBottom: '35px' }, skillsList: { display: 'flex', flexDirection: 'column', gap: '18px' },
  skillItem: { display: 'flex', flexDirection: 'column', gap: '8px' }, 
  skillHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' },
  skillName: { color: '#cbd5e1', fontWeight: 'bold', letterSpacing: '0.5px' }, skillLevel: { fontWeight: 'bold' },
  skillTrack: { width: '100%', height: '8px', backgroundColor: '#112240', borderRadius: '4px', overflow: 'hidden' }, 
  skillFill: { height: '100%', borderRadius: '4px' },
  
  terminalContainer: { backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '16px', overflow: 'hidden', marginBottom: '35px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' },
  terminalHeader: { backgroundColor: '#0a1526', padding: '12px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #112240' },
  terminalDots: { display: 'flex', gap: '8px', marginRight: '20px' }, dot: { width: '12px', height: '12px', borderRadius: '50%' },
  terminalTitleText: { color: '#64748b', fontSize: '11px', fontFamily: '"Share Tech Mono", monospace' }, 
  terminalBody: { padding: '20px', minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '8px' },
  terminalLogLine: { fontSize: '12px', fontFamily: '"Share Tech Mono", monospace', letterSpacing: '0.5px' }, 
  terminalCursor: { width: '10px', height: '14px', backgroundColor: '#00ffaa', display: 'inline-block', marginTop: '5px' },
  
  logoutBtn: { width: '100%', padding: '20px', backgroundColor: 'rgba(255, 51, 102, 0.08)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', letterSpacing: '2px', boxShadow: '0 0 20px rgba(255,51,102,0.1)' }
};

export default ProfileIdentity;
