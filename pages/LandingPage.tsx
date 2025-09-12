import React from 'react';
import { Page } from '../App';
import { Logo } from '../components/icons/Logo';
import { useTranslation } from '../lib/i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { UserGroupIcon } from '../components/icons/UserGroupIcon';

interface LandingPageProps {
    setPage: (page: Page) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setPage }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-primary text-slate-200">
            {/* Hero Section */}
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544012579-679b36f1b34e?q=80&w=2000')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary to-primary"></div>
                
                <header className="absolute top-0 w-full flex justify-between items-center p-6 z-10">
                    <button onClick={() => setPage('landing')} aria-label="EliteJet Care Homepage">
                        <Logo className="h-10 w-auto" />
                    </button>
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                        <button onClick={() => setPage('login')} className="hidden sm:block font-semibold text-white hover:text-secondary transition-colors">
                            {t('home.login')}
                        </button>
                    </div>
                </header>

                <main className="z-10 text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
                        {t('home.headline')}
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
                        {t('home.subheadline')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => setPage('signup')} className="py-3 px-8 bg-secondary text-white font-bold rounded-lg hover:bg-green-700 transition-transform hover:scale-105">
                            {t('home.cta')}
                        </button>
                         <button onClick={() => setPage('login')} className="sm:hidden py-3 px-8 bg-transparent border-2 border-slate-600 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                            {t('home.login')}
                        </button>
                    </div>
                </main>
            </div>

            {/* Features/USP Section */}
            <section className="bg-primary py-10 px-4">
                <div className="min-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <Feature
                            icon={<UserGroupIcon className="h-12 w-12 mx-auto mb-4 text-secondary" />}
                            title={t('home.feature1Title')}
                            description={t('home.feature1Desc')}
                        />
                        <Feature
                            icon={<SparklesIcon className="h-12 w-12 mx-auto mb-4 text-secondary" />}
                            title={t('home.feature2Title')}
                            description={t('home.feature2Desc')}
                        />
                        <Feature
                            icon={<ShieldCheckIcon className="h-12 w-12 mx-auto mb-4 text-secondary" />}
                            title={t('home.feature3Title')}
                            description={t('home.feature3Desc')}
                        />
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="bg-accent-dark py-6 px-4">
                <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} EliteJet Care. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div>
        {icon}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);