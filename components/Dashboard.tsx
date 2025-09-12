

import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar, View } from './Sidebar';
import { FleetManagement } from './FleetManagement';
import { ServiceRequests } from './ServiceRequests';
import { NewRequestModal } from './NewRequestModal';
import { DashboardContent } from './DashboardContent';
import { RequestDetails } from './RequestDetails';
import { ServiceRequest, User, ChecklistItem, RequestStatus, Invoice } from '../types';
import { MOCK_REQUESTS, MOCK_INVOICES } from '../constants';
import { ClientDashboard } from './ClientDashboard';
import { ProviderDashboard } from './ProviderDashboard';
import { ServiceCompletionModal } from './ServiceCompletionModal';
import { BillingPage } from './BillingPage';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [activeView, _setActiveView] = useState<View>('dashboard');
    const [isNewRequestModalOpen, setNewRequestModalOpen] = useState(false);
    const [isCompletionModalOpen, setCompletionModalOpen] = useState(false);
    const [requestToComplete, setRequestToComplete] = useState<ServiceRequest | null>(null);

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_REQUESTS);
    const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);


    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    
    const openNewRequestModal = () => setNewRequestModalOpen(true);

    const setActiveView = (view: View) => {
        _setActiveView(view);
        setSelectedRequest(null); // Deselect request when changing main view
    };

    const handleSelectRequest = (request: ServiceRequest) => {
        setSelectedRequest(request);
    };

    const handleBackToList = () => {
        setSelectedRequest(null);
    }

    const handleAddRequest = (newRequest: ServiceRequest) => {
        setRequests(prev => [newRequest, ...prev]);
    }
    
    const handleUpdateRequest = (updatedRequest: ServiceRequest) => {
        setRequests(prev => prev.map(r => r.id === updatedRequest.id ? updatedRequest : r));
        if (selectedRequest && selectedRequest.id === updatedRequest.id) {
            setSelectedRequest(updatedRequest);
        }
    }
    
    const handleOpenCompletionModal = (request: ServiceRequest) => {
        setRequestToComplete(request);
        setCompletionModalOpen(true);
    };
    
    const handlePayInvoice = (invoiceId: string) => {
        setInvoices(prevInvoices => prevInvoices.map(inv => 
            inv.id === invoiceId 
                ? { ...inv, status: 'Paid', paymentMethod: 'Visa **** 1234', transactionId: `ch_${Date.now()}` }
                : inv
        ));
    };

    const handleCompletionSubmit = (requestId: string, updatedChecklist: ChecklistItem[]) => {
        // Update request with new photos and "COMPLETED" status
        const requestToUpdate = requests.find(r => r.id === requestId);
        if (!requestToUpdate) return;
        
        const updatedRequest: ServiceRequest = {
            ...requestToUpdate,
            checklist: updatedChecklist,
            status: RequestStatus.COMPLETED,
            history: [...requestToUpdate.history, { status: RequestStatus.COMPLETED, timestamp: new Date().toISOString() }]
        };
        handleUpdateRequest(updatedRequest);
        setCompletionModalOpen(false);
        setRequestToComplete(null);
        
        // Simulate backend Veritas AI check
        setTimeout(() => {
            const finalRequest: ServiceRequest = {
                ...updatedRequest,
                veritasStatus: 'CERTIFIED',
                checklist: updatedRequest.checklist.map((item, index) => ({
                    ...item,
                    // Randomly flag one item for demonstration
                    status: index === 1 ? 'FLAGGED' : 'APPROVED' 
                }))
            };
            handleUpdateRequest(finalRequest);
        }, 2500);
    };


    const renderContent = () => {
        if (selectedRequest) {
            return <RequestDetails 
                user={user}
                request={selectedRequest} 
                onBack={handleBackToList} 
                onUpdateRequest={handleUpdateRequest} 
                onCompleteService={handleOpenCompletionModal}
            />
        }

        switch (activeView) {
            case 'fleet':
                return <FleetManagement />;
            case 'requests':
                if (user.role === 'Client') {
                    return <ClientDashboard requests={requests} onSelectRequest={handleSelectRequest} onNewRequest={openNewRequestModal} />;
                }
                 if (user.role === 'Provider') {
                    return <ProviderDashboard user={user} requests={requests} onSelectRequest={handleSelectRequest} />;
                }
                // Operator
                return <ServiceRequests requests={requests} onSelectRequest={handleSelectRequest} />;
            case 'billing':
                return <BillingPage invoices={invoices} onPayInvoice={handlePayInvoice} />;
            case 'settings':
                return <div className="text-white text-3xl">Settings Page</div>;
            case 'dashboard':
            default:
                if (user.role === 'Client') {
                    // For clients, the main dashboard IS their list of requests.
                    return <ClientDashboard requests={requests} onSelectRequest={handleSelectRequest} onNewRequest={openNewRequestModal} />;
                }
                 if (user.role === 'Provider') {
                    return <ProviderDashboard user={user} requests={requests} onSelectRequest={handleSelectRequest} />;
                }
                // Operators see the high-level overview.
                return <DashboardContent user={user} requests={requests} setActiveView={setActiveView} onSelectRequest={handleSelectRequest}/>;
        }
    };

    return (
        <div className="flex h-screen bg-primary text-slate-200">
            <Sidebar 
                user={user}
                activeView={activeView} 
                setActiveView={setActiveView} 
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onLogoClick={onLogout}
            />
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
                <Header 
                    user={user}
                    onLogout={onLogout}
                    onNewRequestClick={openNewRequestModal} 
                    toggleSidebar={toggleSidebar}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    {renderContent()}
                </main>
            </div>
            <NewRequestModal 
                isOpen={isNewRequestModalOpen} 
                onClose={() => setNewRequestModalOpen(false)}
                onAddRequest={handleAddRequest}
            />
            {requestToComplete && (
                <ServiceCompletionModal
                    isOpen={isCompletionModalOpen}
                    onClose={() => setCompletionModalOpen(false)}
                    request={requestToComplete}
                    onSubmit={handleCompletionSubmit}
                />
            )}
        </div>
    );
};