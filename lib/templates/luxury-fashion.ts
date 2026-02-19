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

export const luxuryFashionTemplate: WebsiteTemplate = {
    id: 'luxury-fashion',
    enabled: true,
    name: 'Luxury Fashion',
    description: 'Editorial dark luxury template for high-end fashion & apparel brands',
    category: 'fashion',
    preview: '/templates/preview-luxury-fashion.jpg',

    colors: {
        primary: '#C9A84C',      // Gold
        secondary: '#1A1A1A',    // Near-black
        accent: '#F5F0E8',       // Cream
        background: '#0D0D0D',   // Deep black
        text: '#F5F0E8',
        muted: '#6B6B6B',
        border: '#2A2A2A',
    },

    typography: {
        headingFont: 'Cormorant Garamond',
        bodyFont: 'Montserrat',
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
                    title: 'Hero Banner',
                    enabled: true,
                    content: {
                        heading: 'Wear the Story',
                        subheading: 'Curated luxury pieces for the bold and discerning',
                        buttonText: 'Explore Collection',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Our Story',
                        secondaryButtonLink: '/about',
                        image: '/templates/luxury-hero.jpg',
                        layout: 'fullscreen',
                    } satisfies HeroContent,
                },
                {
                    id: 'featured-categories',
                    type: 'grid',
                    title: 'Featured Categories',
                    enabled: true,
                    content: {
                        heading: 'Shop by Category',
                        columns: 3,
                        items: [
                            { title: 'Women', description: 'Timeless elegance', image: '/templates/lf-women.jpg', link: '/shop?cat=women' },
                            { title: 'Men', description: 'Sharp, refined cuts', image: '/templates/lf-men.jpg', link: '/shop?cat=men' },
                            { title: 'Accessories', description: 'The finishing touch', image: '/templates/lf-accessories.jpg', link: '/shop?cat=accessories' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'story-split',
                    type: 'content',
                    title: 'Brand Story',
                    enabled: true,
                    content: {
                        heading: 'Crafted With Intention',
                        text: 'Every piece in our collection tells a story — of skilled artisans, ethically sourced materials, and timeless design philosophy. We believe fashion is not fast; it is forever.',
                        layout: 'image-right',
                        buttonText: 'Read Our Story',
                        buttonLink: '/about',
                    } satisfies ContentSection,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Client Testimonials',
                    enabled: true,
                    content: {
                        heading: 'What Our Clients Say',
                        items: [
                            { name: 'Amara L.', role: 'Fashion Blogger', text: 'The quality is unmatched. Every stitch is deliberate and the fit is impeccable.', rating: 5 },
                            { name: 'David K.', role: 'Creative Director', text: 'I\'ve worn their pieces to three international galas. Heads turn every single time.', rating: 5 },
                            { name: 'Sophia M.', role: 'Entrepreneur', text: 'Finally a brand that understands luxury without compromising on sustainability.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'cta-newsletter',
                    type: 'cta',
                    title: 'Newsletter CTA',
                    enabled: true,
                    content: {
                        heading: 'Join The Inner Circle',
                        text: 'First access to new collections, exclusive events, and style guides.',
                        buttonText: 'Subscribe Now',
                        bgColor: '#C9A84C',
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
                        heading: 'The Art of Dressing Well',
                        subheading: 'Our heritage, our craft, our obsession with quality',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'about-mission',
                    type: 'content',
                    title: 'Mission',
                    enabled: true,
                    content: {
                        heading: 'Our Philosophy',
                        text: 'We started with a simple conviction: true luxury is not about price tags — it\'s about intention, craft, and longevity. Everything we design is meant to outlast trends and become a cherished part of your wardrobe story.',
                        layout: 'centered',
                    } satisfies ContentSection,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Brand Stats',
                    enabled: true,
                    content: {
                        heading: 'By The Numbers',
                        stats: [
                            { label: 'Collections Launched', value: '24' },
                            { label: 'Countries We Ship To', value: '38' },
                            { label: 'Happy Clients', value: '12,000+' },
                            { label: 'Years of Craft', value: '15+' },
                        ],
                    } satisfies StatsContent,
                },
            ],
        },
        { id: 'shop', name: 'Shop', slug: '/shop', enabled: true, sections: [] },
        {
            id: 'contact',
            name: 'Contact',
            slug: '/contact',
            enabled: true,
            sections: [
                {
                    id: 'contact-form',
                    type: 'split',
                    title: 'Contact Form',
                    enabled: true,
                    content: {
                        left: { type: 'form', heading: 'Get in Touch', fields: ['name', 'email', 'subject', 'message'], buttonText: 'Send Message' },
                        right: { type: 'contact-info', heading: 'Visit Our Atelier', email: 'hello@luxuryfashion.com', phone: '+254 700 000 001', address: 'Westlands, Nairobi', hours: 'Mon–Sat: 10AM – 7PM' },
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
                        heading: 'Frequently Asked Questions',
                        items: [
                            { question: 'Do you offer custom sizing?', answer: 'Yes. We offer bespoke tailoring for select pieces. Contact us to schedule a consultation.' },
                            { question: 'What is your return policy?', answer: 'We accept returns within 14 days of delivery for unworn, unaltered items with original tags.' },
                            { question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide. International delivery takes 5–10 business days.' },
                            { question: 'How do I care for my garments?', answer: 'Each piece comes with detailed care instructions. Most items are dry-clean only.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
