import type {
    WebsiteTemplate,
    HeroContent,
    GridContent,
    ContentSection,
    FeaturesContent,
    TestimonialsContent,
    CtaContent,
    FaqContent,
    StatsContent,
    SplitContent,
} from './types'

export const realEstateTemplate: WebsiteTemplate = {
    id: 'real-estate',
    enabled: true,
    name: 'Prestige Homes',
    description: 'Elegant, property-first template for real estate agents, developers, and property listings',
    category: 'professional',
    preview: '/templates/preview-realestate.jpg',

    colors: {
        primary: '#1B3A4B',      // Deep teal-navy
        secondary: '#C09A5A',    // Champagne gold
        accent: '#E8F4F8',       // Ice blue
        background: '#FAFAFA',   // Clean white-grey
        text: '#1A1A1A',
        muted: '#7A8B96',
        border: '#D5DDE3',
    },

    typography: {
        headingFont: 'Libre Baskerville',
        bodyFont: 'Raleway',
    },

    pages: [
        {
            id: 'home',
            name: 'Home',
            slug: '/',
            enabled: true,
            sections: [
                {
                    id: 'hero',
                    type: 'hero',
                    title: 'Hero',
                    enabled: true,
                    content: {
                        heading: 'Find Your Perfect Home',
                        subheading: 'Premium properties across Kenya\'s finest locations — browse, enquire, and move in with confidence',
                        buttonText: 'Browse Properties',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Book a Viewing',
                        secondaryButtonLink: '/contact',
                        image: '/templates/realestate-hero.jpg',
                        layout: 'banner',
                    } satisfies HeroContent,
                },
                {
                    id: 'property-types',
                    type: 'grid',
                    title: 'Property Types',
                    enabled: true,
                    content: {
                        heading: 'Browse by Type',
                        columns: 4,
                        items: [
                            { title: 'Apartments', description: 'Studio to 4-bedroom units', image: '/templates/re-apartments.jpg', link: '/shop?cat=apartments' },
                            { title: 'Houses', description: 'Stand-alone family homes', image: '/templates/re-houses.jpg', link: '/shop?cat=houses' },
                            { title: 'Commercial', description: 'Office & retail spaces', image: '/templates/re-commercial.jpg', link: '/shop?cat=commercial' },
                            { title: 'Land', description: 'Prime plots for development', image: '/templates/re-land.jpg', link: '/shop?cat=land' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Agency Stats',
                    enabled: true,
                    content: {
                        heading: 'The Prestige Homes Track Record',
                        stats: [
                            { label: 'Properties Listed', value: '1,200+' },
                            { label: 'Successful Sales', value: '800+' },
                            { label: 'Happy Families Placed', value: '650+' },
                            { label: 'Years in Real Estate', value: '20+' },
                        ],
                    } satisfies StatsContent,
                },
                {
                    id: 'about-agency',
                    type: 'content',
                    title: 'About the Agency',
                    enabled: true,
                    content: {
                        heading: 'Trusted Advisors in Property',
                        text: 'Since 2004, Prestige Homes has matched families and investors with properties that perfectly fit their needs and aspirations. Our team of 30+ agents have deep local knowledge and a commitment to transparency throughout every transaction.',
                        image: '/templates/re-team.jpg',
                        layout: 'image-right',
                        buttonText: 'Meet Our Agents',
                        buttonLink: '/about',
                    } satisfies ContentSection,
                },
                {
                    id: 'services',
                    type: 'features',
                    title: 'Services',
                    enabled: true,
                    content: {
                        heading: 'Our Services',
                        items: [
                            { title: 'Property Sales', description: 'Buy or sell residential and commercial properties with expert guidance', icon: '🏠' },
                            { title: 'Property Management', description: 'Full management of your investment properties — rentals, maintenance, reporting', icon: '🔑' },
                            { title: 'Valuation Services', description: 'Accurate, certified property valuations for banks, courts, and private transactions', icon: '📊' },
                            { title: 'Investment Advisory', description: 'Portfolio advice for property investors looking to diversify and maximize returns', icon: '💼' },
                        ],
                    } satisfies FeaturesContent,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Client Testimonials',
                    enabled: true,
                    content: {
                        heading: 'What Our Clients Say',
                        items: [
                            { name: 'Robert & Alice K.', role: 'Home Buyers', text: 'Found our dream home in Karen within 3 viewings. The Prestige team listened, understood our needs, and delivered. Exceptional service.', rating: 5 },
                            { name: 'Ngugi M.', role: 'Property Investor', text: 'I\'ve bought 4 investment properties through Prestige Homes over 8 years. Every transaction has been smooth, transparent, and profitable.', rating: 5 },
                            { name: 'TechCorp Ltd.', role: 'Commercial Client', text: 'They found us office space in Upper Hill that checked every box — budget, location, size, expansion potential. Couldn\'t ask for more.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'viewing-cta',
                    type: 'cta',
                    title: 'Book Viewing CTA',
                    enabled: true,
                    content: {
                        heading: 'Ready to Find Your Next Property?',
                        text: 'Talk to one of our agents today. Free consultation, no obligation.',
                        buttonText: 'Book a Free Consultation',
                        bgColor: '#1B3A4B',
                    } satisfies CtaContent,
                },
            ],
        },
        {
            id: 'about',
            name: 'About',
            slug: '/about',
            enabled: true,
            sections: [
                {
                    id: 'about-hero',
                    type: 'hero',
                    title: 'About Hero',
                    enabled: true,
                    content: {
                        heading: 'Two Decades of Property Excellence',
                        subheading: 'Built on trust, driven by results, guided by local expertise',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'agents',
                    type: 'grid',
                    title: 'Meet the Agents',
                    enabled: true,
                    content: {
                        heading: 'Our Top Agents',
                        columns: 3,
                        items: [
                            { title: 'Jane M. — Senior Agent', description: '15 years, 400+ transactions, Karen & Runda specialist', image: '/templates/re-agent1.jpg' },
                            { title: 'David O. — Commercial Lead', description: '12 years, Westlands & Upper Hill expert', image: '/templates/re-agent2.jpg' },
                            { title: 'Amina K. — Residential Agent', description: '8 years, affordable housing & mortgage specialist', image: '/templates/re-agent3.jpg' },
                        ],
                    } satisfies GridContent,
                },
            ],
        },
        { id: 'shop', name: 'Listings', slug: '/shop', enabled: true, sections: [] },
        {
            id: 'contact',
            name: 'Contact',
            slug: '/contact',
            enabled: true,
            sections: [
                {
                    id: 'contact-form',
                    type: 'split',
                    title: 'Contact',
                    enabled: true,
                    content: {
                        left: { type: 'form', heading: 'Get in Touch', fields: ['name', 'email', 'phone', 'property_type', 'budget', 'message'], buttonText: 'Send Enquiry' },
                        right: { type: 'contact-info', heading: 'Our Office', email: 'sales@prestigehomes.ke', phone: '+254 700 000 010', address: 'The Promenade, Westlands, Nairobi', hours: 'Mon–Sat: 8AM – 6PM' },
                    } satisfies SplitContent,
                },
            ],
        },
        {
            id: 'faq',
            name: 'FAQ',
            slug: '/faq',
            enabled: true,
            sections: [
                {
                    id: 'faq-list',
                    type: 'faq',
                    title: 'FAQ',
                    enabled: true,
                    content: {
                        heading: 'Property FAQs',
                        items: [
                            { question: 'Do you charge buyers a commission?', answer: 'No. Our commission is paid by the seller. Buyers use our services at no charge.' },
                            { question: 'Can you help with mortgage financing?', answer: 'Yes! We have partnerships with major banks and can facilitate mortgage applications for qualified buyers.' },
                            { question: 'How long does a property transaction take?', answer: 'Typical sales take 30–90 days from offer acceptance to completion. We guide you through every step.' },
                            { question: 'Do you do property management?', answer: 'Yes. We manage over 200 investment properties across Nairobi. Contact us for a management proposal.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
