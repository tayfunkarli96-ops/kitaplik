import React, { useState } from 'react';

const ProfilePage = () => {
  const [name, setName] = useState('Tayfun Karlı');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage("Profil başarıyla güncellendi! (RE-01)");
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col items-center justify-start pt-20">
      <h1 className="text-4xl font-bold text-pink-500 mb-10 shadow-neon">👤 Profil Düzenle</h1>
      
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-cyan-500 shadow-lg">
        <div className="mb-6">
          <label className="block text-gray-400 mb-2 font-mono text-sm uppercase">Kullanıcı Adı</label>
          <input 
            type="text" 
            className="w-full p-4 bg-black border border-gray-700 rounded-lg text-white focus:border-pink-500 outline-none transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-xl shadow-neon-small transition-transform active:scale-95"
        >
          DEĞİŞİKLİKLERİ KAYDET
        </button>

        {message && (
          <div className="mt-6 p-4 bg-cyan-900 border border-cyan-400 text-cyan-100 text-center rounded-lg font-mono animate-pulse">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
