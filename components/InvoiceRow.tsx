import React from 'react';
import { Invoice, InvoiceStatus } from '../types';
import { useTranslation } from '../lib/i18n';
import { TranslationKey } from '../translations';

interface InvoiceRowProps {
    invoice: Invoice;
    onPayClick: () => void;
}

const statusConfig: { [key in InvoiceStatus]: { color: string; bgColor: string; } } = {
    'Paid': { color: 'text-green-300', bgColor: 'bg-green-500/20' },
    'Due': { color: 'text-yellow-300', bgColor: 'bg-yellow-500/20' },
    'Overdue': { color: 'text-red-300', bgColor: 'bg-red-500/20' },
};

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, onPayClick }) => {
    const { t } = useTranslation();
    const config = statusConfig[invoice.status];

    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 items-center px-6 py-4 border-b border-accent last:border-b-0">
            {/* Invoice ID */}
            <div className="md:col-span-2 col-span-2">
                <p className="font-semibold text-white">{invoice.id}</p>
                <p className="text-sm text-slate-400 md:hidden">{invoice.date}</p>
            </div>
            
            {/* Date (hidden on mobile) */}
            <div className="md:col-span-2 hidden md:block">
                <p className="text-slate-300">{invoice.date}</p>
            </div>
            
            {/* Aircraft */}
            <div className="md:col-span-3 col-span-2">
                <p className="font-semibold text-white">{invoice.jetName}</p>
                <p className="text-sm text-slate-400">{invoice.jetTailNumber} &middot; {invoice.serviceType}</p>
            </div>
            
            {/* Amount */}
            <div className="md:col-span-2 text-left md:text-right font-semibold text-white">
                €{invoice.amount.toLocaleString('nl-BE', { minimumFractionDigits: 2 })}
            </div>
            
            {/* Status */}
            <div className="md:col-span-1 text-center">
                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.bgColor} ${config.color}`}>
                    {t(`invoiceStatus.${invoice.status}` as TranslationKey)}
                </span>
            </div>
            
            {/* Actions */}
            <div className="md:col-span-2 text-right">
                {invoice.status === 'Due' ? (
                     <button onClick={onPayClick} className="bg-secondary hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-md transition-colors text-sm">
                        {t('billing.payNow')}
                    </button>
                ) : (
                    <button className="border border-slate-600 hover:bg-slate-700 text-slate-300 font-semibold py-1.5 px-3 rounded-md transition-colors text-sm">
                        {t('billing.viewReceipt')}
                    </button>
                )}
            </div>
        </div>
    );
};
