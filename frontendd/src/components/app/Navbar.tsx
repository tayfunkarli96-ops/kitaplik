import { useState, useEffect, useRef, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, ChevronDown } from 'lucide-react';
import './Navbar.css'; 
import { useAuth } from '@src/context/AuthContext'; 
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const Navbar = () => {
  const { isLoggedIn, user, isLoading: authIsLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'en', name: 'English', flag: '/en.svg' });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLLIElement>(null);

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '/en.svg' },
    { code: 'tr', name: 'Türkçe', flag: '/tr.svg' },
    { code: 'tk', name: 'Türkmençe', flag: '/tk.svg' },
    { code: 'ru', name: 'Русский', flag: '/ru.svg' },
  ];  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownRef]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsLangDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsLangDropdownOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setTimeout(() => setSearchQuery(''), 0);
      setIsMenuOpen(false);
    }
  };

  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);

  const selectLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
    setIsLangDropdownOpen(false);
    i18n.changeLanguage(lang.code);
    localStorage.setItem('i18nextLng', lang.code);
  };

  // HABERLER (news) BURADAN SİLİNDİ
  const navLinks = [
    { title: t('home'), path: '/' },
    { title: t('movies'), path: '/movies' },
    { title: t('recommended'), path: '/recs' },
    { title: t('about'), path: '/about' },
    { title: t('contacts'), path: '/contacts' },
  ];

  const authLinks = [{ title: t('quiz'), path: '/quiz' }];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{ borderBottom: '1px solid rgba(255, 0, 191, 0.3)' }}>
      <div className="navbar-container">
        
        {/* NEON LOGO BÖLÜMÜ */}
        <Link 
          to="/" 
          className="navbar-brand" 
          onClick={handleLinkClick}
          style={{ 
            fontSize: '32px',
            fontWeight: '900',
            color: '#ff00bf', // Neon Pembe
            textShadow: '0 0 10px #ff00bf, 0 0 20px #ff00bf',
            textDecoration: 'none', 
            letterSpacing: '1px'    
          }}
        >
          Corn<span style={{ color: '#00ffff', textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}>Flix</span>
        </Link>

        {/* NEON ARAMA BÖLÜMÜ */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-container" style={{ borderRadius: '25px', border: '1px solid #00ffff', boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)' }}>
            <SearchIcon className="search-icon" size={20} style={{ color: '#00ffff' }} />
            <input
              type="text"
              placeholder={t("searchMovies")}
              className="search-input"
              style={{ color: '#ffffff' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
             <button type="submit" style={{ display: 'none' }}></button>
          </div>
        </form>

        <IconButton onClick={toggleMenu} className="menu-toggle dhide" style={{ color: '#ff00bf' }}>
          <MenuIcon />
        </IconButton>

        <div className={`nav-auth-wrapper ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link 
                  to={link.path} 
                  className="nav-link" 
                  onClick={handleLinkClick}
                  style={{ transition: '0.3s' }}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            <li ref={langDropdownRef} className="language-dropdown-container">
              <button className="language-dropdown-button" onClick={toggleLangDropdown} style={{ border: '1px solid rgba(0, 255, 255, 0.3)' }}>
                <img src={selectedLanguage.flag} alt="flag" className="flag-icon" />
                <span style={{ color: '#00ffff' }}>{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDown size={16} className={`dropdown-arrow ${isLangDropdownOpen ? 'open' : ''}`} style={{ color: '#00ffff' }} />
              </button>
              {isLangDropdownOpen && (
                <ul className="language-dropdown-menu" style={{ background: '#121212', border: '1px solid #ff00bf' }}>
                  {languages.map((lang) => (
                    <li key={lang.code} onClick={() => selectLanguage(lang)} className="language-option">
                      <img src={lang.flag} alt="flag" className="flag-icon" />
                      <span>{lang.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {isLoggedIn && authLinks.map((link) => (
              <li key={link.title}>
                <Link to={link.path} className="nav-link auth-link" onClick={handleLinkClick} style={{ color: '#ff00bf', textShadow: '0 0 5px #ff00bf' }}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="auth-actions">
            {!isLoggedIn ? (
              <Link to="/login" className="sign-in-button" onClick={handleLinkClick} style={{ background: '#ff00bf', boxShadow: '0 0 15px #ff00bf', color: '#fff', borderRadius: '20px', padding: '8px 20px', fontWeight: 'bold' }}>
                {t('signIn')}
              </Link>
            ) : (
              <Link to="/profile" className="profile-link" onClick={handleLinkClick}>
                <div className="nav-profile-avatar" style={{ border: '2px solid #00ffff', boxShadow: '0 0 10px #00ffff' }}>
                  {user?.avatar_url ? (
                      <img src={user.avatar_url} alt="avatar" className="avatar-image" />
                  ) : (
                      user?.username?.substring(0, 2).toUpperCase() || 'CF' 
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
