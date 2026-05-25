import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA & TYPES ---
interface Comment { id: number; user: string; text: string; status: 'pending' | 'approved' | 'redacted'; }

const initialComments: Comment[] = [
  { id: 1, user: 'User_77', text: 'Film efsaneydi, ama site biraz yavaş.', status: 'pending' },
  { id: 2, user: 'Cinephile99', text: 'Spoiler: Filmin sonunda herkes ölüyor!', status: 'pending' },
];

const OverseerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MODERATION' | 'BROADCAST'>('MODERATION');
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newsInput, setNewsInput] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Req 7: Yorum Onaylama
  const handleApprove = (id: number) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  };

  // Req 5: Yorum Düzenleme / Sansürleme
  const handleRedact = (id: number) => {
    setComments(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'redacted', text: '[SİSTEM TARAFINDAN SANSÜRLENDİ]' } : c
    ));
  };

  // Req 9: Haber Düzenleme ve Yayını
  const handleBroadcast = () => {
    if(!newsInput) return;
    setBroadcastMessage(`SİSTEM DUYURUSU: ${newsInput}`);
    setNewsInput('');
    setTimeout(() => setBroadcastMessage(''), 4000); // 4 saniye sonra kaybolur
  };

  return (
    <div style={styles.container}>
      <div style={styles.metaHeader}>
        <span style={styles.sectionTitle}>OVERSEER COMMAND</span>
        <span style={styles.reqBadge}>REQ 5, 7, 9</span>
      </div>
      
      {/* TABS */}
      <div style={styles.tabContainer}>
        <button onClick={() => setActiveTab('MODERATION')} style={{...styles.tab, ...(activeTab === 'MODERATION' ? styles.activeTab : {})}}>
          Sinyaller (Mod)
        </button>
        <button onClick={() => setActiveTab('BROADCAST')} style={{...styles.tab, ...(activeTab === 'BROADCAST' ? styles.activeTab : {})}}>
          Yayın Frekansı
        </button>
      </div>

      {/* REQ 9: HABER YAYINI SEKRESİ */}
      {activeTab === 'BROADCAST' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={styles.glassPanel}>
          <h3 style={styles.panelTitle}>Global Haber Frekansı</h3>
          <p style={styles.subText}>Tüm kullanıcılara push bildirimi gönder.</p>
          <textarea 
            value={newsInput}
            onChange={(e) => setNewsInput(e.target.value)}
            placeholder="İletilecek mesajı girin..." 
            style={styles.textArea} 
          />
          <button onClick={handleBroadcast} style={styles.actionBtn}>FREKANSI YAYINLA</button>
          
          <AnimatePresence>
            {broadcastMessage && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.alertBox}>
                {broadcastMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* REQ 5 & 7: YORUM MODERASYONU SEKRESİ */}
      {activeTab === 'MODERATION' && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={styles.glassPanel}>
          <h3 style={styles.panelTitle}>Bekleyen Yorumlar</h3>
          <div style={styles.commentList}>
            <AnimatePresence>
              {comments.filter(c => c.status === 'pending').map(comment => (
                <motion.div key={comment.id} layout exit={{ opacity: 0, scale: 0.9 }} style={styles.commentCard}>
                  <div style={styles.commentUser}>@{comment.user}</div>
                  <div style={styles.commentText}>"{comment.text}"</div>
                  
                  <div style={styles.buttonGroup}>
                    <button onClick={() => handleApprove(comment.id)} style={{...styles.modBtn, color: '#00ffaa', borderColor: 'rgba(0,255,170,0.3)'}}>
                      ONAYLA
                    </button>
                    <button onClick={() => handleRedact(comment.id)} style={{...styles.modBtn, color: '#ff3366', borderColor: 'rgba(255,51,102,0.3)'}}>
                      SANSÜRLE
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {comments.filter(c => c.status === 'pending').length === 0 && (
              <p style={{textAlign: 'center', color: '#666', marginTop: '20px', fontFamily: '"Share Tech Mono", monospace', fontSize: '12px'}}>
                Tüm sinyaller temizlendi.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// --- CSS HATALARI (CamelCase) TAMAMEN TEMİZLENDİ ---
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '20px', color: '#fff', fontFamily: '"Inter", sans-serif' },
  metaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #1a202c', paddingBottom: '10px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: '#00f0ff' },
  reqBadge: { fontSize: '10px', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.2)' },
  
  tabContainer: { display: 'flex', backgroundColor: '#0a1526', borderRadius: '12px', padding: '5px', marginBottom: '20px' },
  tab: { flex: 1, padding: '10px', backgroundColor: 'transparent', border: 'none', color: '#666', fontWeight: 'bold', borderRadius: '8px', transition: '0.3s', cursor: 'pointer', fontSize: '12px' },
  activeTab: { backgroundColor: '#112240', color: '#00f0ff', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' },
  
  glassPanel: { backgroundColor: 'rgba(10, 21, 38, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 240, 255, 0.1)', padding: '20px', borderRadius: '16px' },
  panelTitle: { margin: '0 0 5px 0', fontSize: '16px', color: '#fff' },
  subText: { fontSize: '12px', color: '#888', marginBottom: '15px' },
  
  textArea: { width: '100%', height: '80px', backgroundColor: '#050a14', border: '1px solid #112240', color: '#fff', padding: '10px', borderRadius: '8px', marginBottom: '15px', resize: 'none', fontFamily: '"Share Tech Mono", monospace', fontSize: '12px', boxSizing: 'border-box' },
  actionBtn: { width: '100%', padding: '12px', backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', letterSpacing: '1px', fontSize: '12px' },
  alertBox: { marginTop: '15px', padding: '10px', backgroundColor: '#00f0ff', color: '#000', fontWeight: 'bold', borderRadius: '6px', fontSize: '12px', textAlign: 'center' },
  
  commentList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  commentCard: { backgroundColor: '#050a14', border: '1px solid #112240', padding: '15px', borderRadius: '10px' },
  commentUser: { fontSize: '12px', color: '#00f0ff', fontWeight: 'bold', marginBottom: '5px' },
  commentText: { fontSize: '14px', color: '#ccc', marginBottom: '15px', fontStyle: 'italic' },
  buttonGroup: { display: 'flex', gap: '10px' },
  modBtn: { flex: 1, padding: '8px', backgroundColor: 'transparent', border: '1px solid', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }
};

export default OverseerDashboard;
