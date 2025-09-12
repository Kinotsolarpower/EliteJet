
import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { ServiceRequest, ChecklistItem } from '../types';
import { CHECKLIST_ITEMS } from '../constants';
import { XMarkIcon } from './icons/XMarkIcon';
import { PhotoIcon } from './icons/PhotoIcon';

interface ServiceCompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: ServiceRequest;
    onSubmit: (requestId: string, updatedChecklist: ChecklistItem[]) => void;
}

const ChecklistPhotoUpload: React.FC<{
    item: ChecklistItem;
    onPhotoChange: (itemKey: string, type: 'before' | 'after', dataUrl: string) => void;
}> = ({ item, onPhotoChange }) => {
    const { t } = useTranslation();
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onPhotoChange(item.itemKey, type, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const UploadButton = ({ type }: { type: 'before' | 'after' }) => {
        const photoUrl = type === 'before' ? item.beforePhotoUrl : item.afterPhotoUrl;
        const label = type === 'before' ? t('completionModal.uploadBefore') : t('completionModal.uploadAfter');
        const inputId = `${item.itemKey}-${type}-upload`;
        
        return (
            <div className="w-full">
                {photoUrl ? (
                    <img src={photoUrl} alt={type} className="w-full h-24 object-cover rounded-md" />
                ) : (
                    <label htmlFor={inputId} className="cursor-pointer bg-accent-dark border-slate-600 border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center hover:border-secondary transition-colors h-24">
                        <PhotoIcon className="h-6 w-6 text-slate-400 mb-1" />
                        <span className="text-xs font-semibold text-slate-300">{label}</span>
                        <input id={inputId} type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e, type)} />
                    </label>
                )}
            </div>
        );
    };

    return (
        <div className="p-3 bg-accent rounded-lg">
            <p className="font-semibold text-white mb-3">{CHECKLIST_ITEMS[item.itemKey as keyof typeof CHECKLIST_ITEMS]}</p>
            <div className="flex gap-4">
                <UploadButton type="before" />
                <UploadButton type="after" />
            </div>
        </div>
    );
};

export const ServiceCompletionModal: React.FC<ServiceCompletionModalProps> = ({ isOpen, onClose, request, onSubmit }) => {
    const { t } = useTranslation();
    const [checklist, setChecklist] = useState<ChecklistItem[]>(request.checklist);
    
    const handlePhotoChange = (itemKey: string, type: 'before' | 'after', dataUrl: string) => {
        setChecklist(prev => prev.map(item => 
            item.itemKey === itemKey ? { ...item, [`${type}PhotoUrl`]: dataUrl } : item
        ));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(request.id, checklist);
    };

    const isSubmitDisabled = checklist.some(item => !item.beforePhotoUrl || !item.afterPhotoUrl);

    if (!isOpen) return null;

    return (
         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-accent-dark rounded-lg shadow-xl w-full max-w-2xl p-6 md:p-8 relative animate-fade-in-up max-h-screen flex flex-col">
                 <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">{t('completionModal.title')}</h2>
                <p className="text-slate-400 mb-6">{t('completionModal.subtitle')}</p>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2">
                   <div className="space-y-4">
                        {checklist.map(item => (
                            <ChecklistPhotoUpload key={item.itemKey} item={item} onPhotoChange={handlePhotoChange} />
                        ))}
                   </div>
                   <div className="mt-8 pt-6 border-t border-accent flex justify-end">
                        <button 
                            type="submit" 
                            disabled={isSubmitDisabled}
                            className="py-2 px-6 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
                        >
                            {t('completionModal.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

};
