import React, { useState } from 'react';
import { ServiceRequest, Jet, RequestStatus } from '../types';
import { MOCK_JETS, CHECKLIST_ITEMS } from '../constants';
import { useTranslation } from '../lib/i18n';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { StatusStepper } from './StatusStepper';

interface RequestDetailsProps {
    request: ServiceRequest;
    onBack: () => void;
    onUpdateRequest: (request: ServiceRequest) => void;
}

const PhotoCard: React.FC<{ src: string }> = ({ src }) => (
    <img src={src} className="w-full h-32 object-cover rounded-lg shadow-sm" alt="service" />
);


export const RequestDetails: React.FC<RequestDetailsProps> = ({ request, onBack, onUpdateRequest }) => {
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
    
    const handleApproveService = () => {
        const alreadyApproved = request.history.find(h => h.status === RequestStatus.APPROVED);
        if (alreadyApproved) return;
        
        const updatedRequest = {
            ...request,
            status: RequestStatus.APPROVED,
            history: [...request.history, { status: RequestStatus.APPROVED, timestamp: new Date().toISOString() }]
        };
        onUpdateRequest(updatedRequest);
    };

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
                    {/* Photo Gallery */}
                    <div className="bg-accent p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('requestDetails.photoGallery')}</h2>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                                <h3 className="font-bold text-white mb-2">{t('requestDetails.before')}</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {request.photos.before.length > 0 ? request.photos.before.map((p, i) => <PhotoCard key={i} src={p}/>) : <p className="text-sm text-slate-500 col-span-2">No photos yet.</p>}
                                </div>
                           </div>
                           <div>
                                <h3 className="font-bold text-white mb-2">{t('requestDetails.after')}</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {request.photos.after.length > 0 ? request.photos.after.map((p, i) => <PhotoCard key={i} src={p}/>) : <p className="text-sm text-slate-500 col-span-2">No photos yet.</p>}
                                </div>
                           </div>
                        </div>
                    </div>

                    {/* Checklist */}
                     <div className="bg-accent p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('requestDetails.checklist')}</h2>
                         <div className="space-y-3">
                             {request.checklist.length > 0 ? request.checklist.map(item => (
                                 <div key={item.itemKey} className={`flex items-center p-3 rounded-md ${item.completed ? 'bg-green-500/20 text-green-300' : 'bg-accent-dark text-slate-300'}`}>
                                     <CheckCircleIcon className={`h-6 w-6 mr-3 ${item.completed ? 'text-secondary' : 'text-slate-600'}`} />
                                     <span>{CHECKLIST_ITEMS[item.itemKey as keyof typeof CHECKLIST_ITEMS]}</span>
                                 </div>
                             )) : <p className="text-sm text-slate-500">No checklist for this service type.</p>}
                         </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-accent p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('requestDetails.statusTimeline')}</h2>
                        <StatusStepper request={request} />
                    </div>

                    <div className="bg-accent p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-slate-300 mb-4">{t('requestDetails.chat')}</h2>
                        <div className="h-48 overflow-y-auto bg-accent-dark p-3 rounded-md mb-4 space-y-3">
                           {request.messages.map(msg => (
                               <div key={msg.id} className={`flex ${msg.sender === 'owner' ? 'justify-end' : 'justify-start'}`}>
                                   <div className={`p-2 rounded-lg max-w-xs ${msg.sender === 'owner' ? 'bg-secondary text-white' : 'bg-slate-700 text-slate-200 shadow-sm'}`}>
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
                    
                     {request.status === RequestStatus.COMPLETED && (
                        <div className="bg-accent p-6 rounded-lg shadow-md">
                            <button onClick={handleApproveService} className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-3">{t('requestDetails.approveService')}</button>
                            <button className="w-full py-2 px-4 bg-slate-600 text-slate-200 font-semibold rounded-lg hover:bg-slate-700 transition-colors">{t('requestDetails.requestChanges')}</button>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};