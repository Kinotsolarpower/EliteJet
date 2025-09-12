import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { XMarkIcon } from './icons/XMarkIcon';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';
import { PhotoIcon } from './icons/PhotoIcon';

interface AddAircraftModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddJet: (newJetData: { name: string; tailNumber: string; brand: string; type: string; version: string; }, photoUrl: string | null) => void;
}

const inputClasses = "w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white";

export const AddAircraftModal: React.FC<AddAircraftModalProps> = ({ isOpen, onClose, onAddJet }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [tailNumber, setTailNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [version, setVersion] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const resetAndClose = () => {
        setName('');
        setTailNumber('');
        setBrand('');
        setType('');
        setVersion('');
        setPdfFile(null);
        setPhotoFile(null);
        setPhotoPreview(null);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddJet({ name, tailNumber, brand, type, version }, photoPreview);
        resetAndClose();
    };
    
    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPdfFile(e.target.files[0]);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setPhotoFile(null);
        setPhotoPreview(null);
        const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-accent rounded-lg shadow-xl w-full max-w-2xl p-6 md:p-8 relative animate-fade-in-up max-h-screen overflow-y-auto">
                <button onClick={resetAndClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">{t('fleet.addAircraftTitle')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('fleet.name')}</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required className={inputClasses} placeholder="e.g., The Falcon" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('fleet.tailNumber')}</label>
                            <input type="text" value={tailNumber} onChange={e => setTailNumber(e.target.value)} required className={inputClasses} placeholder="e.g., OO-JNS" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('fleet.brand')}</label>
                            <input type="text" value={brand} onChange={e => setBrand(e.target.value)} required className={inputClasses} placeholder="e.g., Dassault" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('fleet.type')}</label>
                            <input type="text" value={type} onChange={e => setType(e.target.value)} required className={inputClasses} placeholder="e.g., Falcon" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('fleet.version')}</label>
                            <input type="text" value={version} onChange={e => setVersion(e.target.value)} className={inputClasses} placeholder="e.g., 7X" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {/* Technical Sheet Upload */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('fleet.technicalSheet')}</label>
                            <label htmlFor="pdf-upload" className="cursor-pointer bg-accent-dark border-slate-600 border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center hover:border-secondary transition-colors">
                                <DocumentArrowUpIcon className="h-8 w-8 text-slate-400 mb-2" />
                                <span className="text-sm text-slate-300">{pdfFile ? pdfFile.name : t('fleet.uploadFile')}</span>
                                <input id="pdf-upload" type="file" className="hidden" accept=".pdf" onChange={handlePdfChange} />
                            </label>
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{t('fleet.photo')}</label>
                             {photoPreview ? (
                                <div className="relative group">
                                    <img src={photoPreview} alt="Aircraft preview" className="w-full h-full object-cover rounded-md border-2 border-secondary" />
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Remove photo"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="photo-upload" className="cursor-pointer bg-accent-dark border-slate-600 border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center hover:border-secondary transition-colors">
                                    <PhotoIcon className="h-8 w-8 text-slate-400 mb-2" />
                                    <span className="text-sm font-semibold text-slate-300">{t('fleet.uploadImage')}</span>
                                    <span className="text-xs text-slate-500 mt-1">PNG or JPG</span>
                                    <input id="photo-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handlePhotoChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <button type="button" onClick={resetAndClose} className="py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">{t('common.cancel')}</button>
                        <button type="submit" className="py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">{t('fleet.addAircraft')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};