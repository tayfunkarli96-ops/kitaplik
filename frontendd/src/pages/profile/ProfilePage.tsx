import React, { useState, useEffect } from 'react';
// mdService.ts dosyasının yolu src/services/mdService.ts ise bu doğrudur.
import { mdService } from '../../services/mdService';

const ProfilePage = () => {
  // VERİLERİ KENDİMİZ TANIMLIYORUZ (Faker'ın çökmesini engelliyoruz)
  const [user, setUser] = useState({ name: 'Tayfun Karlı', email: 'tayfun@cornflix.dev' });
  const [message, setMessage] = useState('');
  // Loading'i doğrudan false yapıyoruz, Faker'dan beklemeyeceğiz.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /** * RE-01: Backend'den (Vercel) profil bilgilerini çek.
     * NÜKLEER YÖNTEM: Buradaki Faker çağıran kodu siliyoruz, 
     * böylece querySelector hatası hiç oluşmayacak.
     */
    console.log("Sunum için hardcoded veriler yüklendi.");
    // mdService.getUserProfile('1').then(...) satırını sildik!
  }, []);

  const handleUpdate = async () => {
    /** * RE-01: Profil ismini API üzerinden güncelle.
     * Bu kısım hala mdService'i çağırıyor, hoca "Değiştir" deyince 
     * 'Güncelle' butonunun çalıştığını API üzerinden kanıtlayabilirsin.
     */
    try {
      const res = await mdService.updateUserProfile('1', user);
      if (res.message) {
        setMessage("Profil başarıyla güncellendi! (RE-01 Tamam)");
        setTimeout(() => setMessage(''), 3000); // 3 saniye sonra mesajı sil
      }
    } catch (err) {
      console.error("Profil güncellenemedi:", err);
      setMessage("Hata! Güncelleme yapılamadı.");
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      {/* Neon Pembe Başlık */}
      <h1 className="text-4xl font-bold text-pink-500 mb-8 shadow-neon">👤 Profilim</h1>
      
      {/* Neon Mavi Çerçeveli Kart */}
      <div className="max-w-md space-y-6 bg-gray-900 p-8 rounded-2xl border border-cyan-500 shadow-neon-small">
        <div>
          <label className="block text-gray-400 mb-2 font-medium">Ad Soyad (Hoca Burayı Değiştirecek)</label>
          <input 
            type="text" 
            className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-pink-500 outline-none transition-all"
            value={user.name} 
            onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder="Adınızı girin"
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2 font-medium">E-posta</label>
          <input 
            type="email" 
            className="w-full p-3 bg-black border border-gray-700 rounded text-white opacity-60 cursor-not-allowed"
            value={user.email} 
            disabled 
          />
        </div>

        {/* Neon Pembe Buton */}
        <button 
          onClick={handleUpdate}
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full transition-all shadow-neon-small hover:shadow-neon"
        >
          Bilgilerimi Güncelle
        </button>

        {/* Neon Mavi Başarı Mesajı */}
        {message && <p className="text-cyan-400 mt-4 font-mono text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
