import React from 'react';

const NewsPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      {/* Instagram Story Kartı */}
      <div className="relative w-full max-w-[380px] h-[680px] bg-gray-900 rounded-[40px] overflow-hidden border-4 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
        
        {/* Arka Plan (Siber Şehir Havası) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/20 to-purple-900/30"></div>

        {/* Üst Kısım: Başlık ve Renkli Bar */}
        <div className="relative z-10 flex flex-col items-center mt-20 text-center px-4">
          <h1 className="text-white text-3xl font-black tracking-tighter uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            CORNFLIX HABERLER
          </h1>
          {/* Rengarenk Haber Bandı */}
          <div className="w-40 h-2 mt-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-500 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
        </div>

        {/* Orta Kısım: Haber Metni */}
        <div className="absolute bottom-32 left-0 right-0 px-10 text-center z-10">
          <p className="text-white text-lg font-bold leading-tight drop-shadow-md">
            Neon Şehir Sinemalarında Büyük Patlama: 'Cyber-Fatih' Geliyor! Yerli yapım siber-punk film, IMDB'de 9.2 puanla açılış yaptı. 🍿
          </p>
        </div>

        {/* Alt Kısım: Kullanıcı Adı */}
        <div className="absolute bottom-10 left-0 right-0 text-center z-10">
          <span className="text-pink-500 font-mono text-sm tracking-[0.2em] font-bold drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">
            @tayfunkarli_
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
