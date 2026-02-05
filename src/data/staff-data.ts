import type { StaffProfile, ClientRecord, EnhancedBooking, TreatmentRecord } from '../types/booking';
import { BUSY_WEEK_BOOKINGS, EXPANDED_CLIENT_RECORDS } from './expanded-data';

// Mock staff profiles - Expanded for busy salon
export const STAFF_PROFILES: StaffProfile[] = [
    {
        id: 'staff-1',
        name: 'Sarah Chen',
        role: 'Senior Stylist',
        email: 'sarah.chen@thesalon.com',
        phone: '07700 900123',
        photo: '/staff/sarah.jpg',
        specialties: ['Balayage', 'Colour Correction', 'Bridal Hair'],
        bio: 'Award-winning stylist with 12 years of experience specializing in advanced colour techniques.',
        yearsExperience: 12,
        workingHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '10:00', end: '18:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '10:00', end: '18:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '09:00', end: '15:00' },
            sunday: null
        },
        holidayDates: ['2026-03-15', '2026-03-16', '2026-03-17']
    },
    {
        id: 'staff-2',
        name: 'Marcus Johnson',
        role: 'Master Barber',
        email: 'marcus.j@thesalon.com',
        phone: '07700 900124',
        specialties: ['Classic Cuts', 'Hot Towel Shave', 'Beard Sculpting'],
        bio: 'Traditional barbering with a modern twist. 8 years perfecting the craft.',
        yearsExperience: 8,
        workingHours: {
            monday: null,
            tuesday: { start: '10:00', end: '18:00' },
            wednesday: { start: '10:00', end: '18:00' },
            thursday: { start: '10:00', end: '18:00' },
            friday: { start: '10:00', end: '18:00' },
            saturday: { start: '09:00', end: '16:00' },
            sunday: null
        },
        holidayDates: []
    },
    {
        id: 'staff-3',
        name: 'Priya Patel',
        role: 'Aesthetic Specialist',
        email: 'priya.p@thesalon.com',
        phone: '07700 900125',
        specialties: ['HydraFacial', 'Micro-needling', 'Chemical Peels'],
        bio: 'Certified aesthetician passionate about skin health and rejuvenation.',
        yearsExperience: 6,
        workingHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: null,
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '10:00', end: '14:00' },
            sunday: null
        },
        holidayDates: ['2026-04-01', '2026-04-02', '2026-04-03', '2026-04-04', '2026-04-05']
    },
    {
        id: 'staff-4',
        name: 'Isabella Rodriguez',
        role: 'Nail Technician',
        email: 'bella.r@thesalon.com',
        phone: '07700 900126',
        specialties: ['Gel Extensions', 'Nail Art', 'Russian Manicure'],
        bio: 'Creative nail artist with a passion for intricate designs and flawless finishes.',
        yearsExperience: 5,
        workingHours: {
            monday: { start: '10:00', end: '18:00' },
            tuesday: { start: '10:00', end: '18:00' },
            wednesday: { start: '10:00', end: '18:00' },
            thursday: { start: '10:00', end: '18:00' },
            friday: { start: '10:00', end: '19:00' },
            saturday: { start: '09:00', end: '17:00' },
            sunday: null
        },
        holidayDates: ['2026-02-20', '2026-02-21']
    },
    {
        id: 'staff-5',
        name: 'David Kim',
        role: 'Colour Specialist',
        email: 'david.k@thesalon.com',
        phone: '07700 900127',
        specialties: ['Vivid Colours', 'Platinum Blonde', 'Ombré'],
        bio: 'Innovative colourist known for bold transformations and perfect blondes.',
        yearsExperience: 10,
        workingHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '11:00', end: '19:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '11:00', end: '19:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '09:00', end: '16:00' },
            sunday: null
        },
        holidayDates: []
    },
    {
        id: 'staff-6',
        name: 'Amelia Thompson',
        role: 'Junior Stylist',
        email: 'amelia.t@thesalon.com',
        phone: '07700 900128',
        specialties: ['Blow Drys', 'Cutting', 'Styling'],
        bio: 'Enthusiastic stylist specializing in precision cuts and beautiful blow drys.',
        yearsExperience: 2,
        workingHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '09:00', end: '15:00' },
            sunday: null
        },
        holidayDates: []
    },
    {
        id: 'staff-7',
        name: 'Olivia Bennett',
        role: 'Massage Therapist',
        email: 'olivia.b@thesalon.com',
        phone: '07700 900129',
        specialties: ['Deep Tissue', 'Hot Stone', 'Aromatherapy'],
        bio: 'Holistic therapist focused on relaxation and therapeutic wellness.',
        yearsExperience: 7,
        workingHours: {
            monday: { start: '10:00', end: '18:00' },
            tuesday: { start: '10:00', end: '18:00' },
            wednesday: null,
            thursday: { start: '10:00', end: '18:00' },
            friday: { start: '10:00', end: '18:00' },
            saturday: { start: '10:00', end: '16:00' },
            sunday: null
        },
        holidayDates: ['2026-02-28', '2026-03-01']
    },
    {
        id: 'staff-8',
        name: 'Zara Ahmed',
        role: 'Brow & Lash Specialist',
        email: 'zara.a@thesalon.com',
        phone: '07700 900130',
        specialties: ['Microblading', 'Lash Extensions', 'Brow Lamination'],
        bio: 'Precision expert in semi-permanent makeup and lash artistry.',
        yearsExperience: 4,
        workingHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '09:00', end: '14:00' },
            sunday: null
        },
        holidayDates: []
    }
];

// Mock client records - Expanded dataset
export const CLIENT_RECORDS: ClientRecord[] = EXPANDED_CLIENT_RECORDS;

// Mock bookings for this week - BUSY SALON with 50+ bookings!
export const MOCK_BOOKINGS: EnhancedBooking[] = BUSY_WEEK_BOOKINGS;

// Helper function to get bookings for a specific staff member
export function getStaffBookings(staffId: string, startDate?: string, endDate?: string): EnhancedBooking[] {
    return MOCK_BOOKINGS.filter(booking => {
        if (booking.staffId !== staffId) return false;
        if (startDate && booking.date < startDate) return false;
        if (endDate && booking.date > endDate) return false;
        return true;
    });
}

// Helper function to get client treatment history
export function getClientHistory(clientId: string): ClientRecord | undefined {
    return CLIENT_RECORDS.find(client => client.id === clientId);
}

// Helper function to get staff by ID
export function getStaffById(staffId: string): StaffProfile | undefined {
    return STAFF_PROFILES.find(staff => staff.id === staffId);
}
