import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: 'white', padding: '120px 40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <h1 style={{ color: '#00f3ff', textShadow: '0 0 10px #00f3ff', fontSize: '48px', marginBottom: '40px', fontWeight: '900' }}>
          CORNFLIX HAKKINDA
        </h1>
        
        <div style={{ border: '2px solid #ff00ff', borderRadius: '12px', padding: '40px', background: 'rgba(25,0,15,0.7)', boxShadow: '0 0 15px rgba(255,0,255,0.4)' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#ccc', marginBottom: '20px' }}>
            CornFlix, sinema kültürünü ve siberpunk estetiğini bir araya getiren bir vizyon projesidir. Amacımız, sıradan tasarımlardan sıyrılarak kullanıcılara neon ışıklar altında eşsiz bir film keşfetme deneyimi sunmaktır.
          </p>
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '20px', color: '#fff' }}>
              Sistem Kurucusu ve Baş Geliştirici: <br/>
              <span style={{ color: '#00f3ff', fontWeight: 'bold', textShadow: '0 0 5px #00f3ff', fontSize: '28px' }}>Tayfun Karlı</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
