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

export const agencyProTemplate: WebsiteTemplate = {
    id: 'agency-pro',
    enabled: true,
    name: 'Agency Pro',
    description: 'Bold, dark premium template for digital agencies, consultancies & creative studios',
    category: 'professional',
    preview: '/templates/preview-agency.jpg',

    colors: {
        primary: '#6C63FF',      // Electric violet
        secondary: '#FF6584',    // Coral pink
        accent: '#43FFAF',       // Neon mint
        background: '#0A0A0F',   // Deep space dark
        text: '#EEEEFF',
        muted: '#8888BB',
        border: '#1E1E30',
    },

    typography: {
        headingFont: 'Space Grotesk',
        bodyFont: 'Inter',
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
                        heading: 'We Build Brands That Mean Something',
                        subheading: 'Strategy. Design. Technology. Results.',
                        buttonText: 'See Our Work',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Get a Quote',
                        secondaryButtonLink: '/contact',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'services',
                    type: 'grid',
                    title: 'Services',
                    enabled: true,
                    content: {
                        heading: 'What We Do',
                        subheading: 'Full-service creative and digital solutions',
                        columns: 3,
                        items: [
                            { title: 'Brand Strategy', description: 'Positioning, identity, voice & differentiation', icon: '🎯' },
                            { title: 'Web Design & Dev', description: 'Beautiful, high-performance digital experiences', icon: '💻' },
                            { title: 'Digital Marketing', description: 'SEO, paid ads, social, and content strategy', icon: '📈' },
                            { title: 'UI/UX Design', description: 'User-centered interfaces that convert', icon: '🎨' },
                            { title: 'Video & Motion', description: 'Compelling visual stories for your brand', icon: '🎬' },
                            { title: 'Consulting', description: 'Strategic advisory for growth-stage businesses', icon: '🧠' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Key Numbers',
                    enabled: true,
                    content: {
                        heading: 'Impact at Scale',
                        stats: [
                            { label: 'Projects Delivered', value: '300+' },
                            { label: 'Countries Served', value: '22' },
                            { label: 'Client Retention', value: '94%' },
                            { label: 'Awards Won', value: '18' },
                        ],
                    } satisfies StatsContent,
                },
                {
                    id: 'case-studies',
                    type: 'grid',
                    title: 'Case Studies',
                    enabled: true,
                    content: {
                        heading: 'Selected Work',
                        columns: 3,
                        items: [
                            { title: 'NexaBank Rebrand', description: 'Complete brand overhaul, +40% brand recall', image: '/templates/agency-cs1.jpg' },
                            { title: 'EcoMart Platform', description: 'E-commerce platform, 300% revenue increase', image: '/templates/agency-cs2.jpg' },
                            { title: 'PulseMedia App', description: 'Mobile app design, 4.9 star rating', image: '/templates/agency-cs3.jpg' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Client Testimonials',
                    enabled: true,
                    content: {
                        heading: 'What Our Clients Say',
                        items: [
                            { name: 'CEO, NexaBank', role: 'Financial Services', text: 'They don\'t just deliver — they think strategically about your business. Our brand recognition doubled within 6 months.' },
                            { name: 'CMO, EcoMart', role: 'E-commerce', text: 'The platform they built handles 10,000 concurrent users flawlessly. ROI was visible in month two.' },
                            { name: 'Founder, PulseMedia', role: 'Media & Tech', text: 'Working with Agency Pro was the best investment we made. They felt like an extension of our team.' },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'cta',
                    type: 'cta',
                    title: 'CTA',
                    enabled: true,
                    content: {
                        heading: 'Ready to Build Something Great?',
                        text: 'Let\'s talk about your project. No fluff, just real strategy.',
                        buttonText: 'Start a Project',
                        bgColor: '#6C63FF',
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
                        heading: 'We Are Curious Builders',
                        subheading: 'A team of strategists, designers, and engineers obsessed with great work',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'team',
                    type: 'features',
                    title: 'Team',
                    enabled: true,
                    content: {
                        heading: 'Meet the Team',
                        items: [
                            { title: 'Zara N. — CEO', description: '12 years building brands across 4 continents', icon: '🚀' },
                            { title: 'Kofi A. — CTO', description: 'Full-stack architect, open-source contributor', icon: '⚙️' },
                            { title: 'Lila M. — Creative Director', description: 'Award-winning designer from the Pentagram school', icon: '✦' },
                        ],
                    } satisfies FeaturesContent,
                },
            ],
        },
        { id: 'shop', name: 'Services', slug: '/shop', enabled: true, sections: [] },
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
                        left: { type: 'form', heading: 'Start a Conversation', fields: ['name', 'company', 'email', 'budget', 'message'], buttonText: 'Send Message' },
                        right: { type: 'contact-info', heading: 'Reach Us', email: 'hello@agencypro.com', phone: '+254 700 000 003', address: 'Upper Hill, Nairobi', hours: 'Mon–Fri: 9AM – 6PM' },
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
                        heading: 'Common Questions',
                        items: [
                            { question: 'How long does a typical project take?', answer: 'Branding projects take 4–8 weeks. Web projects range from 6–16 weeks depending on complexity.' },
                            { question: 'What is your pricing model?', answer: 'We price per project. All engagements start with a free discovery call to understand your needs.' },
                            { question: 'Do you work with startups?', answer: 'Yes! We have startup-friendly packages and love working with founders at the growth stage.' },
                            { question: 'Do you offer ongoing retainers?', answer: 'Yes, we offer monthly retainers for ongoing design, marketing, and strategy support.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
