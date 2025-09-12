import { Jet, ServiceRequest, RequestStatus, JetStatus, Notification, Invoice, CrewMember, ChecklistItemStatus, VeritasStatus } from './types';

export const MOCK_JETS: Jet[] = [
    {
        id: 'jet-1',
        name: 'The Falcon',
        brand: 'Dassault',
        type: 'Falcon',
        version: '7X',
        tailNumber: 'OO-JNS',
        imageUrl: '/assets/images/jet1.jpg',
        range: 5950,
        seats: 16,
        lastServiceDate: '2024-07-15',
        status: 'Ready',
    },
    {
        id: 'jet-2',
        name: 'Gulfstream',
        brand: 'Gulfstream',
        type: 'G650',
        version: '',
        tailNumber: 'OO-WIK',
        imageUrl: '/assets/images/jet2.jpg',
        range: 7500,
        seats: 19,
        lastServiceDate: '2024-05-20',
        status: 'Service Due',
    },
    {
        id: 'jet-3',
        name: 'Global Express',
        brand: 'Bombardier',
        type: 'Global',
        version: '6000',
        tailNumber: 'OO-PRV',
        imageUrl: '/assets/images/jet3.jpg',
        range: 6000,
        seats: 17,
        lastServiceDate: '2024-08-01',
        status: 'Ready',
    }
];

export const JET_BRAND_OPTIONS = [
    { brand: 'Dassault', type: 'Falcon', imageUrl: '/assets/images/jet1.jpg' },
    { brand: 'Gulfstream', type: 'G650', imageUrl: '/assets/images/jet2.jpg' },
    { brand: 'Bombardier', type: 'Global', imageUrl: '/assets/images/jet3.jpg' },
    { brand: 'Cessna', type: 'Citation', imageUrl: 'https://images.unsplash.com/photo-1541893361138-28562162a893?q=80&w=800' },
    { brand: 'Embraer', type: 'Praetor', imageUrl: 'https://images.unsplash.com/photo-1614041113234-b5a7885b00a5?q=80&w=800' },
];

export const SERVICE_PACKAGES = [
    {
        id: 'essential',
        nameKey: 'servicePackages.essential.name',
        priceKey: 'servicePackages.essential.price',
        featuresKey: 'servicePackages.essential.features',
        idealForKey: 'servicePackages.essential.idealFor',
        isPopular: false,
    },
    {
        id: 'premium',
        nameKey: 'servicePackages.premium.name',
        priceKey: 'servicePackages.premium.price',
        featuresKey: 'servicePackages.premium.features',
        idealForKey: 'servicePackages.premium.idealFor',
        isPopular: true,
    },
    {
        id: 'elite',
        nameKey: 'servicePackages.elite.name',
        priceKey: 'servicePackages.elite.price',
        featuresKey: 'servicePackages.elite.features',
        idealForKey: 'servicePackages.elite.idealFor',
        isPopular: false,
    }
];

const MOCK_CREW: CrewMember[] = [
    { id: 'cw-1', name: 'Jean-Luc Dubois', role: 'Team Lead', photoUrl: 'https://i.pravatar.cc/150?u=jl', certifications: ['Advanced Detailing', 'Leather Care Specialist'] },
    { id: 'cw-2', name: 'Sophie Leroy', role: 'Detailing Technician', photoUrl: 'https://i.pravatar.cc/150?u=sl', certifications: ['Exterior Polish & Wax', 'Safety Certified'] },
    { id: 'as-1', name: 'Tom Willems', role: 'Interior Specialist', photoUrl: 'https://i.pravatar.cc/150?u=tw', certifications: ['Upholstery Master', 'Wood & Veneer Care'] },
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
        veritasStatus: 'CERTIFIED',
        crew: [MOCK_CREW[0], MOCK_CREW[1]],
        checklist: [
            { itemKey: 'exterior_wash', status: 'APPROVED', beforePhotoUrl: 'https://images.unsplash.com/photo-1621489433241-3533295844a4?q=80&w=400', afterPhotoUrl: 'https://images.unsplash.com/photo-1605600652156-0557297e65b4?q=80&w=400' },
            { itemKey: 'windows_polished', status: 'FLAGGED', beforePhotoUrl: 'https://images.unsplash.com/photo-1577922251203-d52f865a5c43?q=80&w=400', afterPhotoUrl: 'https://images.unsplash.com/photo-1549289297-6353265b0351?q=80&w=400' },
            { itemKey: 'landing_gear', status: 'APPROVED', beforePhotoUrl: 'https://images.unsplash.com/photo-1555531738-9f15041a3946?q=80&w=400', afterPhotoUrl: 'https://images.unsplash.com/photo-1589552632299-1a4a45a89467?q=80&w=400' },
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
        veritasStatus: 'PENDING',
        crew: [MOCK_CREW[2]],
        checklist: [
            { itemKey: 'cabin_cleaned', status: 'APPROVED' },
            { itemKey: 'cockpit_detailed', status: 'PENDING' },
            { itemKey: 'lavatory_sanitized', status: 'PENDING' },
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
        veritasStatus: 'PENDING',
        checklist: [
             { itemKey: 'exterior_wash', status: 'PENDING' },
             { itemKey: 'windows_polished', status: 'PENDING' },
             { itemKey: 'landing_gear', status: 'PENDING' },
             { itemKey: 'cabin_cleaned', status: 'PENDING' },
             { itemKey: 'cockpit_detailed', status: 'PENDING' },
        ],
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
        veritasStatus: 'PENDING',
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
    { 
        id: 'INV001', 
        requestId: 'req-1', 
        amount: 2500, 
        date: '2024-08-16', 
        status: 'Paid',
        jetName: 'The Falcon',
        jetTailNumber: 'OO-JNS',
        serviceType: 'Exterieur Reiniging',
        paymentMethod: 'Visa **** 4242',
        transactionId: 'ch_3PjQ8z...',
    },
    { 
        id: 'INV002', 
        requestId: 'req-2', 
        amount: 3200, 
        date: '2024-08-21', 
        status: 'Due',
        jetName: 'Gulfstream',
        jetTailNumber: 'OO-WIK',
        serviceType: 'Interieur Reiniging',
    }
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