import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MoviesPage = () => {
  const subMenu = [
    { name: '📺 Film Yönetimi', path: 'management' },
    { name: '➕ Yeni Film Ekle', path: 'add' },
    { name: '📊 İstatistikler', path: 'stats' },
  ];

  return (
    <div className="flex bg-black min-h-screen text-white pt-20">
      
      {/* SOL TARAFTAKİ İÇ MENÜ */}
      <aside className="w-64 bg-gray-950 p-6 border-r border-gray-800 flex flex-col space-y-3">
        <h2 className="text-gray-500 uppercase tracking-widest text-xs font-black mb-6 px-3">
          CornFlix Yönetim
        </h2>
        {subMenu.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-pink-950/50 text-pink-300 border border-pink-700 shadow-[0_0_10px_rgba(236,72,193,0.4)]' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </aside>

      {/* SAĞ TARAFTAKİ İÇERİK ALANI */}
      <main className="flex-1 p-8 bg-black">
        {/* Tıkladığın menünün içeriği buraya gelecek */}
        <Outlet /> 
      </main>
      
    </div>
  );
};

export default MoviesPage;
