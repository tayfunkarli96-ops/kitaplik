
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          
          {/* ALT KISIM CORNFLIX TABELASI */}
          <p className="brand" style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff', margin: '0' }}>
            Corn<span style={{ color: '#F5B301' }}>Flix</span>
          </p>
          
          <p>{t('footerTagline')}</p>
        </div>
        <div className="footer-section">
          <h4>{t('navigation')}</h4>
          <ul className="footer-navigation">
            <li><a href="/">{t('home')}</a></li>
            <li><a href="/movies">{t('movies')}</a></li>
            <li><a href="/about">{t('about')}</a></li>
            <li><a href="/contacts">{t('contacts')}</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t('legal')}</h4>
          <ul>
            <li>{t('termsOfService')}</li>
            <li>{t('privacyPolicy')}</li>
            <li>{t('cookiePolicy')}</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t('connect')}</h4>
          <div className="social-links">
            <span>
              <img src="/x.svg" alt={t('socialXAlt')} /> @CornFlix
            </span>
            <span>
              <img src="/f.svg" alt={t('socialFacebookAlt')} /> @CornFlix
            </span>
            <span>
              <img src="/i.svg" alt={t('socialInstagramAlt')} /> @CornFlix
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footerBottom', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
};

export default Footer;
