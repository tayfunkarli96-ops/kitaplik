/**
 * ============================================================================
 * CORNFLIX CORE OPERATING SYSTEM // PROFILE & SYNAPTIC IDENTITY MODULE
 * ============================================================================
 * LEAD ARCHITECT: Tayfun Karlı
 * UNIVERSITY: Süleyman Demirel Üniversitesi (SDÜ) - Bilgisayar Mühendisliği
 * * RESOLVED SYSTEM REQUIREMENTS:
 * - REQ 1: Synaptic Identity / Official Operator Profile Card
 * - REQ 10: Advanced Linguistic Engine (Zero-Latency Real-Time Translation)
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ----------------------------------------------------------------------------
// 1. TİP TANIMLAMALARI VE INTERFACE'LER (MÜHENDİSLİK STANDARDI)
// ----------------------------------------------------------------------------
interface ProfileData {
  name: string;
  role: string;
  location: string;
  bio: string;
  securityClearance: string;
}

interface SkillItem {
  id: string;
  name: string;
  level: number;
  color: string;
}

interface SessionItem {
  id: number;
  ip: string;
  node: string;
  time: string;
  status: 'VERIFIED' | 'ENCRYPTED' | 'BLOCKED';
}

// ----------------------------------------------------------------------------
// 2. REQ 10: LINGUISTIC ENGINE DATA MATRIX (GELİŞMİŞ SÖZLÜK)
// ----------------------------------------------------------------------------
const linguisticDatabase = {
  TR: {
    pageTitle: 'SİNAPTİK KİMLİK & KONTROL MERKEZİ',
    reqBadge: 'REQ 1, 10 // IDENTITY',
    langSelector: 'DİL FREKANSI MODÜLASYONU (LINGUISTIC ENGINE)',
    idCardHeader: 'RESMİ OPERATÖR KARTI // CLASSIFIED TIER 1',
    skillsTitle: 'NÖRAL YETENEK MATRİSİ',
    terminalTitle: 'SİSTEM GÜVENLİK & TERMİNAL LOGLARI',
    sessionTitle: 'SON ERİŞİM VE OTURUM KAYITLARI',
    logoutBtn: 'AĞ BAĞLANTISINI KES (SECURE DISCONNECT)',
    editBtn: 'KİMLİK PROTOKOLÜNÜ GÜNCELLE',
    saveBtn: 'VERİLERİ ŞİFRELE VE KAYDET',
    cancelBtn: 'İŞLEMİ İPTAL ET',
    validationError: 'HATA: Operatör ismi boş bırakılamaz!',
    labels: {
      name: 'Operatör Resmi Adı',
      role: 'Sistem Atanmış Rütbesi',
      loc: 'Fiziksel / Siber Lokasyon',
      bio: 'Biyometrik İmza / Görev Özeti'
    },
    logs: [
      "> [INIT] Kimlik doğrulama sekansı başlatıldı...",
      "> [SECURE] 256-bit Kuantum şifreleme anahtarı ağa enjekte edildi.",
      "> [BIOMETRIC] Retina ve DNA eşleşmesi onaylandı: TAYFUN KARLI.",
      "> [NETWORK] SDÜ Command Mainframe bağlantı hızı: 12ms (Optimum).",
      "> [AUTH] Kök (root) düzeyinde erişim yetkileri Baş Mimar'a devredildi.",
      "> [SYSTEM] Çevresel tarama tamamlandı. Cornflix OS v2.0 stabil."
    ]
  },
  EN: {
    pageTitle: 'SYNAPTIC IDENTITY & CONTROL CENTER',
    reqBadge: 'REQ 1, 10 // IDENTITY',
    langSelector: 'LANGUAGE FREQUENCY MODULATION (LINGUISTIC ENGINE)',
    idCardHeader: 'OFFICIAL OPERATOR CARD // CLASSIFIED TIER 1',
    skillsTitle: 'NEURAL SKILL MATRIX',
    terminalTitle: 'SYSTEM SECURITY & TERMINAL LOGS',
    sessionTitle: 'RECENT ACCESS & SESSION RECORDS',
    logoutBtn: 'SECURE DISCONNECT FROM MAINFRAME',
    editBtn: 'UPDATE IDENTITY PROTOCOL',
    saveBtn: 'ENCRYPT & SAVE SYSTEM DATA',
    cancelBtn: 'ABORT OPERATION',
    validationError: 'ERROR: Operator name cannot be blank!',
    labels: {
      name: 'Operator Official Name',
      role: 'System Assigned Rank',
      loc: 'Physical / Cyber Location',
      bio: 'Biometric Signature / Duty Brief'
    },
    logs: [
      "> [INIT] Authentication sequence initiated...",
      "> [SECURE] 256-bit Quantum encryption key injected into network.",
      "> [BIOMETRIC] Retinal and DNA scan verified: TAYFUN KARLI.",
      "> [NETWORK] Connection to SDU Command Mainframe: 12ms (Optimum).",
      "> [AUTH] Root-level access rights transferred to Lead Architect.",
      "> [SYSTEM] Environmental scan completed. Cornflix OS v2.0 stable."
    ]
  }
};

// ----------------------------------------------------------------------------
// 3. STATİK VEYA TELEMETRİK MOCK VERİLER
// ----------------------------------------------------------------------------
const skillMatrixData: SkillItem[] = [
  { id: 'sk-01', name: 'React 19 & Spatial Archi', level: 98, color: '#00f0ff' },
  { id: 'sk-02', name: 'Framer Motion Dynamics', level: 95, color: '#00ffaa' },
  { id: 'sk-03', name: 'System Core Architecture', level: 99, color: '#f59e0b' },
  { id: 'sk-04', name: 'Quantum Cryptography', level: 87, color: '#ff3366' }
];

const initialSessions: SessionItem[] = [
  { id: 901, ip: '192.168.1.104', node: 'SDU Core Node', time: '12 Dakika Önce', status: 'VERIFIED' },
  { id: 902, ip: '10.0.4.219', node: 'Isparta Server', time: '2 Gün Önce', status: 'ENCRYPTED' },
  { id: 903, ip: 'Unknown_Relay', node: 'Proxy Firewall', time: '5 Gün Önce', status: 'BLOCKED' }
];

// ============================================================================
// 4. SUB-COMPONENT 1: LIVE TERMINAL CONSOLE
// ============================================================================
const LiveTerminalConsole: React.FC<{ logBuffer: string[] }> = ({ logBuffer }) => {
  const [streamedLogs, setStreamedLogs] = useState<string[]>([]);

  useEffect(() => {
    setStreamedLogs([]);
    let currentLogIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentLogIndex < logBuffer.length) {
        setStreamedLogs(prev => [...prev, logBuffer[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(streamInterval);
      }
    }, 450);

    return () => clearInterval(streamInterval);
  }, [logBuffer]);

  return (
    <div style={styles.terminalContainer}>
      <div style={styles.terminalHeaderBar}>
        <div style={styles.terminalWindowButtons}>
          <span style={{ ...styles.windowDot, backgroundColor: '#ff3366' }}></span>
          <span style={{ ...styles.windowDot, backgroundColor: '#f59e0b' }}></span>
          <span style={{ ...styles.windowDot, backgroundColor: '#00ffaa' }}></span>
        </div>
        <span style={styles.terminalTitleText}>operator@cornflix_core_os:~</span>
      </div>
      <div style={styles.terminalBodyArea}>
        <AnimatePresence>
          {streamedLogs.map((logLine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={styles.terminalLogLine}
            >
              <span style={{
                color: logLine.includes('SECURE') ? '#00f0ff' : 
                       logLine.includes('BIOMETRIC') ? '#00ffaa' : 
                       logLine.includes('HATA') || logLine.includes('ERROR') ? '#ff3366' : '#cbd5e1'
              }}>
                {logLine}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={styles.terminalCursorTick}
        />
      </div>
    </div>
  );
};

// ============================================================================
// 5. MAIN CORE COMPONENT: PROFILE IDENTITY
// ============================================================================
const ProfileIdentity: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'TR' | 'EN'>('TR');
  const t = linguisticDatabase[currentLanguage];

  // Profil Veritabanı State Yönetimi
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [profileState, setProfileState] = useState<ProfileData>({
    name: 'Tayfun Karlı',
    role: 'Baş Mimar (Lead Architect)',
    location: 'SDÜ Command Center, Isparta',
    bio: 'Cornflix Core OS v2.0 Baş Geliştiricisi. İleri düzey yazılım mimarisi, GPU render optimizasyonu ve uzamsal UI mekanikleri uzmanı.',
    securityClearance: 'LEVEL_ALPHA_9'
  });
  const [formInputState, setFormInputState] = useState<ProfileData>(profileState);

  // Kırılmaz Baş Harf Hesaplama Motoru (Try-Catch Korumalı)
  const computeSafeInitials = (targetName: string): string => {
    try {
      if (!targetName || targetName.trim() === '') return 'TK';
      const nameTokens = targetName.trim().split(' ');
      if (nameTokens.length === 1) return nameTokens[0].substring(0, 2).toUpperCase();
      return (nameTokens[0][0] + nameTokens[nameTokens.length - 1][0]).toUpperCase();
    } catch (crashException) {
      console.error("Biyometrik Baş Harf Hesaplama Motoru Hatası Bypass Edildi:", crashException);
      return 'TK';
    }
  };

  // LocalStorage Entegrasyon Döngüsü
  useEffect(() => {
    try {
      const activeProfileSignal = localStorage.getItem('cornflix_secured_profile_v3');
      if (activeProfileSignal) {
        const decodedProfile = JSON.parse(activeProfileSignal);
        if (decodedProfile && decodedProfile.name) {
          setProfileState(decodedProfile);
          setFormInputState(decodedProfile);
        }
      }
    } catch (storageReadingError) {
      console.error("Profil Şifreli Bellek Okuma Hatası:", storageReadingError);
    }
  }, []);

  // Profil Güncelleme ve Doğrulama Protokolü
  const triggerProfileEncryptionProtocol = () => {
    if (!formInputState.name || formInputState.name.trim() === '') {
      alert(t.validationError);
      return;
    }
    setProfileState(formInputState);
    localStorage.setItem('cornflix_secured_profile_v3', JSON.stringify(formInputState));
    setIsEditModalOpen(false);
  };

  // Framer Motion Animasyon Paketleri
  const layoutStaggerVariants = {
    hidden: { opacity: 0 },
    display: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const adaptiveCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    display: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div style={styles.viewportWrapper}>
      
      {/* GLOBAL MODÜL BAŞLIĞI */}
      <div style={styles.moduleMetaHeader}>
        <div style={styles.titleColumn}>
          <span style={styles.systemPrimaryTitle}>{t.pageTitle}</span>
          <span style={styles.systemSubtextTitle}>Nöral Kimlik ve Operatör Telemetri Matrisi</span>
        </div>
        <span style={styles.badgeRequirement}>{t.reqBadge}</span>
      </div>

      {/* CORE FRAME LAYOUT */}
      <motion.div variants={layoutStaggerVariants} initial="hidden" animate="display">
        
        {/* REQ 10: LINGUISTIC ENGINE FREKANS SEÇİCİ PANEL */}
        <motion.div variants={adaptiveCardVariants} style={styles.neuralControlPanel}>
          <div style={styles.panelHeaderRow}>
            <span style={styles.activeGlowPulseNode}></span>
            <p style={styles.panelHeaderLabel}>{t.langSelector}</p>
          </div>
          <div style={styles.dualToggleGroup}>
            <button 
              onClick={() => setCurrentLanguage('TR')} 
              style={{ ...styles.frequencyBtn, ...(currentLanguage === 'TR' ? styles.frequencyBtnActive : {}) }}
            >
              TÜRKÇE [SYS_TR]
            </button>
            <button 
              onClick={() => setCurrentLanguage('EN')} 
              style={{ ...styles.frequencyBtn, ...(currentLanguage === 'EN' ? styles.frequencyBtnActive : {}) }}
            >
              ENGLISH [SYS_EN]
            </button>
          </div>
        </motion.div>

        {/* REQ 1: RESMİ OPERATÖR SİNAPTİK KİMLİK KARTI */}
        <motion.div variants={adaptiveCardVariants} style={styles.synapticIdCardContainer}>
          <div style={styles.matrixBackgroundGrid}></div>
          <div style={styles.chromaRadialGlow}></div>

          <div style={styles.idCardHeaderRow}>
            <span style={styles.idCardHeaderClassified}>{t.idCardHeader}</span>
            <button onClick={() => { setFormInputState(profileState); setIsEditModalOpen(true); }} style={styles.actionModifyBtn}>
              <span style={{ marginRight: '6px' }}>⚙️</span> {t.editBtn}
            </button>
          </div>

          <div style={styles.profileDataLayoutRow}>
            <div style={styles.hologramAvatarWrapper}>
              <div style={styles.hologramScanlineEffect}></div>
              <div style={styles.hologramInitialsText}>{computeSafeInitials(profileState.name)}</div>
            </div>

            <div style={styles.operatorIdentityColumn}>
              <h2 style={styles.operatorNameHeading}>{profileState.name}</h2>
              <p style={styles.operatorRankText}>{profileState.role}</p>
              <p style={styles.operatorLocationText}>🌐 {profileState.location}</p>
              <p style={styles.operatorBioParagraph}>"{profileState.bio}"</p>
              
              {/* Güvenlik Kodu Görsel Barkod Simülasyonu */}
              <div style={styles.visualBarcodeStream}>
                {Array.from({ length: 32 }).map((_, barIndex) => (
                  <div key={barIndex} style={{
                    width: `${(barIndex % 3 === 0 ? 4 : barIndex % 2 === 0 ? 2 : 1)}px`,
                    height: '14px',
                    backgroundColor: 'rgba(0, 240, 255, 0.45)',
                    marginRight: '2px'
                  }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* NÖRAL YETENEK MATRİSİ PANELİ */}
        <motion.div variants={adaptiveCardVariants} style={styles.standardMetricsCard}>
          <h3 style={styles.subModuleSectionTitle}>{t.skillsTitle}</h3>
          <div style={styles.skillsStackContainer}>
            {skillMatrixData.map((skillNode, skillIndex) => (
              <div key={skillNode.id} style={styles.skillNodeLayout}>
                <div style={styles.skillNodeLabelRow}>
                  <span style={styles.skillNodeNameText}>{skillNode.name}</span>
                  <span style={{ ...styles.skillNodePercentText, color: skillNode.color }}>{skillNode.level}%</span>
                </div>
                <div style={styles.skillNodeTrackBg}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skillNode.level}%` }}
                    transition={{ duration: 1.6, delay: 0.4 + (skillIndex * 0.15), type: 'spring' }}
                    style={{ ...styles.skillNodeFillBar, backgroundColor: skillNode.color, boxShadow: `0 0 12px ${skillNode.color}` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ERİŞİM VE OTURUM GEÇMİŞİ VERİ ODASI */}
        <motion.div variants={adaptiveCardVariants} style={{ marginBottom: '30px' }}>
          <h3 style={styles.subModuleSectionTitle}>{t.sessionTitle}</h3>
          <div style={styles.sessionTableWrapper}>
            {initialSessions.map(sessionNode => (
              <div key={sessionNode.id} style={styles.sessionDataRow}>
                <div style={styles.sessionMetadataGroup}>
                  <span style={styles.sessionIpText}>IP_ADDR: {sessionNode.ip}</span>
                  <span style={styles.sessionNodeText}>{sessionNode.node} // {sessionNode.time}</span>
                </div>
                <span style={{
                  ...styles.sessionStatusBadge,
                  backgroundColor: sessionNode.status === 'VERIFIED' ? 'rgba(0, 255, 170, 0.08)' : 
                                   sessionNode.status === 'ENCRYPTED' ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 51, 102, 0.08)',
                  color: sessionNode.status === 'VERIFIED' ? '#00ffaa' : 
                         sessionNode.status === 'ENCRYPTED' ? '#00f0ff' : '#ff3366',
                  borderColor: sessionNode.status === 'VERIFIED' ? 'rgba(0, 255, 170, 0.25)' : 
                               sessionNode.status === 'ENCRYPTED' ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 51, 102, 0.25)'
                }}>
                  {sessionNode.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CANLI TERMİNAL GÜVENLİK AKIŞI */}
        <motion.div variants={adaptiveCardVariants}>
          <h3 style={styles.subModuleSectionTitle}>{t.terminalTitle}</h3>
          <LiveTerminalConsole logBuffer={t.logs} />
        </motion.div>

        {/* BAĞLANTI KESME PANEL BUTONU */}
        <motion.button 
          variants={adaptiveCardVariants} 
          whileTap={{ scale: 0.96 }} 
          style={styles.systemCoreDisconnectBtn}
        >
          ⚡ {t.logoutBtn}
        </motion.button>

      </motion.div>

      {/* ============================================================================
       * REQ 1: DİNAMİK BİYOMETRİK VERİ GÜNCELLEME MODALI (OVERLAY INTERACTIVE)
       * ============================================================================ */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div style={styles.modalViewportOverlay}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              style={styles.modalContentWrapper}
            >
              <h3 style={styles.modalHeadingTitle}>KİMLİK VERİLERİ ŞİFRELEME ODASI</h3>
              
              <div style={styles.modalFormInputGroup}>
                <label style={styles.modalFormLabel}>{t.labels.name}</label>
                <input 
                  value={editFormInputState.name} 
                  onChange={e => setFormInputState({ ...editFormInputState, name: e.target.value })} 
                  style={styles.modalInputField} 
                />
              </div>

              <div style={styles.modalFormInputGroup}>
                <label style={styles.modalFormLabel}>{t.labels.role}</label>
                <input 
                  value={editFormInputState.role} 
                  onChange={e => setFormInputState({ ...editFormInputState, role: e.target.value })} 
                  style={styles.modalInputField} 
                />
              </div>

              <div style={styles.modalFormInputGroup}>
                <label style={styles.modalFormLabel}>{t.labels.loc}</label>
                <input 
                  value={editFormInputState.location} 
                  onChange={e => setFormInputState({ ...editFormInputState, location: e.target.value })} 
                  style={styles.modalInputField} 
                />
              </div>

              <div style={styles.modalFormInputGroup}>
                <label style={styles.modalFormLabel}>{t.labels.bio}</label>
                <textarea 
                  value={editFormInputState.bio} 
                  onChange={e => setFormInputState({ ...editFormInputState, bio: e.target.value })} 
                  style={styles.modalTextAreaField} 
                />
              </div>

              <div style={styles.modalActionButtonsRow}>
                <button onClick={triggerProfileEncryptionProtocol} style={styles.modalSaveExecutionBtn}>
                  {t.saveBtn}
                </button>
                <button onClick={() => setIsEditModalOpen(false)} style={styles.modalCancelDismissBtn}>
                  {t.cancelBtn}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

// ----------------------------------------------------------------------------
// 6. DEVAASA VE MİLİMETRİK PREMIUM CSS PROPERTİES MATRİSİ
// ----------------------------------------------------------------------------
const styles: { [key: string]: React.CSSProperties } = {
  viewportWrapper: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px' },
  moduleMetaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', borderBottom: '1px solid rgba(0,240,255,0.22)', paddingBottom: '16px' },
  titleColumn: { display: 'flex', flexDirection: 'column' },
  systemPrimaryTitle: { fontSize: '22px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '2px', textShadow: '0 0 12px rgba(0,240,255,0.45)' },
  systemSubtextTitle: { fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.5px' },
  badgeRequirement: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.3)', fontWeight: 'bold' },
  subModuleSectionTitle: { fontSize: '13px', color: '#00f0ff', marginBottom: '16px', borderBottom: '1px dashed #112240', paddingBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' },
  
  // Dil Paneli
  neuralControlPanel: { backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '16px', padding: '20px', marginBottom: '30px', boxShadow: '0 6px 25px rgba(0,0,0,0.45)' },
  panelHeaderRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' },
  activeGlowPulseNode: { width: '8px', height: '8px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 12px #00ffaa' },
  panelHeaderLabel: { margin: 0, fontSize: '11px', color: '#64748b', letterSpacing: '1px' },
  dualToggleGroup: { display: 'flex', gap: '16px' },
  langBtn: { flex: 1, padding: '14px', backgroundColor: 'transparent', border: '1px solid #1a202c', color: '#64748b', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', transition: 'all 0.3s ease', fontFamily: '"Share Tech Mono", monospace' },
  langBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.08)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 20px rgba(0,240,255,0.15)' },
  
  // Operatör Kartı Stilleri
  synapticIdCardContainer: { backgroundColor: 'rgba(9, 13, 22, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 240, 255, 0.28)', borderRadius: '24px', padding: '30px', marginBottom: '35px', position: 'relative', overflow: 'hidden', boxShadow: '0 16px 45px rgba(0,240,255,0.08)' },
  matrixBackgroundGrid: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none', zIndex: 0 },
  chromaRadialGlow: { position: 'absolute', right: '-15%', bottom: '-15%', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, transparent 70%)', filter: 'blur(25px)', zIndex: 0 },
  idCardHeaderRow: { position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' },
  idCardHeaderClassified: { fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', fontWeight: 'bold' },
  actionModifyBtn: { backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.2s' },
  profileDataLayoutRow: { position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-start', gap: '25px' },
  hologramAvatarWrapper: { position: 'relative', width: '95px', height: '95px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(0,240,255,0.22), rgba(0,0,0,0.6))', border: '1px solid rgba(0,240,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,240,255,0.35)' },
  hologramScanlineEffect: { position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'rgba(0,240,255,0.65)', filter: 'blur(1px)', animation: 'scan 2.5s linear infinite' },
  hologramInitialsText: { fontSize: '36px', color: '#fff', fontWeight: 'bold', textShadow: '0 0 16px #00f0ff', letterSpacing: '1px' },
  operatorIdentityColumn: { flex: 1 },
  operatorNameHeading: { margin: '0 0 6px 0', fontSize: '25px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' },
  operatorRankText: { margin: '0 0 10px 0', fontSize: '13px', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '0.5px' },
  operatorLocationText: { margin: '0 0 12px 0', fontSize: '11px', color: '#94a3b8' },
  operatorBioParagraph: { margin: '0 0 16px 0', fontSize: '12px', color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.65' },
  visualBarcodeStream: { display: 'flex', alignItems: 'center', opacity: 0.65 },
  
  // Yetenek Matrisi Stilleri
  standardMetricsCard: { marginBottom: '35px' },
  skillsStackContainer: { display: 'flex', flexDirection: 'column', gap: '18px' },
  skillNodeLayout: { display: 'flex', flexDirection: 'column', gap: '8px' },
  skillNodeLabelRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' },
  skillNodeNameText: { color: '#cbd5e1', fontWeight: 'bold', letterSpacing: '0.5px' },
  skillNodePercentText: { fontWeight: 'bold' },
  skillNodeTrackBg: { width: '100%', height: '8px', backgroundColor: '#112240', borderRadius: '4px', overflow: 'hidden' },
  skillNodeFillBar: { height: '100%', borderRadius: '4px' },
  
  // Oturum Geçmişi
  sessionTableWrapper: { display: 'flex', flexDirection: 'column', gap: '12px' },
  sessionDataRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050a14', border: '1px solid #112240', padding: '14px 18px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  sessionMetadataGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  sessionIpText: { color: '#fff', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px' },
  sessionNodeText: { color: '#64748b', fontSize: '11px' },
  sessionStatusBadge: { fontSize: '10px', padding: '5px 10px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid', letterSpacing: '0.5px' },
  
  // Terminal Alanı
  terminalContainer: { backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '16px', overflow: 'hidden', marginBottom: '35px', boxShadow: '0 12px 30px rgba(0,0,0,0.6)' },
  terminalHeaderBar: { backgroundColor: '#0a1526', padding: '14px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #112240' },
  terminalWindowButtons: { display: 'flex', gap: '8px', marginRight: '20px' },
  windowDot: { width: '11px', height: '11px', borderRadius: '50%' },
  terminalTitleText: { color: '#64748b', fontSize: '11px', letterSpacing: '0.5px' },
  terminalBodyArea: { padding: '20px', minHeight: '170px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'rgba(2,2,5,0.95)' },
  terminalLogLine: { fontSize: '12px', fontFamily: '"Share Tech Mono", monospace', letterSpacing: '0.5px', lineHeight: '1.5' },
  terminalCursorTick: { width: '9px', height: '14px', backgroundColor: '#00ffaa', display: 'inline-block', marginTop: '4px' },
  
  // Disconnect Butonu
  systemCoreDisconnectBtn: { width: '100%', padding: '20px', backgroundColor: 'rgba(255, 51, 102, 0.08)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', letterSpacing: '2px', transition: 'all 0.3s ease', boxShadow: '0 0 25px rgba(255,51,102,0.12)' },
  
  // İnteraktif Düzenleme Modalı Stilleri
  modalViewportOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 2, 5, 0.94)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  modalContentWrapper: { width: '100%', maxWidth: '460px', backgroundColor: '#050a14', borderRadius: '24px', padding: '30px', border: '1px solid #00f0ff', boxShadow: '0 25px 65px rgba(0,240,255,0.16)', display: 'flex', flexDirection: 'column' },
  modalHeadingTitle: { color: '#00f0ff', margin: '0 0 25px 0', fontSize: '18px', borderBottom: '1px solid rgba(0,240,255,0.25)', paddingBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' },
  modalFormInputGroup: { marginBottom: '16px', display: 'flex', flexDirection: 'column' },
  modalFormLabel: { fontSize: '11px', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' },
  modalInputField: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none', colorScheme: 'dark' },
  modalTextAreaField: { width: '100%', height: '85px', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none', resize: 'none' },
  modalActionButtonsRow: { display: 'flex', gap: '16px', marginTop: '25px' },
  modalSaveExecutionBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(0, 255, 170, 0.12)', border: '1px solid #00ffaa', color: '#00ffaa', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', transition: 'all 0.3s ease', fontFamily: '"Share Tech Mono", monospace' },
  modalCancelDismissBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(255, 51, 102, 0.1)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', transition: 'all 0.3s ease', fontFamily: '"Share Tech Mono", monospace' }
};

export default ProfileIdentity;
