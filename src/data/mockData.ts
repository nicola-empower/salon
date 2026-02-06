export interface Treatment {
  id: string;
  name: string;
  category: 'Aesthetics' | 'Skincare' | 'Body & Wellness' | 'Nails' | 'Lashes & Brows' | 'Waxing' | 'Hair' | 'Makeup';
  duration: number; // minutes
  price: number;
  description: string;
  requiresMedical?: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  specialties: string[]; // treatment categories
  avatar: string;
  bio?: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  staffId: string;
  treatmentId: string;
  date: string; // ISO date string
  time: string; // HH:mm
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'break';
}

export const TREATMENTS: Treatment[] = [
  // ========== AESTHETICS & MEDICAL ==========
  { id: 'aes1', name: 'Botox® (3 Areas)', category: 'Aesthetics', duration: 30, price: 250, description: 'Anti-wrinkle injections for forehead, frown lines, and crow\'s feet.', requiresMedical: true },
  { id: 'aes2', name: 'Dermal Fillers - Lips (1ml)', category: 'Aesthetics', duration: 45, price: 280, description: 'Hyaluronic acid filler for natural lip enhancement and definition.', requiresMedical: true },
  { id: 'aes3', name: 'Dermal Fillers - Cheeks (2ml)', category: 'Aesthetics', duration: 60, price: 450, description: 'Restore volume and contour to the mid-face area.', requiresMedical: true },
  { id: 'aes4', name: 'Skin Boosters (Profhilo)', category: 'Aesthetics', duration: 30, price: 320, description: 'Bio-remodeling treatment to hydrate and improve skin quality.', requiresMedical: true },
  { id: 'aes5', name: 'Chemical Peel (Medical Grade)', category: 'Aesthetics', duration: 45, price: 150, description: 'Deep exfoliation to improve texture, tone, and pigmentation.', requiresMedical: true },
  { id: 'aes6', name: 'PRP Vampire Facial', category: 'Aesthetics', duration: 90, price: 400, description: 'Platelet-rich plasma micro-needling for skin rejuvenation.', requiresMedical: true },
  { id: 'aes7', name: 'Laser Hair Removal (Full Legs)', category: 'Aesthetics', duration: 60, price: 200, description: 'FDA-approved laser technology for permanent hair reduction.' },
  { id: 'aes8', name: 'Laser Hair Removal (Underarms)', category: 'Aesthetics', duration: 15, price: 50, description: 'Quick and effective permanent underarm hair reduction.' },

  // ========== SKINCARE & FACIALS ==========
  { id: 'skin1', name: 'Signature Luxury Facial', category: 'Skincare', duration: 75, price: 120, description: 'Customized facial with cleansing, exfoliation, extractions, and massage.' },
  { id: 'skin2', name: 'HydraFacial MD®', category: 'Skincare', duration: 60, price: 180, description: 'Multi-step treatment cleansing, exfoliating, and hydrating the skin.' },
  { id: 'skin3', name: 'Microdermabrasion', category: 'Skincare', duration: 45, price: 95, description: 'Mechanical exfoliation to reveal smoother, brighter skin.' },
  { id: 'skin4', name: 'LED Light Therapy', category: 'Skincare', duration: 30, price: 60, description: 'Red and blue light technology to treat acne and stimulate collagen.' },
  { id: 'skin5', name: 'Dermaplaning', category: 'Skincare', duration: 45, price: 85, description: 'Gentle exfoliation removing dead skin and vellus hair (peach fuzz).' },
  { id: 'skin6', name: 'Express Glow Facial', category: 'Skincare', duration: 30, price: 60, description: 'Quick refresh for glowing skin on the go.' },

  // ========== BODY & WELLNESS ==========
  { id: 'body1', name: 'Deep Tissue Massage (60 min)', category: 'Body & Wellness', duration: 60, price: 95, description: 'Therapeutic massage targeting deep muscle layers to release chronic tension.' },
  { id: 'body2', name: 'Swedish Massage (90 min)', category: 'Body & Wellness', duration: 90, price: 130, description: 'Full-body relaxation massage with gentle, flowing strokes.' },
  { id: 'body3', name: 'Hot Stone Massage', category: 'Body & Wellness', duration: 75, price: 110, description: 'Heated basalt stones melt away tension and stress.' },
  { id: 'body4', name: 'Lymphatic Drainage Massage', category: 'Body & Wellness', duration: 60, price: 100, description: 'Gentle massage to reduce swelling and boost immune system.' },
  { id: 'body5', name: 'Body Scrub & Wrap', category: 'Body & Wellness', duration: 90, price: 140, description: 'Exfoliating scrub followed by nourishing body wrap.' },
  { id: 'body6', name: 'Reflexology', category: 'Body & Wellness', duration: 45, price: 70, description: 'Pressure point therapy on feet to restore balance.' },
  { id: 'body7', name: 'Reiki Energy Healing', category: 'Body & Wellness', duration: 60, price: 85, description: 'Holistic energy work to promote relaxation and well-being.' },

  // ========== NAILS ==========
  { id: 'nail1', name: 'Luxury Gel Manicure', category: 'Nails', duration: 45, price: 42, description: 'Long-lasting gel polish with cuticle care and hand massage.' },
  { id: 'nail2', name: 'Classic Manicure', category: 'Nails', duration: 30, price: 28, description: 'Traditional nail shaping, polish, and cuticle treatment.' },
  { id: 'nail3', name: 'Luxury Pedicure', category: 'Nails', duration: 60, price: 55, description: 'Soak, scrub, massage, and polish for beautiful feet.' },
  { id: 'nail4', name: 'Gel Extensions (Full Set)', category: 'Nails', duration: 90, price: 75, description: 'Sculpted gel nail extensions for length and strength.' },
  { id: 'nail5', name: 'Nail Art (Per Nail)', category: 'Nails', duration: 10, price: 5, description: 'Custom design on natural or extended nails.' },
  { id: 'nail6', name: 'BIAB Builder Gel', category: 'Nails', duration: 60, price: 50, description: 'Builder gel overlay for strength and natural enhancement.' },

  // ========== LASHES & BROWS ==========
  { id: 'lash1', name: 'Classic Lash Extensions', category: 'Lashes & Brows', duration: 90, price: 120, description: 'Individual lash extensions for natural enhancement.' },
  { id: 'lash2', name: 'Volume Lash Extensions', category: 'Lashes & Brows', duration: 120, price: 180, description: 'Multiple fine lashes per natural lash for dramatic volume.' },
  { id: 'lash3', name: 'Lash Lift & Tint', category: 'Lashes & Brows', duration: 60, price: 70, description: 'Curl and tint natural lashes for a mascara-free look.' },
  { id: 'lash4', name: 'HD Brows', category: 'Lashes & Brows', duration: 45, price: 40, description: 'Bespoke brow styling including tinting, waxing, and threading.' },
  { id: 'lash5', name: 'Brow Lamination', category: 'Lashes & Brows', duration: 45, price: 55, description: 'Semi-permanent brow styling for fuller, fluffier brows.' },
  { id: 'lash6', name: 'Lash Refill (2 Weeks)', category: 'Lashes & Brows', duration: 60, price: 60, description: 'Maintenance appointment for existing lash extensions.' },

  // ========== WAXING ==========
  { id: 'wax1', name: 'Full Leg Wax', category: 'Waxing', duration: 45, price: 45, description: 'Smooth legs from thigh to toe.' },
  { id: 'wax2', name: 'Brazilian Wax', category: 'Waxing', duration: 30, price: 50, description: 'Professional intimate waxing with premium hard wax.' },
  { id: 'wax3', name: 'Hollywood Wax', category: 'Waxing', duration: 30, price: 55, description: 'Complete hair removal for a smooth finish.' },
  { id: 'wax4', name: 'Underarm Wax', category: 'Waxing', duration: 15, price: 18, description: 'Quick and gentle underarm hair removal.' },
  { id: 'wax5', name: 'Full Face Wax', category: 'Waxing', duration: 20, price: 30, description: 'Upper lip, chin, cheeks, and brows.' },
  { id: 'wax6', name: 'Sugaring (Legs)', category: 'Waxing', duration: 45, price: 50, description: 'Natural sugar paste alternative to traditional waxing.' },

  // ========== HAIR ==========
  { id: 'hair1', name: 'Luxury Cut & Blow Dry', category: 'Hair', duration: 60, price: 85, description: 'Precision cut with wash, conditioning treatment, and professional blow dry.' },
  { id: 'hair2', name: 'Full Head Balayage', category: 'Hair', duration: 180, price: 220, description: 'Hand-painted highlights for a natural, sun-kissed look.' },
  { id: 'hair3', name: 'Root Touch-Up', category: 'Hair', duration: 90, price: 75, description: 'Refresh regrowth with seamless color matching.' },
  { id: 'hair4', name: 'Keratin Treatment', category: 'Hair', duration: 150, price: 200, description: 'Smoothing treatment to eliminate frizz for up to 3 months.' },
  { id: 'hair5', name: 'Hair Extensions (Consultation)', category: 'Hair', duration: 30, price: 0, description: 'Complimentary consultation to match color and discuss volume goals.' },
  { id: 'hair6', name: 'Olaplex Treatment', category: 'Hair', duration: 30, price: 45, description: 'Bond-building treatment to repair and strengthen damaged hair.' },

  // ========== MAKEUP ==========
  { id: 'makeup1', name: 'Special Occasion Makeup', category: 'Makeup', duration: 60, price: 80, description: 'Glamorous makeup for events, proms, or parties.' },
  { id: 'makeup2', name: 'Bridal Makeup', category: 'Makeup', duration: 90, price: 150, description: 'Flawless, long-lasting makeup for your big day.' },
  { id: 'makeup3', name: 'Bridal Trial', category: 'Makeup', duration: 90, price: 100, description: 'Pre-wedding makeup rehearsal to perfect your look.' },
  { id: 'makeup4', name: 'Makeup Lesson', category: 'Makeup', duration: 75, price: 90, description: 'One-on-one tutorial to master techniques.' },
];

