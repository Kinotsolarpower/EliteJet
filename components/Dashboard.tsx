import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar, View } from './Sidebar';
import { FleetManagement } from './FleetManagement';
import { ServiceRequests } from './ServiceRequests';
import { NewRequestModal } from './NewRequestModal';
import { DashboardContent } from './DashboardContent';
import { RequestDetails } from './RequestDetails';
import { ServiceRequest } from '../types';
import { MOCK_REQUESTS } from '../constants';

export const Dashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_REQUESTS);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    
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

    const renderContent = () => {
        if (selectedRequest) {
            return <RequestDetails request={selectedRequest} onBack={handleBackToList} onUpdateRequest={handleUpdateRequest} />
        }

        switch (activeView) {
            case 'fleet':
                return <FleetManagement />;
            case 'requests':
                return <ServiceRequests requests={requests} onSelectRequest={handleSelectRequest} />;
            case 'dashboard':
            default:
                return <DashboardContent requests={requests} setActiveView={setActiveView} onSelectRequest={handleSelectRequest}/>;
        }
    };

    return (
        <div className="flex h-screen bg-primary text-slate-200">
            <Sidebar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
                <Header 
                    onNewRequestClick={() => setIsModalOpen(true)} 
                    toggleSidebar={toggleSidebar}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    {renderContent()}
                </main>
            </div>
            <NewRequestModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onAddRequest={handleAddRequest}
            />
        </div>
    );
};