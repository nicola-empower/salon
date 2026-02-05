import type { ClientRecord, EnhancedBooking } from '../types/booking';

// MASSIVE expansion of client records - 15 clients with detailed histories
export const EXPANDED_CLIENT_RECORDS: ClientRecord[] = [
    {
        id: 'client-1',
        name: 'Emma Wilson',
        email: 'emma.w@email.com',
        phone: '07700 900200',
        clientSince: '2024-06-15',
        lastVisit: '2026-02-03',
        consultationNotes: 'Sensitive scalp, prefers ammonia-free colour. Goal: natural-looking highlights with dimension.',
        preferences: ['Quiet environment', 'Herbal tea', 'Morning appointments'],
        allergies: ['PPD (hair dye)', 'Synthetic fragrances'],
        treatmentHistory: [
            {
                id: 'tr-1',
                date: '2026-02-03',
                staffId: 'staff-1',
                staffName: 'Sarah Chen',
                treatment: 'Full Head Highlights',
                duration: 180,
                price: 185,
                notes: 'Used L\'Oréal Inoa 8.1 + 9.1 (30 vol). Beautiful result, client very happy.',
                productsUsed: ['L\'Oréal Inoa 8.1', 'L\'Oréal Inoa 9.1', 'Olaplex No.1']
            },
            {
                id: 'tr-2',
                date: '2025-11-15',
                staffId: 'staff-1',
                staffName: 'Sarah Chen',
                treatment: 'Balayage',
                duration: 210,
                price: 220,
                notes: 'First balayage service. Painted freehand with 20 vol.',
                productsUsed: ['Wella Blondor', 'Olaplex No.1', 'Purple toner']
            }
        ]
    },
    {
        id: 'client-2',
        name: 'James Anderson',
        email: 'j.anderson@email.com',
        phone: '07700 900201',
        clientSince: '2025-03-20',
        lastVisit: '2026-02-01',
        consultationNotes: 'Professional client, prefers clean fade with textured top. Regular 3-week appointments.',
        preferences: ['Saturday mornings', 'Coffee', 'Sport discussions'],
        allergies: [],
        treatmentHistory: [
            {
                id: 'tr-3',
                date: '2026-02-01',
                staffId: 'staff-2',
                staffName: 'Marcus Johnson',
                treatment: 'Skin Fade + Beard Trim',
                duration: 45,
                price: 38,
                notes: 'Grade 2 on top, seamless skin fade. Beard shaped with straight razor.',
                productsUsed: ['American Crew Pomade', 'Beard oil']
            }
        ]
    },
    {
        id: 'client-3',
        name: 'Sophie Martinez',
        email: 'sophie.m@email.com',
        phone: '07700 900202',
        clientSince: '2025-08-10',
        lastVisit: '2026-01-28',
        consultationNotes: 'Combination skin, prone to congestion. Monthly facials for maintenance.',
        preferences: ['Afternoon appointments', 'Relaxing music'],
        allergies: [],
        treatmentHistory: [
            {
                id: 'tr-4',
                date: '2026-01-28',
                staffId: 'staff-3',
                staffName: 'Priya Patel',
                treatment: 'HydraFacial Deluxe',
                duration: 90,
                price: 120,
                notes: 'Extraction phase showed improvement. Recommended bi-weekly for next month.',
                productsUsed: ['HydraFacial serum', 'Vitamin C booster']
            }
        ]
    },
    {
        id: 'client-4',
        name: 'Charlotte Davies',
        email: 'char.d@email.com',
        phone: '07700 900203',
        clientSince: '2024-01-05',
        lastVisit: '2026-01-30',
        consultationNotes: 'Loves bold nail designs. Regular biweekly appointments.',
        preferences: ['Friday evenings', 'Gel extensions', 'Instagram inspiration'],
        allergies: [],
        treatmentHistory: [
            {
                id: 'tr-5',
                date: '2026-01-30',
                staffId: 'staff-4',
                staffName: 'Isabella Rodriguez',
                treatment: 'Gel Extensions + Nail Art',
                duration: 120,
                price: 65,
                notes: 'Chrome french tips with heart accents. Client loves the result!',
                productsUsed: ['Gel Builder', 'Chrome powder', 'Nail art gel']
            }
        ]
    },
    {
        id: 'client-5',
        name: 'Lily Chen',
        email: 'lily.c@email.com',
        phone: '07700 900204',
        clientSince: '2025-09-12',
        lastVisit: '2026-02-04',
        consultationNotes: 'Wants platinum blonde. Currently level 7, needs multiple sessions.',
        preferences: ['Weekday mornings', 'Instagram photos'],
        allergies: [],
        treatmentHistory: [
            {
                id: 'tr-6',
                date: '2026-02-04',
                staffId: 'staff-5',
                staffName: 'David Kim',
                treatment: 'Bleach + Tone',
                duration: 240,
                price: 280,
                notes: 'Session 2 of 3. Now at level 9. Using Olaplex throughout.',
                productsUsed: ['Wella Blondor', 'Olaplex', 'T18 toner']
            }
        ]
    },
];

