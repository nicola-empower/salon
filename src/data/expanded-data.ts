
import type { ClientRecord, EnhancedBooking } from '../types/booking';
import { STAFF_PROFILES } from './staff-profiles';
import { TREATMENTS } from './mockData';

// --- GENERATED MOCK DATA (Dynamic) ---

// 1. Generate Clients
const NAMES = [
    "Rachel Green", "Monica Geller", "Phoebe Buffay", "Joey Tribbiani", "Chandler Bing", "Ross Geller",
    "Michael Scott", "Dwight Schrute", "Jim Halpert", "Pam Beesly", "Ryan Howard", "Kelly Kapoor",
    "Walter White", "Jesse Pinkman", "Saul Goodman", "Kim Wexler", "Gustavo Fring",
    "Eleven Hopper", "Steve Harrington", "Nancy Wheeler", "Dustin Henderson",
    "Kendall Roy", "Shiv Roy", "Roman Roy", "Logan Roy",
    "Harry Potter", "Hermione Granger", "Ron Weasley", "Luna Lovegood",
    "Carmy Berzatto", "Sydney Adamu", "Richie Jerimovich",
    "Ted Lasso", "Roy Kent", "Keeley Jones", "Rebecca Welton",
    "Thomas Shelby", "Arthur Shelby", "Polly Gray",
    "Geralt of Rivia", "Yennefer of Vengerberg", "Ciri",
    "Wednesday Addams", "Enid Sinclair",
    "Tony Soprano", "Carmela Soprano", "Christopher Moltisanti",
    "Don Draper", "Peggy Olson", "Joan Holloway"
];

export const EXPANDED_CLIENT_RECORDS: ClientRecord[] = NAMES.map((name, i) => ({
    id: `c-${1000 + i}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    phone: `07700 90${(100 + i).toString()}`,
    clientSince: '2024-01-01',
    lastVisit: '2026-01-15',
    consultationNotes: `Regular client. ${i % 3 === 0 ? 'Prefers silent appointments.' : 'Loves to chat.'}`,
    preferences: i % 2 === 0 ? ['Water', 'Magazine'] : ['Coffee', 'Chat'],
    allergies: i % 10 === 0 ? ['Nuts'] : [],
    treatmentHistory: []
}));

// 2. Generate Bookings for a "Busy Week" Template
// We will generate bookings for 7 days relative to a base date.

const generateBusyWeek = (): EnhancedBooking[] => {
    const bookings: EnhancedBooking[] = [];
    const baseDate = new Date('2026-02-01'); // Sunday

    // Helper: Get random item from array
    const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    // Iterate 28 days (full cycle)
    for (let dayOffset = 0; dayOffset < 28; dayOffset++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + dayOffset);
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayOfWeek = currentDate.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase();

        STAFF_PROFILES.forEach(staff => {
            // Check if staff works today
            const hours = staff.workingHours[dayOfWeek as keyof typeof staff.workingHours];
            if (!hours) return;

            // Determine number of bookings for this staff today (3-6)
            const numBookings = Math.floor(Math.random() * 4) + 3;

            // Available treatments for this staff
            const staffTreatments = TREATMENTS.filter(t => staff.categories.includes(t.category));
            if (staffTreatments.length === 0) return;

            // 1. Inject Mandatory Lunch (13:00 - 14:00)
            bookings.push({
                id: `break-lunch-${staff.id}-${dateStr}`,
                clientId: 'internal',
                clientName: 'Lunch Break',
                staffId: staff.id,
                staffName: staff.name,
                treatmentId: 'break',
                treatmentName: 'Lunch', // shown in UI
                date: dateStr,
                time: '13:00',
                duration: 60,
                price: 0,
                status: 'break',
                paymentStatus: 'paid',
                notes: 'Legal Requirement',
                createdBy: 'system',
                createdAt: new Date().toISOString()
            });

            // 2. Inject Bio/Refresh Break (Random 15min slot in afternoon)
            const bioTime = Math.random() > 0.5 ? '11:00' : '16:00';
            bookings.push({
                id: `break-bio-${staff.id}-${dateStr}`,
                clientId: 'internal',
                clientName: 'Personal Care',
                staffId: staff.id,
                staffName: staff.name,
                treatmentId: 'break-short',
                treatmentName: 'Refresh',
                date: dateStr,
                time: bioTime,
                duration: 15, // Using 15 mins but slot logic might block full hour availability in simple model
                price: 0,
                status: 'break',
                paymentStatus: 'paid',
                notes: 'Front of House Maintenance',
                createdBy: 'system',
                createdAt: new Date().toISOString()
            });

            // Generate bookings
            // Create available slots for this staff today to avoid collisions
            const startHour = parseInt(hours.start.split(':')[0]);
            const endHour = parseInt(hours.end.split(':')[0]);
            let availableSlots: string[] = [];

            // Blocked times (Lunch + Bio)
            const blockedTimes = ['13:00', bioTime];

            for (let h = startHour; h < endHour; h++) {
                const timeStr = `${h.toString().padStart(2, '0')}:00`;
                if (!blockedTimes.includes(timeStr)) {
                    availableSlots.push(timeStr);
                }
            }
            // Shuffle
            availableSlots = availableSlots.sort(() => 0.5 - Math.random());

            // Take first N slots
            const slotsToBook = availableSlots.slice(0, numBookings);

            for (let i = 0; i < slotsToBook.length; i++) {
                const treatment = getRandom(staffTreatments);
                const client = getRandom(EXPANDED_CLIENT_RECORDS);

                bookings.push({
                    id: `b-${bookings.length + 1000}`,
                    clientId: client.id,
                    clientName: client.name,
                    staffId: staff.id,
                    staffName: staff.name,
                    treatmentId: treatment.id,
                    treatmentName: treatment.name,
                    date: dateStr,
                    time: slotsToBook[i],
                    duration: treatment.duration,
                    price: treatment.price,
                    status: Math.random() > 0.2 ? 'confirmed' : 'completed',
                    // 20% unpaid, 10% deposit, 70% paid
                    paymentStatus: Math.random() > 0.8 ? 'unpaid' : (Math.random() > 0.9 ? 'deposit' : 'paid'),
                    notes: '',
                    createdBy: Math.random() > 0.5 ? 'client' : 'receptionist',
                    createdAt: '2026-01-01T10:00:00Z'
                });
            }
        });
    }

    return bookings;
};

export const BUSY_WEEK_BOOKINGS = generateBusyWeek();

// Re-export this logic so staff-data.ts can use it (if needed) but staff-data.ts imports BUSY_WEEK_BOOKINGS directly.
