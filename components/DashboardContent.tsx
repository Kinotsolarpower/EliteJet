
import React from 'react';
import { MOCK_JETS, MOCK_INVOICES } from '../constants';
import { useTranslation } from '../lib/i18n';
import { View } from './Sidebar';
import { RequestStatus, ServiceRequest, User } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

interface DashboardContentProps {
    user: User;
    requests: ServiceRequest[];
    setActiveView: (view: View) => void;
    onSelectRequest: (request: ServiceRequest) => void;
}

const StatCard: React.FC<{ title: string; value: string; onClick?: () => void; cta?: string }> = ({ title, value, onClick, cta }) => (
    <div className="bg-accent p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-lg font-semibold text-slate-400 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
        {onClick && cta && (
            <button onClick={onClick} className="mt-auto pt-4 text-secondary font-semibold text-left flex items-center gap-2 hover:underline">
                {cta} <ArrowRightIcon className="h-4 w-4" />
            </button>
        )}
    </div>
);

const ActionItem: React.FC<{ text: string, onClick?: () => void }> = ({ text, onClick }) => (
    <div className="flex items-center justify-between p-3 bg-accent-dark rounded-md hover:bg-slate-700">
        <p className="text-sm text-slate-200">{text}</p>
        <button onClick={onClick} className="text-xs font-bold text-secondary hover:underline">VIEW</button>
    </div>
)

export const DashboardContent: React.FC<DashboardContentProps> = ({ user, requests, setActiveView, onSelectRequest }) => {
    const { t } = useTranslation();
    
    const activeRequests = requests.filter(r => [RequestStatus.ASSIGNED, RequestStatus.IN_PROGRESS, RequestStatus.REQUESTED].includes(r.status));
    const pendingActions = requests.filter(r => r.status === RequestStatus.COMPLETED);
    const userRole = user.role;
    
    // Operators should not have 'View Requests' CTAs on stat cards, as they manage the whole system.
    // Clients should be guided to their requests.
    const showRequestCtas = userRole === 'Client';
    const welcomeUser = user.firstName || user.name;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">{t('dashboard.title')}</h1>
            <p className="text-slate-400 mb-6">{t('dashboard.welcome', [welcomeUser])}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard 
                    title={t('dashboard.activeRequests')} 
                    value={activeRequests.length.toString()} 
                    onClick={showRequestCtas ? () => setActiveView('requests') : undefined}
                    cta={showRequestCtas ? t('dashboard.viewRequests') : undefined}
                />
                <StatCard 
                    title={t('dashboard.pendingActions')} 
                    value={pendingActions.length.toString()} 
                    onClick={showRequestCtas ? () => setActiveView('requests') : undefined}
                    cta={showRequestCtas ? t('dashboard.viewRequests') : undefined}
                />
                <StatCard 
                    title={t('dashboard.fleetStatus')} 
                    value={MOCK_JETS.length.toString()}
                    onClick={() => setActiveView('fleet')}
                    cta={t('dashboard.viewFleet')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-accent p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('dashboard.pendingActions')}</h2>
                    <div className="space-y-3">
                        {pendingActions.length > 0 ? (
                            pendingActions.map(req => {
                                const jet = MOCK_JETS.find(j => j.id === req.jetId);
                                return <ActionItem 
                                    key={req.id} 
                                    text={t('dashboard.approveService', [jet?.tailNumber || ''])} 
                                    onClick={() => onSelectRequest(req)} 
                                />
                            })
                        ) : <p className="text-slate-400 text-sm">{t('dashboard.noPendingActions')}</p>}
                    </div>
                </div>

                <div className="bg-accent p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('dashboard.recentInvoices')}</h2>
                    <div className="space-y-3">
                        {MOCK_INVOICES.map(inv => (
                            <div key={inv.id} className="flex items-center justify-between p-3 bg-accent-dark rounded-md">
                                <div className="flex items-center gap-3">
                                    <DocumentTextIcon className="h-6 w-6 text-secondary" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">{inv.id}</p>
                                        <p className="text-xs text-slate-400">{inv.date}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-white">${inv.amount.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                     <button onClick={() => setActiveView('billing')} className="mt-4 text-secondary font-semibold flex items-center gap-2 hover:underline">
                        {t('dashboard.viewInvoices')} <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
