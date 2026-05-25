/**
 * ============================================================================
 * CORNFLIX CORE OPERATING SYSTEM // OVERSEER EXECUTIVE CONTROL COMMAND
 * ============================================================================
 * LEAD ARCHITECT: Tayfun Karlı
 * UNIVERSITY: Süleyman Demirel Üniversitesi (SDÜ) - Bilgisayar Mühendisliği
 * * RESOLVED SYSTEM REQUIREMENTS:
 * - REQ 5: Content Redaction Protocol (Cyberpunk System Obfuscation / Censorship)
 * - REQ 7: Content Approval Pipeline (Live Authorization Network)
 * - REQ 9: Broadcast Frequency Controller (Real-Time News CMS Deployment)
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ----------------------------------------------------------------------------
// 1. TİP MİMARİLERİ VE DATA YAPILARI (DATA SCHEMAS)
// ----------------------------------------------------------------------------
interface UserSignalComment {
  id: number;
  user: string;
  ip: string;
  text: string;
  status: 'PENDING' | 'APPROVED' | 'REDACTED';
  timestamp: string;
}

interface MovieDatabaseRecord {
  id: number;
  title: string;
  director: string;
  year: string;
  category: string;
}

interface NewsBroadcastNode {
  id: number;
  text: string;
  priority: 'NORMAL' | 'CRITICAL';
  timestamp: string;
}

// ----------------------------------------------------------------------------
// 2. KÖK BAŞLANGIÇ VERİLERİ (FALLBACK DATA STRAIN)
// ----------------------------------------------------------------------------
const defaultCommentsStrain: UserSignalComment[] = [
  { id: 401, user: 'Alpha_Net', ip: '192.168.1.44', text: 'Film akışı ve ses kodek senkronizasyonu harika çalışıyor.', status: 'PENDING', timestamp: '21:34:12' },
  { id: 402, user: 'Sektor_9', ip: '10.0.8.112', text: 'SPOILER DETECTED: Ana karakter filmin sonunda aslında paralel evrene geçiyor!', status: 'PENDING', timestamp: '21:36:45' },
  { id: 403, user: 'Ghost_Vector', ip: 'Hidden_Gateway', text: 'Kuantum katmanı şifrelemesi aşırı stabil. Tayfun mimarisi farkı.', status: 'PENDING', timestamp: '21:39:01' }
];

const defaultMoviesStrain: MovieDatabaseRecord[] = [
  { id: 701, title: 'Interstellar', director: 'Christopher Nolan', year: '2014', category: 'Sci-Fi' },
  { id: 702, title: 'Inception', director: 'Christopher Nolan', year: '2010', category: 'Sci-Fi' },
  { id: 703, title: 'Dune: Part Two', director: 'Denis Villeneuve', year: '2024', category: 'Action' }
];

// ============================================================================
// 3. SUB-COMPONENT: REAL-TIME HUD TELEMETRY BAR
// ============================================================================
const RealTimeHudTelemetry: React.FC = () => {
  const [cpuLoad, setCpuLoad] = useState<number>(21);
  const [ramUsage, setRamUsage] = useState<number>(4.1);
  const [activeNodes, setActiveNodes] = useState<number>(1044);

  useEffect(() => {
    const liveMetricsPulse = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 18) + 14); // %14-%32
      setRamUsage(Number((Math.random() * 1.5 + 3.8).toFixed(1))); // 3.8GB - 5.3GB
      setActiveNodes(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 2500);

    return () => clearInterval(liveMetricsPulse);
  }, []);

  return (
    <div style={styles.serverHudContainer}>
      <div style={styles.hudTelemetryItem}>
        <span style={styles.hudMetricLabel}>İŞLEMCİ YÜKÜ (CPU)</span>
        <span style={styles.hudMetricValue}>{cpuLoad}%</span>
        <div style={styles.hudTrackLine}><div style={{ ...styles.hudFillLine, width: `${cpuLoad}%`, backgroundColor: cpuLoad > 28 ? '#f59e0b' : '#00ffaa' }} /></div>
      </div>
      <div style={styles.hudVerticalDivider}></div>
      <div style={styles.hudTelemetryItem}>
        <span style={styles.hudMetricLabel}>AĞ BELLEĞİ (RAM)</span>
        <span style={{ ...styles.hudMetricValue, color: '#00f0ff' }}>{ramUsage} GB</span>
        <div style={styles.hudTrackLine}><div style={{ ...styles.hudFillLine, width: `${(ramUsage / 8) * 100}%`, backgroundColor: '#00f0ff' }} /></div>
      </div>
      <div style={styles.hudVerticalDivider}></div>
      <div style={styles.hudTelemetryItem}>
        <span style={styles.hudMetricLabel}>BAĞLI TERMİNAL (NODES)</span>
        <span style={{ ...styles.hudMetricValue, color: '#ff3366' }}>{activeNodes}</span>
        <span style={styles.hudSubtextLabel}>DEFCON 4 SECURE</span>
      </div>
    </div>
  );
};

// ============================================================================
// 4. MAIN CENTRAL ARCHITECTURE COMPONENT: OVERSEER DASHBOARD
// ============================================================================
const OverseerDashboard: React.FC = () => {
  const [activeDashboardTab, setActiveDashboardTab] = useState<'MODERATION' | 'MOVIES' | 'NEWS'>('NEWS');
  
  // Ana Operasyonel Veri Havuzları
  const [signalsArray, setSignalsArray] = useState<UserSignalComment[]>(defaultCommentsStrain);
  const [moviesArray, setMoviesArray] = useState<MovieDatabaseRecord[]>(defaultMoviesStrain);
  const [newsFeedArray, setNewsFeedArray] = useState<NewsBroadcastNode[]>([]);
  
  // Form Giriş ve Görünürlük Denetimleri
  const [isNewsModalVisible, setIsNewsModalVisible] = useState<boolean>(false);
  const [isMovieModalVisible, setIsMovieModalVisible] = useState<boolean>(false);
  const [systemToastMessage, setSystemToastMessage] = useState<string | null>(null);
  
  // Input Model State Mekanizmaları
  const [newsFormState, setNewsFormState] = useState({ text: '', priority: 'NORMAL' as 'NORMAL' | 'CRITICAL' });
  const [movieFormState, setMovieFormState] = useState({ title: '', director: '', year: '', category: 'Sci-Fi' });

  // Sistem Bildirim (Toast) Tetikleyicisi
  const executeSystemToast = (toastMessageStr: string) => {
    setSystemToastMessage(toastMessageStr);
    setTimeout(() => setSystemToastMessage(null), 3000);
  };

  // REQ 9: Haber CMS Altyapısı LocalStorage Senkronizasyon Döngüsü
  useEffect(() => {
    try {
      const activeNewsSignal = localStorage.getItem('cornflix_news');
      if (activeNewsSignal) {
        setNewsFeedArray(JSON.parse(activeNewsSignal));
      } else {
        const structuralDefaultNews: NewsBroadcastNode[] = [
          { id: 301, text: '🔴 CANLI SİNYAL: Yeni uzay ve siberpunk içerikleri veritabanına entegre edildi.', priority: 'NORMAL', timestamp: '08:00 AM' },
          { id: 302, text: '⚡ KRİTİK SEKANSLAR: Baş Mimar Tayfun Karlı, Core OS v2.0 stabilizasyon paketini yayınladı.', priority: 'CRITICAL', timestamp: '10:30 AM' }
        ];
        setNewsFeedArray(structuralDefaultNews);
        localStorage.setItem('cornflix_news', JSON.stringify(structuralDefaultNews));
      }
    } catch (newsStrainException) {
      console.error("Haber CMS LocalStorage Veri Okuma Hatası:", newsStrainException);
    }
  }, []);

  // --- REQ 7: KULLANICI YORUM SİNYALİ ONAYLAMA FONKSİYONU ---
  const executeCommentApprovalPipeline = (commentId: number) => {
    setSignalsArray(prevStrain => prevStrain.map(signalNode => 
      signalNode.id === commentId ? { ...signalNode, status: 'APPROVED' } : signalNode
    ));
    executeSystemToast("🛡️ [SİNYAL ONAYLANDI]: İlgili veri akışı ağda aktifleştirildi.");
  };

  // --- REQ 5: KULLANICI YORUM SİNYALİ SANSÜRLME PROTOKOLÜ ---
  const executeCommentObfuscationProtocol = (commentId: number) => {
    setSignalsArray(prevStrain => prevStrain.map(signalNode => 
      signalNode.id === commentId ? { 
        ...signalNode, 
        status: 'REDACTED', 
        text: '⚠️ [SİSTEM PROTOKOLÜ: İÇERİK BAŞ MİMAR TARAFINDAN SANSÜRLENMİŞTİR]' 
      } : signalNode
    ));
    executeSystemToast("🚫 [İÇERİK SANSÜRLENDİ]: Kural ihlali yapan veri maskelendi.");
  };

  // --- MOVIE DATABASE CRUD OPERASYONLARI ---
  const commitNewMovieToCatalog = () => {
    if (!movieFormState.title || !movieFormState.director || !movieFormState.year) {
      alert("HATA: Lütfen tüm film alanlarını doldurun!");
      return;
    }
    const newlyCreatedMovie: MovieDatabaseRecord = {
      id: Date.now(),
      title: movieFormState.title,
      director: movieFormState.director,
      year: movieFormState.year,
      category: movieFormState.category
    };
    setMoviesArray([newlyCreatedMovie, ...moviesArray]);
    setIsMovieModalVisible(false);
    setMovieFormState({ title: '', director: '', year: '', category: 'Sci-Fi' });
    executeSystemToast("🎬 [KATALOG GÜNCELLENDİ]: Yeni film kaydı veritabanına yazıldı.");
  };

  const removeMovieFromCatalog = (movieId: number) => {
    setMoviesArray(prevMovies => prevMovies.filter(movieNode => movieNode.id !== movieId));
    executeSystemToast("🗑️ [KAYIT SİLİNDİ]: Film veri bloğu katalogdan kaldırıldı.");
  };

  // --- REQ 9: HABER/YAYIN NETWORK CRUD OPERASYONLARI ---
  const commitNewBroadcastNode = () => {
    if (!newsFormState.text || newsFormState.text.trim() === '') {
      alert("HATA: Haber metni boş olamaz!");
      return;
    }
    const newlyCreatedNews: NewsBroadcastNode = {
      id: Date.now(),
      text: newsFormState.text,
      priority: newsFormState.priority,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const combinedNewsArray = [newlyCreatedNews, ...newsFeedArray];
    setNewsFeedArray(combinedNewsArray);
    localStorage.setItem('cornflix_news', JSON.stringify(combinedNewsArray)); // Keşfet ekranı ticker'ı için kayıt
    setIsNewsModalVisible(false);
    setNewsFormState({ text: '', priority: 'NORMAL' });
    executeSystemToast("📡 [KÜRESEL YAYIN]: Haber verisi tüm ağ terminallerine enjekte edildi.");
  };

  const removeBroadcastNode = (newsId: number) => {
    const isolatedNewsArray = newsFeedArray.filter(newsNode => newsNode.id !== newsId);
    setNewsFeedArray(isolatedNewsArray);
    localStorage.setItem('cornflix_news', JSON.stringify(isolatedNewsArray));
    executeSystemToast("🔇 [YAYIN DURDURULDU]: Haber frekans akışı kesildi.");
  };

  // Sekme Geçiş Animasyon Varyasyonları
  const animationSubTabVariants = {
    hidden: { opacity: 0, x: -25, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 140, damping: 18 } },
    exit: { opacity: 0, x: 25, filter: 'blur(4px)', transition: { duration: 0.2 } }
  };

  return (
    <div style={styles.viewContainer}>
      
      {/* SİSTEM TOAST PANELİ */}
      <AnimatePresence>
        {systemToastMessage && (
          <motion.div initial={{ opacity: 0, y: -40, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -40, x: '-50%' }} style={styles.toastPanelNotification}>
            {systemToastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* OPERASYONEL BAŞLIK */}
      <div style={styles.metaHeader}>
        <div style={styles.headerTitleGroup}>
          <span style={styles.sectionTitle}>OVERSEER EXECUTIVE COMMAND</span>
          <span style={styles.sectionSubtitle}>Sistem Master Veritabanı, Moderasyon Kalkanı ve CMS Kontrol Odası</span>
        </div>
        <span style={styles.reqBadge}>REQ 5, 7, 9 // CONTROL</span>
      </div>

      {/* CANLI HUD TELEMETRİ BAĞLANTISI */}
      <RealTimeHudTelemetry />

      {/* SEKME GEÇİŞ BAR KONTROLLERİ */}
      <div style={styles.navigationTabBar}>
        <button onClick={() => setActiveDashboardTab('MODERATION')} style={{ ...styles.dashboardTabBtn, ...(activeDashboardTab === 'MODERATION' ? styles.dashboardTabBtnActive : {}) }}>🛡️ SİNYAL MODERASYONU</button>
        <button onClick={() => setActiveDashboardTab('MOVIES')} style={{ ...styles.dashboardTabBtn, ...(activeDashboardTab === 'MOVIES' ? styles.dashboardTabBtnActive : {}) }}>🎬 FİLM MASTER VERİTABANI</button>
        <button onClick={() => setActiveDashboardTab('NEWS')} style={{ ...styles.dashboardTabBtn, ...(activeDashboardTab === 'NEWS' ? styles.dashboardTabBtnActive : {}) }}>📡 HABER İLETİM AĞI</button>
      </div>

      {/* DİNAMİK SAHNE AKIŞI */}
      <div style={styles.centralStageArea}>
        <AnimatePresence mode="wait">
          
          {/* ============================================================================
           * SEKME 1: REQ 5 & REQ 7 - SİNYAL YORUM MODERASYON AKIŞI
           * ============================================================================ */}
          {activeDashboardTab === 'MODERATION' && (
            <motion.div key="moderation-strain" variants={animationSubTabVariants} initial="hidden" animate="visible" exit="exit">
              <div style={styles.actionSectionHeader}>
                <h3 style={styles.stageTitleHeading}>Gelen Ağ Yorum Verileri</h3>
                <span style={styles.dynamicCounterBadge}>{signalsArray.filter(s => s.status === 'PENDING').length} İnceleme Bekliyor</span>
              </div>
              <div style={styles.dataListVerticalStack}>
                {signalsArray.map(signalNode => (
                  <motion.div key={signalNode.id} layout style={{
                    ...styles.signalCommentCard,
                    borderColor: signalNode.status === 'APPROVED' ? 'rgba(0, 255, 170, 0.45)' : 
                                 signalNode.status === 'REDACTED' ? 'rgba(255, 51, 102, 0.45)' : '#1e293b'
                  }}>
                    <div style={styles.signalCardHeader}>
                      <div>
                        <span style={styles.signalCardUserText}>@{signalNode.user}</span>
                        <span style={styles.signalCardIpText}>NODE_IP: {signalNode.ip}</span>
                      </div>
                      <span style={styles.signalCardTimeText}>[{signalNode.timestamp}]</span>
                    </div>
                    <p style={{
                      ...styles.signalCardBodyText,
                      color: signalNode.status === 'REDACTED' ? '#ff3366' : '#cbd5e1',
                      fontStyle: signalNode.status === 'REDACTED' ? 'italic' : 'normal'
                    }}>{signalNode.text}</p>
                    
                    {signalNode.status === 'PENDING' ? (
                      <div style={styles.actionButtonGroupRow}>
                        <button onClick={() => executeCommentApprovalPipeline(signalNode.id)} style={styles.inlineApproveBtn}>ONAYLA (REQ 7)</button>
                        <button onClick={() => executeCommentObfuscationProtocol(signalNode.id)} style={styles.inlineRedactBtn}>SANSÜRLE (REQ 5)</button>
                      </div>
                    ) : (
                      <div style={styles.auditResultLabel}>Sistem Kararı: <span style={{ color: signalNode.status === 'APPROVED' ? '#00ffaa' : '#ff3366', fontWeight: 'bold' }}>{signalNode.status}</span></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ============================================================================
           * SEKME 2: FİLM MASTER KATALOĞU MANAGEMENT (CRUD)
           * ============================================================================ */}
          {activeDashboardTab === 'MOVIES' && (
            <motion.div key="movies-strain" variants={animationSubTabVariants} initial="hidden" animate="visible" exit="exit">
              <div style={styles.actionSectionHeader}>
                <h3 style={styles.stageTitleHeading}>Film Kataloğu Veri Ağacı (Core_DB)</h3>
                <button onClick={() => setIsMovieModalVisible(true)} style={styles.primaryPanelLaunchBtn}>+ YENİ FİLM BLOĞU EKLE</button>
              </div>
              <div style={styles.dataListVerticalStack}>
                <AnimatePresence>
                  {moviesArray.map(movieNode => (
                    <motion.div key={movieNode.id} layout initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} style={styles.crudMasterDataCard}>
                      <div style={styles.crudCardInternalLayout}>
                        <div style={{ flex: 1 }}>
                          <h4 style={styles.crudCardTitleHeading}>{movieNode.title}</h4>
                          <div style={styles.crudCardMetaRow}>
                            <span style={styles.crudMetaTextItem}>🎬 Reji: {movieNode.director}</span>
                            <span style={styles.crudMetaTextItem}>📅 Vizyon: {movieNode.year}</span>
                            <span style={styles.crudCategoryTagBadge}>{movieNode.category}</span>
                          </div>
                        </div>
                        <button onClick={() => removeMovieFromCatalog(movieNode.id)} style={styles.crudCardDeleteBtn}>KAYDI SİL</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ============================================================================
           * SEKME 3: REQ 9 - HABER FREKANS YAYIN AĞI PROTOKOLÜ (CRUD)
           * ============================================================================ */}
          {activeDashboardTab === 'NEWS' && (
            <motion.div key="news-strain" variants={animationSubTabVariants} initial="hidden" animate="visible" exit="exit">
              <div style={styles.actionSectionHeader}>
                <h3 style={styles.stageTitleHeading}>Küresel Haber Veri Akışları (CMS_Ticker)</h3>
                <button onClick={() => setIsNewsModalVisible(true)} style={styles.primaryPanelLaunchBtn}>📡 YENİ HABER FREKANSI AÇ</button>
              </div>
              <div style={styles.dataListVerticalStack}>
                <AnimatePresence>
                  {newsFeedArray.map(newsNode => (
                    <motion.div key={newsNode.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{
                      ...styles.crudMasterDataCard,
                      borderLeft: `4px solid ${newsNode.priority === 'CRITICAL' ? '#ff3366' : '#00f0ff'}`
                    }}>
                      <div style={styles.crudCardInternalLayout}>
                        <div style={{ flex: 1, paddingRight: '15px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{
                              fontSize: '10px', fontWeight: 'bold', 
                              color: newsNode.priority === 'CRITICAL' ? '#ff3366' : '#00f0ff',
                              backgroundColor: newsNode.priority === 'CRITICAL' ? 'rgba(255,51,102,0.12)' : 'rgba(0,240,255,0.12)',
                              padding: '3px 6px', borderRadius: '4px'
                            }}>
                              {newsNode.priority}
                            </span>
                            <span style={{ fontSize: '10px', color: '#64748b' }}>{newsNode.timestamp}</span>
                          </div>
                          <p style={styles.broadcastMessageParagraph}>{newsNode.text}</p>
                        </div>
                        <button onClick={() => removeBroadcastNode(newsNode.id)} style={styles.crudCardDeleteBtn}>YAYINI KES</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ============================================================================
       * REQ 9: YENİ HABER/YAYIN ENJEKSİYON MODAL VE CMS EDİTÖRÜ
       * ============================================================================ */}
      <AnimatePresence>
        {isNewsModalVisible && (
          <div style={styles.modalBackdropViewport}>
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }} style={styles.modalInternalBox}>
              <h3 style={styles.modalHeadingTitleText}>KÜRESEL FREKANS EDİTÖRÜ</h3>
              
              <div style={styles.modalFieldInputLayout}>
                <label style={styles.modalFieldLabelText}>Yayın Öncelik Derecesi</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setNewsFormState({ ...newsFormState, priority: 'NORMAL' })} style={{ ...styles.modalPrioritySelectorBtn, ...(newsFormState.priority === 'NORMAL' ? styles.priorityNormalStateActive : {}) }}>STANDART BİLGİ</button>
                  <button onClick={() => setNewsFormState({ ...newsFormState, priority: 'CRITICAL' })} style={{ ...styles.modalPrioritySelectorBtn, ...(newsFormState.priority === 'CRITICAL' ? styles.priorityCriticalStateActive : {}) }}>KRİTİK UYARI</button>
                </div>
              </div>

              <div style={styles.modalFieldInputLayout}>
                <label style={styles.modalFieldLabelText}>Yayınlanacak Sinyal/Haber Metni</label>
                <textarea value={newsFormState.text} onChange={e => setNewsFormState({ ...newsFormState, text: e.target.value })} style={styles.modalFieldTextArea} placeholder="Ağda kayacak mesajı yazın..." />
              </div>

              <div style={styles.modalTerminalActionRow}>
                <button onClick={commitNewBroadcastNode} style={styles.modalExecuteConfirmBtn}>SİNYALİ NETWORK'E ENJEKTE ET</button>
                <button onClick={() => setIsNewsModalVisible(false)} style={styles.modalCancelDismissBtn}>KAPAT</button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ============================================================================
         * FİLM VERİTABANI YENİ KAYIT EKLEME MODAL FORMU (CRUD - CREATE VIEW)
         * ============================================================================ */}
        {isMovieModalVisible && (
          <div style={styles.modalBackdropViewport}>
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }} style={styles.modalInternalBox}>
              <h3 style={styles.modalHeadingTitleText}>YENİ FİLM KAYIT PROSEDÜRÜ</h3>
              
              <div style={styles.modalFieldInputLayout}>
                <label style={styles.modalFieldLabelText}>Eser/Film Adı</label>
                <input value={movieFormState.title} onChange={e => setMovieFormState({ ...movieFormState, title: e.target.value })} style={styles.modalFieldInput} />
              </div>

              <div style={styles.modalFieldInputLayout}>
                <label style={styles.modalFieldLabelText}>Yönetmen / Reji</label>
                <input value={movieFormState.director} onChange={e => setMovieFormState({ ...movieFormState, director: e.target.value })} style={styles.modalFieldInput} />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ ...styles.modalFieldInputLayout, flex: 1 }}>
                  <label style={styles.modalFieldLabelText}>Vizyon Yılı</label>
                  <input type="number" value={movieFormState.year} onChange={e => setMovieFormState({ ...movieFormState, year: e.target.value })} style={styles.modalFieldInput} />
                </div>
                <div style={{ ...styles.modalFieldInputLayout, flex: 1 }}>
                  <label style={styles.modalFieldLabelText}>Kategori Sınıfı</label>
                  <select value={movieFormState.category} onChange={e => setMovieFormState({ ...movieFormState, category: e.target.value })} style={styles.modalFieldSelect}>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                  </select>
                </div>
              </div>

              <div style={styles.modalTerminalActionRow}>
                <button onClick={commitNewMovieToCatalog} style={styles.modalExecuteConfirmBtn}>CORE_DB VERİTABANINA YAZ</button>
                <button onClick={() => setIsMovieModalVisible(false)} style={styles.modalCancelDismissBtn}>İPTAL ET</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

// ----------------------------------------------------------------------------
// 5. DEVAASA VE COMPREHENSİVE ADAPTIVE CSS STRATEJİSİ
// ----------------------------------------------------------------------------
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px' },
  toastPanelNotification: { position: 'fixed', top: '40px', left: '50%', backgroundColor: '#00f0ff', color: '#000', padding: '14px 28px', borderRadius: '30px', fontWeight: 'bold', fontSize: '12px', zIndex: 9999, boxShadow: '0 10px 35px rgba(0,240,255,0.45)' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px', borderBottom: '1px solid rgba(0,240,255,0.18)', paddingBottom: '16px' },
  headerTitleGroup: { display: 'flex', flexDirection: 'column' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff', textShadow: '0 0 10px rgba(0,240,255,0.45)', margin: '0 0 5px 0' },
  sectionSubtitle: { fontSize: '11px', color: '#64748b', letterSpacing: '0.5px' },
  reqBadge: { fontSize: '10px', color: '#00f0ff', padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.4)', backgroundColor: 'rgba(0,240,255,0.1)', fontWeight: 'bold' },
  
  // Sunucu HUD Telemetri Alanı
  serverHudContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(5, 10, 20, 0.85)', border: '1px solid #112240', borderRadius: '16px', padding: '20px', marginBottom: '30px', boxShadow: 'inset 0 0 25px rgba(0,0,0,0.65)' },
  hudTelemetryItem: { display: 'flex', flexDirection: 'column', flex: 1, padding: '0 14px' },
  hudMetricLabel: { fontSize: '9px', color: '#64748b', marginBottom: '5px', letterSpacing: '1px' },
  hudMetricValue: { fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' },
  hudSubtextLabel: { fontSize: '9px', color: '#4a5568', letterSpacing: '0.5px' },
  hudVerticalDivider: { width: '1px', height: '45px', backgroundColor: '#1e293b' },
  hudTrackLine: { width: '100%', height: '5px', backgroundColor: '#0f172a', borderRadius: '3px', overflow: 'hidden', marginTop: '6px' },
  hudFillLine: { height: '100%', transition: 'width 0.6s ease-in-out' },

  // Sekme Çubuğu Stilleri
  navigationTabBar: { display: 'flex', backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '14px', padding: '6px', marginBottom: '30px', boxShadow: '0 6px 22px rgba(0,0,0,0.45)' },
  dashboardTabBtn: { flex: 1, padding: '16px 6px', backgroundColor: 'transparent', border: 'none', color: '#4a5568', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.3s ease', fontFamily: '"Share Tech Mono", monospace', letterSpacing: '0.5px' },
  dashboardTabBtnActive: { backgroundColor: 'rgba(0, 240, 255, 0.08)', color: '#00f0ff', border: '1px solid rgba(0,240,255,0.22)', boxShadow: '0 0 15px rgba(0,240,255,0.12)' },
  
  centralStageArea: { minHeight: '420px' },
  actionSectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  stageTitleHeading: { fontSize: '16px', color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' },
  dynamicCounterBadge: { fontSize: '11px', color: '#00f0ff', backgroundColor: 'rgba(0,240,255,0.1)', padding: '4px 12px', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.2)' },
  primaryPanelLaunchBtn: { backgroundColor: 'rgba(0,240,255,0.16)', border: '1px solid #00f0ff', color: '#00f0ff', padding: '10px 18px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.3s ease', boxShadow: '0 0 15px rgba(0,240,255,0.18)' },
  
  dataListVerticalStack: { display: 'flex', flexDirection: 'column', gap: '16px' },
  
  // Moderasyon Kart Mimarisi
  commentCard: { borderRadius: '16px', padding: '20px', border: '1px solid #1e293b', backgroundColor: 'rgba(5, 10, 20, 0.8)', boxShadow: '0 10px 25px rgba(0,0,0,0.4)' },
  signalCommentCard: { borderRadius: '16px', padding: '20px', border: '1px solid #1e293b', transition: 'all 0.3s ease', boxShadow: '0 10px 25px rgba(0,0,0,0.4)' },
  signalCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' },
  commentUserGroup: { display: 'flex', flexDirection: 'column' },
  signalCardUserText: { color: '#00f0ff', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.5px' },
  signalCardIpText: { color: '#4a5568', fontSize: '10px', marginTop: '3px', fontFamily: 'monospace' },
  signalCardTimeText: { color: '#64748b', fontSize: '11px' },
  signalCardBodyText: { fontSize: '14px', margin: '0 0 20px 0', lineHeight: '1.6', letterSpacing: '0.3px' },
  actionButtonGroupRow: { display: 'flex', gap: '14px' },
  inlineApproveBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.45)', color: '#00ffaa', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.2s' },
  inlineRedactBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(255,51,102,0.06)', border: '1px solid rgba(255,51,102,0.45)', color: '#ff3366', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.2s' },
  auditResultLabel: { fontSize: '11px', color: '#64748b', textAlign: 'right', fontWeight: 'bold', padding: '8px 14px', backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: '8px', letterSpacing: '0.5px' },
  
  // Data Kart Mimarisi (CRUD)
  crudMasterDataCard: { backgroundColor: 'rgba(5, 10, 20, 0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '18px', boxShadow: '0 6px 16px rgba(0,0,0,0.35)' },
  crudCardInternalLayout: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  crudCardTitleHeading: { fontSize: '16px', color: '#fff', margin: '0 0 8px 0', fontWeight: 'bold', letterSpacing: '0.5px' },
  crudCardMetaRow: { display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' },
  crudMetaTextItem: { fontSize: '11px', color: '#94a3b8' },
  crudCategoryTagBadge: { fontSize: '9px', backgroundColor: 'rgba(0,240,255,0.1)', color: '#00f0ff', padding: '3px 8px', borderRadius: '5px', border: '1px solid rgba(0,240,255,0.18)' },
  crudCardDeleteBtn: { padding: '10px 16px', backgroundColor: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.32)', color: '#ff3366', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' },
  broadcastMessageParagraph: { margin: 0, fontSize: '13px', color: '#fff', lineHeight: '1.6' },
  
  // Modal Yapıları (CMS / CRUD PANELS)
  modalBackdropViewport: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 2, 5, 0.95)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  modalInternalBox: { width: '100%', maxWidth: '460px', backgroundColor: '#050a14', borderRadius: '24px', padding: '30px', border: '1px solid #00f0ff', boxShadow: '0 25px 65px rgba(0,240,255,0.16)' },
  modalHeadingTitleText: { color: '#00f0ff', margin: '0 0 25px 0', fontSize: '17px', borderBottom: '1px solid rgba(0,240,255,0.25)', paddingBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' },
  modalFieldInputLayout: { marginBottom: '18px', display: 'flex', flexDirection: 'column' },
  modalFieldLabelText: { display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' },
  modalFieldInput: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none' },
  modalFieldSelect: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none' },
  modalFieldTextArea: { width: '100%', height: '100px', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none', resize: 'none' },
  
  modalPrioritySelectorBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid #112240', borderRadius: '10px', color: '#64748b', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.2s ease' },
  priorityNormalStateActive: { backgroundColor: 'rgba(0, 240, 255, 0.1)', borderColor: '#00f0ff', color: '#00f0ff' },
  priorityCriticalStateActive: { backgroundColor: 'rgba(255, 51, 102, 0.1)', borderColor: '#ff3366', color: '#ff3366', boxShadow: '0 0 15px rgba(255,51,102,0.2)' },
  
  modalTerminalActionRow: { display: 'flex', gap: '16px', marginTop: '30px' },
  modalExecuteConfirmBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(0,255,170,0.12)', border: '1px solid #00ffaa', color: '#00ffaa', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', fontFamily: '"Share Tech Mono", monospace' },
  modalCancelDismissBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(255,51,102,0.12)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', fontFamily: '"Share Tech Mono", monospace' }
};

export default OverseerDashboard;
