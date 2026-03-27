import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Başlık */}
        <h1 className="text-green-500 text-5xl font-bold text-center mb-12">
          CornFlix Hakkında
        </h1>

        {/* Misyonumuz */}
        <section className="mb-10">
          <h2 className="text-green-500 text-3xl font-bold border-b border-gray-800 pb-2 mb-4">
            Misyonumuz
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            CornFlix, film tutkunları için tasarlanmış kullanıcı dostu bir film inceleme platformudur. 
            Amacımız, sinema yolculuğunuzu keşfetmenize, tartışmanıza ve düzenlemenize yardımcı olacak bir alan yaratmaktır.
          </p>
        </section>

        {/* Neler Sunuyoruz */}
        <section className="mb-10">
          <h2 className="text-green-500 text-3xl font-bold border-b border-gray-800 pb-2 mb-4">
            Neler Sunuyoruz
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
            <li>Hem yeni çıkışlar hem de klasik filmler hakkında güncel kalın.</li>
            <li>Filmleri puanlayın ve diğer kullanıcıların yorumlarını okuyun.</li>
            <li>Kendi yorumlarınızı bırakın ve tartışmalara katılın.</li>
            <li>Kişisel izleme listenizi oluşturun ve yönetin.</li>
            <li>Zaten izlediğiniz filmleri işaretleyin.</li>
            <li>Favori filmlerinizin listesini oluşturun.</li>
            <li>En son film haberlerini ve gelişmelerini takip edin.</li>
            <li>Gelişmiş filtreleme sistemiyle filmleri kolayca bulun.</li>
          </ul>
          <p className="mt-6 text-gray-400 italic">
            Eğer bir sinema tutkunuysanız, CornFlix'i değerli ve keyifli bir araç olarak bulacağınıza inanıyoruz!
          </p>
        </section>

        {/* Proje Detayları */}
        <section className="mb-10">
          <h2 className="text-green-500 text-3xl font-bold border-b border-gray-800 pb-2 mb-4">
            Proje Detayları
          </h2>
          <div className="space-y-4">
            <p><span className="font-bold text-white">Kategori:</span> Film Platformu ve Topluluğu</p>
            <p>
              <span className="font-bold text
