
import React, { useState } from 'react';
import { Page } from '../App';
import { UserGroupIcon } from '../components/icons/UserGroupIcon';
import { WrenchIcon } from '../components/icons/WrenchIcon';
import { Logo } from '../components/icons/Logo';
import { useTranslation } from '../lib/i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { User } from '../types';

interface SignUpProps {
    setPage: (page: Page) => void;
    onSignUpSuccess: (newUser: Omit<User, 'avatarUrl' | 'onboardingCompleted'>) => void;
}

type Role = 'owner' | 'provider';

export const SignUp: React.FC<SignUpProps> = ({ setPage, onSignUpSuccess }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<Role | null>(null);

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [specialization, setSpecialization] = useState('');


    const selectRole = (selectedRole: Role) => {
        setRole(selectedRole);
        setStep(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (role === 'owner') {
            if (!termsAgreed) return;
            onSignUpSuccess({
                name: `${firstName} ${lastName}`,
                firstName,
                lastName,
                companyName,
                role: 'Client',
            });
        } else {
             // Provider flow leads to verification
            setStep(3);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-2">{t('signup.step1.title')}</h2>
                        <p className="text-slate-400 mb-8">{t('signup.step1.subtitle')}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RoleCard
                                icon={<UserGroupIcon className="h-10 w-10 mx-auto mb-4 text-secondary" />}
                                title={t('signup.step1.ownerTitle')}
                                description={t('signup.step1.ownerDesc')}
                                onClick={() => selectRole('owner')}
                            />
                            <RoleCard
                                icon={<WrenchIcon className="h-10 w-10 mx-auto mb-4 text-secondary" />}
                                title={t('signup.step1.providerTitle')}
                                description={t('signup.step1.providerDesc')}
                                onClick={() => selectRole('provider')}
                            />
                        </div>
                    </>
                );
            case 2:
                const inputClasses = "w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white";
                const isOwner = role === 'owner';
                return (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-6">
                           {isOwner ? t('signup.step2.ownerTitle') : t('signup.step2.providerTitle')}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isOwner && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.firstName')}</label>
                                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className={inputClasses} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.lastName')}</label>
                                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className={inputClasses} />
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.companyName')}</label>
                                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required className={inputClasses} />
                            </div>
                            
                            {role === 'provider' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.specialization')}</label>
                                    <input type="text" value={specialization} onChange={e => setSpecialization(e.target.value)} placeholder={t('signup.step2.specializationPlaceholder')} required className={inputClasses} />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.email')}</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.password')}</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className={inputClasses} />
                            </div>

                             {isOwner && (
                                <div className="pt-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-accent-dark text-secondary focus:ring-secondary" />
                                        <span className="ml-2 text-sm text-slate-300">{t('signup.step2.agreeToTerms')}</span>
                                    </label>
                                </div>
                            )}

                            {!isOwner && (
                                <p className="text-xs text-slate-400 pt-2">
                                    {t('signup.step2.disclaimer')}
                                </p>
                            )}

                            <div className="flex justify-between items-center pt-4">
                                <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-slate-300 hover:text-white">
                                    &larr; {t('common.back')}
                                </button>
                                <button type="submit" disabled={isOwner && !termsAgreed} className="py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-slate-500 disabled:cursor-not-allowed">
                                    {isOwner ? t('signup.step2.submitButton') : t('signup.step2.submitApplication')}
                                </button>
                            </div>
                        </form>
                    </>
                );
            case 3:
                return (
                     <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">{t('signup.step3.title')}</h2>
                        <p className="text-slate-400 mb-6">
                           {t('signup.step3.subtitle')}
                        </p>
                        <button onClick={() => setPage('login')} className="py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700">
                           {t('signup.step3.backToLogin')}
                        </button>
                    </div>
                );
            default:
                return null;
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
            <div className="w-full max-w-3xl z-10">
                <div className="text-center mb-8">
                     <button onClick={() => setPage('landing')} className="flex justify-center w-full" aria-label="Go to homepage">
                        <Logo className="h-12 w-auto" />
                    </button>
                </div>
                <div className="bg-accent rounded-lg shadow-md p-6 md:p-8">
                   {renderStep()}
                </div>
                <p className="text-center text-sm text-slate-400 mt-6">
                    {t('signup.alreadyAccount')}{' '}
                    <button onClick={() => setPage('login')} className="font-semibold text-secondary hover:underline">
                        {t('signup.loginLink')}
                    </button>
                </p>
            </div>
        </div>
    );
};


const RoleCard: React.FC<{ icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <div
        onClick={onClick}
        className="border border-slate-700 rounded-lg p-6 text-center cursor-pointer hover:border-secondary hover:shadow-lg transition-all bg-accent-dark hover:bg-accent"
    >
        {icon}
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400 mt-2">{description}</p>
    </div>
);
