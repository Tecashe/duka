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

export const beautyWellnessTemplate: WebsiteTemplate = {
    id: 'beauty-wellness',
    enabled: true,
    name: 'Bloom',
    description: 'Soft, luxurious template for beauty brands, skincare, spas, and wellness businesses',
    category: 'beauty',
    preview: '/templates/preview-beauty.jpg',

    colors: {
        primary: '#C8698A',      // Dusty rose
        secondary: '#E8B4B8',    // Soft pink
        accent: '#7B5544',       // Warm mauve
        background: '#FDF6F0',   // Warm white
        text: '#3D2B2B',         // Deep brown
        muted: '#C4A59A',
        border: '#EDD9D0',
    },

    typography: {
        headingFont: 'DM Serif Display',
        bodyFont: 'DM Sans',
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
                        heading: 'Glow From Within',
                        subheading: 'Clean, conscious beauty rituals for your skin and soul',
                        buttonText: 'Shop Now',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Take the Skin Quiz',
                        secondaryButtonLink: '/about',
                        image: '/templates/beauty-hero.jpg',
                        layout: 'split',
                    } satisfies HeroContent,
                },
                {
                    id: 'categories',
                    type: 'grid',
                    title: 'Product Categories',
                    enabled: true,
                    content: {
                        heading: 'Shop by Concern',
                        columns: 4,
                        items: [
                            { title: 'Cleansers', description: 'Start fresh', image: '/templates/bw-cleanse.jpg', link: '/shop?cat=cleanse' },
                            { title: 'Serums', description: 'Targeted treatment', image: '/templates/bw-serum.jpg', link: '/shop?cat=serum' },
                            { title: 'Moisturizers', description: 'Hydrate & protect', image: '/templates/bw-moisture.jpg', link: '/shop?cat=moisture' },
                            { title: 'Wellness', description: 'Inside out beauty', image: '/templates/bw-wellness.jpg', link: '/shop?cat=wellness' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'philosophy',
                    type: 'content',
                    title: 'Brand Philosophy',
                    enabled: true,
                    content: {
                        heading: 'Beauty That Gives Back',
                        text: 'Every Bloom product is formulated without parabens, sulfates, or synthetic fragrances. We partner with women-owned ingredient farms and donate 2% of every sale to girls\' education programs.',
                        image: '/templates/beauty-story.jpg',
                        layout: 'image-left',
                        buttonText: 'Our Mission',
                        buttonLink: '/about',
                    } satisfies ContentSection,
                },
                {
                    id: 'benefits',
                    type: 'features',
                    title: 'Key Benefits',
                    enabled: true,
                    content: {
                        heading: 'Why Choose Bloom',
                        items: [
                            { title: 'Clean Formulas', description: 'Free from 2,000+ harmful ingredients. Always.', icon: '🌿' },
                            { title: 'Dermatologist Tested', description: 'Every product rigorously tested for all skin types', icon: '⚕️' },
                            { title: 'Sustainable Packaging', description: '100% recyclable or refillable packaging', icon: '♻️' },
                            { title: 'Results Guaranteed', description: 'See a difference in 30 days or get your money back', icon: '✨' },
                        ],
                    } satisfies FeaturesContent,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Reviews',
                    enabled: true,
                    content: {
                        heading: 'Real Results',
                        items: [
                            { name: 'Nadia O.', role: 'Verified Buyer', text: 'My hyperpigmentation has visibly reduced after 3 weeks of using the Vitamin C Serum. I\'m genuinely amazed.', rating: 5 },
                            { name: 'Fatima S.', role: 'Beauty Editor', text: 'Bloom is the rare brand that delivers on every promise. The founder\'s commitment to clean beauty is reflected in every product.', rating: 5 },
                            { name: 'Grace K.', role: 'Skincare Enthusiast', text: 'I converted my whole family to Bloom. The night cream alone transformed my mother\'s skin in ways expensive brands never could.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'rituals-cta',
                    type: 'cta',
                    title: 'Ritual CTA',
                    enabled: true,
                    content: {
                        heading: 'Start Your Bloom Ritual',
                        text: 'Subscribe and save 20% on every order. Free shipping on orders over KES 2,000.',
                        buttonText: 'Build My Routine',
                        bgColor: '#C8698A',
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
                        heading: 'Born from a Skin Journey',
                        subheading: 'Our founder battled acne for 8 years before creating the formulas that changed everything',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Impact Stats',
                    enabled: true,
                    content: {
                        heading: 'Our Impact',
                        stats: [
                            { label: 'Products in Range', value: '45+' },
                            { label: 'Happy Customers', value: '28,000+' },
                            { label: 'Countries Shipped', value: '18' },
                            { label: 'Schools Supported', value: '12' },
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
                    title: 'Contact',
                    enabled: true,
                    content: {
                        left: { type: 'form', heading: 'Get in Touch', fields: ['name', 'email', 'skin_type', 'message'], buttonText: 'Send Message' },
                        right: { type: 'contact-info', heading: 'Reach Us', email: 'hello@bloombeauty.ke', phone: '+254 700 000 005', address: 'Kilimani, Nairobi', hours: 'Mon–Sat: 9AM – 6PM' },
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
                        heading: 'Beauty Questions, Answered',
                        items: [
                            { question: 'Are your products suitable for sensitive skin?', answer: 'Yes! All Bloom products are formulated for all skin types, including sensitive and reactive skin.' },
                            { question: 'How long before I see results?', answer: 'Most customers notice improvements within 2–4 weeks. We guarantee visible results in 30 days.' },
                            { question: 'Do you test on animals?', answer: 'Never. We are 100% cruelty-free and proudly certified by Leaping Bunny.' },
                            { question: 'Can I return a product if it doesn\'t work for me?', answer: 'Yes, we offer a 30-day no-questions-asked return policy on all products.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
