import React, { useEffect, useState } from 'react';
import { mdService } from '../../services/mdService'; // Üst klasöre çıkıp services'e ulaşıyoruz

const NewsPage = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    // Vercel'deki backend'den haberleri çekiyoruz
    mdService.getNews().then(data => setNews(data));
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold text-pink-500 mb-8 mt-10 shadow-neon">📰 CornFlix Haberler</h1>
      <div className="grid gap-6">
        {news.length > 0 ? (
          news.map((item) => (
            <div key={item.id} className="p-6 border-2 border-cyan-500 rounded-xl bg-gray-900 shadow-lg">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">{item.title}</h2>
              <p className="text-gray-300 mb-4">{item.content}</p>
              <span className="text-sm text-pink-500 font-mono">📅 {item.date}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Haberler yükleniyor veya henüz haber yok...</p>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
