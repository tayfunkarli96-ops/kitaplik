// src/pages/about/AboutPage.tsx (Güncellenmiş)
import React from 'react';
import './AboutPage.css'; // Stil dosyasının bağlı olduğundan emin ol
import Footer from '@components/app/Footer';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="about-page">
                {/* Arka plan devre deseni için bir katman (opsiyonel) */}
                <div className="background-circuitry"></div>

                <div className="about-container">
                    {/* Logo bölümü: Gglow sınıfı ekleyelim */}
                    <div className="about-logo-section neon-pink-header">
                        <span className="logo-n">N</span>
                        <span className="logo-text">CornFlix</span>
                    </div>

                    <h1 className="about-heading neon-pink-header">{t('aboutMovieQ')}</h1>

                    <section className="about-section">
                        {/* Başlıklara neon sınıfı ekleyelim */}
                        <h2 className="neon-pink-header">{t('ourMission')}</h2>
                        <p className="light-grey-text">{t('aboutMissionText')}</p>
                    </section>

                    <section className="about-section">
                        <h2 className="neon-pink-header">{t('whatWeOffer')}</h2>
                        <ul className="light-grey-text">
                            <li>{t('aboutOffer1')}</li>
                            <li>{t('aboutOffer2')}</li>
                            <li>{t('aboutOffer3')}</li>
                            <li>{t('aboutOffer4')}</li>
                            <li>{t('aboutOffer5')}</li>
                            <li>{t('aboutOffer6')}</li>
                            <li>{t('aboutOffer7')}</li>
                            <li>{t('aboutOffer8')}</li>
                        </ul>
                        <p className="light-grey-text">{t('aboutEnjoyTool')}</p>
                    </section>

                    <section className="about-section">
                        <h2 className="neon-pink-header">{t('projectDetails')}</h2>
                        <p className="light-grey-text"><strong>{t('category')}</strong> {t('categoryValue')}</p>
                        <p className="light-grey-text"><strong>{t('inspiredBy')}</strong> <a href="https://imdb.com" target="_blank" rel="noopener noreferrer">imdb.com</a>, <a href="https://rottentomatoes.com" target="_blank" rel="noopener noreferrer">rottentomatoes.com</a>, <a href="https://rezka.ag" target="_blank" rel="noopener noreferrer">rezka.ag</a></p>
                        <p className="light-grey-text"><strong>{t('website')}</strong> COrnFliX.com.tr</p>
                    </section>

                    {/* Bu iki bölümü yan yana koymak için bir div açalım */}
                    <div className="footer-columns">
                        <section className="about-section">
                            <h2 className="neon-pink-header">{t('createdBy')}</h2>
                            {/* İsme neon turkuaz sınıfı ekleyelim */}
                            <p className="neon-turquoise-name" style={{ fontSize: '24px', marginTop: '10px', fontWeight: 'bold' }}>
                                Tayfun Karlı
                            </p>
                        </section>

                        <section className="about-section categories-section">
                            <h2 className="neon-pink-header">Kategoriler</h2>
                            <ul className="light-grey-text">
                                <li>imd.com: <a href='https://www.imd.com' target='_blank' rel='noopener noreferrer'>https://www.imd.com</a></li>
                                <li>rottentomatoes.com: <a href='https://www.fatorn-universite' target='_blank' rel='noopener noreferrer'>https://www.fatorn-universite</a></li>
                                <li>rottentomatoes.com: <a href='https://www.iarurcornflix/' target='_blank' rel='noopener noreferrer'>https://www.iarurcornflix/</a></li>
                                <li>rottentomatoes.com: <a href='https://cornflwicwmiient.com/' target='_blank' rel='noopener noreferrer'>https://cornflwicwmiient.com/</a></li>
                                <li>densuhon: <a href='#' target='_blank' rel='noopener noreferrer'>Süleyman Demirel Üniversitesi</a></li>
                            </ul>
                        </section>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
