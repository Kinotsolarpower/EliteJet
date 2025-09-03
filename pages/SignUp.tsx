import React, { useState } from 'react';
import { Page } from '../App';
import { UserGroupIcon } from '../components/icons/UserGroupIcon';
import { WrenchIcon } from '../components/icons/WrenchIcon';
import { Logo } from '../components/icons/Logo';
import { useTranslation } from '../lib/i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

interface SignUpProps {
    setPage: (page: Page) => void;
}

type Role = 'owner' | 'provider';

export const SignUp: React.FC<SignUpProps> = ({ setPage }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<Role | null>(null);

    const selectRole = (selectedRole: Role) => {
        setRole(selectedRole);
        setStep(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
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
                return (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-6">
                           {role === 'owner' ? t('signup.step2.ownerTitle') : t('signup.step2.providerTitle')}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.companyName')}</label>
                                <input type="text" required className={inputClasses} />
                            </div>
                             {role === 'owner' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.vatNumber')}</label>
                                    <input type="text" required className={inputClasses} />
                                </div>
                            )}
                            {role === 'provider' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.specialization')}</label>
                                    <input type="text" placeholder={t('signup.step2.specializationPlaceholder')} required className={inputClasses} />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.email')}</label>
                                <input type="email" required className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('signup.step2.password')}</label>
                                <input type="password" required className={inputClasses} />
                            </div>
                            <p className="text-xs text-slate-400 pt-2">
                               {t('signup.step2.disclaimer')}
                            </p>
                            <div className="flex justify-between items-center pt-4">
                                <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-slate-300">
                                    &larr; {t('common.back')}
                                </button>
                                <button type="submit" className="py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700">
                                    {t('signup.step2.submitButton')}
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
        <div className="min-h-screen flex items-center justify-center bg-primary p-4">
             <header className="absolute top-0 right-0 p-6">
                <LanguageSwitcher />
            </header>
            <div className="w-full max-w-3xl">
                <div className="text-center mb-8">
                     <div className="flex justify-center cursor-pointer" onClick={() => setPage('landing')}>
                        <Logo className="h-12 w-auto" />
                    </div>
                </div>
                <div className="bg-accent rounded-lg shadow-md p-6 md:p-8">
                   {renderStep()}
                </div>
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