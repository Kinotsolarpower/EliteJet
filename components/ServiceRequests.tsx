import React from 'react';
import { ServiceRequest } from '../types';
import { useTranslation } from '../lib/i18n';
import { RequestRow } from './RequestRow';

interface ServiceRequestsProps {
    requests: ServiceRequest[];
    onSelectRequest: (request: ServiceRequest) => void;
}

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