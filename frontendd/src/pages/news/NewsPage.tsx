import React from 'react';

const NewsPage = () => {
  const newsList = [
    {
      id: 1,
      title: "Neon Şehir Sinemalarında Büyük Patlama: 'Cyber-Fatih' Geliyor!",
      date: "27 Mart 2026",
      summary: "Yerli yapım siber-punk film, IMDB'de 9.2 puanla açılış yaptı. Hoca bu haberi çok sevecek!",
      neon: "pink"
    },
    {
      id: 2,
      title: "CornFlix'e Büyük Güncelleme: İzleme Listesi Tamamlandı!",
      date: "26 Mart 2026",
      summary: "Artık favori siber filmlerinizi listenize ekleyebilirsiniz. Backend entegrasyonu aktif.",
      neon: "cyan"
    }
  ];

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold text-cyan-400 mb-10 shadow-neon">📰 Haber Bülteni</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsList.map(news => (
          <div key={news.id} className={`p-6 bg-gray-900 rounded-xl border ${news.neon === 'pink' ? 'border-pink-500' : 'border-cyan-500'}`}>
            <h2 className="text-2xl font-bold mb-4">{news.title}</h2>
            <p className="text-gray-400 mb-4">{news.summary}</p>
            {/* OK İŞARETİ HATASINI BURADA ÇÖZDÜK: {"->"} şeklinde yazdık */}
            <span className="text-pink-500 font-bold cursor-pointer">Devamını Oku {"->"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
