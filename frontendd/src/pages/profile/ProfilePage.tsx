import React, { useState, useEffect } from 'react';
// mdService'in yeri src/services/mdService.ts ise bu yol doğrudur.
import { mdService } from '../../services/mdService';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // RE-01: Backend'den kullanıcı profilini çek (Örn: Tayfun Karlı)
    mdService.getUserProfile('1') // '1' örnek bir kullanıcı ID'si
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Profil yüklenemedi:", err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async () => {
    // RE-01: Profil ismini API üzerinden güncelle
    try {
      const res = await mdService.updateUserProfile('1', user);
      if (res.message) {
        setMessage("Profil başarıyla güncellendi! (RE-01 Tamam)");
        setTimeout(() => setMessage(''), 3000); // Mesajı 3 sn sonra sil
      }
    } catch (err) {
      console.error("Profil güncellenemedi:", err);
      setMessage("Hata! Güncelleme yapılamadı.");
    }
  };

  if (loading) return <div className="p-8 text-cyan-400">Profil Yükleniyor...</div>;

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      {/* Neon Pembe Başlık */}
      <h1 className="text-4xl font-bold text-pink-500 mb-8 shadow-neon">👤 Profilim</h1>
      
      {/* Neon Mavi Çerçeveli Kart */}
      <div className="max-w-md space-y-6 bg-gray-900 p-8 rounded-2xl border border-cyan-500 shadow-neon-small">
        <div>
          <label className="block text-gray-400 mb-2">Ad Soyad (Hoca Burayı Değiştirecek)</label>
          <input 
            type="text" 
            className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-pink-500 outline-none transition-all"
            value={user.name} 
            onChange={(e) => setUser({...user, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">E-posta</label>
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
