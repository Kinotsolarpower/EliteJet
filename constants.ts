import { Jet, ServiceRequest, RequestStatus, JetStatus, Notification, Invoice, User } from './types';

export const MOCK_USER: User = {
    name: 'J. van der Berg',
    role: 'Operator',
    avatarUrl: 'https://picsum.photos/seed/user/100/100',
};

export const MOCK_JETS: Jet[] = [
    {
        id: 'jet-1',
        name: 'The Falcon',
        model: 'Dassault Falcon 7X',
        tailNumber: 'OO-JNS',
        imageUrl: 'https://images.unsplash.com/photo-1628544521471-a4cb31189b8b?q=80&w=800',
        range: 5950,
        seats: 16,
        lastServiceDate: '2024-07-15',
        status: 'Ready',
    },
    {
        id: 'jet-2',
        name: 'Gulfstream',
        model: 'Gulfstream G650',
        tailNumber: 'OO-WIK',
        imageUrl: 'https://images.unsplash.com/photo-1530522137936-ce1634455879?q=80&w=800',
        range: 7500,
        seats: 19,
        lastServiceDate: '2024-05-20',
        status: 'Service Due',
    },
    {
        id: 'jet-3',
        name: 'Global Express',
        model: 'Bombardier Global 6000',
        tailNumber: 'OO-PRV',
        imageUrl: 'https://images.unsplash.com/photo-1618088359282-7d35e577a641?q=80&w=800',
        range: 6000,
        seats: 17,
        lastServiceDate: '2024-08-01',
        status: 'Ready',
    }
];

export const MOCK_REQUESTS: ServiceRequest[] = [
    {
        id: 'req-1',
        jetId: 'jet-1',
        serviceType: 'Exterieur Reiniging',
        location: 'EBBR',
        dateTime: '2024-08-15T14:00',
        urgency: 'Standaard',
        status: RequestStatus.APPROVED,
        provider: 'CleanWings Inc.',
        cost: 2500,
        photos: {
            before: ['https://picsum.photos/seed/before1/400/300', 'https://picsum.photos/seed/before2/400/300'],
            after: ['https://picsum.photos/seed/after1/400/300', 'https://picsum.photos/seed/after2/400/300']
        },
        checklist: [
            { itemKey: 'exterior_wash', completed: true },
            { itemKey: 'windows_polished', completed: true },
            { itemKey: 'landing_gear', completed: true },
        ],
        messages: [],
        history: [
            { status: RequestStatus.REQUESTED, timestamp: '2024-08-10T10:00Z'},
            { status: RequestStatus.ASSIGNED, timestamp: '2024-08-10T12:30Z'},
            { status: RequestStatus.IN_PROGRESS, timestamp: '2024-08-15T14:05Z'},
            { status: RequestStatus.COMPLETED, timestamp: '2024-08-15T18:00Z'},
            { status: RequestStatus.APPROVED, timestamp: '2024-08-16T09:00Z'},
        ]
    },
    {
        id: 'req-2',
        jetId: 'jet-2',
        serviceType: 'Interieur Reiniging',
        location: 'EBAW',
        dateTime: '2024-08-20T09:30',
        urgency: 'Spoed',
        status: RequestStatus.IN_PROGRESS,
        provider: 'AeroShine Belgium',
        cost: 3200,
        photos: {
            before: ['https://picsum.photos/seed/before3/400/300'],
            after: []
        },
        checklist: [
            { itemKey: 'cabin_cleaned', completed: true },
            { itemKey: 'cockpit_detailed', completed: true },
            { itemKey: 'lavatory_sanitized', completed: false },
        ],
        messages: [
            { id: 'msg-1', sender: 'provider', text: 'We have started the interior cleaning for OO-WIK.', timestamp: '2024-08-20T09:35Z' },
            { id: 'msg-2', sender: 'owner', text: 'Thank you for the update. Please pay special attention to the leather seats.', timestamp: '2024-08-20T09:40Z' },
        ],
        history: [
            { status: RequestStatus.REQUESTED, timestamp: '2024-08-19T11:00Z'},
            { status: RequestStatus.ASSIGNED, timestamp: '2024-08-19T11:30Z'},
            { status: RequestStatus.IN_PROGRESS, timestamp: '2024-08-20T09:35Z'},
        ]
    },
    {
        id: 'req-3',
        jetId: 'jet-3',
        serviceType: 'Diepte Reiniging',
        location: 'EBLG',
        dateTime: '2024-08-22T18:00',
        urgency: 'Standaard',
        status: RequestStatus.ASSIGNED,
        provider: 'JetCare Specialists',
        cost: 5500,
        photos: { before: [], after: [] },
        checklist: [],
        messages: [],
        history: [
            { status: RequestStatus.REQUESTED, timestamp: '2024-08-21T15:00Z'},
            { status: RequestStatus.ASSIGNED, timestamp: '2024-08-21T18:00Z'},
        ]
    },
    {
        id: 'req-4',
        jetId: 'jet-1',
        serviceType: 'Onderhoud Interieur',
        location: 'EBBR',
        dateTime: '2024-08-25T11:00',
        urgency: 'Standaard',
        status: RequestStatus.REQUESTED,
        photos: { before: [], after: [] },
        checklist: [],
        messages: [],
        history: [
            { status: RequestStatus.REQUESTED, timestamp: '2024-08-24T09:00Z'},
        ]
    }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n-1', type: 'request', text: 'Service for OO-WIK has started.', timestamp: '2024-08-20T09:35Z', isRead: false },
    { id: 'n-2', type: 'message', text: 'New message from AeroShine Belgium.', timestamp: '2024-08-20T09:35Z', isRead: false },
    { id: 'n-3', type: 'invoice', text: 'Invoice #INV001 for OO-JNS is available.', timestamp: '2024-08-16T10:00Z', isRead: true },
];

