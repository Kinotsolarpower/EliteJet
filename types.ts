export enum RequestStatus {
    REQUESTED = 'REQUESTED',
    ASSIGNED = 'ASSIGNED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    APPROVED = 'APPROVED',
    CANCELLED = 'CANCELLED'
}

export type JetStatus = 'Ready' | 'Service Due' | 'In Service';

export interface Jet {
    id: string;
    name: string;
    model: string;
    tailNumber: string;
    imageUrl: string;
    range: number; // in nautical miles
    seats: number;
    lastServiceDate: string; // YYYY-MM-DD
    status: JetStatus;
}

export interface ServiceRequest {
    id: string;
    jetId: string;
    serviceType: string;
    location: string;
    dateTime: string;
    urgency: 'Standaard' | 'Spoed';
    status: RequestStatus;
    provider?: string;
    cost?: number;
    photos: {
        before: string[];
        after: string[];
    };
    checklist: { itemKey: string; completed: boolean }[];
    messages: {
        id: string;
        sender: 'owner' | 'provider' | 'system';
        text: string;
        timestamp: string;
    }[];
    history: {
        status: RequestStatus;
        timestamp: string;
    }[];
}

export interface Notification {
    id: string;
    type: 'request' | 'message' | 'invoice';
    text: string;
    timestamp: string;
    isRead: boolean;
}

export interface Invoice {
    id: string;
    requestId: string;
    amount: number;
    date: string;
    status: 'Paid' | 'Due';
}

export interface User {
    name: string;
    role: string;
    avatarUrl: string;
}