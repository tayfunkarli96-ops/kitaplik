import React, { useState, useEffect } from 'react';

// TypeScript Interface'leri
interface MovieMatch {
  title: string;
  matchRate: number;
  reason: string;
}

const AiMatcher: React.FC = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [result, setResult] = useState<MovieMatch | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // Sahte bir yapay zeka tarama simülasyonu
  const startScan = () => {
    setIsScanning(true);
    setResult(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Tarama bitince eşleşen filmi ver (Req 8)
          setResult({
            title: "Interstellar",
            matchRate: 98.5,
            reason: "Bilim kurgu tercihlerin ve Nolan yönetmenliği eşleşti."
          });
          return 100;
        }
        return oldProgress + 20; // %20 artarak ilerler
      });
    }, 500); // Her yarım saniyede bir güncellenir
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>CORNFLIX // AI MATCH ENGINE</h2>
      <p style={styles.subtitle}>[Req 8] Neural Network Scanner</p>

      {!result && !isScanning && (
        <button onClick={startScan} style={styles.scanButton}>
          🎯 PROFİLİ TARA VE FİLM ÖNER
        </button>
      )}

      {isScanning && (
        <div style={styles.scanBox}>
          <p style={{ color: '#00f0ff', marginBottom: '10px' }}>
            Veritabanı Analiz Ediliyor... {progress}%
          </p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {result && (
        <div style={styles.resultBox}>
          <h3 style={{ color: '#ff9900', margin: '0 0 10px 0' }}>HEDEF BULUNDU!</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{result.title}</p>
          <p style={{ color: '#00f0ff', marginTop: '5px' }}>Eşleşme Oranı: {result.matchRate}%</p>
          <p style={{ fontSize: '14px', color: '#ccc', marginTop: '10px', fontStyle: 'italic' }}>
            "{result.reason}"
          </p>
          <button onClick={() => setResult(null)} style={styles.resetButton}>
            Yeniden Tara
          </button>
        </div>
      )}
    </div>
  );
};

// Basit Inline CSS Objeleri (Mobil uyumlu)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#0a0f16', color: '#fff', padding: '20px', borderRadius: '12px',
    border: '1px solid #00f0ff', fontFamily: 'monospace', textAlign: 'center', margin: '20px auto', maxWidth: '400px'
  },
  title: { margin: '0 0 5px 0', fontSize: '18px', color: '#00f0ff' },
  subtitle: { fontSize: '12px', color: '#888', marginBottom: '20px' },
  scanButton: {
    backgroundColor: 'transparent', color: '#00f0ff', border: '2px solid #00f0ff',
    padding: '15px 20px', fontSize: '16px', fontWeight: 'bold', borderRadius: '8px',
    cursor: 'pointer', width: '100%', textTransform: 'uppercase'
  },
  scanBox: { padding: '20px', border: '1px dashed #00f0ff', borderRadius: '8px' },
  progressBar: { height: '10px', backgroundColor: '#111', borderRadius: '5px', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#00f0ff', transition: 'width 0.3s ease' },
  resultBox: { backgroundColor: '#111b24', padding: '20px', borderRadius: '8px', border: '1px solid #ff9900' },
  resetButton: {
    marginTop: '15px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff',
    padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'
  }
};

export default AiMatcher;