export const MOCK_INVOICES: Invoice[] = [
    { id: 'INV001', requestId: 'req-1', amount: 2500, date: '2024-08-16', status: 'Paid' }
];

export const STATUS_CONFIG: { [key in RequestStatus]: { color: string; bgColor: string; } } = {
    [RequestStatus.REQUESTED]: { color: 'text-blue-300', bgColor: 'bg-blue-500/20' },
    [RequestStatus.ASSIGNED]: { color: 'text-indigo-300', bgColor: 'bg-indigo-500/20' },
    [RequestStatus.IN_PROGRESS]: { color: 'text-yellow-300', bgColor: 'bg-yellow-500/20' },
    [RequestStatus.COMPLETED]: { color: 'text-slate-300', bgColor: 'bg-slate-500/20' },
    [RequestStatus.APPROVED]: { color: 'text-green-300', bgColor: 'bg-green-500/20' },
    [RequestStatus.CANCELLED]: { color: 'text-red-300', bgColor: 'bg-red-500/20' },
};

export const STATUS_ORDER: RequestStatus[] = [
    RequestStatus.REQUESTED,
    RequestStatus.ASSIGNED,
    RequestStatus.IN_PROGRESS,
    RequestStatus.COMPLETED,
    RequestStatus.APPROVED
];


export const JET_STATUS_CONFIG: { [key in JetStatus]: { color: string; bgColor: string; } } = {
    'Ready': { color: 'text-green-300', bgColor: 'bg-green-500/20' },
    'Service Due': { color: 'text-yellow-300', bgColor: 'bg-yellow-500/20' },
    'In Service': { color: 'text-blue-300', bgColor: 'bg-blue-500/20' },
};


export const SERVICE_OPTIONS = ["Interieur Reiniging", "Exterieur Reiniging", "Beide", "Diepte Reiniging", "Onderhoud Interieur"];
export const AIRPORT_OPTIONS = ["EBBR (Brussels)", "EBAW (Antwerp)", "EBLG (Liège)", "EBCI (Charleroi)", "EBOS (Ostend-Bruges)"];
export const URGENCY_OPTIONS = ["Standaard", "Spoed"];
export const CHECKLIST_ITEMS = {
    exterior_wash: 'Exterieur gewassen en gedroogd',
    windows_polished: 'Ramen gepolijst',
    landing_gear: 'Landingsgestel gereinigd',
    cabin_cleaned: 'Cabine gestofzuigd en opgeruimd',
    cockpit_detailed: 'Cockpit gedetailleerd',
    lavatory_sanitized: 'Toilet gesaniteerd',
};