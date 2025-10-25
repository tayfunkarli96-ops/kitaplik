import React, { useState, useEffect, useMemo } from "react";
import { Star, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

// --- VERİ ---
// (Veri ve yardımcı fonksiyonlar değişmedi)
const tumKitaplar = [
  { id: 1, baslik: "React'e Giriş", yazar: "D. Usta", kategori: "Web" },
  { id: 2, baslik: "İleri JavaScript", yazar: "S. Kılıç", kategori: "Web" },
  { id: 3, baslik: "Veri Yapıları", yazar: "A. Demir", kategori: "CS" },
  { id: 4, baslik: "Algoritmalar", yazar: "E. Kaya", kategori: "CS" },
  { id: 5, baslik: "UI/UX Temelleri", yazar: "N. Akın", kategori: "Tasarım" },
  {
    id: 6,
    baslik: "Python ile Makine Öğrenmesi",
    yazar: "F. Yılmaz",
    kategori: "Bilim",
  },
  { id: 7, baslik: "Osmanlı Tarihi", yazar: "İ. Ortaylı", kategori: "Tarih" },
  { id: 8, baslik: "Tasarım Desenleri", yazar: "G. of Four", kategori: "CS" },
  { id: 9, baslik: "Sapiens", yazar: "Y. N. Harari", kategori: "Bilim" },
];

function getInitialState(key, defaultValue) {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return defaultValue;
    }
    if (storedValue === "undefined") {
      return defaultValue;
    }
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`localStorage'dan ${key} okunurken hata:`, error);
    return defaultValue;
  }
}

// --- BİLEŞENLER ---

function AramaCubugu({ aramaMetni, setAramaMetni }) {
  return (
    <div className="arama-cubugu-wrapper">
      <input
        type="text"
        placeholder="Başlık veya yazar ara..."
        value={aramaMetni}
        onChange={(e) => setAramaMetni(e.target.value)}
        className="arama-input"
      />
    </div>
  );
}

function KategoriFiltre({ kategori, setKategori, kategoriler }) {
  return (
    <div className="kategori-filtre-wrapper">
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="kategori-select"
      >
        <option value="Tümü">Tüm Kategoriler</option>
        {kategoriler.map((kat) => (
          <option key={kat} value={kat}>
            {kat}
          </option>
        ))}
      </select>
    </div>
  );
}

