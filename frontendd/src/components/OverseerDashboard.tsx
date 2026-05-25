import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- VERİ MODELİ VE TIPI ---
interface UserComment {
  id: number;
  user: string;
  text: string;
  status: 'PENDING' | 'APPROVED' | 'REDACTED';
  timestamp: string;
}

const initialComments: UserComment[] = [
  { id: 1, user: 'Alpha_Net', text: 'Interstellar sinyali harikaydı, görüntü kalitesi kusursuz.', status: 'PENDING', timestamp: '21:34:12' },
  { id: 2, user: 'Sektor_9', text: 'SPOILER: Filmin 40. dakikasında aslında her şey rüyaymış!', status: 'PENDING', timestamp: '21:36:45' },
  { id: 3, user: 'Cyber_Ghost', text: 'Kuantum şifreleme katmanı aşırı stabil çalışıyor, elinize sağlık.', status: 'PENDING', timestamp: '21:39:01' },
];

const OverseerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MODERATION' | 'BROADCAST'>('MODERATION');
  const [comments, setComments] = useState<UserComment[]>(initialComments);
  const [newsText, setNewsText] = useState('');
  const [activeBroadcast, setActiveBroadcast] = useState<string | null>(null);

  // REQ 7: Kullanıcı Yorumunu Onaylama Sinyali
  const handleApprove = (id: number) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'APPROVED' } : c));
  };

  // REQ 5: Kullanıcı Yorumunu Sansürleme / Düzenleme Protokolü
  const handleRedact = (id: number) => {
    setComments(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'REDACTED', text: '⚠️ [SİSTEM PROTOKOLÜ: BU İÇERİK BAŞ MİMAR TARAFINDAN SANSÜRLENMİŞTİR]' } : c
    ));
  };

  // REQ 9: Küresel Haber Frekansı Yayını (Push Notification Simülasyonu)
  const handlePublishNews = () => {
    if (!newsText.trim()) return;
    setActiveBroadcast(`KÜRESEL SİNYAL DUYURUSU: ${newsText}`);
    setNewsText('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>OVERSEER COMMAND</span>
        <span style={styles.reqBadge}>REQ 5, 7, 9</span>
      </div>

      {/* MODÜLER SEKME NAVİGASYONU */}
      <div style={styles.tabBar}>
        <button 
          onClick={() => setActiveTab('MODERATION')}
          style={{...styles.tabBtn, ...(activeTab === 'MODERATION' ? styles.activeTabBtn : {})}}
        >
          SİNYAL MODERASYONU (REQ 5, 7)
        </button>
        <button 
          onClick={() => setActiveTab('BROADCAST')}
          style={{...styles.tabBtn, ...(activeTab === 'BROADCAST' ? styles.activeTabBtn : {})}}
        >
          KÜRESEL YAYIN (REQ 9)
        </button>
      </div>

      {/* REQ 9: KÜRESEL HABER VE BİLDİRİM PANELİ */}
      {activeTab === 'BROADCAST' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={styles.glassPanel}>
          <h3 style={styles.panelTitle}>Haber Frekansı Düzenleyici</h3>
          <p style={styles.panelSubtitle}>Ağdaki tüm terminallere anlık push mesajı gönderin.</p>
          
          <textarea
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="Yayınlanacak küresel mesajı girin..."
            style={styles.textArea}
          />
          
          <button onClick={handlePublishNews} style={styles.broadcastBtn}>
            SİNYALİ UYDUYA GÖNDER
          </button>

          <AnimatePresence>
            {activeBroadcast && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                style={styles.liveBroadcastBox}
              >
                <div style={styles.broadcastHeader}>
                  <span>📡 CANLI YAYIN FREKANSI</span>
                  <button onClick={() => setActiveBroadcast(null)} style={styles.clearBroadcast}>KAPAT</button>
                </div>
                <p style={styles.broadcastText}>{activeBroadcast}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* REQ 5 & REQ 7: YORUM ONAY VE SANSÜR AKIŞI */}
      {activeTab === 'MODERATION' && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={styles.glassPanel}>
          <h3 style={styles.panelTitle}>Gelen Veri Sinyalleri</h3>
          <div style={styles.commentStack}>
            <AnimatePresence mode="popLayout">
              {comments.map(comment => (
                <motion.div 
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                  style={{
                    ...styles.commentCard, 
                    ...(comment.status === 'APPROVED' ? styles.cardApproved : {}),
                    ...(comment.status === 'REDACTED' ? styles.cardRedacted : {})
                  }}
                >
                  <div style={styles.commentMeta}>
                    <span style={styles.commentUser}>@{comment.user}</span>
                    <span style={styles.commentTime}>[{comment.timestamp}]</span>
                  </div>
                  <p style={styles.commentText}>{comment.text}</p>
                  
                  {comment.status === 'PENDING' && (
                    <div style={styles.btnGroup}>
                      <button onClick={() => handleApprove(comment.id)} style={styles.approveBtn}>
                        ONAYLA (REQ 7)
                      </button>
                      <button onClick={() => handleRedact(comment.id)} style={styles.redactBtn}>
                        SANSÜRLE (REQ 5)
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// --- GLASSMORPHISM VE SİBERPUNK CSS PALETİ ---
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '20px', color: '#fff', fontFamily: '"Share Tech Mono", monospace' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff' },
  reqBadge: { fontSize: '10px', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #00f0ff', backgroundColor: 'rgba(0,240,255,0.1)' },
  
  tabBar: { display: 'flex', backgroundColor: '#050a14', border: '1px solid #112240', borderRadius: '12px', padding: '5px', marginBottom: '20px' },
  tabBtn: { flex: 1, padding: '12px', backgroundColor: 'transparent', border: 'none', color: '#4a5568', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', borderRadius: '8px', transition: '0.3s', fontFamily: '"Share Tech Mono", monospace' },
  activeTabBtn: { backgroundColor: 'rgba(0, 240, 255, 0.08)', color: '#00f0ff', boxShadow: '0 0 15px rgba(0,240,255,0.1)', borderColor: '#00f0ff' },
  
  glassPanel: { backgroundColor: 'rgba(9, 13, 22, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '16px', padding: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' },
  panelTitle: { fontSize: '16px', margin: '0 0 5px 0', color: '#fff', letterSpacing: '0.5px' },
  panelSubtitle: { fontSize: '11px', color: '#4a5568', margin: '0 0 20px 0' },
  
  textArea: { width: '100%', height: '90px', backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '8px', color: '#fff', padding: '12px', fontSize: '13px', fontFamily: '"Share Tech Mono", monospace', resize: 'none', boxSizing: 'border-box', marginBottom: '15px' },
  broadcastBtn: { width: '100%', padding: '14px', backgroundColor: 'rgba(0,240,255,0.08)', border: '1px solid #00f0ff', color: '#00f0ff', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', letterSpacing: '1px', fontFamily: '"Share Tech Mono", monospace' },
  
  liveBroadcastBox: { marginTop: '20px', backgroundColor: '#00f0ff', borderRadius: '10px', padding: '15px', color: '#000', boxShadow: '0 0 20px rgba(0,240,255,0.3)' },
  broadcastHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '4px' },
  clearBroadcast: { backgroundColor: 'transparent', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px', color: '#ff3366' },
  broadcastText: { fontSize: '14px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' },
  
  commentStack: { display: 'flex', flexDirection: 'column', gap: '15px' },
  commentCard: { backgroundColor: '#020205', border: '1px solid #112240', borderRadius: '10px', padding: '15px', transition: '0.3s' },
  cardApproved: { borderColor: '#00ffaa', backgroundColor: 'rgba(0,255,170,0.02)' },
  cardRedacted: { borderColor: '#ff3366', backgroundColor: 'rgba(255,51,102,0.02)' },
  commentMeta: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px' },
  commentUser: { color: '#00f0ff', fontWeight: 'bold' },
  commentTime: { color: '#4a5568' },
  commentText: { fontSize: '13px', color: '#cbd5e1', margin: '0 0 15px 0', lineHeight: '1.5' },
  
  btnGroup: { display: 'flex', gap: '10px' },
  approveBtn: { flex: 1, padding: '8px', backgroundColor: 'transparent', border: '1px solid rgba(0,255,170,0.3)', color: '#00ffaa', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: '0.2s' },
  redactBtn: { flex: 1, padding: '8px', backgroundColor: 'transparent', border: '1px solid rgba(255,51,102,0.3)', color: '#ff3366', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Share Tech Mono", monospace', transition: '0.2s' }
};

export default OverseerDashboard;
