import React, { useState } from 'react';
import { Invoice } from '../types';
import { useTranslation } from '../lib/i18n';
import { InvoiceRow } from './InvoiceRow';
import { PaymentModal } from './PaymentModal';

interface BillingPageProps {
    invoices: Invoice[];
    onPayInvoice: (invoiceId: string) => void;
}

export const BillingPage: React.FC<BillingPageProps> = ({ invoices, onPayInvoice }) => {
    const { t } = useTranslation();
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    const handlePayClick = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setPaymentModalOpen(true);
    };
    
    const handlePaymentSuccess = () => {
        if (selectedInvoice) {
            onPayInvoice(selectedInvoice.id);
        }
        setPaymentModalOpen(false);
        setSelectedInvoice(null);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">{t('billing.title')}</h1>
            <div className="bg-accent-dark rounded-lg">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-4 text-left text-sm font-bold text-slate-400 uppercase border-b border-accent">
                    <div className="col-span-2">{t('billing.invoiceId')}</div>
                    <div className="col-span-2">{t('billing.date')}</div>
                    <div className="col-span-3">{t('billing.aircraft')}</div>
                    <div className="col-span-2 text-right">{t('billing.amount')}</div>
                    <div className="col-span-1 text-center">{t('billing.status')}</div>
                    <div className="col-span-2 text-right">{t('billing.actions')}</div>
                </div>
                
                {/* Table Body */}
                <div>
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                            <InvoiceRow 
                                key={invoice.id} 
                                invoice={invoice} 
                                onPayClick={() => handlePayClick(invoice)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-16 text-slate-400">
                            <p>{t('billing.noInvoices')}</p>
                        </div>
                    )}
                </div>
            </div>
            {selectedInvoice && (
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setPaymentModalOpen(false)}
                    invoice={selectedInvoice}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};
