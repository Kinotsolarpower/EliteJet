import React from 'react';
import { MOCK_JETS } from '../constants';
import { ServiceRequest } from '../types';
import { useTranslation } from '../lib/i18n';
import { ProgressBar } from './ProgressBar';

interface ServiceRequestsProps {
    requests: ServiceRequest[];
    onSelectRequest: (request: ServiceRequest) => void;
}

const RequestRow: React.FC<{ request: ServiceRequest, onSelect: () => void }> = ({ request, onSelect }) => {
    const { t } = useTranslation();
    const jet = MOCK_JETS.find(j => j.id === request.jetId);

    return (
        <div 
            className="bg-accent rounded-lg p-4 grid grid-cols-2 md:grid-cols-6 gap-4 items-center mb-4 transition-all hover:shadow-md hover:ring-2 hover:ring-secondary ring-transparent cursor-pointer"
            onClick={onSelect}
        >
            <div className="md:col-span-2 col-span-2">
                <p className="font-bold text-white">{jet?.name || 'Unknown Jet'}</p>
                <p className="text-sm text-slate-400">{jet?.tailNumber}</p>
            </div>
            <div className="col-span-1">
                <p className="font-semibold text-slate-200">{request.serviceType}</p>
            </div>
            <div className="col-span-1">
                <p className="text-slate-300">{request.location}</p>
                <p className="text-sm text-slate-400">{new Date(request.dateTime).toLocaleString()}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
                <ProgressBar request={request} />
            </div>
            <div className="text-right col-span-2 md:col-span-1">
                <button className="text-secondary font-semibold hover:underline">{t('requests.details')}</button>
            </div>
        </div>
    );
};


export const ServiceRequests: React.FC<ServiceRequestsProps> = ({ requests, onSelectRequest }) => {
    const { t } = useTranslation();
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">{t('requests.title')}</h1>
            <div className="bg-accent-dark rounded-lg p-2 md:p-4">
                 <div className="hidden md:grid grid-cols-6 gap-4 items-center mb-4 px-4 text-left text-sm font-bold text-slate-400 uppercase">
                    <div className="col-span-2">{t('requests.aircraft')}</div>
                    <div>{t('requests.service')}</div>
                    <div>{t('requests.locationTime')}</div>
                    <div>{t('requests.status')}</div>
                    <div className="text-right">{t('requests.actions')}</div>
                </div>
                {requests.map((req) => (
                    <RequestRow key={req.id} request={req} onSelect={() => onSelectRequest(req)} />
                ))}
            </div>
        </div>
    );
};