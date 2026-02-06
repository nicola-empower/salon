import type { StaffProfile } from '../types/booking';

export const STAFF_PROFILES: StaffProfile[] = [
    {
        id: 'staff-1',
        name: 'Sarah Chen',
        role: 'Senior Stylist',
        email: 'sarah.chen@thesalon.com',
        phone: '07700 900123',
        photo: '/sarah_chen_stylist_1770326138121.png',
        color: '#FF6B6B', // Coral Red
        specialties: ['Balayage', 'Colour Correction', 'Bridal Hair'],
        categories: ['Hair'],
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
        color: '#4ECDC4', // Teal
        email: 'marcus.j@thesalon.com',
        phone: '07700 900124',
        specialties: ['Classic Cuts', 'Hot Towel Shave', 'Beard Sculpting'],
        categories: ['Hair', 'Aesthetics'],
        bio: 'Traditional barbering with a modern twist. 8 years perfecting the craft.',
        yearsExperience: 8,
        age: 29,
        hobby: 'Classic Car Restoration',
        qualifications: ['NVQ Level 3 Barbering', 'British Master Barbers Accreditation'],
        photo: '/marcus_johnson_barber_1770326151857.png',
        color: '#4ECDC4', // Teal
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
        categories: ['Skincare', 'Aesthetics'],
        bio: 'Certified aesthetician passionate about skin health and rejuvenation.',
        yearsExperience: 6,
        age: 28,
        hobby: 'Yoga Instructor',
        qualifications: ['BSc Dermatology', 'Level 4 Advanced Skin Science', 'VTCT Level 4 Laser'],
        photo: '/priya_patel_aesthetics_1770326165467.png',
        color: '#FFE66D', // Sunny Yellow
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
        categories: ['Nails'],
        bio: 'Creative nail artist with a passion for intricate designs and flawless finishes.',
        yearsExperience: 5,
        age: 26,
        hobby: 'Oil Painting',
        qualifications: ['NVQ Level 3 Nail Services', 'Bio Sculpture Certified', 'Russian Manicure Masterclass'],
        photo: '/isabella_rodriguez_nails_1770326180182.png',
        color: '#FF9F1C', // Orange
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
        categories: ['Hair'],
        bio: 'Innovative colourist known for bold transformations and perfect blondes.',
        yearsExperience: 10,
        age: 32,
        hobby: 'Street Photography',
        qualifications: ['Vidal Sassoon Diploma', 'L\'Oreal Colour Degree', 'Balayage Specialist'],
        photo: '/david_kim_colourist_1770326205641.png',
        color: '#9B5DE5', // Purple
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
        categories: ['Hair'],
        bio: 'Enthusiastic stylist specializing in precision cuts and beautiful blow drys.',
        yearsExperience: 2,
        age: 21,
        hobby: 'Contemporary Dance',
        qualifications: ['NVQ Level 2 Hairdressing', 'Finishing currently NVQ Level 3'],
        photo: '/amelia_thompson_stylist_1770326217397.png',
        color: '#F15BB5', // Pink
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
        categories: ['Body & Wellness'],
        bio: 'Holistic therapist focused on relaxation and therapeutic wellness.',
        yearsExperience: 7,
        age: 30,
        hobby: 'Wild Swimming',
        qualifications: ['ITEC Level 3 Massage', 'Level 4 Sports Massage', 'Aromatherapy Diploma'],
        photo: '/olivia_bennett_massage_1770326228430.png',
        color: '#00BBF9', // Blue
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
        categories: ['Lashes & Brows', 'Waxing', 'Makeup'],
        bio: 'Precision expert in semi-permanent makeup and lash artistry.',
        yearsExperience: 4,
        age: 27,
        hobby: 'Interior Design',
        qualifications: ['NVQ Level 3 Beauty Therapy', 'Phibrows Microblading Artist', 'Nouveau Lashes Certified'],
        photo: '/zara_ahmed_brows_1770326242965.png',
        color: '#9E2A2B', // Dark Red
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
