import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: 'white', padding: '120px 40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#00f3ff', textShadow: '0 0 10px #00f3ff', fontSize: '48px', marginBottom: '40px', fontWeight: '900' }}>
          CORNFLIX HAKKINDA
        </h1>
        <div style={{ border: '2px solid #ff00ff', borderRadius: '12px', padding: '40px', background: 'rgba(25, 0, 15, 0.7)', boxShadow: '0 0 15px rgba(255, 0, 255, 0.4)' }}>
          <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#ccc' }}>
            CornFlix, siberpunk estetiğini sinema tutkusuyla birleştiren bir vizyon projesidir.
          </p>
          <p style={{ fontSize: '24px', color: '#fff', marginTop: '30px' }}>
            Sistem Kurucusu: <span style={{ color: '#00f3ff', fontWeight: 'bold' }}>TAYFUN KARLI</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