function FavoriPaneli({ favoriler, kitaplar, toggleFavori }) {
  const [acik, setAcik] = useState(true);

  const favoriKitaplar = useMemo(() => {
    return kitaplar.filter((kitap) => favoriler.includes(kitap.id));
  }, [favoriler, kitaplar]);

  return (
    <div className="favori-panel">
      <button onClick={() => setAcik(!acik)} className="favori-panel__toggle">
        <h2 className="favori-panel__baslik">
          Favoriler ({favoriKitaplar.length})
        </h2>
        {acik ? (
          <ChevronUp size={20} className="favori-panel__icon" />
        ) : (
          <ChevronDown size={20} className="favori-panel__icon" />
        )}
      </button>

      {acik && (
        <div className="favori-panel__content">
          {favoriKitaplar.length === 0 ? (
            <p className="favori-panel__empty-mesaj">
              Henüz favori kitabınız yok.
            </p>
          ) : (
            <ul className="favori-liste">
              {favoriKitaplar.map((kitap) => (
                <li key={kitap.id} className="favori-liste__item">
                  <div>
                    <span className="favori-liste__item-baslik">
                      {kitap.baslik}
                    </span>
                    <span className="favori-liste__item-yazar">
                      {kitap.yazar}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFavori(kitap.id)}
                    className="favori-liste__kaldir-btn"
                  >
                    Kaldır
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function KitapKarti({ kitap, favorideMi, toggleFavori }) {
  const { id, baslik, yazar, kategori } = kitap;

  // Buton ve ikon için koşullu sınıf
  const butonClasses = `kitap-karti__buton ${
    favorideMi ? "kitap-karti__buton--favori" : ""
  }`;
  const iconClasses = `kitap-karti__buton-icon ${
    favorideMi ? "kitap-karti__buton-icon--favori" : ""
  }`;

  return (
    <div className="kitap-karti">
      <h3 className="kitap-karti__baslik">{baslik}</h3>
      <p className="kitap-karti__yazar">{yazar}</p>
      <p className="kitap-karti__kategori">{kategori}</p>

      <button onClick={() => toggleFavori(id)} className={butonClasses}>
        <Star size={16} className={iconClasses} />
        {favorideMi ? "Favorilerden Çıkar" : "Favoriye Ekle"}
      </button>
    </div>
  );
}

function KitapListe({ kitaplar, favoriler, toggleFavori }) {
  return (
    <div className="kitap-listesi">
      {kitaplar.length > 0 ? (
        kitaplar.map((kitap) => (
          <KitapKarti
            key={kitap.id}
            kitap={kitap}
            favorideMi={favoriler.includes(kitap.id)}
            toggleFavori={toggleFavori}
          />
        ))
      ) : (
        <div className="kitap-listesi__empty-mesaj">
          <p>Arama kriterlerinize uygun kitap bulunamadı.</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  // --- STATE VE FONKSİYONLAR (Değişmedi) ---
  const [kitaplar] = useState(tumKitaplar);
  const [aramaMetni, setAramaMetni] = useState(() =>
    getInitialState("aramaMetni", "")
  );
  const [kategori, setKategori] = useState("Tümü");
  const [favoriler, setFavoriler] = useState(() =>
    getInitialState("favoriler", [])
  );

  useEffect(() => {
    localStorage.setItem("aramaMetni", JSON.stringify(aramaMetni));
  }, [aramaMetni]);

  useEffect(() => {
    localStorage.setItem("favoriler", JSON.stringify(favoriler));
  }, [favoriler]);

  const kategoriler = useMemo(() => {
    const kategoriSet = new Set(kitaplar.map((k) => k.kategori));
    return Array.from(kategoriSet).sort();
  }, [kitaplar]);

  const filtrelenmisKitaplar = useMemo(() => {
    return kitaplar.filter((kitap) => {
      const kategoriEslesmesi =
        kategori === "Tümü" || kitap.kategori === kategori;
      const aramaMetniLower = aramaMetni.toLowerCase();
      const aramaEslesmesi =
        kitap.baslik.toLowerCase().includes(aramaMetniLower) ||
        kitap.yazar.toLowerCase().includes(aramaMetniLower);
      return kategoriEslesmesi && aramaEslesmesi;
    });
  }, [kitaplar, aramaMetni, kategori]);

  const toggleFavori = (id) => {
    setFavoriler((prevFavoriler) => {
      if (prevFavoriler.includes(id)) {
        return prevFavoriler.filter((favId) => favId !== id);
      } else {
        return [...prevFavoriler, id];
      }
    });
  };

  // --- RENDER ---
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__content">
          <BookOpen size={32} className="app-header__icon" />
          <h1 className="app-header__title">Mini Kulüp Kitaplığı</h1>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="main-container">
        {/* Filtreleme ve Arama Alanı */}
        <div className="filter-container">
          <div className="filter-container__controls">
            <AramaCubugu
              aramaMetni={aramaMetni}
              setAramaMetni={setAramaMetni}
            />
            <KategoriFiltre
              kategori={kategori}
              setKategori={setKategori}
              kategoriler={kategoriler}
            />
          </div>
        </div>

        {/* Ana Layout (Kitap Listesi ve Favori Paneli) */}
        <div className="main-layout">
          {/* Sol Taraf: Kitap Listesi */}
          <div className="main-layout__list-wrapper">
            <KitapListe
              kitaplar={filtrelenmisKitaplar}
              favoriler={favoriler}
              toggleFavori={toggleFavori}
            />
          </div>

          {/* Sağ Taraf: Favori Paneli */}
          <div className="main-layout__sidebar-wrapper">
            <FavoriPaneli
              favoriler={favoriler}
              kitaplar={kitaplar}
              toggleFavori={toggleFavori}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Okul Kulübü Kitaplık Projesi © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
