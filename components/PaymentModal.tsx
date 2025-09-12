import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { Invoice } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';


interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    invoice: Invoice;
    onPaymentSuccess: () => void;
}

const inputClasses = "w-full p-2 bg-accent-dark border-slate-600 border rounded-md shadow-sm focus:ring-secondary focus:border-secondary text-white";

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, invoice, onPaymentSuccess }) => {
    const { t } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate API call to Stripe
        setTimeout(() => {
            setIsProcessing(false);
            setIsPaid(true);
        }, 2000);
    };
    
    const handleClose = () => {
        if(isPaid) {
            onPaymentSuccess();
        }
        onClose();
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-accent rounded-lg shadow-xl w-full max-w-md p-6 md:p-8 relative animate-fade-in-up">
                {!isPaid && (
                    <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                )}
                
                {isPaid ? (
                    <div className="text-center">
                        <CheckCircleIcon className="h-16 w-16 text-secondary mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">{t('paymentModal.successTitle')}</h2>
                        <p className="text-slate-300 mb-6">{t('paymentModal.successMessage')}</p>
                        <button onClick={handleClose} className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                            {t('paymentModal.close')}
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-2">{t('paymentModal.title')}</h2>
                        <p className="text-slate-400 mb-6">
                            {t('paymentModal.pay')} <span className="font-bold text-white">€{invoice.amount.toLocaleString('nl-BE')}</span> {t('paymentModal.forInvoice', [invoice.id])}
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{t('paymentModal.cardNumber')}</label>
                                <input type="text" required className={inputClasses} placeholder="•••• •••• •••• ••••" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('paymentModal.expiryDate')}</label>
                                    <input type="text" required className={inputClasses} placeholder="MM / YY" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('paymentModal.cvc')}</label>
                                    <input type="text" required className={inputClasses} placeholder="CVC" />
                                </div>
                            </div>

                             <div className="pt-6">
                                <button 
                                    type="submit" 
                                    disabled={isProcessing}
                                    className="w-full py-3 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-500 disabled:cursor-wait flex items-center justify-center gap-2"
                                >
                                    <LockClosedIcon className="h-5 w-5" />
                                    {isProcessing ? t('paymentModal.paying') : `${t('paymentModal.pay')} €${invoice.amount.toLocaleString('nl-BE')}`}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};