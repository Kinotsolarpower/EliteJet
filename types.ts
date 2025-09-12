

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
    brand: string;
    type: string;
    version: string;
    tailNumber: string;
    imageUrl: string;
    range: number; // in nautical miles
    seats: number;
    lastServiceDate: string; // YYYY-MM-DD
    status: JetStatus;
}

export interface CrewMember {
    id: string;
    name: string;
    role: string;
    photoUrl: string;
    certifications: string[];
}

export type ChecklistItemStatus = 'PENDING' | 'APPROVED' | 'FLAGGED';

export interface ChecklistItem {
    itemKey: string;
    status: ChecklistItemStatus;
    beforePhotoUrl?: string;
    afterPhotoUrl?: string;
}

export type VeritasStatus = 'PENDING' | 'CERTIFIED' | 'NEEDS_REVIEW';


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
    veritasStatus: VeritasStatus;
    checklist: ChecklistItem[];
    crew?: CrewMember[];
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

export type InvoiceStatus = 'Paid' | 'Due' | 'Overdue';

export interface Invoice {
    id: string;
    requestId: string;
    jetName: string;
    jetTailNumber: string;
    serviceType: string;
    amount: number;
    date: string;
    status: InvoiceStatus;
    paymentMethod?: string;
    transactionId?: string;
}


export interface User {
    name: string; // This can be company name or full name
    firstName?: string;
    lastName?: string;
    companyName?: string;
    role: 'Operator' | 'Client' | 'Provider';
    avatarUrl: string;
    onboardingCompleted: boolean;
}