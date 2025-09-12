

import React, { useState } from 'react';
import { User } from '../types';
import { useTranslation } from '../lib/i18n';
import { Logo } from '../components/icons/Logo';
import { JET_BRAND_OPTIONS } from '../constants';

interface OnboardingFlowProps {
    user: User;
    onComplete: () => void;
}

const inputClasses = "w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white";

const EmailVerificationStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const { t } = useTranslation();
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{t('onboarding.step2.title')}</h2>
            <p className="text-slate-400 mb-6">{t('onboarding.step2.subtitle')}</p>
            <button onClick={onNext} className="w-full py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700">
                {t('common.continue')}
            </button>
            <p className="text-xs text-slate-500 mt-4">
                {t('onboarding.step2.didNotReceive')}{' '}
                <button className="text-secondary hover:underline">{t('onboarding.step2.resendLink')}</button>
            </p>
        </div>
    );
};

interface JetOption {
    brand: string;
    type: string;
    imageUrl: string;
}

const JetTypeCard: React.FC<{ jet: JetOption, onSelect: () => void }> = ({ jet, onSelect }) => {
    return (
        <button
            onClick={onSelect}
            className="group relative rounded-lg overflow-hidden border-2 border-slate-700 hover:border-secondary transition-all duration-300 transform hover:-translate-y-1"
        >
            <img src={jet.imageUrl} alt={jet.brand} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3">
                <h3 className="text-lg font-bold text-white">{jet.brand}</h3>
                <p className="text-sm text-slate-300">{jet.type}</p>
            </div>
        </button>
    );
};


const FleetOnboardingStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const { t } = useTranslation();
    const [selectedJet, setSelectedJet] = useState<JetOption | null>(null);
    const [tailNumber, setTailNumber] = useState('');
    const [model, setModel] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd save this data
        console.log({ ...selectedJet, tailNumber, model });
        onNext();
    };
    
    const handleSelectJet = (jet: JetOption) => {
        setSelectedJet(jet);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{t('onboarding.step3.title')}</h2>
            
            {!selectedJet ? (
                <>
                    <p className="text-slate-400 mb-8 text-center">{t('onboarding.step3.subtitle')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {JET_BRAND_OPTIONS.map(jetOption => (
                            <JetTypeCard
                                key={jetOption.brand}
                                jet={jetOption}
                                onSelect={() => handleSelectJet(jetOption)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <p className="text-slate-400 mb-6 text-center">{t('onboarding.step3.detailsSubtitle', [`${selectedJet.brand} ${selectedJet.type}`])}</p>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                        <div className="bg-accent-dark p-3 rounded-lg text-center">
                            <p className="text-slate-400 text-sm">{t('onboarding.step3.selectedAircraft')}</p>
                            <p className="font-bold text-white text-lg">{`${selectedJet.brand} ${selectedJet.type}`}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('onboarding.step3.tailNumber')}</label>
                            <input type="text" value={tailNumber} onChange={e => setTailNumber(e.target.value)} required className={inputClasses} placeholder="e.g., OO-JNS" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('onboarding.step3.model')}</label>
                            <input type="text" value={model} onChange={e => setModel(e.target.value)} required className={inputClasses} placeholder="e.g., 7X" />
                        </div>
                        <div className="flex justify-between items-center pt-4">
                             <button type="button" onClick={() => setSelectedJet(null)} className="text-sm font-semibold text-slate-300 hover:text-white">
                                &larr; {t('common.back')}
                            </button>
                            <button type="submit" disabled={!tailNumber || !model} className="py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-slate-500 disabled:cursor-not-allowed">
                                {t('onboarding.step3.addAircraft')}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

const ProfileCompletionStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const { t } = useTranslation();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
         <div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{t('onboarding.step4.title')}</h2>
            <p className="text-slate-400 mb-8 text-center">{t('onboarding.step4.subtitle')}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">{t('onboarding.step4.primaryContact')}</label>
                        <input type="text" required className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">{t('onboarding.step4.phoneNumber')}</label>
                        <input type="tel" required className={inputClasses} />
                    </div>
                </div>
                <div className="pt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{t('onboarding.step4.billingInfo')}</h3>
                     <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('onboarding.step4.companyName')}</label>
                            <input type="text" required className={inputClasses} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('onboarding.step4.address')}</label>
                            <input type="text" required className={inputClasses} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('onboarding.step4.vatNumber')}</label>
                            <input type="text" required className={inputClasses} />
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    <button type="submit" className="w-full py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700">
                        {t('common.saveAndContinue')}
                    </button>
                </div>
            </form>
        </div>
    );
};


const WelcomeStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useTranslation();
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{t('onboarding.step5.title')}</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">{t('onboarding.step5.subtitle')}</p>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">{t('onboarding.step5.tour')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onComplete} className="w-full py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700">
                    {t('common.goToDashboard')}
                </button>
            </div>
        </div>
    );
};

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ user, onComplete }) => {
    const [step, setStep] = useState(2); // Starts after registration (step 1)

    const handleNextStep = () => setStep(s => s + 1);
    
    const renderStepContent = () => {
        switch(step) {
            case 2: return <EmailVerificationStep onNext={handleNextStep} />;
            case 3: return <FleetOnboardingStep onNext={handleNextStep} />;
            case 4: return <ProfileCompletionStep onNext={handleNextStep} />;
            case 5: return <WelcomeStep onComplete={onComplete} />;
            default: return null;
        }
    }
    
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-primary p-4 overflow-hidden">
             <div 
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544012579-679b36f1b34e?q=80&w=2000')" }}
            ></div>
             <div className="w-full max-w-3xl z-10">
                <div className="text-center mb-8">
                    <Logo className="h-12 w-auto mx-auto" />
                </div>
                <div className="bg-accent rounded-lg shadow-md p-6 md:p-8 min-h-[400px] flex flex-col justify-center">
                    {renderStepContent()}
                </div>
             </div>
        </div>
    );
};