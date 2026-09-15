/**
 * HONESTY GATE: only `approved: true` quotes render in production.
 * The drafts below show layout in dev and are NOT real quotes. Replace with signed-off testimonials.
 */
export type Testimonial = { quote: string; name: string; title: string; specialty: string; approved: boolean };

export const testimonials: Testimonial[] = [
  {
    quote: 'We were billing in-network in four states inside of a month. The part I did not expect was watching our own contracts come live by month seven.',
    name: 'Draft placeholder',
    title: 'CEO',
    specialty: "Women's health",
    approved: false,
  },
  {
    quote: 'The eligibility API took an afternoon to integrate. The sandbox matched production, which is rarer than it should be.',
    name: 'Draft placeholder',
    title: 'Head of Engineering',
    specialty: 'Psychiatry',
    approved: false,
  },
  {
    quote: 'Our Series B diligence asked one question about payer contracts. The answer was that we own them. That was the whole conversation.',
    name: 'Draft placeholder',
    title: 'CFO',
    specialty: 'Obesity medicine',
    approved: false,
  },
];
