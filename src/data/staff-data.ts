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
        photo: '/sarah_chen_stylist_1770326138121.png',
        specialties: ['Balayage', 'Colour Correction', 'Bridal Hair'],
        bio: 'Award-winning stylist with 12 years of experience specializing in advanced colour techniques.',
        yearsExperience: 12,
        age: 34,
        hobby: 'Pottery & Ceramics',
        qualifications: ['NVQ Level 3 Hairdressing', 'Wella Master Colour Expert', 'L\'Oreal Colour Specialist'],
        talkPoint: 'Just returned from a 2-week inspiration trip to Tokyo!',
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
        age: 29,
        hobby: 'Classic Car Restoration',
        qualifications: ['NVQ Level 3 Barbering', 'British Master Barbers Accreditation'],
        // photo field was missing for staff-2, adding it
        photo: '/marcus_johnson_barber_1770326151857.png',
        talkPoint: 'Currently restoring a 1967 Mustang in his spare time.',
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
        age: 28,
        hobby: 'Yoga Instructor',
        qualifications: ['BSc Dermatology', 'Level 4 Advanced Skin Science', 'VTCT Level 4 Laser'],
        photo: '/priya_patel_aesthetics_1770326165467.png',
        talkPoint: 'Running her first London Marathon this year for charity!',
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
        age: 26,
        hobby: 'Oil Painting',
        qualifications: ['NVQ Level 3 Nail Services', 'Bio Sculpture Certified', 'Russian Manicure Masterclass'],
        photo: '/isabella_rodriguez_nails_1770326180182.png',
        talkPoint: 'Having an art exhibition of her paintings next month.',
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
        age: 32,
        hobby: 'Street Photography',
        qualifications: ['Vidal Sassoon Diploma', 'L\'Oreal Colour Degree', 'Balayage Specialist'],
        photo: '/david_kim_colourist_1770326205641.png',
        talkPoint: 'Just adopted a rescue greyhound called \'Vinnie\'.',
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
        age: 21,
        hobby: 'Contemporary Dance',
        qualifications: ['NVQ Level 2 Hairdressing', 'Finishing currently NVQ Level 3'],
        photo: '/amelia_thompson_stylist_1770326217397.png',
        talkPoint: 'Performing in a local dance showcase this weekend.',
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
        age: 30,
        hobby: 'Wild Swimming',
        qualifications: ['ITEC Level 3 Massage', 'Level 4 Sports Massage', 'Aromatherapy Diploma'],
        photo: '/olivia_bennett_massage_1770326228430.png',
        talkPoint: 'Training to swim the English Channel next summer!',
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
        age: 27,
        hobby: 'Interior Design',
        qualifications: ['NVQ Level 3 Beauty Therapy', 'Phibrows Microblading Artist', 'Nouveau Lashes Certified'],
        photo: '/zara_ahmed_brows_1770326242965.png',
        talkPoint: 'Renovating her new Victorian terrace house herself.',
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

// DYNAMIC BOOKING GENERATION LOGIC
// The calendar repeats every 28 days (4 weeks) to ensure it's never empty.

const CYCLE_LENGTH = 28; // 4 weeks
const BASE_DATE = new Date('2026-02-01'); // Start of our template data

function getDaysDiff(d1: Date, d2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((d1.getTime() - d2.getTime()) / oneDay);
}

function generateBookingsForDates(start: Date, end: Date): EnhancedBooking[] {
    const generatedBookings: EnhancedBooking[] = [];
    const templateBookings = BUSY_WEEK_BOOKINGS;

    // Iterate through each day in the requested range
    const current = new Date(start);
    while (current <= end) {
        // Find which day of the 28-cycle this is
        const diff = getDaysDiff(current, BASE_DATE);

        // Handle negative dates (past) correctly with modulo
        let cycleIndex = diff % CYCLE_LENGTH;
        if (cycleIndex < 0) cycleIndex += CYCLE_LENGTH;

        // Calculate the corresponding template date
        const templateDate = new Date(BASE_DATE);
        templateDate.setDate(BASE_DATE.getDate() + cycleIndex);
        const templateDateStr = templateDate.toISOString().split('T')[0];

        // Find all bookings from our template that match this cycle day
        const dayBookings = templateBookings.filter(b => b.date === templateDateStr);

        // Clone and update date
        const currentDateStr = current.toISOString().split('T')[0];

        dayBookings.forEach(template => {
            generatedBookings.push({
                ...template,
                id: `${template.id}-${currentDateStr}`, // Make ID unique per day
                date: currentDateStr,
                // createdBy / createdAt could be adjusted relative to booking date if needed
            });
        });

        // Next day
        current.setDate(current.getDate() + 1);
    }

    return generatedBookings;
}

// Export for backward compatibility (defaults to +/- 1 month from today)
const today = new Date();
const monthStart = new Date(today); monthStart.setDate(today.getDate() - 30);
const monthEnd = new Date(today); monthEnd.setDate(today.getDate() + 30);

export const MOCK_BOOKINGS: EnhancedBooking[] = generateBookingsForDates(monthStart, monthEnd);

// Helper function to get bookings for a specific staff member
export function getStaffBookings(staffId: string, startDate?: string, endDate?: string): EnhancedBooking[] {
    // If specific dates provided, generate for that range
    if (startDate && endDate) {
        const bookings = generateBookingsForDates(new Date(startDate), new Date(endDate));
        return bookings.filter(b => b.staffId === staffId);
    }

    // Default to the pre-generated window if no dates specified (fallback)
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
