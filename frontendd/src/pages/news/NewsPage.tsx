import React from 'react';

const NewsPage = () => {
  return (
    <div style={{ backgroundColor: '#05050a', minHeight: '100vh', color: 'white', padding: '120px 40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <h1 style={{ color: '#00f3ff', textShadow: '0 0 10px #00f3ff', fontSize: '48px', marginBottom: '40px', textAlign: 'center' }}>
          SİBER HABERLER AĞI
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Haber Kartı 1 */}
          <div style={{ border: '1px solid #ff00ff', borderRadius: '12px', padding: '25px', background: 'rgba(25,0,15,0.7)', boxShadow: '0 0 10px rgba(255,0,255,0.2)' }}>
            <span style={{ backgroundColor: '#ff00ff', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>YENİ VİZYON</span>
            <h2 style={{ margin: '15px 0 10px 0', fontSize: '28px', color: '#fff' }}>Matrix 5 İçin Yeşil Işık Yakıldı!</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', margin: 0 }}>
              Yıllar süren bekleyişin ardından Warner Bros, Matrix evreninde geçecek yeni bir filmin hazırlıklarına başlandığını duyurdu. Yeni filmde Neo'nun mirası nasıl devam edecek? Siberpunk dünyası bu haberi konuşuyor.
            </p>
          </div>

          {/* Haber Kartı 2 */}
          <div style={{ border: '1px solid #00f3ff', borderRadius: '12px', padding: '25px', background: 'rgba(0,15,25,0.7)', boxShadow: '0 0 10px rgba(0,243,255,0.2)' }}>
            <span style={{ backgroundColor: '#00f3ff', color: 'black', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>TEKNOLOJİ & SİNEMA</span>
            <h2 style={{ margin: '15px 0 10px 0', fontSize: '28px', color: '#fff' }}>CornFlix Altyapısını Güncelledi</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', margin: 0 }}>
              Siber sinema platformu CornFlix, kullanıcılarına daha iyi bir deneyim sunmak için altyapısını tamamen yeniledi. Baş Geliştirici Tayfun Karlı, yeni neon tasarım dilinin endüstri standartlarını değiştireceğini belirtti.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsPage;
