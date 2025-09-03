import React from 'react';
import { ServiceRequest, RequestStatus } from '../types';
import { STATUS_ORDER } from '../constants';
import { useTranslation } from '../lib/i18n';
import { TranslationKey } from '../translations';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface StatusStepperProps {
    request: ServiceRequest;
}

const StepperNode: React.FC<{
    status: RequestStatus;
    timestamp?: string;
    isLast?: boolean;
    isActive: boolean;
    isCompleted: boolean;
}> = ({ status, timestamp, isLast, isActive, isCompleted }) => {
    const { t } = useTranslation();

    let nodeClasses = 'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ';
    let textClasses = 'font-semibold transition-colors ';
    let lineClasses = 'w-0.5 h-12 bg-slate-600 mt-1 transition-colors';
    
    if (isCompleted) {
        nodeClasses += 'bg-secondary border-secondary';
        textClasses += 'text-white';
        lineClasses = 'w-0.5 h-12 bg-secondary mt-1';
    } else if (isActive) {
        nodeClasses += 'bg-secondary border-secondary ring-4 ring-secondary/30';
        textClasses += 'text-white';
    } else {
        nodeClasses += 'bg-accent-dark border-slate-600';
        textClasses += 'text-slate-400';
    }
    
    return (
        <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
                <div className={nodeClasses}>
                  {isCompleted && !isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
                {!isLast && <div className={lineClasses}></div>}
            </div>
            <div>
                <p className={textClasses}>{t(`requestStatus.${status}` as TranslationKey)}</p>
                {timestamp && <p className="text-sm text-slate-500">{new Date(timestamp).toLocaleString()}</p>}
            </div>
        </div>
    );
};

export const StatusStepper: React.FC<StatusStepperProps> = ({ request }) => {
    const currentStatusIndex = STATUS_ORDER.findIndex(s => s === request.status);
    const isApproved = request.status === RequestStatus.APPROVED;

    return (
        <div>
            {STATUS_ORDER.map((status, index) => {
                const historyEntry = request.history.find(h => h.status === status);
                return (
                    <StepperNode
                        key={status}
                        status={status}
                        timestamp={historyEntry?.timestamp}
                        isLast={index === STATUS_ORDER.length - 1}
                        isActive={index === currentStatusIndex}
                        isCompleted={index < currentStatusIndex || isApproved}
                    />
                );
            })}
        </div>
    );
};
