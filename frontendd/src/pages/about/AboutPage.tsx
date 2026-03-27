
const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: 'white', padding: '120px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#00f3ff', textShadow: '0 0 10px #00f3ff, 0 0 20px #00f3ff', fontSize: '3rem', marginBottom: '40px', fontWeight: 'bold' }}>
          CORNFLIX HAKKINDA
        </h1>
        <div style={{ border: '2px solid #ff00ff', borderRadius: '15px', padding: '40px', background: 'rgba(25, 0, 15, 0.7)', boxShadow: '0 0 15px rgba(255, 0, 255, 0.4)' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
            CornFlix, siberpunk estetiğini sinema tutkusuyla birleştiren bir vizyon projesidir. Sıradan tasarımları neon ışıklarla yıkıyoruz.
          </p>
          <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ fontSize: '1.5rem', color: '#fff' }}>Sistem Kurucusu:</p>
            <h2 style={{ color: '#00f3ff', fontSize: '2.5rem', textShadow: '0 0 15px #00f3ff', marginTop: '10px' }}>TAYFUN KARLI</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
