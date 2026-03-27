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
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node))
