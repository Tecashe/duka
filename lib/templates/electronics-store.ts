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

export const electronicsCastTemplate: WebsiteTemplate = {
    id: 'electronics-store',
    enabled: true,
    name: 'TechHub',
    description: 'Dark, feature-rich template for electronics, gadgets, and tech product stores',
    category: 'electronics',
    preview: '/templates/preview-electronics.jpg',

    colors: {
        primary: '#0EA5E9',      // Electric blue
        secondary: '#6366F1',    // Indigo
        accent: '#10B981',       // Tech green
        background: '#0F172A',   // Deep navy-black
        text: '#E2E8F0',
        muted: '#64748B',
        border: '#1E293B',
    },

    typography: {
        headingFont: 'Rajdhani',
        bodyFont: 'Nunito Sans',
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
                        heading: 'Next-Gen Tech. Right Now.',
                        subheading: 'Curated electronics, latest releases, and unbeatable prices',
                        buttonText: 'Shop Now',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Flash Deals',
                        secondaryButtonLink: '/shop?sale=true',
                        image: '/templates/electronics-hero.jpg',
                        layout: 'split',
                    } satisfies HeroContent,
                },
                {
                    id: 'categories',
                    type: 'grid',
                    title: 'Shop Categories',
                    enabled: true,
                    content: {
                        heading: 'Shop by Category',
                        columns: 4,
                        items: [
                            { title: 'Smartphones', description: 'Latest flagship devices', image: '/templates/el-phones.jpg', link: '/shop?cat=phones' },
                            { title: 'Laptops', description: 'Work & gaming powerhouses', image: '/templates/el-laptops.jpg', link: '/shop?cat=laptops' },
                            { title: 'Audio', description: 'Headphones, earbuds & speakers', image: '/templates/el-audio.jpg', link: '/shop?cat=audio' },
                            { title: 'Accessories', description: 'Cases, chargers & more', image: '/templates/el-accessories.jpg', link: '/shop?cat=accessories' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'flash-deals',
                    type: 'banner',
                    title: 'Flash Deals Banner',
                    enabled: true,
                    content: {
                        heading: '⚡ Flash Sale — Up to 40% Off',
                        text: 'Limited stock. Limited time. Don\'t miss out.',
                        buttonText: 'View Deals',
                        buttonLink: '/shop?sale=true',
                        bgColor: '#0EA5E9',
                    },
                },
                {
                    id: 'why-us',
                    type: 'features',
                    title: 'Why TechHub',
                    enabled: true,
                    content: {
                        heading: 'Why Shop at TechHub',
                        items: [
                            { title: 'Genuine Products', description: 'Every product is sourced directly from authorized distributors', icon: '✅' },
                            { title: 'Fast Delivery', description: 'Nairobi same-day. Rest of Kenya next-day.', icon: '🚚' },
                            { title: 'Expert Support', description: 'Tech-savvy support team available 7 days a week', icon: '🛠️' },
                            { title: 'Easy Returns', description: '14-day no-hassle returns on all items', icon: '↩️' },
                        ],
                    } satisfies FeaturesContent,
                },
                {
                    id: 'brands',
                    type: 'grid',
                    title: 'Top Brands',
                    enabled: true,
                    content: {
                        heading: 'Top Brands We Carry',
                        columns: 4,
                        items: [
                            { title: 'Apple', icon: '🍎' },
                            { title: 'Samsung', icon: '📱' },
                            { title: 'Sony', icon: '🎧' },
                            { title: 'Dell', icon: '💻' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Reviews',
                    enabled: true,
                    content: {
                        heading: 'What Our Customers Say',
                        items: [
                            { name: 'Peter M.', role: 'Verified Buyer', text: 'Got my MacBook Pro in 4 hours after ordering. Packaging was perfect, genuine product confirmed. TechHub is my go-to.', rating: 5 },
                            { name: 'Amina S.', role: 'Verified Buyer', text: 'Best electronics store in Nairobi hands down. Fast delivery, great prices, and their customer support actually picks up.', rating: 5 },
                            { name: 'Daniel K.', role: 'Verified Buyer', text: 'Bought Sony WH-1000XM5 headphones. Delivered, genuine, amazing. Saved KES 3,000 compared to other stores.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'newsletter-cta',
                    type: 'cta',
                    title: 'Newsletter CTA',
                    enabled: true,
                    content: {
                        heading: 'Get Tech Deals First',
                        text: 'Subscribe for early access to flash sales, restocks, and new releases.',
                        buttonText: 'Subscribe Now',
                        bgColor: '#0EA5E9',
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
                        heading: 'Your Trusted Tech Partner',
                        subheading: 'From Nairobi to Kenya and beyond — bringing the best tech to your hands',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Store Stats',
                    enabled: true,
                    content: {
                        heading: 'TechHub by the Numbers',
                        stats: [
                            { label: 'Products Listed', value: '2,500+' },
                            { label: 'Happy Customers', value: '35,000+' },
                            { label: 'Brands Carried', value: '60+' },
                            { label: 'Same-Day Deliveries', value: '98%' },
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
                        left: { type: 'form', heading: 'Get in Touch', fields: ['name', 'email', 'order_id', 'message'], buttonText: 'Send Message' },
                        right: { type: 'contact-info', heading: 'Support', email: 'support@techhub.ke', phone: '+254 700 000 008', address: 'CBD, Nairobi', hours: 'Mon–Sat: 8AM – 8PM' },
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
                            { question: 'Are all products genuine?', answer: 'Yes, 100%. We source all products directly from authorized distributors and brand representatives.' },
                            { question: 'How fast is delivery?', answer: 'Nairobi: same-day if ordered before 2PM. Other Kenya locations: 1–2 business days.' },
                            { question: 'What is your warranty policy?', answer: 'All products come with manufacturer warranty. We also assist with warranty claims at no extra charge.' },
                            { question: 'Can I trade in my old device?', answer: 'Yes! We accept trade-ins for smartphones and laptops. Contact us for a valuation.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
