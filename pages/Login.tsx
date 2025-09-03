import React from 'react';
import { Page } from '../App';
import { Logo } from '../components/icons/Logo';
import { useTranslation } from '../lib/i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

interface LoginProps {
    setPage: (page: Page) => void;
}

export const Login: React.FC<LoginProps> = ({ setPage }) => {
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage('dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary p-4">
             <header className="absolute top-0 right-0 p-6">
                <LanguageSwitcher />
            </header>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center cursor-pointer" onClick={() => setPage('landing')}>
                        <Logo className="h-12 w-auto" />
                    </div>
                    <p className="text-slate-300 mt-2">{t('login.welcome')}</p>
                </div>
                <div className="w-full bg-accent rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="email">
                                {t('login.emailLabel')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white"
                                placeholder={t('login.emailPlaceholder')}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="password">
                                {t('login.passwordLabel')}
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                            {t('login.loginButton')}
                        </button>
                    </form>
                    <p className="text-center text-sm text-slate-400 mt-6">
                        {t('login.noAccount')}{' '}
                        <button onClick={() => setPage('signup')} className="font-semibold text-secondary hover:underline">
                            {t('login.signUpLink')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};