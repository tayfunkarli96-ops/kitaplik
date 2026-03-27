import React, { useState, useEffect } from 'react';
import { mdService } from '../../services/mdService';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Backend'den profil bilgilerini çekiyoruz
    mdService.getUserProfile('1').then(data => setUser(data));
  }, []);

  const handleUpdate = async () => {
    const res = await mdService.updateUserProfile('1', user);
    if (res.message) {
      setMessage("Profil başarıyla güncellendi! (RE-01 Tamam)");
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold text-pink-500 mb-8 shadow-neon">👤 Profil Bilgilerim</h1>
      
      <div className="max-w-md space-y-6 bg-gray-900 p-8 rounded-2xl border border-cyan-500">
        <div>
          <label className="block text-gray-400 mb-2">Ad Soyad</label>
          <input 
            type="text" 
            className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-pink-500 outline-none"
            value={user.name} 
            onChange={(e) => setUser({...user, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">E-posta</label>
          <input 
            type="email" 
            className="w-full p-3 bg-black border border-gray-700 rounded text-white opacity-50 cursor-not-allowed"
            value={user.email} 
            disabled 
          />
        </div>

        <button 
          onClick={handleUpdate}
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full transition-all shadow-neon-small"
        >
          Bilgilerimi Güncelle
        </button>

        {message && <p className="text-cyan-400 mt-4 font-mono text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
