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
  status: 'confirmed' | 'pending' | 'cancelled';
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

export const STAFF: Staff[] = [
  {
    id: 's1',
    name: 'Dr. Emily Chen',
    role: 'Medical Director & Aesthetic Practitioner',
    specialties: ['Aesthetics'],
    avatar: 'https://i.pravatar.cc/150?u=emily',
    bio: 'Board-certified with 10+ years in cosmetic injectables and skin rejuvenation.'
  },
  {
    id: 's2',
    name: 'Sophie Martinez',
    role: 'Senior Aesthetician',
    specialties: ['Skincare', 'Lashes & Brows'],
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    bio: 'Specialist in luxury facials, HydraFacial, and brow artistry.'
  },
  {
    id: 's3',
    name: 'James Walker',
    role: 'Massage Therapist (LMT)',
    specialties: ['Body & Wellness'],
    avatar: 'https://i.pravatar.cc/150?u=james',
    bio: 'Licensed massage therapist with expertise in deep tissue and sports massage.'
  },
  {
    id: 's4',
    name: 'Lara Hudson',
    role: 'Nail Technician',
    specialties: ['Nails'],
    avatar: 'https://i.pravatar.cc/150?u=lara',
    bio: 'Certified in gel extensions, nail art, and luxury manicure services.'
  },
  {
    id: 's5',
    name: 'Maya Patel',
    role: 'Lash & Brow Specialist',
    specialties: ['Lashes & Brows'],
    avatar: 'https://i.pravatar.cc/150?u=maya',
    bio: 'Expert in volume lash extensions, lamination, and HD brows.'
  },
  {
    id: 's6',
    name: 'Alex Thompson',
    role: 'Waxing Specialist',
    specialties: ['Waxing'],
    avatar: 'https://i.pravatar.cc/150?u=alex',
    bio: 'Gentle, efficient waxing with premium products for minimal discomfort.'
  },
  {
    id: 's7',
    name: 'Sarah Jenkins',
    role: 'Senior Hair Stylist',
    specialties: ['Hair'],
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    bio: 'Balayage expert and color correction specialist with 8 years experience.'
  },
  {
    id: 's8',
    name: 'Chloe Rivers',
    role: 'Makeup Artist (MUA)',
    specialties: ['Makeup'],
    avatar: 'https://i.pravatar.cc/150?u=chloe',
    bio: 'Bridal and editorial makeup artist with a passion for natural beauty.'
  },
  {
    id: 's9',
    name: 'Nina Foster',
    role: 'Holistic Therapist',
    specialties: ['Body & Wellness'],
    avatar: 'https://i.pravatar.cc/150?u=nina',
    bio: 'Reiki master and reflexology practitioner focused on energy healing.'
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'app1', clientName: 'Alice Fox', clientEmail: 'alice@example.com', staffId: 's1', treatmentId: 'aes1', date: '2026-02-10', time: '10:00', status: 'confirmed' },
  { id: 'app2', clientName: 'Ben Carter', clientEmail: 'ben@example.com', staffId: 's7', treatmentId: 'hair2', date: '2026-02-10', time: '14:00', status: 'confirmed' },
  { id: 'app3', clientName: 'Clara Hughes', clientEmail: 'clara@example.com', staffId: 's4', treatmentId: 'nail1', date: '2026-02-11', time: '11:00', status: 'pending' },
  { id: 'app4', clientName: 'David Lee', clientEmail: 'david@example.com', staffId: 's3', treatmentId: 'body1', date: '2026-02-12', time: '16:00', status: 'confirmed' },
];
