import React from 'react';
import { ServiceRequest } from '../types';
import { STATUS_ORDER, STATUS_CONFIG } from '../constants';
import { useTranslation } from '../lib/i18n';
import { TranslationKey } from '../translations';

interface ProgressBarProps {
    request: ServiceRequest;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ request }) => {
    const { t } = useTranslation();
    const currentStepIndex = STATUS_ORDER.findIndex(s => s === request.status);
    const totalSteps = STATUS_ORDER.length - 1;
    
    // Ensure that even if a status is not in the order (like CANCELLED), we don't get a negative index
    const validStepIndex = Math.max(0, currentStepIndex);
    const progressPercentage = (validStepIndex / totalSteps) * 100;
    
    const statusConfig = STATUS_CONFIG[request.status];

    return (
        <div>
            <div className="flex justify-between mb-1 items-center">
                <span className={`text-xs font-semibold ${statusConfig ? statusConfig.color : 'text-slate-300'}`}>
                    {t(`requestStatus.${request.status}` as TranslationKey)}
                </span>
                <span className="text-xs text-slate-400">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-accent-dark rounded-full h-1.5">
                <div
                    className={`${statusConfig ? statusConfig.bgColor.replace('/20', '') : 'bg-slate-500'} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};
