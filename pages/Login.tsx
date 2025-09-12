

import React, { useState } from 'react';
import { Page } from '../App';
import { Logo } from '../components/icons/Logo';
import { useTranslation } from '../lib/i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { User } from '../types';

interface LoginProps {
    setPage: (page: Page) => void;
    onLoginSuccess: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ setPage, onLoginSuccess }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError(t('login.validation.required'));
            return;
        }
        
        const lowerEmail = email.toLowerCase();

        if (lowerEmail === 'admin@jetcare.com') {
            if (password === '123544') {
                const adminUser: User = {
                    name: 'Admin Operator',
                    firstName: 'Admin',
                    role: 'Operator',
                    avatarUrl: 'https://i.pravatar.cc/150?u=admin',
                    onboardingCompleted: true,
                };
                onLoginSuccess(adminUser);
            } else {
                 setError(t('login.validation.invalid'));
            }
        } else if (lowerEmail === 'provider@jetcare.com') {
             if (password === '123544') {
                const providerUser: User = {
                    name: 'JetCare Specialists',
                    role: 'Provider',
                    avatarUrl: 'https://i.pravatar.cc/150?u=provider',
                    onboardingCompleted: true,
                };
                onLoginSuccess(providerUser);
            } else {
                 setError(t('login.validation.invalid'));
            }
        } else {
            // For demonstration, allow a generic client login with any other non-empty credentials.
            const clientUser: User = {
               name: 'Belgian Wings',
               companyName: 'Belgian Wings',
               firstName: 'John',
               lastName: 'Doe',
               role: 'Client',
               avatarUrl: 'https://i.pravatar.cc/150?u=johndoe',
               onboardingCompleted: true,
           };
           onLoginSuccess(clientUser);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-primary p-4 overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544012579-679b36f1b34e?q=80&w=2000')" }}
            ></div>
            <header className="absolute top-0 right-0 p-6 z-10">
                <LanguageSwitcher />
            </header>

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-8">
                    <button onClick={() => setPage('landing')} className="flex justify-center w-full" aria-label="Go to homepage">
                        <Logo className="h-12 w-auto" />
                    </button>
                    <p className="text-slate-300 mt-2">{t('login.welcome')}</p>
                </div>
                <div className="w-full bg-accent rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="email">
                                {t('login.emailLabel')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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