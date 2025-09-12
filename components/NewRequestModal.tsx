import React, { useState } from 'react';
import { MOCK_JETS, SERVICE_PACKAGES, AIRPORT_OPTIONS, URGENCY_OPTIONS } from '../constants';
import { XMarkIcon } from './icons/XMarkIcon';
import { useTranslation } from '../lib/i18n';
import { TranslationKey } from '../translations';
import { ServiceRequest, RequestStatus } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { CheckIcon } from './icons/CheckIcon';

interface NewRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddRequest: (request: ServiceRequest) => void;
}

const WizardStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = [1, 2, 3, 4, 5];
    return (
        <div className="flex items-center w-full max-w-sm mx-auto mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
                        currentStep >= step ? 'bg-secondary text-white' : 'bg-accent-dark text-slate-400 border-2 border-slate-600'
                    }`}>
                        {step}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 transition-colors mx-2 ${
                            currentStep > step ? 'bg-secondary' : 'bg-slate-600'
                        }`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const ServicePackageCard: React.FC<{
    pkg: typeof SERVICE_PACKAGES[0];
    isSelected: boolean;
    onSelect: () => void;
}> = ({ pkg, isSelected, onSelect }) => {
    const { t } = useTranslation();
    const features = t(pkg.featuresKey as TranslationKey) as unknown as string[];

    return (
        <div
            onClick={onSelect}
            className={`relative p-4 md:p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 h-full flex flex-col ${
                isSelected ? 'border-secondary bg-secondary/10' : 'border-slate-700 hover:border-slate-500 bg-accent-dark'
            }`}
        >
            {pkg.isPopular && (
                <div className="absolute top-0 right-4 -mt-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t('newRequest.mostPopular')}
                </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{t(pkg.nameKey as TranslationKey)}</h3>
            <p className="text-xl md:text-2xl font-bold text-slate-300 mb-4">{t(pkg.priceKey as TranslationKey)}</p>
            <ul className="space-y-2 text-sm text-slate-400 flex-grow">
                {(Array.isArray(features) ? features.slice(0, 4) : []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SummaryRow: React.FC<{ label: string, value: string | undefined, onEdit: () => void }> = ({ label, value, onEdit }) => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-between items-center py-3 border-b border-slate-700">
            <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="font-semibold text-white">{value || 'N/A'}</p>
            </div>
            <button type="button" onClick={onEdit} className="text-sm font-semibold text-secondary hover:underline">{t('newRequest.edit')}</button>
        </div>
    );
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({ isOpen, onClose, onAddRequest }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [jet, setJet] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [urgency, setUrgency] = useState<'Standaard' | 'Spoed'>('Standaard');
    const [instructions, setInstructions] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);

    const resetState = () => {
        setStep(1);
        setJet('');
        setServiceType('');
        setLocation('');
        setDateTime('');
        setUrgency('Standaard');
        setInstructions('');
        setTermsAgreed(false);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceName = serviceType ? t(SERVICE_PACKAGES.find(p => p.id === serviceType)?.nameKey as TranslationKey) : 'Unknown Service';
        const newRequest: ServiceRequest = {
            id: `req-${Date.now()}`,
            jetId: jet,
            serviceType: serviceName,
            location,
            dateTime,
            urgency,
            status: RequestStatus.REQUESTED,
            // FIX: The 'photos' property does not exist on ServiceRequest. Replaced with the required 'veritasStatus' property.
            veritasStatus: 'PENDING',
            checklist: [],
            messages: instructions ? [{ id: 'msg-0', sender: 'system', text: `Special Instructions: ${instructions}`, timestamp: new Date().toISOString()}] : [],
            history: [{ status: RequestStatus.REQUESTED, timestamp: new Date().toISOString() }],
        };
        onAddRequest(newRequest);
        setStep(6);
    };
    
    const handleNext = () => setStep(s => s + 1);
    const handlePrev = () => setStep(s => s - 1);
    const goToStep = (stepNum: number) => setStep(stepNum);

    const getStepTitle = (currentStep: number): string => {
        switch (currentStep) {
            case 1: return t('newRequest.step1Title');
            case 2: return t('newRequest.step2Title');
            case 3: return t('newRequest.step3Title');
            case 4: return t('newRequest.step4Title');
            case 5: return t('newRequest.step5Title');
            case 6: return t('newRequest.successTitle');
            default: return t('newRequest.title');
        }
    };
    
    const isNextDisabled = (): boolean => {
        switch(step) {
            case 1: return !jet;
            case 2: return !serviceType;
            case 3: return !location || !dateTime;
            default: return false;
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-accent rounded-lg shadow-xl w-full max-w-4xl p-6 md:p-8 relative animate-fade-in-up max-h-screen overflow-y-auto">
                <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{getStepTitle(step)}</h2>
                
                {step < 6 && <WizardStepper currentStep={step} />}

                <form onSubmit={handleSubmit}>
                    <div className="min-h-[350px]">
                    {step === 1 && (
                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.aircraft')}</label>
                            <select value={jet} onChange={(e) => setJet(e.target.value)} required className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white">
                                <option value="" disabled>{t('newRequest.selectAircraft')}</option>
                                {MOCK_JETS.map(j => <option key={j.id} value={j.id}>{j.name} ({j.tailNumber})</option>)}
                            </select>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {SERVICE_PACKAGES.map(pkg => (
                                    <ServicePackageCard 
                                        key={pkg.id}
                                        pkg={pkg}
                                        isSelected={serviceType === pkg.id}
                                        onSelect={() => setServiceType(pkg.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.location')}</label>
                                 <select value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white">
                                    <option value="" disabled>{t('newRequest.selectAirport')}</option>
                                    {AIRPORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.desiredTime')}</label>
                                <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white" />
                            </div>
                             <div className="col-span-1 md:col-span-2">
                                 <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.urgency')}</label>
                                 <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                                    {URGENCY_OPTIONS.map(opt => (
                                        <label key={opt} className="flex items-center">
                                            <input type="radio" name="urgency" value={opt} checked={urgency === opt} onChange={(e) => setUrgency(e.target.value as 'Standaard' | 'Spoed')} className="focus:ring-secondary h-4 w-4 text-secondary border-slate-600 bg-accent-dark" />
                                            <span className="ml-2 text-slate-200">{t(`newRequest.${opt.toLowerCase()}` as TranslationKey)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                         </div>
                    )}
                    {step === 4 && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.instructions')}</label>
                            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={6} className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white" placeholder={t('newRequest.instructionsPlaceholder')}></textarea>
                        </div>
                    )}
                    {step === 5 && (
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">{t('newRequest.summary')}</h3>
                            <div className="space-y-2">
                                <SummaryRow label={t('newRequest.aircraft')} value={MOCK_JETS.find(j => j.id === jet)?.name} onEdit={() => goToStep(1)} />
                                <SummaryRow label={t('newRequest.serviceType')} value={serviceType ? t(SERVICE_PACKAGES.find(p => p.id === serviceType)?.nameKey as TranslationKey) : ''} onEdit={() => goToStep(2)} />
                                <SummaryRow label={t('newRequest.location')} value={location} onEdit={() => goToStep(3)} />
                                <SummaryRow label={t('newRequest.desiredTime')} value={dateTime ? new Date(dateTime).toLocaleString() : ''} onEdit={() => goToStep(3)} />
                                <SummaryRow label={t('newRequest.urgency')} value={urgency} onEdit={() => goToStep(3)} />
                                <SummaryRow label={t('newRequest.instructions')} value={instructions} onEdit={() => goToStep(4)} />
                            </div>
                             <div className="mt-6">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-accent-dark text-secondary focus:ring-secondary" />
                                    <span className="ml-2 text-sm text-slate-300">{t('newRequest.terms')}</span>
                                </label>
                            </div>
                        </div>
                    )}
                    {step === 6 && (
                        <div className="text-center">
                            <CheckCircleIcon className="h-16 w-16 text-secondary mx-auto mb-4" />
                            <p className="text-slate-300">{t('newRequest.successMessage')}</p>
                        </div>
                    )}
                    </div>
                    
                    <div className="mt-8 flex justify-between items-center">
                        <div>
                            {step > 1 && step < 6 && (
                                <button type="button" onClick={handlePrev} className="py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">{t('common.back')}</button>
                            )}
                        </div>
                        <div>
                            {step < 5 && (
                                <button type="button" onClick={handleNext} disabled={isNextDisabled()} className="py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed">{t('common.next')}</button>
                            )}
                            {step === 5 && (
                                <button type="submit" disabled={!termsAgreed} className="py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed">{t('newRequest.placeRequest')}</button>
                            )}
                            {step === 6 && (
                                <button type="button" onClick={handleClose} className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">{t('newRequest.backToDashboard')}</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};