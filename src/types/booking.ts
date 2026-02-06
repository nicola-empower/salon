// Enhanced booking and staff management types

export interface StaffProfile {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    photo?: string;
    specialties: string[];
    categories: string[]; // Maps to Treatment.category for booking logic
    bio: string;
    yearsExperience: number;
    age: number;
    hobby: string;
    qualifications: string[];
    talkPoint: string;
    workingHours: Record<string, { start: string; end: string } | null>;
    holidayDates: string[]; // ISO date strings
    color?: string; // Hex code for rota personalization
}

export interface ClientRecord {
    id: string;
    name: string;
    email: string;
    phone: string;
    treatmentHistory: TreatmentRecord[];
    consultationNotes: string;
    preferences: string[];
    allergies: string[];
    lastVisit: string;
    clientSince: string;
}

export interface TreatmentRecord {
    id: string;
    date: string;
    staffId: string;
    staffName: string;
    treatment: string;
    duration: number;
    price: number;
    notes: string;
    productsUsed: string[];
}

export interface EnhancedBooking {
    id: string;
    clientId: string;
    clientName: string;
    staffId: string;
    staffName: string;
    treatmentId: string;
    treatmentName: string;
    date: string; // ISO date
    time: string; // HH:mm format
    duration: number; // minutes
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show' | 'break';
    paymentStatus: 'unpaid' | 'deposit' | 'paid' | 'refunded';
    paymentMethod?: 'card' | 'cash' | 'online';
    notes: string;
    createdBy: 'client' | 'staff' | 'receptionist' | 'system';
    createdAt: string;
}

export interface TimeSlot {
    time: string;
    available: boolean;
    booking?: EnhancedBooking;
}

export interface DaySchedule {
    date: string;
    dayOfWeek: string;
    slots: TimeSlot[];
    isWorkingDay: boolean;
    isHoliday: boolean;
}
