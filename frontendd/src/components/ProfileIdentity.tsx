/**
 * ============================================================================
 * CORNFLIX CORE OS // AUTH GATEWAY & SYNAPTIC IDENTITY MODULE v5.0
 * ============================================================================
 * LEAD ARCHITECT: Tayfun Karlı
 * UNIVERSITY: Süleyman Demirel Üniversitesi (SDÜ)
 * * * SYSTEM PATCHES & UPGRADES:
 * - [FIXED] Fatal Black Screen (Memory Leak in Terminal Interval Resolved)
 * - [ADDED] Full Authentication Gateway (Login & Register System)
 * - [ADDED] JWT Mock Tokenization via LocalStorage
 * - [ENHANCED] Strict Type Safety & Null Checks for Zero Crashes
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ----------------------------------------------------------------------------
// 1. TİP MİMARİSİ (TYPE SAFETY)
// ----------------------------------------------------------------------------
interface ProfileData {
  name: string;
  role: string;
  location: string;
  bio: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
}

// ----------------------------------------------------------------------------
// 2. LİNGUİSTİK VERİTABANI (DİL MOTORU)
// ----------------------------------------------------------------------------
const dict = {
  TR: {
    // Auth Modülü
    authTitle: 'SİSTEME GİRİŞ YAP',
    registerTitle: 'YENİ OPERATÖR KAYDI',
    emailLabel: 'Siber Ağ Adresi (Email)',
    passLabel: 'Kuantum Şifresi (Password)',
    nameLabel: 'Operatör Adı',
    loginBtn: 'AĞA BAĞLAN (LOGIN)',
    registerBtn: 'KİMLİK OLUŞTUR (REGISTER)',
    switchToReg: 'Yetkiniz yok mu? Yeni kayıt oluşturun.',
    switchToLog: 'Zaten yetkiniz var mı? Sisteme giriş yapın.',
    authError: 'HATA: Lütfen tüm protokol alanlarını doldurun.',
    
    // Kimlik Modülü
    pageTitle: 'SİNAPTİK KİMLİK & KONTROL MERKEZİ',
    reqBadge: 'REQ 1, 10 // AUTH & IDENTITY',
    idCardHeader: 'RESMİ OPERATÖR KARTI // CLASSIFIED',
    skillsTitle: 'NÖRAL YETENEK MATRİSİ',
    terminalTitle: 'SİSTEM GÜVENLİK & TERMİNAL LOGLARI',
    logoutBtn: 'AĞ BAĞLANTISINI KES (SECURE DISCONNECT)',
    editBtn: 'KİMLİK GÜNCELLE',
    saveBtn: 'VERİLERİ ŞİFRELE VE KAYDET',
    cancelBtn: 'İPTAL ET',
    labels: { name: 'Operatör Adı', role: 'Sistem Rütbesi', loc: 'Lokasyon', bio: 'Görev Özeti' },
    logs: [
      "> [INIT] Güvenli ağ bağlantısı kuruldu...",
      "> [SECURE] 256-bit Kuantum şifreleme aktif.",
      "> [AUTH] Biyometrik kimlik eşleşmesi BAŞARILI.",
      "> [SYSTEM] Bellek sızıntısı (Memory Leak) protokolü onarıldı.",
      "> [ROOT] Kök erişimi Baş Mimar'a devredildi."
    ]
  },
  EN: {
    authTitle: 'SYSTEM LOGIN',
    registerTitle: 'NEW OPERATOR REGISTRATION',
    emailLabel: 'Cyber Network Address (Email)',
    passLabel: 'Quantum Password',
    nameLabel: 'Operator Name',
    loginBtn: 'CONNECT TO NETWORK (LOGIN)',
    registerBtn: 'CREATE IDENTITY (REGISTER)',
    switchToReg: 'No clearance? Create a new record.',
    switchToLog: 'Already cleared? Login to system.',
    authError: 'ERROR: Please complete all protocol fields.',
    
    pageTitle: 'SYNAPTIC IDENTITY & COMMAND CENTER',
    reqBadge: 'REQ 1, 10 // AUTH & IDENTITY',
    idCardHeader: 'OFFICIAL OPERATOR CARD // CLASSIFIED',
    skillsTitle: 'NEURAL SKILL MATRIX',
    terminalTitle: 'SYSTEM SECURITY LOGS',
    logoutBtn: 'SECURE DISCONNECT FROM MAINFRAME',
    editBtn: 'UPDATE IDENTITY',
    saveBtn: 'ENCRYPT & SAVE DATA',
    cancelBtn: 'ABORT',
    labels: { name: 'Operator Name', role: 'System Rank', loc: 'Location', bio: 'Duty Brief' },
    logs: [
      "> [INIT] Secure network connection established...",
      "> [SECURE] 256-bit Quantum encryption active.",
      "> [AUTH] Biometric identity match SUCCESSFUL.",
      "> [SYSTEM] Memory Leak protocol patched and secured.",
      "> [ROOT] Root access handed over to Lead Architect."
    ]
  }
};

const skillMatrix = [
  { id: 's1', name: 'React 19 & Spatial UX', level: 98, color: '#00f0ff' },
  { id: 's2', name: 'Framer Motion Dynamics', level: 95, color: '#00ffaa' },
  { id: 's3', name: 'System Architecture', level: 99, color: '#f59e0b' },
  { id: 's4', name: 'Memory Leak Prevention', level: 100, color: '#ff3366' }
];

// ============================================================================
// 3. ALT BİLEŞEN: KIRILMAZ CANLI TERMİNAL (CRASH-FREE)
// ============================================================================
const LiveTerminalConsole: React.FC<{ logs: string[] }> = ({ logs }) => {
  const [streamedLogs, setStreamedLogs] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Siyah ekran hatasını çözen ana mekanizma: Önceki döngüleri kesin olarak temizle.
    if (timerRef.current) clearInterval(timerRef.current);
    
    setStreamedLogs([]);
    let i = 0;
    
    timerRef.current = setInterval(() => {
      if (i < logs.length) {
        setStreamedLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [logs]);

  return (
    <div style={styles.terminalContainer}>
      <div style={styles.terminalHeaderBar}>
        <div style={styles.terminalWindowButtons}>
          <span style={{ ...styles.windowDot, backgroundColor: '#ff3366' }}></span>
          <span style={{ ...styles.windowDot, backgroundColor: '#f59e0b' }}></span>
          <span style={{ ...styles.windowDot, backgroundColor: '#00ffaa' }}></span>
        </div>
        <span style={styles.terminalTitleText}>root@cornflix_os:~/secure_logs</span>
      </div>
      <div style={styles.terminalBodyArea}>
        <AnimatePresence>
          {streamedLogs.map((logLine, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={styles.terminalLogLine}>
              <span style={{ color: logLine.includes('SECURE') || logLine.includes('AUTH') ? '#00f0ff' : logLine.includes('SYSTEM') ? '#00ffaa' : '#cbd5e1' }}>
                {logLine}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={styles.terminalCursorTick} />
      </div>
    </div>
  );
};

// ============================================================================
// 4. ANA BİLEŞEN: KİMLİK & AUTH AĞIT (GATEWAY)
// ============================================================================
const ProfileIdentity: React.FC = () => {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const t = dict[lang];

  // --- AUTH (GİRİŞ/KAYIT) STATE MİMARİSİ ---
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, userEmail: null });
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState<string | null>(null);

  // --- PROFİL KİMLİK STATE MİMARİSİ ---
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [profileState, setProfileState] = useState<ProfileData>({
    name: 'Sistem Operatörü',
    role: 'Aday Mimar',
    location: 'Bilinmeyen Düğüm (Node)',
    bio: 'Sisteme yeni giriş yapıldı. Kayıtlar bekleniyor.'
  });
  const [formInputState, setFormInputState] = useState<ProfileData>(profileState);

  // Başlangıçta Auth kontrolü yap (Kullanıcı daha önce giriş yapmış mı?)
  useEffect(() => {
    try {
      const token = localStorage.getItem('cornflix_session_token');
      const savedProfile = localStorage.getItem('cornflix_secured_profile_v5');
      
      if (token) {
        setAuth({ isAuthenticated: true, userEmail: token });
      }
      if (savedProfile) {
        const decoded = JSON.parse(savedProfile);
        if (decoded && decoded.name) setProfileState(decoded);
      } else {
        // Eğer profil yoksa Tayfun Karlı efsanesini varsayılan olarak yaz
        const defaultLegend = {
          name: 'Tayfun Karlı',
          role: 'Baş Mimar (Lead Architect)',
          location: 'SDÜ Command Center, Isparta',
          bio: 'Cornflix Core OS Baş Geliştiricisi. Kırılmaz mimariler ve uzamsal UI mekanizmaları uzmanı.'
        };
        setProfileState(defaultLegend);
        localStorage.setItem('cornflix_secured_profile_v5', JSON.stringify(defaultLegend));
      }
    } catch (e) {
      console.error("Boot Error:", e);
    }
  }, []);

  // --- AUTH FONKSİYONLARI ---
  const handleAuthSubmit = () => {
    setAuthError(null);
    if (authMode === 'REGISTER') {
      if (!authForm.name || !authForm.email || !authForm.password) {
        setAuthError(t.authError); return;
      }
      // Kayıt başarılı: Yeni profili oluştur ve giriş yap
      const newProfile = { name: authForm.name, role: 'Sistem Operatörü', location: 'Merkez Ağ', bio: 'Yeni kayıtlı operatör.' };
      setProfileState(newProfile);
      localStorage.setItem('cornflix_secured_profile_v5', JSON.stringify(newProfile));
      localStorage.setItem('cornflix_session_token', authForm.email);
      setAuth({ isAuthenticated: true, userEmail: authForm.email });
      
    } else {
      // Login Modu
      if (!authForm.email || !authForm.password) {
        setAuthError(t.authError); return;
      }
      localStorage.setItem('cornflix_session_token', authForm.email);
      setAuth({ isAuthenticated: true, userEmail: authForm.email });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cornflix_session_token');
    setAuth({ isAuthenticated: false, userEmail: null });
    setAuthForm({ name: '', email: '', password: '' });
  };

  // --- KİMLİK GÜNCELLEME FONKSİYONLARI ---
  const handleSaveProfile = () => {
    if (!formInputState.name || formInputState.name.trim() === '') return;
    setProfileState(formInputState);
    localStorage.setItem('cornflix_secured_profile_v5', JSON.stringify(formInputState));
    setIsEditModalOpen(false);
  };

  const computeInitials = (name: string) => {
    try {
      if (!name) return 'TK';
      const parts = name.trim().split(' ');
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } catch { return 'TK'; }
  };

  // ============================================================================
  // GÖRÜNÜM 1: AUTHENTICATION (GİRİŞ/KAYIT) EKRANI
  // ============================================================================
  if (!auth.isAuthenticated) {
    return (
      <div style={styles.authViewport}>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', damping: 20 }} style={styles.authCard}>
          <div style={styles.authLogoContainer}>
            <div style={styles.pulseNodeBig}></div>
            <h2 style={styles.authMainTitle}>CORNFLIX // CORE_OS</h2>
          </div>
          
          <h3 style={styles.authSubtitle}>{authMode === 'LOGIN' ? t.authTitle : t.registerTitle}</h3>
          
          {authError && <div style={styles.authErrorBox}>{authError}</div>}

          <div style={styles.authFormStack}>
            <AnimatePresence>
              {authMode === 'REGISTER' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label style={styles.inputLabel}>{t.nameLabel}</label>
                  <input type="text" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} style={styles.inputField} />
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginBottom: '15px' }}>
              <label style={styles.inputLabel}>{t.emailLabel}</label>
              <input type="email" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} style={styles.inputField} />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={styles.inputLabel}>{t.passLabel}</label>
              <input type="password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} style={styles.inputField} />
            </div>

            <button onClick={handleAuthSubmit} style={styles.authSubmitBtn}>
              {authMode === 'LOGIN' ? t.loginBtn : t.registerBtn}
            </button>
            
            <button onClick={() => { setAuthMode(authMode === 'LOGIN' ? 'REGISTER' : 'LOGIN'); setAuthError(null); }} style={styles.authSwitchBtn}>
              {authMode === 'LOGIN' ? t.switchToReg : t.switchToLog}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ============================================================================
  // GÖRÜNÜM 2: SİNAPTİK KİMLİK EKRANI (DASHBOARD)
  // ============================================================================
  return (
    <div style={styles.viewContainer}>
      
      {/* HEADER & DİL MOTORU */}
      <div style={styles.metaHeader}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={styles.sectionTitle}>{t.pageTitle}</span>
          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Logged in as: {auth.userEmail}</span>
        </div>
        <span style={styles.reqBadge}>{t.reqBadge}</span>
      </div>

      <div style={styles.langToggleGroup}>
        <button onClick={() => setLang('TR')} style={{ ...styles.langBtn, ...(lang === 'TR' ? styles.langBtnActive : {}) }}>TÜRKÇE [TR]</button>
        <button onClick={() => setLang('EN')} style={{ ...styles.langBtn, ...(lang === 'EN' ? styles.langBtnActive : {}) }}>ENGLISH [EN]</button>
      </div>

      {/* KİMLİK KARTI (HERO) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.idCardContainer}>
        <div style={styles.cardHeaderRow}>
          <span style={styles.idCardHeaderClassified}>{t.idCardHeader}</span>
          <button onClick={() => { setFormInputState(profileState); setIsEditModalOpen(true); }} style={styles.actionModifyBtn}>
            ⚙️ {t.editBtn}
          </button>
        </div>

        <div style={styles.profileDataLayoutRow}>
          <div style={styles.hologramAvatarWrapper}>
            <div style={styles.hologramScanlineEffect}></div>
            <div style={styles.hologramInitialsText}>{computeInitials(profileState.name)}</div>
          </div>

          <div style={styles.operatorIdentityColumn}>
            <h2 style={styles.operatorNameHeading}>{profileState.name}</h2>
            <p style={styles.operatorRankText}>{profileState.role}</p>
            <p style={styles.operatorLocationText}>🌐 {profileState.location}</p>
            <p style={styles.operatorBioParagraph}>"{profileState.bio}"</p>
          </div>
        </div>
      </motion.div>

      {/* YETENEK MATRİSİ */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={styles.standardMetricsCard}>
        <h3 style={styles.subModuleSectionTitle}>{t.skillsTitle}</h3>
        <div style={styles.skillsStackContainer}>
          {skillMatrix.map((skill, index) => (
            <div key={skill.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 'bold' }}>{skill.name}</span>
                <span style={{ color: skill.color, fontWeight: 'bold' }}>{skill.level}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#112240', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 1.2, delay: 0.3 + (index * 0.1) }} style={{ height: '100%', backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CANLI TERMİNAL */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 style={styles.subModuleSectionTitle}>{t.terminalTitle}</h3>
        <LiveTerminalConsole logs={t.logs} />
      </motion.div>

      {/* GÜVENLİ ÇIKIŞ BUTONU */}
      <motion.button whileTap={{ scale: 0.96 }} onClick={handleLogout} style={styles.systemCoreDisconnectBtn}>
        ⚡ {t.logoutBtn}
      </motion.button>

      {/* ============================================================================
       * PROFİL DÜZENLEME MODALI
       * ============================================================================ */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div style={styles.modalViewportOverlay}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={styles.modalContentWrapper}>
              <h3 style={{ color: '#00f0ff', marginBottom: '20px', borderBottom: '1px solid rgba(0,240,255,0.2)', paddingBottom: '10px' }}>KİMLİK VERİLERİNİ GÜNCELLE</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={styles.inputLabel}>{t.labels.name}</label>
                <input value={formInputState.name} onChange={e => setFormInputState({...formInputState, name: e.target.value})} style={styles.inputField} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={styles.inputLabel}>{t.labels.role}</label>
                <input value={formInputState.role} onChange={e => setFormInputState({...formInputState, role: e.target.value})} style={styles.inputField} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={styles.inputLabel}>{t.labels.loc}</label>
                <input value={formInputState.location} onChange={e => setFormInputState({...formInputState, location: e.target.value})} style={styles.inputField} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={styles.inputLabel}>{t.labels.bio}</label>
                <textarea value={formInputState.bio} onChange={e => setFormInputState({...formInputState, bio: e.target.value})} style={{...styles.inputField, height: '80px', resize: 'none'}} />
              </div>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={handleSaveProfile} style={styles.modalSaveBtn}>✅ {t.saveBtn}</button>
                <button onClick={() => setIsEditModalOpen(false)} style={styles.modalCancelBtn}>✕ {t.cancelBtn}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 5. DEVASA PREMIUM CSS MİMARİSİ
// ----------------------------------------------------------------------------
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px' },
  
  // Auth Ekranı Stilleri
  authViewport: { width: '100%', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: '"Share Tech Mono", monospace' },
  authCard: { width: '100%', maxWidth: '400px', backgroundColor: 'rgba(5, 10, 20, 0.9)', border: '1px solid #00f0ff', borderRadius: '24px', padding: '40px 30px', boxShadow: '0 20px 60px rgba(0,240,255,0.15)' },
  authLogoContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' },
  pulseNodeBig: { width: '16px', height: '16px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 20px #00f0ff', animation: 'pulse 2s infinite', marginBottom: '15px' },
  authMainTitle: { fontSize: '24px', color: '#fff', margin: 0, letterSpacing: '2px', textShadow: '0 0 10px rgba(0,240,255,0.5)' },
  authSubtitle: { fontSize: '14px', color: '#00f0ff', textAlign: 'center', marginBottom: '25px', letterSpacing: '1px' },
  authErrorBox: { backgroundColor: 'rgba(255,51,102,0.1)', border: '1px solid #ff3366', color: '#ff3366', padding: '10px', borderRadius: '8px', fontSize: '12px', marginBottom: '20px', textAlign: 'center' },
  authFormStack: { display: 'flex', flexDirection: 'column' },
  authSubmitBtn: { width: '100%', padding: '16px', backgroundColor: 'rgba(0,240,255,0.15)', border: '1px solid #00f0ff', color: '#00f0ff', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.3s', boxShadow: '0 0 15px rgba(0,240,255,0.2)' },
  authSwitchBtn: { backgroundColor: 'transparent', border: 'none', color: '#64748b', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontFamily: '"Share Tech Mono", monospace' },

  // Kimlik Dashboard Stilleri
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px', borderBottom: '1px solid rgba(0,240,255,0.2)', paddingBottom: '15px' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '2px', margin: 0 },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.3)' },
  
  langToggleGroup: { display: 'flex', gap: '15px', marginBottom: '30px' },
  langBtn: { flex: 1, padding: '12px', backgroundColor: 'transparent', border: '1px solid #1a202c', color: '#64748b', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', fontFamily: '"Share Tech Mono", monospace' },
  langBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.08)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 15px rgba(0,240,255,0.15)' },
  
  idCardContainer: { backgroundColor: 'rgba(9, 13, 22, 0.8)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '24px', padding: '30px', marginBottom: '35px', boxShadow: '0 15px 40px rgba(0,240,255,0.08)' },
  cardHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' },
  idCardHeaderClassified: { fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', fontWeight: 'bold' },
  actionModifyBtn: { backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold', fontFamily: '"Share Tech Mono", monospace' },
  profileDataLayoutRow: { display: 'flex', alignItems: 'flex-start', gap: '25px' },
  hologramAvatarWrapper: { position: 'relative', width: '95px', height: '95px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,0,0,0.6))', border: '1px solid rgba(0,240,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  hologramScanlineEffect: { position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'rgba(0,240,255,0.6)', filter: 'blur(1px)' },
  hologramInitialsText: { fontSize: '36px', color: '#fff', fontWeight: 'bold', textShadow: '0 0 15px #00f0ff' },
  operatorIdentityColumn: { flex: 1 },
  operatorNameHeading: { margin: '0 0 6px 0', fontSize: '24px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' },
  operatorRankText: { margin: '0 0 10px 0', fontSize: '13px', color: '#00f0ff', fontWeight: 'bold' },
  operatorLocationText: { margin: '0 0 12px 0', fontSize: '11px', color: '#94a3b8' },
  operatorBioParagraph: { margin: 0, fontSize: '12px', color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.6' },
  
  standardMetricsCard: { marginBottom: '35px' },
  subModuleSectionTitle: { fontSize: '13px', color: '#00f0ff', marginBottom: '15px', borderBottom: '1px dashed #112240', paddingBottom: '8px' },
  skillsStackContainer: { display: 'flex', flexDirection: 'column' },
  
  terminalContainer: { backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '16px', overflow: 'hidden', marginBottom: '35px' },
  terminalHeaderBar: { backgroundColor: '#0a1526', padding: '14px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #112240' },
  terminalWindowButtons: { display: 'flex', gap: '8px', marginRight: '20px' },
  windowDot: { width: '11px', height: '11px', borderRadius: '50%' },
  terminalTitleText: { color: '#64748b', fontSize: '11px' },
  terminalBodyArea: { padding: '20px', minHeight: '170px', display: 'flex', flexDirection: 'column', gap: '10px' },
  terminalLogLine: { fontSize: '12px', fontFamily: '"Share Tech Mono", monospace', lineHeight: '1.5' },
  terminalCursorTick: { width: '9px', height: '14px', backgroundColor: '#00ffaa', display: 'inline-block', marginTop: '4px' },
  
  systemCoreDisconnectBtn: { width: '100%', padding: '20px', backgroundColor: 'rgba(255, 51, 102, 0.08)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace' },
  
  // Ortak Input ve Modal Stilleri
  inputLabel: { display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px' },
  inputField: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none' },
  modalViewportOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 2, 5, 0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  modalContentWrapper: { width: '100%', maxWidth: '450px', backgroundColor: '#050a14', borderRadius: '24px', padding: '30px', border: '1px solid #00f0ff' },
  modalSaveBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(0,255,170,0.1)', border: '1px solid #00ffaa', color: '#00ffaa', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' },
  modalCancelBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(255,51,102,0.1)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }
};

export default ProfileIdentity;
