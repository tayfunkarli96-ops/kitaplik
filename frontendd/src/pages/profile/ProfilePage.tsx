import React, { useState, useEffect } from 'react';
import { mdService } from '../../services/mdService';

const ProfilePage = () => {
  // Kullanıcı bilgilerini tutan state
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // RE-01: Backend'den profil bilgilerini çek (Örn: Tayfun Karlı)
    mdService.getUserProfile('1') // '1' örnek kullanıcı ID
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
    // RE-01: Profil bilgilerini güncelle (İsim değişikliğini kaydet)
    try {
      const res = await mdService.updateUserProfile('1', user);
      if (res.message) {
        setMessage("Profil başarıyla güncellendi! (RE-01 Tamam)");
        // Mesajı 3 saniye sonra sil
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error("Profil güncellenemedi:", err);
      setMessage("Hata! Güncelleme yapılamadı.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-cyan-400">
        Profil yükleniyor...
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      {/* Başlık - Neon Efekti */}
      <h1 className="text-4xl font-bold text-pink-500 mb-8 shadow-neon">👤 Profil Bilgilerim</h1>
      
      {/* Form Alanı - Sitenin Tasarımına Uygun */}
      <div className="max-w-md space-y-6 bg-gray-900 p-8 rounded-2xl border border-cyan-500 shadow-neon-small">
        <div>
          <label className="block text-gray-400 mb-2 font-medium">Ad Soyad</label>
          <input 
            type="text" 
            className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-pink-500 outline-none transition-colors"
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

        {/* Güncelle Butonu - Neon Pembesi */}
        <button 
          onClick={handleUpdate}
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full transition-all shadow-neon-small hover:shadow-neon"
        >
          Bilgilerimi Güncelle
        </button>

        {/* Başarı Mesajı - Neon Mavisi */}
        {message && <p className="text-cyan-400 mt-4 font-mono text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