// BUSY WEEK - 50+ bookings across all staff for this week (Feb 5-11, 2026)
export const BUSY_WEEK_BOOKINGS: EnhancedBooking[] = [
    // THURSDAY FEB 6
    { id: 'b001', clientId: 'client-1', clientName: 'Emma Wilson', staffId: 'staff-1', staffName: 'Sarah Chen', treatmentId: 't1', treatmentName: 'Full Head Highlights', date: '2026-02-06', time: '09:00', duration: 180, price: 185, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-01T10:00:00Z' },
    { id: 'b002', clientId: 'client-2', clientName: 'James Anderson', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't2', treatmentName: 'Skin Fade', date: '2026-02-06', time: '10:00', duration: 45, price: 32, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-04T14:00:00Z' },
    { id: 'b003', clientId: 'client-3', clientName: 'Sophie Martinez', staffId: 'staff-3', staffName: 'Priya Patel', treatmentId: 't3', treatmentName: 'HydraFacial', date: '2026-02-06', time: '14:00', duration: 90, price: 120, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'card', notes: '', createdBy: 'staff', createdAt: '2026-02-05T09:00:00Z' },
    { id: 'b004', clientId: 'client-4', clientName: 'Charlotte Davies', staffId: 'staff-4', staffName: 'Isabella Rodriguez', treatmentId: 't4', treatmentName: 'Gel Manicure', date: '2026-02-06', time: '15:00', duration: 75, price: 45, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-03T11:00:00Z' },
    { id: 'b005', clientId: 'client-5', clientName: 'Lily Chen', staffId: 'staff-5', staffName: 'David Kim', treatmentId: 't5', treatmentName: 'Root Touch-up', date: '2026-02-06', time: '11:00', duration: 120, price: 95, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-02T16:00:00Z' },
    { id: 'b006', clientId: 'c6', clientName: 'Olivia Smith', staffId: 'staff-6', staffName: 'Amelia Thompson', treatmentId: 't6', treatmentName: 'Haircut & Blow Dry', date: '2026-02-06', time: '10:00', duration: 60, price: 55, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-05T10:00:00Z' },
    { id: 'b007', clientId: 'c7', clientName: 'Ava Johnson', staffId: 'staff-7', staffName: 'Olivia Bennett', treatmentId: 't7', treatmentName: 'Deep Tissue Massage', date: '2026-02-06', time: '11:00', duration: 60, price: 75, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'online', notes: '', createdBy: 'client', createdAt: '2026-02-04T19:00:00Z' },
    { id: 'b008', clientId: 'c8', clientName: 'Mia Taylor', staffId: 'staff-8', staffName: 'Zara Ahmed', treatmentId: 't8', treatmentName: 'Lash Extensions', date: '2026-02-06', time: '09:30', duration: 120, price: 95, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-01T15:00:00Z' },

    // Additional Thursday bookings
    { id: 'b009', clientId: 'c9', clientName: 'Noah Williams', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't9', treatmentName: 'Beard Trim', date: '2026-02-06', time: '11:00', duration: 30, price: 22, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-06T09:00:00Z' },
    { id: 'b010', clientId: 'c10', clientName: 'Isabella Brown', staffId: 'staff-1', staffName: 'Sarah Chen', treatmentId: 't10', treatmentName: 'Toner Refresh', date: '2026-02-06', time: '13:00', duration: 60, price: 45, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-05T12:00:00Z' },
    { id: 'b011', clientId: 'c11', clientName: 'Ethan Davis', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't11', treatmentName: 'Hot Towel Shave', date: '2026-02-06', time: '12:00', duration: 45, price: 35, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-05T14:00:00Z' },
    { id: 'b012', clientId: 'c12', clientName: 'Grace Wilson', staffId: 'staff-4', staffName: 'Isabella Rodriguez', treatmentId: 't12', treatmentName: 'Russian Manicure', date: '2026-02-06', time: '11:00', duration: 90, price: 55, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'card', notes: '', createdBy: 'client', createdAt: '2026-02-04T18:00:00Z' },

    // FRIDAY FEB 7
    { id: 'b013', clientId: 'c13', clientName: 'Lucas Martin', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't13', treatmentName: 'Classic Cut', date: '2026-02-07', time: '10:30', duration: 45, price: 32, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-06T16:00:00Z' },
    { id: 'b014', clientId: 'c14', clientName: 'Amelia Garcia', staffId: 'staff-3', staffName: 'Priya Patel', treatmentId: 't14', treatmentName: 'Chemical Peel', date: '2026-02-07', time: '09:00', duration: 75, price: 110, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-03T10:00:00Z' },
    { id: 'b015', clientId: 'c15', clientName: 'Harper Lee', staffId: 'staff-1', staffName: 'Sarah Chen', treatmentId: 't15', treatmentName: 'Balayage', date: '2026-02-07', time: '09:30', duration: 210, price: 220, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'online', notes: '', createdBy: 'client', createdAt: '2026-02-01T09:00:00Z' },
    { id: 'b016', clientId: 'c16', clientName: 'Benjamin Clark', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't16', treatmentName: 'Fade + Beard', date: '2026-02-07', time: '14:00', duration: 60, price: 45, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-07T10:00:00Z' },
    { id: 'b017', clientId: 'c17', clientName: 'Evelyn Moore', staffId: 'staff-4', staffName: 'Isabella Rodriguez', treatmentId: 't17', treatmentName: 'Gel Extensions', date: '2026-02-07', time: '16:00', duration: 120, price: 65, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-05T14:00:00Z' },
    { id: 'b018', clientId: 'c18', clientName: 'Elijah White', staffId: 'staff-5', staffName: 'David Kim', treatmentId: 't18', treatmentName: 'Full Colour', date: '2026-02-07', time: '10:00', duration: 150, price: 165, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-04T11:00:00Z' },
    { id: 'b019', clientId: 'c19', clientName: 'Abigail Harris', staffId: 'staff-6', staffName: 'Amelia Thompson', treatmentId: 't19', treatmentName: 'Restyle', date: '2026-02-07', time: '11:00', duration: 90, price: 75, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-06T12:00:00Z' },
    { id: 'b020', clientId: 'c20', clientName: 'Alexander Walker', staffId: 'staff-7', staffName: 'Olivia Bennett', treatmentId: 't20', treatmentName: 'Sports Massage', date: '2026-02-07', time: '14:00', duration: 75, price: 85, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'card', notes: '', createdBy: 'client', createdAt: '2026-02-05T16:00:00Z' },
    { id: 'b021', clientId: 'c21', clientName: 'Emily Hall', staffId: 'staff-8', staffName: 'Zara Ahmed', treatmentId: 't21', treatmentName: 'Brow Lamination', date: '2026-02-07', time: '12:00', duration: 60, price: 55, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-06T09:00:00Z' },
    { id: 'b022', clientId: 'c22', clientName: 'William Young', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't22', treatmentName: 'Buzz Cut', date: '2026-02-07', time: '16:00', duration: 30, price: 25, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-07T13:00:00Z' },

    // SATURDAY FEB 8 - Busiest day!
    { id: 'b023', clientId: 'c23', clientName: 'Victoria King', staffId: 'staff-1', staffName: 'Sarah Chen', treatmentId: 't23', treatmentName: 'Bridal Trial', date: '2026-02-08', time: '09:00', duration: 120, price: 150, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'card', notes: 'Wedding March 15', createdBy: 'client', createdAt: '2026-01-20T11:00:00Z' },
    { id: 'b024', clientId: 'c24', clientName: 'Daniel Scott', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't24', treatmentName: 'Skin Fade', date: '2026-02-08', time: '09:00', duration: 45, price: 32, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-07T16:00:00Z' },
    { id: 'b025', clientId: 'c25', clientName: 'Madison Green', staffId: 'staff-3', staffName: 'Priya Patel', treatmentId: 't25', treatmentName: 'Micro-needling', date: '2026-02-08', time: '10:00', duration: 90, price: 150, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-02T14:00:00Z' },
    { id: 'b026', clientId: 'c26', clientName: 'Scarlett Adams', staffId: 'staff-4', staffName: 'Isabella Rodriguez', treatmentId: 't26', treatmentName: 'Acrylic Full Set', date: '2026-02-08', time: '09:00', duration: 150, price: 80, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-06T19:00:00Z' },
    { id: 'b027', clientId: 'c27', clientName: 'Sebastian Baker', staffId: 'staff-5', staffName: 'David Kim', treatmentId: 't27', treatmentName: 'Vivid Colour', date: '2026-02-08', time: '09:00', duration: 180, price: 195, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'online', notes: 'Blue to purple ombre', createdBy: 'client', createdAt: '2026-02-04T15:00:00Z' },
    { id: 'b028', clientId: 'c28', clientName: 'Chloe Mitchell', staffId: 'staff-6', staffName: 'Amelia Thompson', treatmentId: 't28', treatmentName: 'Cut & Style', date: '2026-02-08', time: '09:00', duration: 75, price: 65, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-08T08:00:00Z' },
    { id: 'b029', clientId: 'c29', clientName: 'Jack Perez', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't29', treatmentName: 'Classic Cut', date: '2026-02-08', time: '10:00', duration: 45, price: 32, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-07T18:00:00Z' },
    { id: 'b030', clientId: 'c30', clientName: 'Aria Carter', staffId: 'staff-1', staffName: 'Sarah Chen', treatmentId: 't30', treatmentName: 'Highlights', date: '2026-02-08', time: '11:30', duration: 180, price: 185, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-03T15:00:00Z' },
    { id: 'b031', clientId: 'c31', clientName: 'Logan Ross', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't31', treatmentName: 'Fade + Beard', date: '2026-02-08', time: '11:00', duration: 60, price: 45, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-08T09:00:00Z' },
    { id: 'b032', clientId: 'c32', clientName: 'Zoe Campbell', staffId: 'staff-4', staffName: 'Isabella Rodriguez', treatmentId: 't32', treatmentName: 'Gel Manicure + Pedicure', date: '2026-02-08', time: '12:00', duration: 105, price: 70, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-07T12:00:00Z' },
    { id: 'b033', clientId: 'c33', clientName: 'Henry Turner', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't33', treatmentName: 'Hot Towel Shave', date: '2026-02-08', time: '12:00', duration: 45, price: 35, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-08T10:00:00Z' },
    { id: 'b034', clientId: 'c34', clientName: 'Penelope Phillips', staffId: 'staff-5', staffName: 'David Kim', treatmentId: 't34', treatmentName: 'Platinum Blonde', date: '2026-02-08', time: '13:00', duration: 240, price: 295, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'card', notes: 'Session 1 of 2', createdBy: 'client', createdAt: '2026-01-28T11:00:00Z' },
    { id: 'b035', clientId: 'c35', clientName: 'Mason Evans', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't35', treatmentName: 'Skin Fade', date: '2026-02-08', time: '13:00', duration: 45, price: 32, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-08T11:00:00Z' },
    { id: 'b036', clientId: 'c36', clientName: 'Layla Edwards', staffId: 'staff-6', staffName: 'Amelia Thompson', treatmentId: 't36', treatmentName: 'Blow Dry', date: '2026-02-08', time: '11:00', duration: 45, price: 40, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-07T20:00:00Z' },
    { id: 'b037', clientId: 'c37', clientName: 'Carter Collins', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't37', treatmentName: 'Beard Sculpting', date: '2026-02-08', time: '14:00', duration: 45, price: 38, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-08T12:00:00Z' },
    { id: 'b038', clientId: 'c38', clientName: 'Stella Stewart', staffId: 'staff-4', staffName: 'Isabella Rodriguez', treatmentId: 't38', treatmentName: 'Nail Art', date: '2026-02-08', time: '15:00', duration: 90, price: 55, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-06T15:00:00Z' },

    // TUESDAY FEB 10
    { id: 'b039', clientId: 'c39', clientName: 'Levi Morris', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't39', treatmentName: 'Classic Cut', date: '2026-02-10', time: '10:00', duration: 45, price: 32, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-09T14:00:00Z' },
    { id: 'b040', clientId: 'c40', clientName: 'Hannah Rivera', staffId: 'staff-1', staffName: 'Sarah Chen', treatmentId: 't40', treatmentName: 'Root Touch-up', date: '2026-02-10', time: '13:00', duration: 120, price: 95, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-08T16:00:00Z' },
    { id: 'b041', clientId: 'c41', clientName: 'Jackson Cooper', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't41', treatmentName: 'Fade', date: '2026-02-10', time: '11:00', duration: '45', price: 32, status: 'pending', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-10T09:00:00Z' },
    { id: 'b042', clientId: 'c42', clientName: 'Nora Richardson', staffId: 'staff-3', staffName: 'Priya Patel', treatmentId: 't42', treatmentName: 'HydraFacial', date: '2026-02-10', time: '14:00', duration: 90, price: 120, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-07T10:00:00Z' },
    { id: 'b043', clientId: 'c43', clientName: 'Grayson Cox', staffId: 'staff-5', staffName: 'David Kim', treatmentId: 't43', treatmentName: 'Ombré', date: '2026-02-10', time: '14:00', duration: 180, price: 210, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'online', notes: '', createdBy: 'client', createdAt: '2026-02-06T11:00:00Z' },
    { id: 'b044', clientId: 'c44', clientName: 'Riley Howard', staffId: 'staff-4', staffName: 'Isabella Rodriguez', treatmentId: 't44', treatmentName: 'Pedicure', date: '2026-02-10', time: '11:00', duration: 60, price: 40, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-09T18:00:00Z' },
    { id: 'b045', clientId: 'c45', clientName: 'Lincoln Ward', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't45', treatmentName: 'Buzz Cut', date: '2026-02-10', time: '14:00', duration: 30, price: 25, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-10T11:00:00Z' },
    { id: 'b046', clientId: 'c46', clientName: 'Hazel Torres', staffId: 'staff-6', staffName: 'Amelia Thompson', treatmentId: 't46', treatmentName: 'Haircut', date: '2026-02-10', time: '10:00', duration: 60, price: 50, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-08T13:00:00Z' },
    { id: 'b047', clientId: 'c47', clientName: 'Wyatt Peterson', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't47', treatmentName: 'Hot Towel Shave', date: '2026-02-10', time: '15:00', duration: 45, price: 35, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-10T12:00:00Z' },
    { id: 'b048', clientId: 'c48', clientName: 'Luna Gray', staffId: 'staff-7', staffName: 'Olivia Bennett', treatmentId: 't48', treatmentName: 'Aromatherapy Massage', date: '2026-02-10', time: '11:00', duration: 90, price: 95, status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'card', notes: '', createdBy: 'client', createdAt: '2026-02-08T14:00:00Z' },
    { id: 'b049', clientId: 'c49', clientName: 'Maverick Ramirez', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't49', treatmentName: 'Fade + Beard', date: '2026-02-10', time: '16:00', duration: 60, price: 45, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-10T13:00:00Z' },
    { id: 'b050', clientId: 'c50', clientName: 'Aurora James', staffId: 'staff-8', staffName: 'Zara Ahmed', treatmentId: 't50', treatmentName: 'Lash Infills', date: '2026-02-10', time: '12:00', duration: 75, price: 55, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'client', createdAt: '2026-02-09T10:00:00Z' },

    // WEDNESDAY FEB 11
    { id: 'b051', clientId: 'c51', clientName: 'Hudson Bell', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't51', treatmentName: 'Skin Fade', date: '2026-02-11', time: '10:00', duration: 45, price: 32, status: 'pending', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-11T08:00:00Z' },
    { id: 'b052', clientId: 'c52', clientName: 'Violet Brooks', staffId: 'staff-1', staffName: 'Sarah Chen', treatmentId: 't52', treatmentName: 'Balayage Touch-up', date: '2026-02-11', time: '09:00', duration: 150, price: 155, status: 'confirmed', paymentStatus: 'deposit', notes: '', createdBy: 'client', createdAt: '2026-02-09T11:00:00Z' },
    { id: 'b053', clientId: 'c53', clientName: 'Easton Kelly', staffId: 'staff-2', staffName: 'Marcus Johnson', treatmentId: 't53', treatmentName: 'Classic Cut', date: '2026-02-11', time: '11:00', duration: 45, price: 32, status: 'confirmed', paymentStatus: 'unpaid', notes: '', createdBy: 'receptionist', createdAt: '2026-02-10T15:00:00Z' }
];
