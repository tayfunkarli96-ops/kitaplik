import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 p-6 flex flex-col space-y-8 z-50">
      <div className="text-3xl font-bold italic tracking-tighter">
        <span className="text-pink-500 shadow-neon">Corn</span>
        <span className="text-cyan-400">Flix</span>
      </div>

      <nav className="flex flex-col space-y-4">
        <Link to="/" className="text-gray-300 hover:text-pink-500 text-lg font-medium transition-colors flex items-center space-x-3 group">
          <span>🏠</span>
          <span>Ana Sayfa</span>
        </Link>

        <Link to="/movies" className="text-gray-300 hover:text-pink-500 text-lg font-medium transition-colors flex items-center space-x-3 group">
          <span>🎬</span>
          <span>Filmler</span>
        </Link>

        {/* RE-09: Haberler Butonu */}
        <Link to="/news" className="text-white hover:text-cyan-400 text-lg font-bold transition-all flex items-center space-x-3 group border-l-4 border-transparent hover:border-cyan-400 pl-2">
          <span>📰</span>
          <span>Haberler</span>
        </Link>

        <Link to="/profile" className="text-gray-300 hover:text-pink-500 text-lg font-medium transition-colors flex items-center space-x-3 group">
          <span>👤</span>
          <span>Profil</span>
        </Link>

        <Link to="/contact" className="text-gray-300 hover:text-pink-500 text-lg font-medium transition-colors flex items-center space-x-3 group">
          <span>📞</span>
          <span>İletişim</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <button className="w-full py-3 px-6 bg-transparent border-2 border-pink-500 text-pink-500 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all">
          Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default Navbar;
