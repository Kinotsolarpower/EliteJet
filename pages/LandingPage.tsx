import React from 'react';
import { Page } from '../App';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { Logo } from '../components/icons/Logo';
import { useTranslation } from '../lib/i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

interface LandingPageProps {
    setPage: (page: Page) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setPage }) => {
    const { t } = useTranslation();

    return (
        <div
            className="relative h-screen w-full flex flex-col items-center justify-center text-white bg-primary overflow-hidden"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544012579-679b36f1b34e?q=80&w=2000')" }}
            ></div>
           
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                <Logo className="h-10 w-auto" />
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <button onClick={() => setPage('login')} className="font-semibold text-white hover:text-secondary transition-colors px-4 py-2 rounded-md">
                        {t('landing.login')}
                    </button>
                </div>
            </header>

            {/* Hero Content */}
            <main className="text-center p-4 z-10">
                <h1 className="text-4xl md:text-6xl font-bold font-condensed tracking-tight">
                    {t('landing.headline')}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                    {t('landing.subheadline')}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => setPage('signup')}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105"
                    >
                        {t('landing.ctaSchedule')}
                        <ArrowRightIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setPage('signup')}
                        className="w-full sm:w-auto bg-transparent hover:bg-accent text-white font-semibold py-3 px-8 border border-accent rounded-lg transition-colors"
                    >
                        {t('landing.ctaPartner')}
                    </button>
                </div>
            </main>
        </div>
    );
};