
import React, { useState } from 'react';
import { ServiceRequest, RequestStatus } from '../types';
import { useTranslation } from '../lib/i18n';
import { RequestRow } from './RequestRow';
import { TranslationKey } from '../translations';
import { PlusIcon } from './icons/PlusIcon';

type FilterType = 'pending' | 'scheduled' | 'finished';

const filterConfig: { [key in FilterType]: RequestStatus[] } = {
    pending: [RequestStatus.REQUESTED],
    scheduled: [RequestStatus.ASSIGNED, RequestStatus.IN_PROGRESS],
    finished: [RequestStatus.COMPLETED, RequestStatus.APPROVED, RequestStatus.CANCELLED]
};

interface ClientDashboardProps {
    requests: ServiceRequest[];
    onSelectRequest: (request: ServiceRequest) => void;
    onNewRequest: () => void;
}

const FilterButton: React.FC<{
    label: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, count, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                isActive
                    ? 'bg-secondary text-white font-semibold shadow-md'
                    : 'bg-accent-dark text-slate-300 font-medium hover:bg-accent'
            }`}
        >
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${isActive ? 'bg-white/20' : 'bg-slate-700'}`}>
                {count}
            </span>
        </button>
    );
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ requests, onSelectRequest, onNewRequest }) => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState<FilterType>('scheduled');

    const filteredRequests = requests.filter(req => filterConfig[activeFilter].includes(req.status));
    
    const filterTypes: FilterType[] = ['pending', 'scheduled', 'finished'];
    
    // For the empty state, check total requests, not just filtered ones.
    const hasNoRequests = requests.length === 0;

    if (hasNoRequests) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-full bg-accent p-8 rounded-lg">
                 <h1 className="text-3xl font-bold text-white mb-2">{t('dashboard.welcomeEmptyTitle')}</h1>
                 <p className="text-slate-400 mb-8 max-w-md">{t('dashboard.welcomeEmptySubtitle')}</p>
                 <button 
                    onClick={onNewRequest}
                    className="flex items-center justify-center gap-2 py-3 px-8 bg-secondary text-white font-bold rounded-lg hover:bg-green-700 transition-transform hover:scale-105"
                 >
                    <PlusIcon className="h-5 w-5"/>
                    {t('dashboard.welcomeEmptyCta')}
                 </button>
            </div>
        )
    }


    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">{t('requests.title')}</h1>
            
            <div className="flex flex-wrap gap-2 md:gap-4 mb-6 border-b border-accent pb-4">
                {filterTypes.map(filter => (
                     <FilterButton
                        key={filter}
                        label={t(`requests.${filter}` as TranslationKey)}
                        count={requests.filter(req => filterConfig[filter].includes(req.status)).length}
                        isActive={activeFilter === filter}
                        onClick={() => setActiveFilter(filter)}
                    />
                ))}
            </div>

            <div className="bg-accent-dark rounded-lg p-2 md:p-4">
                 <div className="hidden md:grid grid-cols-6 gap-4 items-center mb-4 px-4 text-left text-sm font-bold text-slate-400 uppercase">
                    <div className="col-span-2">{t('requests.aircraft')}</div>
                    <div>{t('requests.service')}</div>
                    <div>{t('requests.locationTime')}</div>
                    <div>{t('requests.status')}</div>
                    <div className="text-right">{t('requests.actions')}</div>
                </div>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                        <RequestRow key={req.id} request={req} onSelect={() => onSelectRequest(req)} />
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-400">
                        <p>{t('dashboard.noActiveRequests')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
