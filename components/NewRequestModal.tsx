import React, { useState } from 'react';
import { MOCK_JETS, SERVICE_OPTIONS, AIRPORT_OPTIONS, URGENCY_OPTIONS } from '../constants';
import { XMarkIcon } from './icons/XMarkIcon';
import { useTranslation } from '../lib/i18n';
import { TranslationKey } from '../translations';
import { ServiceRequest, RequestStatus } from '../types';

interface NewRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddRequest: (request: ServiceRequest) => void;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({ isOpen, onClose, onAddRequest }) => {
    const { t } = useTranslation();
    const [jet, setJet] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [urgency, setUrgency] = useState<'Standaard' | 'Spoed'>('Standaard');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: ServiceRequest = {
            id: `req-${Date.now()}`,
            jetId: jet,
            serviceType,
            location,
            dateTime,
            urgency,
            status: RequestStatus.REQUESTED,
            photos: { before: [], after: [] },
            checklist: [],
            messages: [],
            history: [{ status: RequestStatus.REQUESTED, timestamp: new Date().toISOString() }],
        };
        onAddRequest(newRequest);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-accent rounded-lg shadow-xl w-full max-w-2xl p-6 md:p-8 relative animate-fade-in-up max-h-screen overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">{t('newRequest.title')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Aircraft Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.aircraft')}</label>
                            <select value={jet} onChange={(e) => setJet(e.target.value)} required className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white">
                                <option value="" disabled>{t('newRequest.selectAircraft')}</option>
                                {MOCK_JETS.map(j => <option key={j.id} value={j.id}>{j.name} ({j.tailNumber})</option>)}
                            </select>
                        </div>

                        {/* Service Type */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.serviceType')}</label>
                            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} required className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white">
                                <option value="" disabled>{t('newRequest.selectService')}</option>
                                {SERVICE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        
                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.location')}</label>
                             <select value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white">
                                <option value="" disabled>{t('newRequest.selectAirport')}</option>
                                {AIRPORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        
                        {/* Date/Time */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.desiredTime')}</label>
                            <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white" />
                        </div>
                        
                        {/* Urgency */}
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

                        {/* Special Instructions */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('newRequest.instructions')}</label>
                            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={4} className="w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white" placeholder={t('newRequest.instructionsPlaceholder')}></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">{t('common.cancel')}</button>
                        <button type="submit" className="py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">{t('common.submit')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};