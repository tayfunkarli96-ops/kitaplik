import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. TİPLER VE BAŞLANGIÇ VERİLERİ (MOCK DB)
// ==========================================
interface UserSignal { id: number; user: string; ip: string; text: string; status: 'PENDING' | 'APPROVED' | 'REDACTED'; timestamp: string; }
interface MovieRecord { id: number; title: string; director: string; year: string; category: string; }
interface NewsRecord { id: number; text: string; priority: 'NORMAL' | 'CRITICAL'; timestamp: string; }

const initialSignals: UserSignal[] = [
  { id: 1, user: 'Alpha_Net', ip: '192.168.1.44', text: 'Film kalitesi mükemmel, sistem çok hızlı tepki veriyor.', status: 'PENDING', timestamp: '21:34:12' },
  { id: 2, user: 'Sektor_9', ip: '10.0.0.105', text: 'SPOILER: Filmin 40. dakikasında aslında her şey rüyaymış!', status: 'PENDING', timestamp: '21:36:45' },
  { id: 3, user: 'Ghost_Protocol', ip: '172.16.254.1', text: 'Kuantum şifreleme katmanı aşırı stabil çalışıyor.', status: 'PENDING', timestamp: '21:39:01' },
];

const initialMovies: MovieRecord[] = [
  { id: 101, title: 'Interstellar', director: 'Christopher Nolan', year: '2014', category: 'Sci-Fi' },
  { id: 102, title: 'Inception', director: 'Christopher Nolan', year: '2010', category: 'Sci-Fi' },
  { id: 103, title: 'Dune: Part Two', director: 'Denis Villeneuve', year: '2024', category: 'Action' }
];

const initialNews: NewsRecord[] = [
  { id: 201, text: '🔴 CANLI SİNYAL: Yeni uzay belgeselleri sisteme eklendi.', priority: 'NORMAL', timestamp: '08:00 AM' },
  { id: 202, text: '⚡ KRİTİK GÜNCELLEME: Cornflix Core OS v2.0 devreye alındı.', priority: 'CRITICAL', timestamp: '10:30 AM' }
];