// DEPRECATED: Staff data now in staff-profiles.ts. Kept for reference but unused.
// export const STAFF: Staff[] = [ ... ];

const generateAppointments = () => {
  const apps: Appointment[] = [];
  const startDay = 10; // Start from Feb 10
  const endDay = 28;   // Go effectively to end of Feb

  // Helper to get random item from array
  const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // Staff IDs
  const staffIds = ['staff-1', 'staff-2', 'staff-3', 'staff-4', 'staff-5', 'staff-6', 'staff-7', 'staff-8'];

  // Helper to check if a time slot is available
  // Returns true if available, false if collision
  const isSlotAvailable = (
    staffId: string,
    date: string,
    startTimeStr: string,
    durationMinutes: number
  ): boolean => {
    const buffer = 15; // 15 min buffer

    // Parse start time
    const [startH, startM] = startTimeStr.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = startMinutes + durationMinutes + buffer;

    // Check against existing appointments for this staff on this day
    const existingApps = apps.filter(a => a.staffId === staffId && a.date === date);

    for (const app of existingApps) {
      // Find treatment duration for this app
      const appTreatment = TREATMENTS.find(t => t.id === app.treatmentId);
      const appDuration = appTreatment ? appTreatment.duration : 60; // Default fallback

      const [appStartH, appStartM] = app.time.split(':').map(Number);
      const appStartMinutes = appStartH * 60 + appStartM;
      const appEndMinutes = appStartMinutes + appDuration + buffer; // Existing app also has buffer

      // Check overlap: (StartA < EndB) and (EndA > StartB)
      if (startMinutes < appEndMinutes && endMinutes > appStartMinutes) {
        return false; // Collision
      }
    }

    return true; // Available
  };

  const statuses: Appointment['status'][] = ['confirmed', 'confirmed', 'confirmed', 'pending'];
  // Granular start times (every 30 mins) to allow for varied durations
  const possibleStartTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];
  const clientNames = ['Alice Fox', 'Ben Carter', 'Clara Hughes', 'David Lee', 'Emma Thompson', 'Fiona Green', 'George Hall', 'Hannah Wright'];

  let idCounter = 1;

  // 1. Add Fixed Appointments FIRST to ensure they reserve their slots
  const fixedAppsRaw = [
    { clientName: 'Sarah Jenkins', clientEmail: 'sarah@test.com', staffId: 'staff-1', treatmentId: 'hair2', date: '2026-02-23', time: '10:00', status: 'confirmed' },
    { clientName: 'Mike Ross', clientEmail: 'mike@test.com', staffId: 'staff-2', treatmentId: 'hair1', date: '2026-02-23', time: '11:00', status: 'confirmed' },
    { clientName: 'Emma Watson', clientEmail: 'emma@test.com', staffId: 'staff-3', treatmentId: 'skin2', date: '2026-02-24', time: '14:00', status: 'pending' },
    { clientName: 'Tom Hardy', clientEmail: 'tom@test.com', staffId: 'staff-2', treatmentId: 'hair3', date: '2026-02-25', time: '09:00', status: 'confirmed' }
  ];

  fixedAppsRaw.forEach(f => {
    apps.push({
      id: `fixed-${idCounter++}`,
      ...f
    } as Appointment);
  });

  // 2. Generate Random Appointments filling gaps
  for (let day = startDay; day <= endDay; day++) {
    // Generate 3-6 appointments per day
    const dayStr = `2026-02-${day.toString().padStart(2, '0')}`;

    // Instead of completely random, iterate staff to ensure we try to fill schedules
    // Choose a random subset of staff working this day
    const activeStaff = staffIds.filter(() => Math.random() > 0.4);

    for (const staffId of activeStaff) {
      const targetApps = Math.floor(Math.random() * 3) + 2; // 2-4 apps
      let appsAdded = 0;
      let attempts = 0;
      const shuffledTimes = [...possibleStartTimes].sort(() => 0.5 - Math.random());

      while (appsAdded < targetApps && attempts < shuffledTimes.length) {
        const time = shuffledTimes[attempts];
        const treatment = random(TREATMENTS);

        if (isSlotAvailable(staffId, dayStr, time, treatment.duration)) {
          apps.push({
            id: `app-${idCounter++}`,
            clientName: random(clientNames),
            clientEmail: 'client@example.com',
            staffId: staffId,
            treatmentId: treatment.id,
            date: dayStr,
            time: time,
            status: random(statuses)
          });
          appsAdded++;
        }
        attempts++;
      }
    }
  }

  return apps;
};

