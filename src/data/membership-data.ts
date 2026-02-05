export interface MembershipTier {
    id: string;
    name: string;
    price: number;
    billingPeriod: string;
    description: string;
    color: string;
    benefits: string[];
    popular?: boolean;
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
    {
        id: 'bronze',
        name: 'The Essential',
        price: 45,
        billingPeriod: 'month',
        description: 'Perfect for maintaining your look with regular essentials.',
        color: '#CD7F32', // Bronze
        benefits: [
            '1 x Monthly Blow Dry or Gent\'s Cut',
            '5% off all retail products',
            'Priority booking window (3 days in advance)',
            'Complimentary tea/coffee'
        ]
    },
    {
        id: 'silver',
        name: 'The Signature',
        price: 85,
        billingPeriod: 'month',
        description: 'Elevate your routine with enhanced care and flexibility.',
        color: '#C0C0C0', // Silver
        popular: true,
        benefits: [
            '2 x Monthly Blow Dry or 1 x Cut & Finish',
            '10% off all retail products',
            'Priority booking window (7 days in advance)',
            'Complimentary deep conditioning treatment',
            'Birthday gift (£20 voucher)'
        ]
    },
    {
        id: 'gold',
        name: 'The Prestige',
        price: 150,
        billingPeriod: 'month',
        description: 'The ultimate luxury experience for those who demand the best.',
        color: '#D4AF37', // Gold
        benefits: [
            'Unlimited Blow Drys',
            '1 x Cut & Finish or Colour Gloss per month',
            '15% off all retail products',
            'Priority booking window (14 days in advance)',
            'Complimentary glass of prosecco/wine',
            'VIP event invitations',
            'Birthday gift (£50 voucher)'
        ]
    },
    {
        id: 'platinum',
        name: 'The Icon',
        price: 300,
        billingPeriod: 'month',
        description: 'An all-inclusive pass to total transformation and wellness.',
        color: '#E5E4E2', // Platinum
        benefits: [
            'Unlimited Hair Services (Cut, Colour, Style)',
            '1 x HydraFacial per month',
            '20% off all retail products',
            'Guaranteed bookings (24h notice)',
            'Private room access (subject to availability)',
            'Complimentary chauffeur (within 3 miles)',
            'Dedicated concierge line'
        ]
    }
];
