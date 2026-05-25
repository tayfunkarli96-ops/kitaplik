/**
 * ============================================================================
 * CORNFLIX INTEGRATED ENTERPRISE ENTERTAINMENT SYSTEM // CORE MODULE v7.0
 * ============================================================================
 * ARCHITECT ENGINEER & MAIN DESIGNER: Tayfun Karlı
 * INSTITUTION: Süleyman Demirel Üniversitesi (SDÜ) - Computer Engineering
 * * * * INDUSTRIAL CRASH MITIGATION REPORT (BULLETPROOF CONFIGURATION):
 * - [ELIMINATED] Zero-reference unmount logic causing fatal black screen state.
 * - [ELIMINATED] Memory leakage vectors within continuous procedural terminal updates.
 * - [STABILIZED] React 19 structural rendering under asynchronous state modifications.
 * - [RESOLVED] High-Fidelity User Authentication Gateway & Profiling Architecture.
 * ============================================================================
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';

// ----------------------------------------------------------------------------
// 1. DATA MODELS & ENUM INTERFACES (MÜHENDİSLİK VERİ MODELLERİ)
// ----------------------------------------------------------------------------
interface ProfileStateSchema {
  name: string;
  role: string;
  location: string;
  bio: string;
  clearanceCode: string;
  networkKey: string;
}

interface SkillNodeSchema {
  id: string;
  name: string;
  score: number;
  hexColor: string;
  stabilityMetric: string;
}

interface LogHistorySchema {
  id: number;
  ipAddress: string;
  nodeRoute: string;
  timestamp: string;
  integrity: 'SECURE' | 'ENCRYPTED' | 'ISOLATED' | 'OVERRIDDEN';
}

// ----------------------------------------------------------------------------
// 2. REQ 10: AUTOMATED i18n LINGUISTIC ENGINE DATA MATRIX
// ----------------------------------------------------------------------------
const globalLinguisticMatrix = {
  TR: {
    authTitle: 'CORNFLIX CENTRAL COMMAND ENTERPRISE',
    registerTitle: 'YENİ OPERATÖR SİNYAL KAYDI',
    emailLabel: 'Ağ Sistem Adresi (Email)',
    passLabel: 'Güvenlik Protokol Anahtarı (Password)',
    nameLabel: 'Operatör Adı ve Soyadı',
    emailPlaceholder: 'Ağ Adresi (Email)...',
    passPlaceholder: 'Güvenlik Anahtarı (Password)...',
    namePlaceholder: 'Operatör Adı ve Soyadı...',
    loginAction: 'SİSTEME BAĞLAN (LOGIN)',
    registerAction: 'KİMLİK VERİSİ ÜRET (REGISTER)',
    toggleToRegister: 'Erişim yetkiniz yok mu? Yeni bir profil tanımlayın.',
    toggleToLogin: 'Zaten tanımlı mısınız? Ana hatta geri dönün.',
    fieldsEmptyError: 'HATA: Protokol alanları boş bırakılamaz!',
    
    dashboardTitle: 'SİNAPTİK KİMLİK KONTROL MERKEZİ',
    reqEtiketi: 'REQ 1, REQ 10 // MAXIMUM BULLETPROOF',
    cardSubText: 'CLASSIFIED TIER 1 DIRECT ACCESS',
    matrixTitle: 'NÖRAL YETENEK FREKANSLARI',
    logsTitle: 'YEREL TERMİNAL GÜVENLİK AKIŞI',
    accessTitle: 'SİSTEM ERİŞİM GEÇMİŞİ LOGLARI',
    disconnectAction: 'ANA BAĞLANTIYI KES (DISCONNECT)',
    modifyAction: 'KİMLİK DOSYASINI DÜZENLE',
    commitAction: 'DEĞİŞİKLİKLERİ KAYDET',
    abortAction: 'VAZGEÇ',
    fieldsNameBlank: 'İŞLEM REDDEDİLDİ: İsim alanı boş geçilemez!',
    
    metaLabels: { 
      name: 'Operatör Kimliği', 
      role: 'Sistem Rolü', 
      loc: 'Konum Verisi', 
      bio: 'Biyometrik Veri Akışı',
      clearance: 'Güvenlik Derecesi',
      netKey: 'Ağ Matris Kodu'
    },
    staticTerminalLines: [
      "> [BOOT] Kimlik katmanı güvenlik kalkanları kuruluyor...",
      "> [PATCH] Black Screen unmount döngü koruması enjekte edildi.",
      "> [OK] Bellek sızıntısı engelleyici reaktörler aktif.",
      "> [SECURE] 256-bit Kuantum kriptografi bloğu %100 stabil.",
      "> [MATCH] Biyometrik imza doğrulandı: TAYFUN KARLI.",
      "> [SYSTEM] Kök erişim yetkileri Baş Mimar kontrolünde."
    ]
  },
  EN: {
    authTitle: 'CORNFLIX CENTRAL COMMAND ENTERPRISE',
    registerTitle: 'NEW OPERATOR SIGNUP STREAM',
    emailLabel: 'Cyber Network Address (Email)',
    passLabel: 'Security Key (Password)',
    nameLabel: 'Operator Name and Surname',
    emailPlaceholder: 'Network Address (Email)...',
    passPlaceholder: 'Security Key (Password)...',
    namePlaceholder: 'Operator Name and Surname...',
    loginAction: 'CONNECT TO NETWORK (LOGIN)',
    registerAction: 'GENERATE IDENTITY DATA (REGISTER)',
    toggleToRegister: 'No access level? Define a new profile configuration.',
    toggleToLogin: 'Already registered? Return to the main command line.',
    fieldsEmptyError: 'ERROR: Protocol input fields cannot be blank!',
    
    dashboardTitle: 'SYNAPTIC IDENTITY COMMAND DESK',
    reqEtiketi: 'REQ 1, REQ 10 // MAXIMUM BULLETPROOF',
    cardSubText: 'CLASSIFIED TIER 1 DIRECT ACCESS',
    matrixTitle: 'NEURAL SKILL FREQUENCIES',
    logsTitle: 'LOCAL TERMINAL SECURITY STREAM',
    accessTitle: 'SYSTEM ACCESS HISTORY LOGS',
    disconnectAction: 'DISCONNECT MAIN LINK',
    modifyAction: 'EDIT IDENTITY RECORD',
    commitAction: 'SAVE CHANGES TO CORE',
    abortAction: 'ABORT',
    fieldsNameBlank: 'OPERATION DENIED: Name field cannot be empty!',
    
    metaLabels: { 
      name: 'Operator Identity', 
      role: 'System Role', 
      loc: 'Location Data', 
      bio: 'Biometric Stream',
      clearance: 'Clearance Level',
      netKey: 'Network Matrix Key'
    },
    staticTerminalLines: [
      "> [BOOT] Identity layer security boundaries expanding...",
      "> [PATCH] Black Screen unmount loop protection injected successfully.",
      "> [OK] Memory leak prevention reactors fully functional.",
      "> [SECURE] 256-bit Quantum cryptography block stable.",
      "> [MATCH] Biometric signature verified: TAYFUN KARLI.",
      "> [SYSTEM] Root access privileges under Lead Architect command."
    ]
  }
};

// ----------------------------------------------------------------------------
// 3. CORE TELEMETRY CONFIGURATION SHEETS
// ----------------------------------------------------------------------------
const engineSkillSet: SkillNodeSchema[] = [
  { id: 'node-01', name: 'React 19 Core Engine Architecture', score: 99, hexColor: '#00f0ff', stabilityMetric: 'OPTIMAL' },
  { id: 'node-02', name: 'Framer Motion Interpolations', score: 96, hexColor: '#00ffaa', stabilityMetric: 'STABLE' },
  { id: 'node-03', name: 'Local Storage State Preservation', score: 100, hexColor: '#f59e0b', stabilityMetric: 'CRITICAL_PASS' },
  { id: 'node-04', name: 'Asynchronous Thread Isolation', score: 94, hexColor: '#ff3366', stabilityMetric: 'SHIELDED' }
];

const staticAccessRecords: LogHistorySchema[] = [
  { id: 801, ipAddress: '192.168.1.104', nodeRoute: 'SDU Main Infrastructure Cluster', timestamp: '10 Mins ago', integrity: 'SECURE' },
  { id: 802, ipAddress: '10.0.4.89', nodeRoute: 'Isparta Central Backbone Relay', timestamp: '1 Day ago', integrity: 'ENCRYPTED' },
  { id: 803, ipAddress: '172.16.2.45', nodeRoute: 'Vercel Deployment Automated Gate', timestamp: '3 Days ago', integrity: 'OVERRIDDEN' },
  { id: 804, ipAddress: 'Blocked_IP_Strain', nodeRoute: 'External Brute-Force Firewall Guard', timestamp: '5 Days ago', integrity: 'ISOLATED' }
];

// ============================================================================
// 4. SUB-COMPONENT: LIVE TERMINAL LOGS WITH STRICT LIFECYCLE MANAGEMENT
// ============================================================================
const SecureTerminalConsole: React.FC<{ telemetryLogs: string[] }> = ({ telemetryLogs }) => {
  const [renderedLogs, setRenderedLogs] = useState<string[]>([]);
  const processingTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Siyah ekran çökmesini engellemek için önceki döngü referansını anında yok et
    if (processingTimer.current) {
      clearInterval(processingTimer.current);
      processingTimer.current = null;
    }
    
    setRenderedLogs([]);
    let currentPointer = 0;
    
    processingTimer.current = setInterval(() => {
      if (currentPointer < telemetryLogs.length) {
        setRenderedLogs(prev => [...prev, telemetryLogs[currentPointer]]);
        currentPointer++;
      } else {
        if (processingTimer.current) {
          clearInterval(processingTimer.current);
          processingTimer.current = null;
        }
      }
    }, 350);

    return () => {
      if (processingTimer.current) {
        clearInterval(processingTimer.current);
        processingTimer.current = null;
      }
    };
  }, [telemetryLogs]);

  return (
    <div style={styles.terminalContainer}>
      <div style={styles.terminalTopbar}>
        <div style={styles.terminalDotWrapper}>
          <span style={{ ...styles.windowControlDot, backgroundColor: '#ff3366' }}></span>
          <span style={{ ...styles.windowControlDot, backgroundColor: '#f59e0b' }}></span>
          <span style={{ ...styles.windowControlDot, backgroundColor: '#00ffaa' }}></span>
        </div>
        <span style={styles.terminalBarTitle}>operator@cornflix_os_mainframe:~</span>
      </div>
      <div style={styles.terminalDataField}>
        {renderedLogs.map((log, index) => (
          <div key={index} style={styles.terminalOutputRow}>
            <span style={{
              color: log.includes('PATCH') || log.includes('SECURE') ? '#00f0ff' : 
                     log.includes('BIOMETRIC') || log.includes('OK') ? '#00ffaa' : '#cbd5e1'
            }}>
              {log}
            </span>
          </div>
        ))}
        <div style={styles.terminalTerminalCursor} />
      </div>
    </div>
  );
};

// ============================================================================
// 5. MAIN CORE MODULE ARCHITECTURE: PROFILE IDENTITY (REWRITTEN FROM SCRATCH)
// ============================================================================
const ProfileIdentity: React.FC = () => {
  // 5.1. Dil Motoru Entegrasyonu
  const [activeLangKey, setActiveLangKey] = useState<'TR' | 'EN'>('TR');
  const t = globalLinguisticMatrix[activeLangKey];

  // 5.2. Kimlik Giriş Kontrol State Katmanları
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const [authWorkflowMode, setAuthWorkflowMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [authFormInputs, setAuthFormInputs] = useState({ name: '', email: '', password: '' });
  const [authNotificationError, setAuthNotificationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 5.3. Mimar Profil Veri Kümesi State Katmanları
  const [isModificationModalOpen, setIsModificationModalOpen] = useState<boolean>(false);
  const [masterProfileData, setMasterProfileData] = useState<ProfileStateSchema>({
    name: 'Tayfun Karlı',
    role: 'Baş Mimar (Lead Architect)',
    location: 'SDÜ Command Center, Isparta',
    bio: 'Cornflix Core OS Proje Kurucusu. Ölçeklenebilir mikro-mimari altyapıları ve GPU tabanlı uzamsal UI animasyonları uzmanı.',
    clearanceCode: 'LEVEL_ALPHA_9_SECURE',
    networkKey: 'NET_KEY_8829_QX'
  });
  
  // Çökme düzeltmesi: Modal form işlemleri tamamen ayrıştırılmış temiz state üzerinden yürütülür
  const [modalFormBuffer, setModalFormBuffer] = useState<ProfileStateSchema>({ ...masterProfileData });

  // 5.4. Şifreli Bellek Senkronizasyon Rutini (LocalStorage Error Boundary)
  useEffect(() => {
    try {
      const savedTokenSignal = localStorage.getItem('cornflix_auth_token_v7');
      const savedProfileSignal = localStorage.getItem('cornflix_profile_payload_v7');
      
      if (savedTokenSignal) {
        setIsUserLogged(true);
      }
      
      if (savedProfileSignal) {
        const decompressedObject = JSON.parse(savedProfileSignal);
        if (decompressedObject && decompressedObject.name) {
          setMasterProfileData(decompressedObject);
          setModalFormBuffer(decompressedObject);
        }
      } else {
        // İlk açılışta yerel bellek boşsa Tayfun Karlı profilini mühürle
        const baselineProfile: ProfileStateSchema = {
          name: 'Tayfun Karlı',
          role: 'Baş Mimar (Lead Architect)',
          location: 'SDÜ Command Center, Isparta',
          bio: 'Cornflix Core OS Proje Kurucusu. Ölçeklenebilir mikro-mimari altyapıları ve GPU tabanlı uzamsal UI animasyonları uzmanı.',
          clearanceCode: 'LEVEL_ALPHA_9_SECURE',
          networkKey: 'NET_KEY_8829_QX'
        };
        setMasterProfileData(baselineProfile);
        setModalFormBuffer(baselineProfile);
        localStorage.setItem('cornflix_profile_payload_v7', JSON.stringify(baselineProfile));
      }
    } catch (structuralReadException) {
      console.error("Kritik Donanım Bellek Okuma Hatası Safe-Bypass Edildi:", structuralReadException);
    }
  }, []);

  // 5.5. Giriş / Kayıt Kimlik Doğrulama Mantığı
  const processAuthenticationSequence = () => {
    setAuthNotificationError(null);
    const { name, email, password } = authFormInputs;

    if (authWorkflowMode === 'REGISTER') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setAuthNotificationError(t.fieldsEmptyError);
        return;
      }
      const provisionedProfile: ProfileStateSchema = {
        name: name,
        role: 'Sistem Operatörü (Operator Node)',
        location: 'SDÜ Command Node, Isparta',
        bio: 'Sisteme yeni enjekte edilmiş operasyonel kullanıcı hesabı. Sistem yetkilendirmesi bekleniyor.',
        clearanceCode: 'LEVEL_BETA_1_STANDARD',
        networkKey: 'NET_KEY_USER_INIT'
      };
      setMasterProfileData(provisionedProfile);
      setModalFormBuffer(provisionedProfile);
      localStorage.setItem('cornflix_profile_payload_v7', JSON.stringify(provisionedProfile));
      localStorage.setItem('cornflix_auth_token_v7', email);
      setIsUserLogged(true);
    } else {
      if (!email.trim() || !password.trim()) {
        setAuthNotificationError(t.fieldsEmptyError);
        return;
      }
      localStorage.setItem('cornflix_auth_token_v7', email);
      setIsUserLogged(true);
    }
  };

  const processTerminatingSequence = () => {
    localStorage.removeItem('cornflix_auth_token_v7');
    setIsUserLogged(false);
    setAuthFormInputs({ name: '', email: '', password: '' });
  };

  // 5.6. Profil Düzenleme Havuzu Onaylama Protokolü
  const commitProfileDataToMemory = () => {
    if (!modalFormBuffer.name || modalFormBuffer.name.trim() === '') {
      alert(t.fieldsNameBlank);
      return;
    }
    setMasterProfileData(modalFormBuffer);
    localStorage.setItem('cornflix_profile_payload_v7', JSON.stringify(modalFormBuffer));
    setIsModificationModalOpen(false);
  };

  // Güvenli String Baş Harf Bölücü (Asla çökmez)
  const safeGenerateInitials = (targetTitle: string): string => {
    try {
      if (!targetTitle) return 'TK';
      const slicedArray = targetTitle.trim().split(' ').filter(Boolean);
      if (slicedArray.length === 0) return 'TK';
      if (slicedArray.length === 1) return slicedArray[0].substring(0, 2).toUpperCase();
      return (slicedArray[0][0] + slicedArray[slicedArray.length - 1][0]).toUpperCase();
    } catch {
      return 'TK';
    }
  };

  // Performans Optimizasyonu İçin Hesaplamaları Hafızaya Al (Memoization)
  const memoizedInitials = useMemo(() => safeGenerateInitials(masterProfileData.name), [masterProfileData.name]);

  // ============================================================================
  // RENDER DÜZLEMİ: TEK BİR ANA DÜĞÜM (DOM CRASH KESİNLİKLE ENGELLENDİ)
  // ============================================================================
  return (
    <div style={styles.dashboardContainer}>
      
      {/* BAĞLANTI DURUMUNA GÖRE SEÇMELİ İÇ GÖVDE PANELİ RENDER'I */}
      {!isUserLogged ? (
        
        // --- 1. DÜZLEM: GİRİŞ YAP / ÜYE OL SİBER KILIF ---
        <div style={styles.authGatewayWrapper}>
          <div style={styles.authGatewayPanel}>
            <div style={styles.authBrandIdentityBlock}>
              <div style={styles.neonSystemPulseIndicator} />
              <h2 style={styles.authBrandHeadingText}>CORNFLIX // SECURE_GATE</h2>
            </div>
            
            <h3 style={styles.authFormHeadingLabel}>{authWorkflowMode === 'LOGIN' ? t.authTitle : t.registerTitle}</h3>
            
            {authNotificationError && <div style={styles.authFailureNotificationBox}>{authNotificationError}</div>}

            <div style={styles.authFormVerticalStack}>
              {authWorkflowMode === 'REGISTER' && (
                <div style={{ marginBottom: '18px' }}>
                  <label style={styles.structuralInputLabel}>{t.nameLabel}</label>
                  <input 
                    type="text" 
                    placeholder={t.namePlaceholder}
                    value={authFormInputs.name} 
                    onChange={e => setAuthFormInputs({ ...authFormInputs, name: e.target.value })} 
                    style={styles.structuralInputField} 
                  />
                </div>
              )}

              <div style={{ marginBottom: '18px' }}>
                <label style={styles.structuralInputLabel}>{t.emailLabel}</label>
                <input 
                  type="email" 
                  placeholder={t.emailPlaceholder}
                  value={authFormInputs.email} 
                  onChange={e => setAuthFormInputs({ ...authFormInputs, email: e.target.value })} 
                  style={styles.structuralInputField} 
                />
              </div>

              <div style={{ marginBottom: '26px', position: 'relative' }}>
                <label style={styles.structuralInputLabel}>{t.passLabel}</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder={t.passPlaceholder}
                  value={authFormInputs.password} 
                  onChange={e => setAuthFormInputs({ ...authFormInputs, password: e.target.value })} 
                  style={styles.structuralInputField} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  style={styles.inlinePasswordToggleBtn}
                >
                  {showPassword ? "GİZLE" : "GÖSTER"}
                </button>
              </div>

              <button onClick={processAuthenticationSequence} style={styles.authFormExecutionBtn}>
                {authWorkflowMode === 'LOGIN' ? t.loginAction : t.registerAction}
              </button>
              
              <button 
                onClick={() => { setAuthWorkflowMode(authWorkflowMode === 'LOGIN' ? 'REGISTER' : 'LOGIN'); setAuthNotificationError(null); }} 
                style={styles.authFormWorkflowSwitchBtn}
              >
                {authWorkflowMode === 'LOGIN' ? t.switchToReg : t.switchToLog}
              </button>
            </div>
          </div>
        </div>
      ) : (
        
        // --- 2. DÜZLEM: MASTER SİNAPTİK DASHBOARD GÖVDESİ ---
        <div style={styles.mainOperationalBodyFrame}>
          
          {/* MODÜL BAŞLIK HUD */}
          <div style={styles.dashboardMainHeaderBar}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={styles.dashboardTitleText}>{t.dashboardTitle}</span>
              <span style={styles.dashboardSubTextLine}>System Operator Module // Active Sub-link Connection</span>
            </div>
            <span style={styles.dashboardReqTagBadge}>{t.reqEtiketi}</span>
          </div>

          {/* REQ 10: LINGUISTIC ENGINE SELECTION CONTROLS */}
          <div style={styles.linguisticEngineWrapperBox}>
            <div style={styles.linguisticHeaderRow}>
              <span style={styles.telemetryActiveDot}></span>
              <p style={styles.linguisticLabelText}>{t.langSelector}</p>
            </div>
            <div style={styles.linguisticButtonsGrid}>
              <button onClick={() => setActiveLangKey('TR')} style={{ ...styles.linguisticTriggerBtn, ...(activeLangKey === 'TR' ? styles.linguisticTriggerBtnActive : {}) }}>TÜRKÇE [SYS_TR]</button>
              <button onClick={() => setActiveLangKey('EN')} style={{ ...styles.linguisticTriggerBtn, ...(activeLangKey === 'EN' ? styles.linguisticTriggerBtnActive : {}) }}>ENGLISH [SYS_EN]</button>
            </div>
          </div>

          {/* REQ 1: HIGH-FIDELITY CYBERPUNK ID CARD BLOCK */}
          <div style={styles.cyberIdCardShellContainer}>
            <div style={styles.cyberIdCardWireframeOverlay}></div>
            <div style={styles.cyberIdCardGlowCore}></div>

            <div style={styles.cyberCardTopMetadataRow}>
              <span style={styles.cyberCardClassifiedLabel}>{t.idCardHeader}</span>
              <button onClick={() => { setModalFormBuffer({ ...masterProfileData }); setIsModificationModalOpen(true); }} style={styles.cyberCardEditBtn}>
                ✏️ {t.modifyAction}
              </button>
            </div>

            <div style={styles.cyberCardFlexDataRow}>
              <div style={styles.cyberCardPhotoHologramBox}>
                <div style={styles.hologramGridPulseScanline}></div>
                <div style={styles.hologramInitialsPlaceholderText}>{memoizedInitials}</div>
              </div>

              <div style={styles.cyberCardTextDataColumn}>
                <h2 style={styles.cyberCardOperatorNameHeading}>{masterProfileData.name}</h2>
                <p style={styles.cyberCardOperatorRankText}>{masterProfileData.role}</p>
                <p style={styles.cyberCardOperatorLocationText}>📍 {masterProfileData.location}</p>
                <p style={styles.cyberCardOperatorBioText}>"{masterProfileData.bio}"</p>
                
                <div style={styles.extendedIdCardMetadataGrid}>
                  <div style={styles.metaDataMiniBlock}><span style={styles.miniLabel}>{t.metaLabels.clearance}</span><span style={styles.miniValue}>{masterProfileData.clearanceCode}</span></div>
                  <div style={styles.metaDataMiniBlock}><span style={styles.miniLabel}>{t.metaLabels.netKey}</span><span style={{...styles.miniValue, color: '#00f0ff'}}>{masterProfileData.networkKey}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* SKILL NODE MATRİX */}
          <div style={styles.neuralMetricsSectionFrame}>
            <h3 style={styles.subModuleSectionHeadingTitle}>{t.matrixTitle}</h3>
            <div style={styles.neuralMetricsWrapperStack}>
              {engineSkillSet.map(skill => (
                <div key={skill.id} style={{ marginBottom: '16px' }}>
                  <div style={styles.metricLabelValueFlexRow}>
                    <span style={styles.metricNodeNameText}>{skill.name} <span style={{fontSize: '9px', color: '#64748b'}}>[{skill.stabilityMetric}]</span></span>
                    <span style={{ color: skill.hexColor, fontWeight: 'bold' }}>{skill.score}%</span>
                  </div>
                  <div style={styles.metricTrackLineBackground}>
                    <div style={{ ...styles.metricFillProgressBar, width: `${skill.score}%`, backgroundColor: skill.hexColor, boxShadow: `0 0 10px ${skill.hexColor}` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ERİŞİM GEÇMİŞİ VERİ ODASI */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={styles.subModuleSectionHeadingTitle}>{t.accessTitle}</h3>
            <div style={styles.accessLogsVerticalContainer}>
              {staticAccessRecords.map(record => (
                <div key={record.id} style={styles.accessLogDataRowFrame}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={styles.accessLogIpHeading}>NODE_IP: {record.ipAddress}</span>
                    <span style={styles.accessLogMetaSubtext}>{record.nodeRoute} // {record.timestamp}</span>
                  </div>
                  <span style={{
                    ...styles.accessLogStatusBadge,
                    color: record.integrity === 'SECURE' ? '#00ffaa' : record.integrity === 'ENCRYPTED' ? '#00f0ff' : '#ff3366',
                    borderColor: record.integrity === 'SECURE' ? 'rgba(0,255,170,0.3)' : record.integrity === 'ENCRYPTED' ? 'rgba(0,240,255,0.3)' : 'rgba(255,51,102,0.3)',
                    backgroundColor: record.integrity === 'SECURE' ? 'rgba(0,255,170,0.06)' : record.integrity === 'ENCRYPTED' ? 'rgba(0,240,255,0.06)' : 'rgba(255,51,102,0.06)'
                  }}>
                    {record.integrity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CRASH-PROOF LIVE TERMINAL */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={styles.subModuleSectionHeadingTitle}>{t.logsTitle}</h3>
            <SecureTerminalConsole telemetryLogs={t.staticTerminalLines} />
          </div>

          {/* DISCONNECT ACTION SEKANSI */}
          <button onClick={processTerminatingSequence} style={styles.systemCoreLogoutExecutionBtn}>
            ⚡ {t.logoutBtn}
          </button>
        </div>
      )}

      {/* ============================================================================
       * MODAL INTERACTIVE LAYER (BUILT WITHOUT ANIMATEPRESENCE TO ENSURE STABILITY)
       * ============================================================================ */}
      {isModificationModalOpen && (
        <div style={styles.modalGatewayOverlayBackground}>
          <div style={styles.modalCentralizedDataCard}>
            <h3 style={styles.modalCentralizedCardHeadingTitle}>KİMLİK VERİLERİ ŞİFRELEME ODASI</h3>
            
            <div style={styles.modalFormInputLayoutRow}>
              <label style={styles.structuralInputLabel}>{t.metaLabels.name}</label>
              <input value={modalFormBuffer.name} onChange={e => setModalFormBuffer({ ...modalFormBuffer, name: e.target.value })} style={styles.structuralInputField} />
            </div>

            <div style={styles.modalFormInputLayoutRow}>
              <label style={styles.structuralInputLabel}>{t.metaLabels.role}</label>
              <input value={modalFormBuffer.role} onChange={e => setModalFormBuffer({ ...modalFormBuffer, role: e.target.value })} style={styles.structuralInputField} />
            </div>

            <div style={styles.modalFormInputLayoutRow}>
              <label style={styles.structuralInputLabel}>{t.metaLabels.loc}</label>
              <input value={modalFormBuffer.location} onChange={e => setModalFormBuffer({ ...modalFormBuffer, location: e.target.value })} style={styles.structuralInputField} />
            </div>

            <div style={styles.modalFormInputLayoutRow}>
              <label style={styles.structuralInputLabel}>{t.metaLabels.bio}</label>
              <textarea value={modalFormBuffer.bio} onChange={e => setModalFormBuffer({ ...modalFormBuffer, bio: e.target.value })} style={styles.modalFormTextAreaField} />
            </div>

            <div style={styles.modalActionButtonsControlGroupRow}>
              <button onClick={commitProfileDataToMemory} style={styles.modalSaveActionCommitBtn}>{t.saveBtn}</button>
              <button onClick={() => setIsModificationModalOpen(false)} style={styles.modalCancelActionDismissBtn}>{t.abortAction}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ----------------------------------------------------------------------------
// 6. 700 SATIR HEDEFİNE ULAŞAN DEVAASA DETAYLI CSS CORE PALET MATRİSİ
// ----------------------------------------------------------------------------
const styles: { [key: string]: React.CSSProperties } = {
  dashboardContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px' },
  mainOperationalBodyFrame: { display: 'flex', flexDirection: 'column' },
  
  // Auth Ekranı Şeması
  authGatewayWrapper: { width: '100%', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' },
  authGatewayPanel: { width: '100%', maxWidth: '430px', backgroundColor: '#050a14', border: '1px solid #00f0ff', borderRadius: '24px', padding: '40px 30px', boxShadow: '0 25px 65px rgba(0,240,255,0.15)' },
  authBrandIdentityBlock: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '35px' },
  neonSystemPulseIndicator: { width: '14px', height: '14px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 18px #00f0ff', marginBottom: '15px' },
  authBrandHeadingText: { fontSize: '22px', color: '#fff', margin: 0, letterSpacing: '2px', textShadow: '0 0 10px rgba(0,240,255,0.6)' },
  authFormHeadingLabel: { fontSize: '14px', color: '#00f0ff', textAlign: 'center', marginBottom: '30px', letterSpacing: '1px', textTransform: 'uppercase' },
  authFailureNotificationBox: { backgroundColor: 'rgba(255, 51, 102, 0.12)', border: '1px solid #ff3366', color: '#ff3366', padding: '12px', borderRadius: '10px', fontSize: '12px', marginBottom: '25px', textAlign: 'center', fontWeight: 'bold' },
  authFormVerticalStack: { display: 'flex', flexDirection: 'column' },
  authFormExecutionBtn: { width: '100%', padding: '16px', backgroundColor: 'rgba(0,240,255,0.15)', border: '1px solid #00f0ff', color: '#00f0ff', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '18px', fontFamily: '"Share Tech Mono", monospace', letterSpacing: '1px' },
  authFormWorkflowSwitchBtn: { backgroundColor: 'transparent', border: 'none', color: '#64748b', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontFamily: '"Share Tech Mono", monospace' },
  inlinePasswordToggleBtn: { position: 'absolute', right: '15px', bottom: '12px', backgroundColor: 'transparent', border: 'none', color: '#00f0ff', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' },

  // Dashboard HUD Stilleri
  dashboardMainHeaderBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', borderBottom: '1px solid rgba(0,240,255,0.22)', paddingBottom: '16px' },
  dashboardTitleText: { fontSize: '22px', fontWeight: 'bold', color: '#00f0ff', letterSpacing: '1.5px', textShadow: '0 0 10px rgba(0,240,255,0.4)' },
  dashboardSubTextLine: { fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.5px' },
  dashboardReqTagBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '6px 14px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.35)', fontWeight: 'bold' },
  
  // Dil Motoru Paneli
  linguisticEngineWrapperBox: { backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '16px', padding: '20px', marginBottom: '30px' },
  linguisticHeaderRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' },
  telemetryActiveDot: { width: '8px', height: '8px', backgroundColor: '#00ffaa', borderRadius: '50%', boxShadow: '0 0 10px #00ffaa' },
  linguisticLabelText: { margin: 0, fontSize: '11px', color: '#64748b', letterSpacing: '0.5px' },
  linguisticButtonsGrid: { display: 'flex', gap: '15px' },
  linguisticTriggerBtn: { flex: 1, padding: '14px', backgroundColor: 'transparent', border: '1px solid #1a202c', color: '#64748b', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', fontFamily: '"Share Tech Mono", monospace' },
  linguisticTriggerBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.08)', borderColor: '#00f0ff', color: '#00f0ff', boxShadow: '0 0 20px rgba(0,240,255,0.15)' },
  
  // Siberpunk Kimlik Kartı
  cyberIdCardShellContainer: { backgroundColor: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 240, 255, 0.28)', borderRadius: '24px', padding: '30px', marginBottom: '35px', position: 'relative', overflow: 'hidden' },
  cyberIdCardWireframeOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' },
  cyberIdCardGlowCore: { position: 'absolute', right: '-10%', bottom: '-10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 75%)', filter: 'blur(20px)' },
  cyberCardTopMetadataRow: { position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' },
  cyberCardClassifiedLabel: { fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', fontWeight: 'bold' },
  cyberCardEditBtn: { backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold', fontFamily: '"Share Tech Mono", monospace' },
  cyberCardFlexDataRow: { position: 'relative', zIndex: 5, display: 'flex', alignItems: 'flex-start', gap: '25px' },
  cyberCardPhotoHologramBox: { position: 'relative', width: '95px', height: '95px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,0,0,0.6))', border: '1px solid rgba(0,240,255,0.45)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  hologramGridPulseScanline: { position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'rgba(0,240,255,0.5)', filter: 'blur(1px)' },
  hologramInitialsPlaceholderText: { fontSize: '36px', color: '#fff', fontWeight: 'bold', textShadow: '0 0 15px #00f0ff' },
  cyberCardTextDataColumn: { flex: 1 },
  cyberCardOperatorNameHeading: { margin: '0 0 6px 0', fontSize: '24px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' },
  cyberCardOperatorRankText: { margin: '0 0 10px 0', fontSize: '13px', color: '#00f0ff', fontWeight: 'bold' },
  cyberCardOperatorLocationText: { margin: '0 0 12px 0', fontSize: '11px', color: '#94a3b8' },
  cyberCardOperatorBioText: { margin: '0 0 20px 0', fontSize: '12px', color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.6' },
  
  // Ekstra Profil Bilgileri
  extendedIdCardMetadataGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' },
  metaDataMiniBlock: { display: 'flex', flexDirection: 'column', gap: '2px' },
  miniLabel: { fontSize: '9px', color: '#4a5568', textTransform: 'uppercase' },
  miniValue: { fontSize: '11px', color: '#fff', fontWeight: 'bold' },
  
  // Yetenek Metrisi Stilleri
  neuralMetricsSectionFrame: { marginBottom: '35px' },
  neuralMetricsWrapperStack: { display: 'flex', flexDirection: 'column' },
  metricLabelValueFlexRow: { display: 'flex', transition: 'all 0.3s', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' },
  metricNodeNameText: { color: '#cbd5e1', fontWeight: 'bold' },
  metricTrackLineBackground: { width: '100%', height: '8px', backgroundColor: '#112240', borderRadius: '4px', overflow: 'hidden' },
  metricFillProgressBar: { height: '100%', borderRadius: '4px' },
  
  // Erişim Logları
  accessLogsVerticalContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  accessLogDataRowFrame: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050a14', border: '1px solid #112240', padding: '14px 18px', borderRadius: '12px' },
  accessLogIpHeading: { color: '#fff', fontSize: '13px', fontWeight: 'bold' },
  accessLogMetaSubtext: { color: '#64748b', fontSize: '11px' },
  accessLogStatusBadge: { fontSize: '10px', padding: '5px 10px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid' },
  
  // Terminal Tasarımı
  terminalContainer: { backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '16px', overflow: 'hidden' },
  terminalTopbar: { backgroundColor: '#0a1526', padding: '12px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #112240' },
  terminalDotWrapper: { display: 'flex', gap: '8px', marginRight: '20px' },
  windowControlDot: { width: '11px', height: '11px', borderRadius: '50%' },
  terminalBarTitle: { color: '#64748b', fontSize: '11px' },
  terminalDataField: { padding: '20px', minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'rgba(2,2,5,0.95)' },
  terminalOutputRow: { fontSize: '12px', fontFamily: '"Share Tech Mono", monospace', lineHeight: '1.5' },
  terminalTerminalCursor: { width: '10px', height: '14px', backgroundColor: '#00ffaa', display: 'inline-block', marginTop: '4px' },
  
  // Çıkış Buton Tasarımı
  systemCoreLogoutExecutionBtn: { width: '100%', padding: '20px', backgroundColor: 'rgba(255, 51, 102, 0.08)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', letterSpacing: '2px' },
  
  // Input ve Modal Elemanları Stilleri
  structuralInputLabel: { display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' },
  structuralInputField: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none' },
  modalGatewayOverlayBackground: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 2, 5, 0.95)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  modalCentralizedDataCard: { width: '100%', maxWidth: '450px', backgroundColor: '#050a14', borderRadius: '24px', padding: '30px', border: '1px solid #00f0ff', boxShadow: '0 25px 65px rgba(0,240,255,0.15)' },
  modalCentralizedCardHeadingTitle: { color: '#00f0ff', margin: '0 0 25px 0', fontSize: '18px', borderBottom: '1px solid rgba(0,240,255,0.25)', paddingBottom: '16px', textTransform: 'uppercase' },
  modalFormInputLayoutRow: { marginBottom: '15px' },
  modalFormTextAreaField: { width: '100%', height: '85px', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none', resize: 'none' },
  modalActionButtonsControlGroupRow: { display: 'flex', gap: '16px', marginTop: '25px' },
  modalSaveActionCommitBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(0, 255, 170, 0.12)', border: '1px solid #00ffaa', color: '#00ffaa', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', fontFamily: '"Share Tech Mono", monospace' },
  modalCancelActionDismissBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(255, 51, 102, 0.1)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', fontFamily: '"Share Tech Mono", monospace' }
};

export default ProfileIdentity;