export const INITIAL_APPOINTMENTS: Appointment[] = generateAppointments();

// ========== ENTERPRISE MANAGER DATA ==========

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Professional' | 'Retail';
  stockLevel: number;
  minLevel: number;
  unit: string;
  lastOrdered: string;
  status: 'ok' | 'low' | 'critical';
}

export const INVENTORY: InventoryItem[] = [
  { id: 'inv1', name: 'Botox® Vials (100u)', category: 'Professional', stockLevel: 12, minLevel: 10, unit: 'vials', lastOrdered: '2026-01-15', status: 'ok' },
  { id: 'inv2', name: 'Juvederm Ultra 3', category: 'Professional', stockLevel: 3, minLevel: 5, unit: 'boxes', lastOrdered: '2026-01-10', status: 'low' },
  { id: 'inv3', name: 'Obagi Nu-Derm Kit', category: 'Retail', stockLevel: 2, minLevel: 4, unit: 'kits', lastOrdered: '2025-12-20', status: 'critical' },
  { id: 'inv4', name: 'HydraFacial Serums (Activ-4)', category: 'Professional', stockLevel: 8, minLevel: 5, unit: 'bottles', lastOrdered: '2026-02-01', status: 'ok' },
  { id: 'inv5', name: 'Sterile Gloves (Medium)', category: 'Professional', stockLevel: 45, minLevel: 100, unit: 'pairs', lastOrdered: '2026-01-05', status: 'low' },
  { id: 'inv6', name: 'Olaplex No.3 (Retail)', category: 'Retail', stockLevel: 15, minLevel: 8, unit: 'bottles', lastOrdered: '2026-01-20', status: 'ok' },
];

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'VIP' | 'Regular' | 'New' | 'Flagged';
  totalSpend: number;
  lastVisit: string;
  upcomingAppointment?: string; // Date
  notes: string;
  avatar: string;
}

