import React from 'react';
import { MOCK_JETS, JET_STATUS_CONFIG } from '../constants';
import { Jet } from '../types';
import { useTranslation } from '../lib/i18n';

const JetCard: React.FC<{ jet: Jet }> = ({ jet }) => {
    const { t } = useTranslation();
    const statusConfig = JET_STATUS_CONFIG[jet.status];
    return (
        <div className="bg-accent rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
            <div className="relative">
                <img src={jet.imageUrl} alt={jet.name} className="w-full h-48 object-cover" />
                <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
                    {t(`jetStatus.${jet.status}`)}
                </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white">{jet.name}</h3>
                <p className="text-sm text-slate-400">{jet.model}</p>
                <p className="mt-2 text-xs font-semibold text-slate-200 bg-accent-dark inline-block px-2 py-1 rounded self-start">
                    {jet.tailNumber}
                </p>
                <div className="mt-4 border-t border-accent-dark pt-4 text-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-slate-400">{t('fleet.range')}</span>
                        <span className="font-semibold text-white">{jet.range.toLocaleString()} nm</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">{t('fleet.seats')}</span>
                        <span className="font-semibold text-white">{jet.seats}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">{t('fleet.lastService')}</span>
                        <span className="font-semibold text-white">{jet.lastServiceDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export const FleetManagement: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-white">{t('fleet.title')}</h1>
                <button className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 self-start md:self-auto">
                    {t('fleet.addAircraft')}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_JETS.map((jet) => (
                    <JetCard key={jet.id} jet={jet} />
                ))}
            </div>
        </div>
    );
};