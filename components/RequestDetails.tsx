import React, { useState } from 'react';
import { ServiceRequest, Jet, RequestStatus, CrewMember, ChecklistItem, User } from '../types';
import { MOCK_JETS, CHECKLIST_ITEMS } from '../constants';
import { useTranslation } from '../lib/i18n';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { StatusStepper } from './StatusStepper';
import { VeritasCertifiedIcon } from './icons/VeritasCertifiedIcon';
import { IdentificationIcon } from './icons/IdentificationIcon';
import { FlagIcon } from './icons/FlagIcon';
import { TranslationKey } from '../translations';

interface RequestDetailsProps {
    user: User;
    request: ServiceRequest;
    onBack: () => void;
    onUpdateRequest: (request: ServiceRequest) => void;
    onCompleteService: (request: ServiceRequest) => void;
}

const DiscreetCrewPassport: React.FC<{ crew: CrewMember[] }> = ({ crew }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-accent p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-300 mb-4 flex items-center">
                <IdentificationIcon className="h-6 w-6 mr-3 text-secondary"/>
                {t('requestDetails.discreetCrewPassport')}
            </h2>
            <div className="space-y-4">
                {crew.map(member => (
                    <div key={member.id} className="flex items-center gap-4">
                        <img src={member.photoUrl} alt={member.name} className="h-14 w-14 rounded-full object-cover"/>
                        <div>
                            <p className="font-bold text-white">{member.name}</p>
                            <p className="text-sm text-slate-400">{member.role}</p>
                            <p className="text-xs text-slate-500 mt-1">
                                <span className="font-semibold">{t('requestDetails.certifications')}: </span> 
                                {member.certifications.join(', ')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

const VeritasChecklistItem: React.FC<{ item: ChecklistItem }> = ({ item }) => {
    const { t } = useTranslation();

    const statusConfig = {
        'APPROVED': { icon: <CheckCircleIcon className="h-6 w-6 text-secondary" />, color: 'text-green-300', bgColor: 'bg-green-500/10' },
        'FLAGGED': { icon: <FlagIcon className="h-6 w-6 text-yellow-400" />, color: 'text-yellow-300', bgColor: 'bg-yellow-500/10' },
        'PENDING': { icon: <CheckCircleIcon className="h-6 w-6 text-slate-600" />, color: 'text-slate-400', bgColor: 'bg-accent-dark' },
    }

    const config = statusConfig[item.status];
    
    return (
        <div className="py-4 border-b border-accent-dark last:border-b-0">
             <div className={`flex items-center p-3 rounded-md mb-4 ${config.bgColor}`}>
                {config.icon}
                <div className="ml-4 flex-1">
                    <p className={`font-semibold ${config.color}`}>{CHECKLIST_ITEMS[item.itemKey as keyof typeof CHECKLIST_ITEMS]}</p>
                    <p className={`text-sm ${config.color}/80`}>{t(`requestDetails.itemStatus.${item.status.toLowerCase()}` as TranslationKey)}</p>
                </div>
            </div>
            {(item.beforePhotoUrl || item.afterPhotoUrl) && (
                <div className="grid grid-cols-2 gap-4 mt-2 px-3">
                    <div>
                        <h4 className="font-semibold text-slate-300 text-sm mb-2">{t('requestDetails.before')}</h4>
                        {item.beforePhotoUrl ? <img src={item.beforePhotoUrl} className="w-full h-32 object-cover rounded-lg" alt="Before"/> : <div className="w-full h-32 bg-accent-dark rounded-lg flex items-center justify-center text-slate-500 text-sm">N/A</div>}
                    </div>
                     <div>
                        <h4 className="font-semibold text-slate-300 text-sm mb-2">{t('requestDetails.after')}</h4>
                        {item.afterPhotoUrl ? <img src={item.afterPhotoUrl} className="w-full h-32 object-cover rounded-lg" alt="After"/> : <div className="w-full h-32 bg-accent-dark rounded-lg flex items-center justify-center text-slate-500 text-sm">N/A</div>}
                    </div>
                </div>
            )}
        </div>
    )
};

const VeritasQualityReport: React.FC<{ request: ServiceRequest }> = ({ request }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-accent p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-300">{t('requestDetails.veritasReport')}</h2>
                </div>
                {request.veritasStatus === 'CERTIFIED' && (
                     <div className="flex items-center gap-2 bg-green-500/20 text-green-300 font-semibold px-3 py-1 rounded-full text-sm">
                        <VeritasCertifiedIcon className="h-5 w-5"/>
                        <span>{t('requestDetails.veritasCertified')}</span>
                     </div>
                )}
            </div>
             <div>
                {request.checklist.length > 0 ? request.checklist.map(item => (
                    <VeritasChecklistItem key={item.itemKey} item={item} />
                )) : <p className="text-sm text-slate-500 py-8 text-center">No checklist for this service type.</p>}
            </div>
        </div>
    );
};

export const RequestDetails: React.FC<RequestDetailsProps> = ({ user, request, onBack, onUpdateRequest, onCompleteService }) => {
    const { t } = useTranslation();
    const jet = MOCK_JETS.find(j => j.id === request.jetId) as Jet;
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (!message.trim()) return;
        const newMessage = {
            id: `msg-${Date.now()}`,
            sender: 'owner' as const,
            text: message,
            timestamp: new Date().toISOString()
        };
        onUpdateRequest({ ...request, messages: [...request.messages, newMessage] });
        setMessage('');
    };
    
    const handleUpdateStatus = (newStatus: RequestStatus) => {
         const alreadyExists = request.history.find(h => h.status === newStatus);
        if (alreadyExists) return;
        
        const updatedRequest = {
            ...request,
            status: newStatus,
            history: [...request.history, { status: newStatus, timestamp: new Date().toISOString() }]
        };
        onUpdateRequest(updatedRequest);
    };

    const renderProviderActions = () => {
        if (user.role !== 'Provider') return null;

        switch (request.status) {
            case RequestStatus.ASSIGNED:
                return (
                    <button onClick={() => handleUpdateStatus(RequestStatus.IN_PROGRESS)} className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        {t('requestDetails.providerActions.startService')}
                    </button>
                );
            case RequestStatus.IN_PROGRESS:
                 return (
                    <button onClick={() => onCompleteService(request)} className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        {t('requestDetails.providerActions.completeService')}
                    </button>
                );
            default:
                return null;
        }
    };
    
    const renderClientActions = () => {
        if (user.role !== 'Client') return null;
        
        if (request.status === RequestStatus.COMPLETED) {
            return (
                <>
                    <button onClick={() => handleUpdateStatus(RequestStatus.APPROVED)} className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-3">
                        {t('requestDetails.approveService')}
                    </button>
                    <button className="w-full py-2 px-4 bg-slate-600 text-slate-200 font-semibold rounded-lg hover:bg-slate-700 transition-colors">
                        {t('requestDetails.requestChanges')}
                    </button>
                </>
            )
        }
        return null;
    }


    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white mb-6">
                <ArrowLeftIcon className="h-4 w-4" />
                {t('requestDetails.back')}
            </button>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">{request.serviceType} for {jet.name}</h1>
                <p className="text-slate-400">{jet.tailNumber} at {request.location}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                   <VeritasQualityReport request={request} />
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-accent p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('requestDetails.statusTimeline')}</h2>
                        <StatusStepper request={request} />
                    </div>

                    {request.crew && request.crew.length > 0 && (
                        <DiscreetCrewPassport crew={request.crew} />
                    )}
                    
                    {(renderClientActions() || renderProviderActions()) && (
                        <div className="bg-accent p-6 rounded-lg shadow-md">
                            {renderClientActions()}
                            {renderProviderActions()}
                        </div>
                    )}


                    <div className="bg-accent p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('requestDetails.chat')}</h2>
                        <div className="h-48 overflow-y-auto bg-accent-dark p-3 rounded-md mb-4 space-y-3">
                           {request.messages.map(msg => (
                               <div key={msg.id} className={`flex ${msg.sender === user.role.toLowerCase() ? 'justify-end' : 'justify-start'}`}>
                                   <div className={`p-2 rounded-lg max-w-xs ${msg.sender === user.role.toLowerCase() ? 'bg-secondary text-white' : 'bg-slate-700 text-slate-200 shadow-sm'}`}>
                                       <p className="text-sm">{msg.text}</p>
                                   </div>
                               </div>
                           ))}
                        </div>
                        <div className="flex gap-2">
                            <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder={t('requestDetails.typeMessage')} className="flex-1 p-2 bg-accent-dark border-slate-600 border rounded-md text-white" />
                            <button onClick={handleSendMessage} className="py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700">{t('requestDetails.sendMessage')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};