export const CLIENTS: ClientProfile[] = [
  { id: 'c1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '07700 900123', type: 'VIP', totalSpend: 4500, lastVisit: '2026-01-20', notes: 'Platinum Member. Prefers quiet appointments. ALWAYS offer sparkling water with lemon. Allergic to latex.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 'c2', name: 'Michael Ross', email: 'mike.ross@example.com', phone: '07700 900456', type: 'Flagged', totalSpend: 120, lastVisit: '2025-11-10', notes: 'FLAGGED: Consistently 15+ mins late. Requires 50% deposit for all future bookings.', avatar: 'https://i.pravatar.cc/150?u=mike' },
  { id: 'c3', name: 'Emma Thompson', email: 'emma.t@example.com', phone: '07700 900789', type: 'New', totalSpend: 0, lastVisit: 'N/A', upcomingAppointment: '2026-02-14', notes: 'First time visitor. Booked for Bridal Consultation. Interested in skincare package.', avatar: 'https://i.pravatar.cc/150?u=emma' },
  { id: 'c4', name: 'David Lee', email: 'david@example.com', phone: '07700 900222', type: 'Regular', totalSpend: 850, lastVisit: '2026-01-05', upcomingAppointment: '2026-02-12', notes: 'Regular massage client. Prefers firm pressure.', avatar: 'https://i.pravatar.cc/150?u=david' },
];

export interface BusinessMetrics {
  dailyRevenue: number;
  dailyTarget: number;
  weeklyRevenue: number;
  weeklyTarget: number;
  utilizationRate: number; // percentage
  topService: string;
  staffPerformance: {
    staffId: string;
    name: string;
    revenue: number;
    utilization: number;
  }[];
}

export const METRICS: BusinessMetrics = {
  dailyRevenue: 1250,
  dailyTarget: 1500,
  weeklyRevenue: 8400,
  weeklyTarget: 10000,
  utilizationRate: 78,
  topService: 'HydraFacial MD®',
  staffPerformance: [
    { staffId: 'staff-1', name: 'Sarah Chen', revenue: 2500, utilization: 85 },
    { staffId: 'staff-2', name: 'Marcus Johnson', revenue: 1800, utilization: 70 },
    { staffId: 'staff-3', name: 'Priya Patel', revenue: 3200, utilization: 92 },
  ]
};
