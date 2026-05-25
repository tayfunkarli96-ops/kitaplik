
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. TİPLER VE NÖRAL VERİTABANI
// ==========================================
interface UserSignal {
  id: number;
  user: string;
  ip: string;
  text: string;
  status: 'PENDING' | 'APPROVED' | 'REDACTED';
  timestamp: string;
}

interface BroadcastLog {
  id: number;
  message: string;
  priority: 'NORMAL' | 'CRITICAL';
  time: string;
}

const initialSignals: UserSignal[] = [
  { id: 1, user: 'Alpha_Net', ip: '192.168.1.44', text: 'Film kalitesi mükemmel, sistem çok hızlı tepki veriyor.', status: 'PENDING', timestamp: '21:34:12' },
  { id: 2, user: 'Sektor_9', ip: '10.0.0.105', text: 'SPOILER: Filmin 40. dakikasında aslında her şey rüyaymış!', status: 'PENDING', timestamp: '21:36:45' },
  { id: 3, user: 'Ghost_Protocol', ip: 'Unknown_Relay', text: 'Kuantum şifreleme katmanı aşırı stabil. Tayfun Karlı iyi iş çıkarmış.', status: 'PENDING', timestamp: '21:39:01' },
];

// ==========================================
// 2. ANA BİLEŞEN: OVERSEER COMMAND
// ==========================================
const OverseerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MODERATION' | 'BROADCAST'>('MODERATION');
  const [signals, setSignals] = useState<UserSignal[]>(initialSignals);
  
  // Küresel Yayın State'leri
  const [broadcastText, setBroadcastText] = useState('');
  const [priority, setPriority] = useState<'NORMAL' | 'CRITICAL'>('NORMAL');
  const [broadcastHistory, setBroadcastHistory] = useState<BroadcastLog[]>([]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Sunucu İstatistik Simülasyonu
  const [serverLoad, setServerLoad] = useState(24);
  const [activeConnections, setActiveConnections] = useState(1042);

  useEffect(() => {
    const statTimer = setInterval(() => {
      setServerLoad(Math.floor(Math.random() * 20) + 15);
      setActiveConnections(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(statTimer);
  }, []);

  // REQ 7: Sinyali Ağda Onaylama
  const handleApprove = (id: number) => {
    setSignals(prev => prev.map(s => s.id === id ? { ...s, status: 'APPROVED' } : s));
  };

  // REQ 5: Sinyali Sansürleme / Yeniden Yazma
  const handleRedact = (id: number) => {
    setSignals(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'REDACTED', text: '⚠️ [SİSTEM PROTOKOLÜ: İÇERİK BAŞ MİMAR TARAFINDAN SANSÜRLENDİ]' } : s
    ));
  };

  // REQ 9: Küresel Haber Yayını (Push Notification)
  const transmitBroadcast = () => {
    if (broadcastText.trim().length < 5) return;
    
    setIsTransmitting(true);
    setTimeout(() => {
      const newLog: BroadcastLog = {
        id: Date.now(),
        message: broadcastText,
        priority: priority,
        time: new Date().toLocaleTimeString()
      };
      setBroadcastHistory(prev => [newLog, ...prev]);
      setBroadcastText('');
      setIsTransmitting(false);
      alert(`📡 UYDU İLETİMİ BAŞARILI: Ağdaki tüm istemcilere push bildirimi gönderildi.`);
    }, 1500); // 1.5 saniyelik sahte iletim süresi
  };

  return (
    <div style={styles.viewContainer}>
      
      {/* BAŞLIK VE GEREKSİNİM ETİKETLERİ */}
      <div style={styles.metaHeader}>
        <div style={styles.headerTitleGroup}>
          <span style={styles.sectionTitle}>OVERSEER COMMAND</span>
          <span style={styles.sectionSubtitle}>Sistem Yönetimi ve Güvenlik Merkezi</span>
        </div>
        <span style={styles.reqBadge}>REQ 5, 7, 9</span>
      </div>

      {/* CANLI SUNUCU İSTATİSTİKLERİ (HUD) */}
      <div style={styles.serverHud}>
        <div style={styles.hudItem}>
          <span style={styles.hudLabel}>SUNUCU YÜKÜ</span>
          <span style={styles.hudValue}>{serverLoad}%</span>
          <div style={styles.hudBarBg}><div style={{...styles.hudBarFill, width: `${serverLoad}%`, backgroundColor: serverLoad > 30 ? '#f59e0b' : '#00ffaa'}}></div></div>
        </div>
        <div style={styles.hudDivider}></div>
        <div style={styles.hudItem}>
          <span style={styles.hudLabel}>AKTİF BAĞLANTILAR</span>
          <span style={{...styles.hudValue, color: '#00f0ff'}}>{activeConnections}</span>
          <span style={styles.hudSubtext}>Şifrelenmiş Uç Noktalar</span>
        </div>
        <div style={styles.hudDivider}></div>
        <div style={styles.hudItem}>
          <span style={styles.hudLabel}>GÜVENLİK PROTOKOLÜ</span>
          <span style={{...styles.hudValue, color: '#ff3366'}}>DEFCON 4</span>
          <span style={styles.hudSubtext}>Operatör Yetkisi Aktif</span>
        </div>
      </div>

      {/* MODÜLER SEKME NAVİGASYONU */}
      <div style={styles.tabBar}>
        <button 
          onClick={() => setActiveTab('MODERATION')}
          style={{...styles.tabBtn, ...(activeTab === 'MODERATION' ? styles.activeTabBtn : {})}}
        >
          <span style={{marginRight: '8px'}}>🛡️</span> SİNYAL MODERASYONU (REQ 5, 7)
        </button>
        <button 
          onClick={() => setActiveTab('BROADCAST')}
          style={{...styles.tabBtn, ...(activeTab === 'BROADCAST' ? styles.activeTabBtn : {})}}
        >
          <span style={{marginRight: '8px'}}>📡</span> KÜRESEL YAYIN (REQ 9)
        </button>
      </div>

      {/* ========================================= */}
      {/* SEKME 1: KÜRESEL HABER VE YAYIN MERKEZİ */}
      {/* ========================================= */}
      <AnimatePresence mode="wait">
        {activeTab === 'BROADCAST' && (
          <motion.div key="broadcast" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={styles.glassPanel}>
            <h3 style={styles.panelTitle}>Haber Frekansı Düzenleyici</h3>
            <p style={styles.panelSubtitle}>Ağdaki tüm terminallere (Mobil & Web) anlık push mesajı gönderin.</p>
            
            <div style={styles.prioritySelector}>
              <button 
                onClick={() => setPriority('NORMAL')} 
                style={{...styles.priorityBtn, ...(priority === 'NORMAL' ? styles.priorityNormalActive : {})}}
              >STANDART BİLGİ</button>
              <button 
                onClick={() => setPriority('CRITICAL')} 
                style={{...styles.priorityBtn, ...(priority === 'CRITICAL' ? styles.priorityCriticalActive : {})}}
              >KRİTİK UYARI</button>
            </div>

            <textarea
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              placeholder="Yayınlanacak küresel mesajı girin (Min 5 karakter)..."
              style={styles.textArea}
              maxLength={200}
            />
            <div style={styles.charCount}>{broadcastText.length} / 200 Bayt</div>
            
            <button 
              onClick={transmitBroadcast} 
              disabled={isTransmitting || broadcastText.length < 5}
              style={{...styles.broadcastBtn, opacity: (isTransmitting || broadcastText.length < 5) ? 0.5 : 1}}
            >
              {isTransmitting ? 'UYDUYA BAĞLANILIYOR...' : 'SİNYALİ AĞA GÖNDER'}
            </button>

            {/* YAYIN GEÇMİŞİ (AUDIT LOG) */}
            <div style={styles.historyContainer}>
              <h4 style={styles.historyTitle}>YAYIN GEÇMİŞİ (AUDIT LOG)</h4>
              {broadcastHistory.length === 0 ? (
                <p style={styles.emptyHistoryText}>Sistemde kayıtlı aktif yayın bulunmamaktadır.</p>
              ) : (
                broadcastHistory.map(log => (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} key={log.id} style={styles.historyCard}>
                    <div style={styles.historyMeta}>
                      <span style={{ color: log.priority === 'CRITICAL' ? '#ff3366' : '#00f0ff', fontWeight: 'bold' }}>[{log.priority}]</span>
                      <span style={{ color: '#64748b' }}>{log.time}</span>
                    </div>
                    <p style={styles.historyMessage}>{log.message}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================= */}
        {/* SEKME 2: YORUM ONAY VE SANSÜR AKIŞI */}
        {/* ========================================= */}
        {activeTab === 'MODERATION' && (
          <motion.div key="moderation" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div style={styles.commentStack}>
              <AnimatePresence mode="popLayout">
                {signals.map(signal => (
                  <motion.div 
                    key={signal.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      ...styles.commentCard, 
                      ...(signal.status === 'APPROVED' ? styles.cardApproved : {}),
                      ...(signal.status === 'REDACTED' ? styles.cardRedacted : {})
                    }}
                  >
                    <div style={styles.commentHeader}>
                      <div style={styles.commentUserGroup}>
                        <span style={styles.commentUser}>@{signal.user}</span>
                        <span style={styles.commentIp}>IP: {signal.ip}</span>
                      </div>
                      <span style={styles.commentTime}>{signal.timestamp}</span>
                    </div>
                    
                    <p style={{...styles.commentText, color: signal.status === 'REDACTED' ? '#ff3366' : '#cbd5e1', fontStyle: signal.status === 'REDACTED' ? 'italic' : 'normal'}}>
                      {signal.text}
                    </p>
                    
                    {/* Sadece PENDING olanlarda aksiyon butonları çıkar */}
                    {signal.status === 'PENDING' ? (
                      <div style={styles.btnGroup}>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleApprove(signal.id)} style={styles.approveBtn}>
                          ✅ ONAYLA (REQ 7)
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleRedact(signal.id)} style={styles.redactBtn}>
                          🚫 SANSÜRLE (REQ 5)
                        </motion.button>
                      </div>
                    ) : (
                      <div style={styles.statusBadgeResult}>
                        Durum: <span style={{ color: signal.status === 'APPROVED' ? '#00ffaa' : '#ff3366' }}>{signal.status}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 3. ULTRA PREMIUM SİBERPUNK CSS MİMARİSİ
// ==========================================
const styles: { [key: string]: React.CSSProperties } = {
  viewContainer: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace', paddingBottom: '120px', overflowX: 'hidden' },
  
  // Üst Başlık
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(0,240,255,0.15)', paddingBottom: '15px' },
  headerTitleGroup: { display: 'flex', flexDirection: 'column' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff', textShadow: '0 0 10px rgba(0,240,255,0.4)', margin: '0 0 5px 0' },
  sectionSubtitle: { fontSize: '11px', color: '#64748b', letterSpacing: '1px' },
  reqBadge: { fontSize: '10px', color: '#00f0ff', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.4)', backgroundColor: 'rgba(0,240,255,0.1)', fontWeight: 'bold' },
  
  // Sunucu İstatistikleri HUD
  serverHud: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(5, 10, 20, 0.8)', border: '1px solid #112240', borderRadius: '14px', padding: '15px', marginBottom: '25px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' },
  hudItem: { display: 'flex', flexDirection: 'column', flex: 1, padding: '0 10px' },
  hudLabel: { fontSize: '9px', color: '#64748b', marginBottom: '4px', letterSpacing: '1px' },
  hudValue: { fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' },
  hudSubtext: { fontSize: '9px', color: '#4a5568' },
  hudDivider: { width: '1px', height: '40px', backgroundColor: '#112240' },
  hudBarBg: { width: '100%', height: '4px', backgroundColor: '#0f172a', borderRadius: '2px', overflow: 'hidden', marginTop: '5px' },
  hudBarFill: { height: '100%', transition: 'width 0.5s ease-in-out' },

  // Sekme Barı
  tabBar: { display: 'flex', backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '12px', padding: '6px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' },
  tabBtn: { flex: 1, padding: '14px', backgroundColor: 'transparent', border: 'none', color: '#4a5568', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.3s', fontFamily: '"Share Tech Mono", monospace' },
  activeTabBtn: { backgroundColor: 'rgba(0, 240, 255, 0.08)', color: '#00f0ff', boxShadow: '0 0 15px rgba(0,240,255,0.15)', border: '1px solid rgba(0,240,255,0.2)' },
  
  // Ortak Panel ve Yayın Ekranı
  glassPanel: { backgroundColor: 'rgba(9, 13, 22, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '20px', padding: '25px', boxShadow: '0 15px 40px rgba(0,0,0,0.6)' },
  panelTitle: { fontSize: '16px', margin: '0 0 5px 0', color: '#fff', letterSpacing: '1px' },
  panelSubtitle: { fontSize: '11px', color: '#64748b', margin: '0 0 20px 0' },
  
  prioritySelector: { display: 'flex', gap: '10px', marginBottom: '15px' },
  priorityBtn: { flex: 1, padding: '10px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid #112240', borderRadius: '8px', color: '#64748b', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace' },
  priorityNormalActive: { backgroundColor: 'rgba(0, 240, 255, 0.1)', borderColor: '#00f0ff', color: '#00f0ff' },
  priorityCriticalActive: { backgroundColor: 'rgba(255, 51, 102, 0.1)', borderColor: '#ff3366', color: '#ff3366', boxShadow: '0 0 15px rgba(255,51,102,0.2)' },
  
  textArea: { width: '100%', height: '100px', backgroundColor: 'rgba(2, 2, 5, 0.8)', border: '1px solid #1e293b', borderRadius: '12px', color: '#f8fafc', padding: '15px', fontSize: '13px', fontFamily: '"Share Tech Mono", monospace', resize: 'none', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.3s', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.5)' },
  charCount: { textAlign: 'right', fontSize: '10px', color: '#4a5568', marginTop: '5px', marginBottom: '15px' },
  broadcastBtn: { width: '100%', padding: '16px', backgroundColor: 'rgba(0,240,255,0.1)', border: '1px solid #00f0ff', color: '#00f0ff', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', fontSize: '13px', letterSpacing: '1.5px', fontFamily: '"Share Tech Mono", monospace', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(0,240,255,0.1)' },
  
  // Yayın Geçmişi Logları
  historyContainer: { marginTop: '30px', borderTop: '1px dashed #1e293b', paddingTop: '20px' },
  historyTitle: { fontSize: '11px', color: '#64748b', marginBottom: '15px', letterSpacing: '1px' },
  emptyHistoryText: { fontSize: '11px', color: '#4a5568', fontStyle: 'italic' },
  historyCard: { backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '8px', padding: '12px', marginBottom: '10px' },
  historyMeta: { display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '6px' },
  historyMessage: { fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: '1.4' },
  
  // Moderasyon Yorum Kartları
  commentStack: { display: 'flex', flexDirection: 'column', gap: '18px' },
  commentCard: { backgroundColor: 'rgba(5, 10, 20, 0.8)', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', transition: 'all 0.3s ease', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' },
  cardApproved: { borderColor: 'rgba(0,255,170,0.4)', backgroundColor: 'rgba(0,255,170,0.03)' },
  cardRedacted: { borderColor: 'rgba(255,51,102,0.4)', backgroundColor: 'rgba(255,51,102,0.03)' },
  
  commentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' },
  commentUserGroup: { display: 'flex', flexDirection: 'column' },
  commentUser: { color: '#00f0ff', fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.5px' },
  commentIp: { color: '#4a5568', fontSize: '9px', marginTop: '2px', fontFamily: 'monospace' },
  commentTime: { color: '#64748b', fontSize: '10px' },
  commentText: { fontSize: '14px', margin: '0 0 20px 0', lineHeight: '1.6', letterSpacing: '0.3px' },
  
  btnGroup: { display: 'flex', gap: '12px' },
  approveBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(0,255,170,0.05)', border: '1px solid rgba(0,255,170,0.4)', color: '#00ffaa', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: '0.2s', boxShadow: '0 0 15px rgba(0,255,170,0.1)' },
  redactBtn: { flex: 1, padding: '12px', backgroundColor: 'rgba(255,51,102,0.05)', border: '1px solid rgba(255,51,102,0.4)', color: '#ff3366', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: '0.2s', boxShadow: '0 0 15px rgba(255,51,102,0.1)' },
  
  statusBadgeResult: { fontSize: '10px', color: '#64748b', textAlign: 'right', fontWeight: 'bold', padding: '8px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '6px' }
};

export default OverseerDashboard;
