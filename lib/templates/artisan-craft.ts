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

export const artisanCraftTemplate: WebsiteTemplate = {
    id: 'artisan-craft',
    enabled: true,
    name: 'The Maker',
    description: 'Earthy, story-first template for handcraft, artisan goods, and maker businesses',
    category: 'handcraft',
    preview: '/templates/preview-artisan.jpg',

    colors: {
        primary: '#8B4513',      // Saddle brown
        secondary: '#C17817',    // Honey gold
        accent: '#2D5016',       // Forest green
        background: '#FAF6F0',   // Warm parchment
        text: '#2C1810',         // Dark espresso
        muted: '#9C8068',
        border: '#DDD0BE',
    },

    typography: {
        headingFont: 'Crimson Pro',
        bodyFont: 'Source Sans 3',
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
                        heading: 'Made by Hand. Made to Last.',
                        subheading: 'Each piece is crafted slowly, thoughtfully, and with deep respect for the materials',
                        buttonText: 'Shop the Collection',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Our Story',
                        secondaryButtonLink: '/about',
                        image: '/templates/artisan-hero.jpg',
                        layout: 'split',
                    } satisfies HeroContent,
                },
                {
                    id: 'categories',
                    type: 'grid',
                    title: 'Product Categories',
                    enabled: true,
                    content: {
                        heading: 'What We Make',
                        columns: 3,
                        items: [
                            { title: 'Ceramics', description: 'Wheel-thrown and hand-built pottery', image: '/templates/art-ceramics.jpg', link: '/shop?cat=ceramics' },
                            { title: 'Leather Goods', description: 'Vegetable-tanned leather, aged to perfection', image: '/templates/art-leather.jpg', link: '/shop?cat=leather' },
                            { title: 'Textiles', description: 'Hand-woven and naturally dyed fabrics', image: '/templates/art-textiles.jpg', link: '/shop?cat=textiles' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'process',
                    type: 'features',
                    title: 'Craft Process',
                    enabled: true,
                    content: {
                        heading: 'The Making Process',
                        subheading: 'Every piece passes through these hands before reaching yours',
                        items: [
                            { title: 'Source', description: 'Materials are ethically sourced from local suppliers we trust personally', icon: '🌾' },
                            { title: 'Craft', description: 'Each item is shaped by hand using traditional techniques passed through generations', icon: '🏺' },
                            { title: 'Finish', description: 'Natural finishes, no synthetic coatings — beauty that only deepens with time', icon: '✨' },
                            { title: 'Ship', description: 'Packed in recycled kraft paper and shipped with care to your doorstep', icon: '📦' },
                        ],
                    } satisfies FeaturesContent,
                },
                {
                    id: 'story',
                    type: 'content',
                    title: 'Brand Story',
                    enabled: true,
                    content: {
                        heading: 'Why Slow Craft Matters',
                        text: 'In a world of mass production and fast fashion, we\'re choosing a different path. Every piece we make takes time — because things worth having are worth waiting for. We believe the hands that made your bowl, bag, or blanket leave an invisible imprint of care in the object.',
                        image: '/templates/artisan-story.jpg',
                        layout: 'image-right',
                        buttonText: 'Our Philosophy',
                        buttonLink: '/about',
                    } satisfies ContentSection,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Reviews',
                    enabled: true,
                    content: {
                        heading: 'Words from Our Community',
                        items: [
                            { name: 'Rehema J.', role: 'Collector', text: 'My kitchen shelves now hold six of their ceramic pieces. Each one is slightly different and utterly perfect. Art you can use.', rating: 5 },
                            { name: 'James N.', role: 'Gift Buyer', text: 'Gifted the leather notebook to my partner for our anniversary. She cried. The craftsmanship is extraordinary.', rating: 5 },
                            { name: 'Lena P.', role: 'Interior Designer', text: 'I recommend The Maker to every client who wants pieces with soul. They\'re irreplaceable in a curated home.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'custom-orders-cta',
                    type: 'cta',
                    title: 'Custom Orders CTA',
                    enabled: true,
                    content: {
                        heading: 'Commission a Custom Piece',
                        text: 'Have something specific in mind? We love custom orders. Let\'s make something just for you.',
                        buttonText: 'Request a Commission',
                        bgColor: '#8B4513',
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
                        heading: 'A Small Studio. A Big Belief.',
                        subheading: 'We make things by hand because we believe in objects that carry meaning',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Studio Facts',
                    enabled: true,
                    content: {
                        heading: 'Small but Mighty',
                        stats: [
                            { label: 'Pieces Made Yearly', value: '1,200+' },
                            { label: 'Custom Orders', value: '300+' },
                            { label: 'Years in Business', value: '8' },
                            { label: 'Local Suppliers', value: '6' },
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
                        left: { type: 'form', heading: 'Say Hello', fields: ['name', 'email', 'project_type', 'budget', 'message'], buttonText: 'Send Message' },
                        right: { type: 'contact-info', heading: 'Visit the Studio', email: 'studio@themaker.ke', phone: '+254 700 000 007', address: 'Ngong Road, Nairobi', hours: 'By appointment only' },
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
                        heading: 'Maker FAQs',
                        items: [
                            { question: 'How long do custom orders take?', answer: 'Custom ceramic and leather pieces take 4–8 weeks. We\'ll give you a specific timeline at quote stage.' },
                            { question: 'Do you ship internationally?', answer: 'Yes! We carefully package all pieces with international shipping standards. Contact us for rates.' },
                            { question: 'Are the pieces truly unique?', answer: 'Yes. Because every piece is handmade, no two are identical. Minor variations in texture and color are part of the beauty.' },
                            { question: 'How do I care for the ceramics?', answer: 'Our glazed pieces are food-safe and dishwasher-safe. Unglazed pieces should be hand-washed.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
