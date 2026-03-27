import React from 'react';

const NewsPage = () => {
  // RE-09: Sunum için hardcoded haber bülteni verileri
  const newsList = [
    {
      id: 1,
      title: "Neon Şehir Sinemalarında Büyük Patlama: 'Cyber-Fatih' Geliyor!",
      date: "27 Mart 2026",
      summary: "Yerli yapım siber-punk film, IMDB'de 9.2 puanla açılış yaptı. Hoca bu haberi çok sevecek!",
      neon: "pink" // Kart rengi
    },
    {
      id: 2,
      title: "CornFlix'e Büyük Güncelleme: İzleme Listesi Tamamlandı! (RE-06)",
      date: "26 Mart 2026",
      summary: "Artık favori siber filmlerinizi listenize ekleyebilirsiniz.Backend entegrasyonu Vercel üzerinde aktif.",
      neon: "cyan"
    },
    {
      id: 3,
      title: "Kritik Hata Düzeltildi: 'Navbar' Pususu Dağıtıldı!",
      date: "27 Mart 2026",
      summary: "Geliştirici Tayfun Karlı, /app/ klasöründe saklanan gizli Navbar'ı bulup imha etti. Site artık kırmızı yanmıyor!",
      neon: "pink"
    }
  ];

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      {/* Neon Mavi Başlık */}
      <h1 className="text-4xl font-bold text-cyan-400 mb-8 shadow-neon">📰 CornFlix Siber Haber Bülteni</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.map(news => (
          <div 
            key={news.id} 
            className={`bg-gray-900 p-6 rounded-2xl border ${news.neon === 'pink' ? 'border-pink-500 shadow-neon-pink-small' : 'border-cyan-500 shadow-neon-cyan-small'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs font-mono p-1 px-2 rounded ${news.neon === 'pink' ? 'bg-pink-900 text-pink-100' : 'bg-cyan-900 text-cyan-100'}`}>Haber ID: {news.id}</span>
              <span className="text-sm text-gray-500">{news.date}</span>
            </div>
            
            <h2 className={`text-xl font-bold mb-3 ${news.neon === 'pink' ? 'text-pink-300' : 'text-cyan-300'}`}>{news.title}</h2>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{news.summary}</p>
            
            <button className={`text-sm font-bold ${news.neon === 'pink' ? 'text-pink-500' : 'text-cyan-500'} hover:underline`}>
              Devamını Oku ->
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Bu CSS'leri index.css'e veya NewsPage.tsx'in en altına ekle:
/*
.shadow-neon-pink-small { box-shadow: 0 0 10px rgba(236, 72, 153, 0.5); }
.shadow-neon-cyan-small { box-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
*/

export default NewsPage;
