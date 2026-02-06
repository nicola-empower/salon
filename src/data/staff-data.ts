import type { EnhancedBooking, ClientRecord, StaffProfile } from '../types/booking'; // Added StaffProfile import
import { BUSY_WEEK_BOOKINGS, EXPANDED_CLIENT_RECORDS } from './expanded-data';
import { STAFF_PROFILES } from './staff-profiles'; // Import the new profiles

export { STAFF_PROFILES }; // Re-export for compatibility

// Mock client records
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