// ==========================================
// 2. ANA BİLEŞEN: OVERSEER DASHBOARD
// ==========================================
const OverseerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MODERATION' | 'MOVIES' | 'NEWS'>('MODERATION');
  
  // State'ler
  const [signals, setSignals] = useState<UserSignal[]>(initialSignals);
  const [movies, setMovies] = useState<MovieRecord[]>(initialMovies);
  const [newsList, setNewsList] = useState<NewsRecord[]>(initialNews);
  
  // Modal ve Form State'leri
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  // Film Formu
  const [movieForm, setMovieForm] = useState({ title: '', director: '', year: '', category: 'Sci-Fi' });
  // Haber Formu
  const [newsForm, setNewsForm] = useState({ text: '', priority: 'NORMAL' as 'NORMAL' | 'CRITICAL' });

  // Dinamik Sunucu Telemetrisi
  const [serverMetrics, setServerMetrics] = useState({ cpu: 24, ram: 4.2, activeUsers: 1042 });

  useEffect(() => {
    const statTimer = setInterval(() => {
      setServerMetrics({
        cpu: Math.floor(Math.random() * 20) + 15,
        ram: Number((Math.random() * 2 + 3).toFixed(1)),
        activeUsers: serverMetrics.activeUsers + (Math.floor(Math.random() * 5) - 2)
      });
    }, 3000);
    return () => clearInterval(statTimer);
  }, [serverMetrics.activeUsers]);

  // Yardımcı Toast Fonksiyonu
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // --- CRUD İŞLEMLERİ: SİNYALLER ---
  const handleApprove = (id: number) => {
    setSignals(prev => prev.map(s => s.id === id ? { ...s, status: 'APPROVED' } : s));
    showToast("✅ Sinyal onaylandı ve ağa eklendi.");
  };
  const handleRedact = (id: number) => {
    setSignals(prev => prev.map(s => s.id === id ? { ...s, status: 'REDACTED', text: '⚠️ [SİSTEM PROTOKOLÜ: İÇERİK BAŞ MİMAR TARAFINDAN SANSÜRLENDİ]' } : s));
    showToast("🚫 Sinyal sansürlendi.");
  };

  // --- CRUD İŞLEMLERİ: FİLMLER ---
  const handleAddMovie = () => {
    if(!movieForm.title || !movieForm.director || !movieForm.year) return alert("Eksik veri girişi!");
    const newMovie: MovieRecord = { id: Date.now(), ...movieForm };
    setMovies([newMovie, ...movies]);
    setIsMovieModalOpen(false);
    setMovieForm({ title: '', director: '', year: '', category: 'Sci-Fi' });
    showToast("🎬 Yeni film veritabanına eklendi.");
  };
  const handleDeleteMovie = (id: number) => {
    setMovies(movies.filter(m => m.id !== id));
    showToast("🗑️ Film veritabanından silindi.");
  };

  // --- CRUD İŞLEMLERİ: HABERLER ---
  const handleAddNews = () => {
    if(!newsForm.text) return alert("Haber metni boş olamaz!");
    const newNews: NewsRecord = { 
      id: Date.now(), 
      text: newsForm.text, 
      priority: newsForm.priority, 
      timestamp: new Date().toLocaleTimeString() 
    };
    setNewsList([newNews, ...newsList]);
    setIsNewsModalOpen(false);
    setNewsForm({ text: '', priority: 'NORMAL' });
    showToast("📡 Küresel yayın frekansa gönderildi.");
  };
  const handleDeleteNews = (id: number) => {
    setNewsList(newsList.filter(n => n.id !== id));
    showToast("🔇 Yayın frekansı kesildi.");
  };

  // Animasyon Varyantları
  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <div style={styles.viewContainer}>
      
      {/* SİSTEM BİLDİRİMİ (TOAST) */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -50, x: '-50%' }} style={styles.toastNotification}>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BAŞLIK */}
      <div style={styles.metaHeader}>
        <div style={styles.headerTitleGroup}>
          <span style={styles.sectionTitle}>OVERSEER COMMAND</span>
          <span style={styles.sectionSubtitle}>Veritabanı, Moderasyon ve İletişim Merkezi</span>
        </div>
        <span style={styles.reqBadge}>REQ 5, 7, 9 // ADMIN</span>
      </div>

      {/* CANLI SUNUCU İSTATİSTİKLERİ */}
      <div style={styles.serverHud}>
        <div style={styles.hudItem}>
          <span style={styles.hudLabel}>CPU YÜKÜ</span>
          <span style={styles.hudValue}>{serverMetrics.cpu}%</span>
          <div style={styles.hudBarBg}><div style={{...styles.hudBarFill, width: `${serverMetrics.cpu}%`, backgroundColor: serverMetrics.cpu > 30 ? '#f59e0b' : '#00ffaa'}}></div></div>
        </div>
        <div style={styles.hudDivider}></div>
        <div style={styles.hudItem}>
          <span style={styles.hudLabel}>RAM KULLANIMI</span>
          <span style={{...styles.hudValue, color: '#00f0ff'}}>{serverMetrics.ram} GB</span>
          <div style={styles.hudBarBg}><div style={{...styles.hudBarFill, width: `${(serverMetrics.ram / 8) * 100}%`, backgroundColor: '#00f0ff'}}></div></div>
        </div>
        <div style={styles.hudDivider}></div>
        <div style={styles.hudItem}>
          <span style={styles.hudLabel}>AĞ BAĞLANTISI</span>
          <span style={{...styles.hudValue, color: '#ff3366'}}>{serverMetrics.activeUsers}</span>
          <span style={styles.hudSubtext}>Aktif Düğüm (Node)</span>
        </div>
      </div>

      {/* SEKME NAVİGASYONU */}
      <div style={styles.tabBar}>
        <button onClick={() => setActiveTab('MODERATION')} style={{...styles.tabBtn, ...(activeTab === 'MODERATION' ? styles.activeTabBtn : {})}}>🛡️ MODERASYON</button>
        <button onClick={() => setActiveTab('MOVIES')} style={{...styles.tabBtn, ...(activeTab === 'MOVIES' ? styles.activeTabBtn : {})}}>🎬 VERİTABANI</button>
        <button onClick={() => setActiveTab('NEWS')} style={{...styles.tabBtn, ...(activeTab === 'NEWS' ? styles.activeTabBtn : {})}}>📡 HABER AĞI</button>
      </div>

      {/* DİNAMİK İÇERİK ALANI */}
      <div style={styles.contentArea}>
        <AnimatePresence mode="wait">
          
          {/* ========================================= */}
          {/* SEKME 1: YORUM MODERASYONU (REQ 5, 7) */}
          {/* ========================================= */}
          {activeTab === 'MODERATION' && (
            <motion.div key="mod" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
              <div style={styles.actionHeader}>
                <h3 style={styles.panelTitle}>Sinyal Filtreleme İstasyonu</h3>
                <span style={styles.recordCount}>{signals.filter(s => s.status === 'PENDING').length} Bekleyen</span>
              </div>
              <div style={styles.listStack}>
                <AnimatePresence>
                  {signals.map(signal => (
                    <motion.div key={signal.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      style={{...styles.commentCard, borderColor: signal.status === 'APPROVED' ? 'rgba(0,255,170,0.5)' : signal.status === 'REDACTED' ? 'rgba(255,51,102,0.5)' : '#1e293b', backgroundColor: signal.status === 'PENDING' ? 'rgba(5, 10, 20, 0.8)' : 'rgba(2, 2, 5, 0.6)'}}
                    >
                      <div style={styles.commentHeader}>
                        <div style={styles.commentUserGroup}>
                          <span style={styles.commentUser}>@{signal.user}</span>
                          <span style={styles.commentIp}>IP: {signal.ip}</span>
                        </div>
                        <span style={styles.commentTime}>{signal.timestamp}</span>
                      </div>
                      <p style={{...styles.commentText, color: signal.status === 'REDACTED' ? '#ff3366' : '#cbd5e1', fontStyle: signal.status === 'REDACTED' ? 'italic' : 'normal'}}>{signal.text}</p>
                      
                      {signal.status === 'PENDING' ? (
                        <div style={styles.btnGroup}>
                          <button onClick={() => handleApprove(signal.id)} style={styles.approveBtn}>✅ ONAYLA</button>
                          <button onClick={() => handleRedact(signal.id)} style={styles.redactBtn}>🚫 SANSÜRLE</button>
                        </div>
                      ) : (
                        <div style={styles.statusBadgeResult}>Durum: <span style={{ color: signal.status === 'APPROVED' ? '#00ffaa' : '#ff3366' }}>{signal.status}</span></div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* SEKME 2: FİLM VERİTABANI (CRUD) */}
          {/* ========================================= */}
          {activeTab === 'MOVIES' && (
            <motion.div key="movies" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
              <div style={styles.actionHeader}>
                <h3 style={styles.panelTitle}>Film Kataloğu (Core_DB)</h3>
                <button onClick={() => setIsMovieModalOpen(true)} style={styles.primaryAddBtn}>+ YENİ FİLM EKLE</button>
              </div>
              <div style={styles.listStack}>
                <AnimatePresence>
                  {movies.map(movie => (
                    <motion.div key={movie.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={styles.dataCard}>
                      <div style={styles.dataCardContent}>
                        <div style={{ flex: 1 }}>
                          <h4 style={styles.dataTitle}>{movie.title}</h4>
                          <div style={styles.dataMetaRow}>
                            <span style={styles.dataMetaItem}>🎬 {movie.director}</span>
                            <span style={styles.dataMetaItem}>📅 {movie.year}</span>
                            <span style={styles.dataCategoryBadge}>{movie.category}</span>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteMovie(movie.id)} style={styles.deleteIconBtn}>SİL</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* SEKME 3: HABER VE YAYIN AĞI (REQ 9) */}
          {/* ========================================= */}
          {activeTab === 'NEWS' && (
            <motion.div key="news" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
              <div style={styles.actionHeader}>
                <h3 style={styles.panelTitle}>Küresel Yayın Frekansları</h3>
                <button onClick={() => setIsNewsModalOpen(true)} style={styles.primaryAddBtn}>📡 YENİ YAYIN BAŞLAT</button>
              </div>
              <div style={styles.listStack}>
                <AnimatePresence>
                  {newsList.map(news => (
                    <motion.div key={news.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{...styles.dataCard, borderLeft: `4px solid ${news.priority === 'CRITICAL' ? '#ff3366' : '#00f0ff'}`}}>
                      <div style={styles.dataCardContent}>
                        <div style={{ flex: 1, paddingRight: '15px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 'bold', color: news.priority === 'CRITICAL' ? '#ff3366' : '#00f0ff', backgroundColor: news.priority === 'CRITICAL' ? 'rgba(255,51,102,0.1)' : 'rgba(0,240,255,0.1)', padding: '3px 6px', borderRadius: '4px' }}>
                              {news.priority}
                            </span>
                            <span style={{ fontSize: '10px', color: '#64748b' }}>{news.timestamp}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '13px', color: '#fff', lineHeight: '1.5' }}>{news.text}</p>
                        </div>
                        <button onClick={() => handleDeleteNews(news.id)} style={styles.deleteIconBtn}>KES</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================= */}
      {/* MODALLAR (KAYIT EKLEME EKRANLARI) */}
      {/* ========================================= */}
      <AnimatePresence>
        {isMovieModalOpen && (
          <div style={styles.overlay}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={styles.modalContent}>
              <h3 style={styles.modalTitle}>YENİ FİLM VERİSİ GİRİŞİ</h3>
              <div style={styles.inputGroup}><label style={styles.inputLabel}>Film Adı</label><input value={movieForm.title} onChange={e => setMovieForm({...movieForm, title: e.target.value})} style={styles.inputField} /></div>
              <div style={styles.inputGroup}><label style={styles.inputLabel}>Yönetmen</label><input value={movieForm.director} onChange={e => setMovieForm({...movieForm, director: e.target.value})} style={styles.inputField} /></div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{...styles.inputGroup, flex: 1}}><label style={styles.inputLabel}>Çıkış Yılı</label><input type="number" value={movieForm.year} onChange={e => setMovieForm({...movieForm, year: e.target.value})} style={styles.inputField} /></div>
                <div style={{...styles.inputGroup, flex: 1}}><label style={styles.inputLabel}>Kategori</label><select value={movieForm.category} onChange={e => setMovieForm({...movieForm, category: e.target.value})} style={styles.selectField}><option value="Sci-Fi">Sci-Fi</option><option value="Action">Action</option><option value="Drama">Drama</option></select></div>
              </div>
              <div style={styles.modalActionGroup}>
                <button onClick={handleAddMovie} style={styles.saveBtn}>VERİTABANINA YAZ</button>
                <button onClick={() => setIsMovieModalOpen(false)} style={styles.cancelBtn}>İPTAL ET</button>
              </div>
            </motion.div>
          </div>
        )}

        {isNewsModalOpen && (
          <div style={styles.overlay}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={styles.modalContent}>
              <h3 style={styles.modalTitle}>KÜRESEL YAYIN FREKANSI OLUŞTUR</h3>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Yayın Önceliği</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setNewsForm({...newsForm, priority: 'NORMAL'})} style={{...styles.priorityBtn, ...(newsForm.priority === 'NORMAL' ? styles.priorityNormalActive : {})}}>STANDART BİLGİ</button>
                  <button onClick={() => setNewsForm({...newsForm, priority: 'CRITICAL'})} style={{...styles.priorityBtn, ...(newsForm.priority === 'CRITICAL' ? styles.priorityCriticalActive : {})}}>KRİTİK UYARI</button>
                </div>
              </div>
              <div style={styles.inputGroup}><label style={styles.inputLabel}>Yayınlanacak Mesaj İçeriği</label><textarea value={newsForm.text} onChange={e => setNewsForm({...newsForm, text: e.target.value})} style={styles.textArea} /></div>
              <div style={styles.modalActionGroup}>
                <button onClick={handleAddNews} style={styles.saveBtn}>SİNYALİ AĞA GÖNDER</button>
                <button onClick={() => setIsNewsModalOpen(false)} style={styles.cancelBtn}>İPTAL ET</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 3. ULTRA PREMIUM CSS MİMARİSİ
// ==========================================
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '130px', overflowX: 'hidden' },
  
  toastNotification: { position: 'fixed', top: '40px', left: '50%', backgroundColor: '#00f0ff', color: '#000', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '12px', zIndex: 9999, boxShadow: '0 10px 30px rgba(0,240,255,0.4)' },
  
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px', borderBottom: '1px solid rgba(0,240,255,0.15)', paddingBottom: '15px' },
  headerTitleGroup: { display: 'flex', flexDirection: 'column' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff', textShadow: '0 0 10px rgba(0,240,255,0.4)', margin: '0 0 5px 0' },
  sectionSubtitle: { fontSize: '11px', color: '#64748b', letterSpacing: '1px' },
  reqBadge: { fontSize: '10px', color: '#00f0ff', padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.4)', backgroundColor: 'rgba(0,240,255,0.1)', fontWeight: 'bold' },
  
  serverHud: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(5, 10, 20, 0.8)', border: '1px solid #112240', borderRadius: '16px', padding: '18px', marginBottom: '30px', boxShadow: 'inset 0 0 25px rgba(0,0,0,0.6)' },
  hudItem: { display: 'flex', flexDirection: 'column', flex: 1, padding: '0 12px' },
  hudLabel: { fontSize: '10px', color: '#64748b', marginBottom: '5px', letterSpacing: '1px' },
  hudValue: { fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' },
  hudSubtext: { fontSize: '9px', color: '#4a5568' },
  hudDivider: { width: '1px', height: '45px', backgroundColor: '#1e293b' },
  hudBarBg: { width: '100%', height: '5px', backgroundColor: '#0f172a', borderRadius: '3px', overflow: 'hidden', marginTop: '6px' },
  hudBarFill: { height: '100%', transition: 'width 0.5s ease-in-out' },

  tabBar: { display: 'flex', backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '14px', padding: '8px', marginBottom: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.4)' },
  tabBtn: { flex: 1, padding: '15px 5px', backgroundColor: 'transparent', border: 'none', color: '#4a5568', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.3s', fontFamily: '"Share Tech Mono", monospace' },
  activeTabBtn: { backgroundColor: 'rgba(0, 240, 255, 0.08)', color: '#00f0ff', border: '1px solid rgba(0,240,255,0.2)', boxShadow: '0 0 15px rgba(0,240,255,0.1)' },
  
  contentArea: { minHeight: '400px' },
  actionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  panelTitle: { fontSize: '16px', color: '#fff', margin: 0, letterSpacing: '1px' },
  recordCount: { fontSize: '11px', color: '#00f0ff', backgroundColor: 'rgba(0,240,255,0.1)', padding: '4px 10px', borderRadius: '10px' },
  primaryAddBtn: { backgroundColor: 'rgba(0,240,255,0.15)', border: '1px solid #00f0ff', color: '#00f0ff', padding: '8px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: '0.3s', boxShadow: '0 0 15px rgba(0,240,255,0.2)' },
  
  listStack: { display: 'flex', flexDirection: 'column', gap: '15px' },
  
  // Sinyal Moderasyon Kartları
  commentCard: { borderRadius: '16px', padding: '20px', transition: 'all 0.3s ease', borderWidth: '1px', borderStyle: 'solid', boxShadow: '0 10px 25px rgba(0,0,0,0.4)' },
  commentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' },
  commentUserGroup: { display: 'flex', flexDirection: 'column' },
  commentUser: { color: '#00f0ff', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.5px' },
  commentIp: { color: '#4a5568', fontSize: '10px', marginTop: '3px', fontFamily: 'monospace' },
  commentTime: { color: '#64748b', fontSize: '11px' },
  commentText: { fontSize: '14px', margin: '0 0 20px 0', lineHeight: '1.6', letterSpacing: '0.3px' },
  btnGroup: { display: 'flex', gap: '12px' },
  approveBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(0,255,170,0.08)', border: '1px solid rgba(0,255,170,0.4)', color: '#00ffaa', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: '0.2s', boxShadow: '0 0 15px rgba(0,255,170,0.1)' },
  redactBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(255,51,102,0.08)', border: '1px solid rgba(255,51,102,0.4)', color: '#ff3366', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: '0.2s', boxShadow: '0 0 15px rgba(255,51,102,0.1)' },
  statusBadgeResult: { fontSize: '11px', color: '#64748b', textAlign: 'right', fontWeight: 'bold', padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '8px' },
  
  // Data Kartları (Film & Haber)
  dataCard: { backgroundColor: 'rgba(5, 10, 20, 0.8)', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' },
  dataCardContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  dataTitle: { fontSize: '16px', color: '#fff', margin: '0 0 8px 0', fontWeight: 'bold' },
  dataMetaRow: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  dataMetaItem: { fontSize: '11px', color: '#94a3b8' },
  dataCategoryBadge: { fontSize: '9px', backgroundColor: 'rgba(0,240,255,0.1)', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0,240,255,0.2)' },
  deleteIconBtn: { padding: '10px 15px', backgroundColor: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.3)', color: '#ff3366', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
  
  // Modal Stilleri
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 2, 5, 0.95)', backdropFilter: 'blur(15px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  modalContent: { width: '100%', maxWidth: '450px', backgroundColor: '#050a14', borderRadius: '24px', padding: '30px', border: '1px solid #00f0ff', boxShadow: '0 25px 60px rgba(0,240,255,0.15)' },
  modalTitle: { color: '#00f0ff', margin: '0 0 25px 0', fontSize: '16px', borderBottom: '1px solid rgba(0,240,255,0.2)', paddingBottom: '15px', letterSpacing: '1px' },
  inputGroup: { marginBottom: '18px' },
  inputLabel: { display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' },
  inputField: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none' },
  selectField: { width: '100%', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none' },
  textArea: { width: '100%', height: '100px', padding: '14px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', fontFamily: '"Share Tech Mono", monospace', outline: 'none', resize: 'none' },
  
  priorityBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid #112240', borderRadius: '10px', color: '#64748b', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace' },
  priorityNormalActive: { backgroundColor: 'rgba(0, 240, 255, 0.1)', borderColor: '#00f0ff', color: '#00f0ff' },
  priorityCriticalActive: { backgroundColor: 'rgba(255, 51, 102, 0.1)', borderColor: '#ff3366', color: '#ff3366', boxShadow: '0 0 15px rgba(255,51,102,0.2)' },
  
  modalActionGroup: { display: 'flex', gap: '15px', marginTop: '30px' },
  saveBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(0,255,170,0.1)', border: '1px solid #00ffaa', color: '#00ffaa', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', fontFamily: '"Share Tech Mono", monospace' },
  cancelBtn: { flex: 1, padding: '16px', backgroundColor: 'rgba(255,51,102,0.1)', border: '1px solid #ff3366', color: '#ff3366', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', fontFamily: '"Share Tech Mono", monospace' }
};

export default OverseerDashboard;
