import type {
    WebsiteTemplate,
    HeroContent,
    GridContent,
    ContentSection,
    TestimonialsContent,
    CtaContent,
    FaqContent,
    StatsContent,
    SplitContent,
} from './types'

export const freshGroceryTemplate: WebsiteTemplate = {
    id: 'fresh-grocery',
    enabled: true,
    name: 'Farm Fresh',
    description: 'Bright, farm-to-table template for grocery stores, organic markets, and produce delivery',
    category: 'food',
    preview: '/templates/preview-grocery.jpg',

    colors: {
        primary: '#2D9648',      // Leaf green
        secondary: '#F59E0B',    // Harvest yellow
        accent: '#FBBF24',       // Bright amber
        background: '#F9FFF9',   // Barely-there mint
        text: '#1A2E1A',         // Deep forest
        muted: '#7D9A7D',
        border: '#C8E6C8',
    },

    typography: {
        headingFont: 'Nunito',
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
                        heading: 'Farm to Your Table. Same Day.',
                        subheading: 'Fresh produce, dairy, and pantry essentials sourced from local farms and delivered to your door',
                        buttonText: 'Shop Fresh',
                        buttonLink: '/shop',
                        secondaryButtonText: 'See Today\'s Deals',
                        secondaryButtonLink: '/shop?sale=true',
                        image: '/templates/grocery-hero.jpg',
                        layout: 'split',
                    } satisfies HeroContent,
                },
                {
                    id: 'categories',
                    type: 'grid',
                    title: 'Product Categories',
                    enabled: true,
                    content: {
                        heading: 'Shop by Category',
                        columns: 4,
                        items: [
                            { title: 'Fresh Produce', description: 'Fruits & vegetables', image: '/templates/gr-produce.jpg', link: '/shop?cat=produce' },
                            { title: 'Dairy & Eggs', description: 'From the farm daily', image: '/templates/gr-dairy.jpg', link: '/shop?cat=dairy' },
                            { title: 'Bakery', description: 'Freshly baked daily', image: '/templates/gr-bakery.jpg', link: '/shop?cat=bakery' },
                            { title: 'Pantry', description: 'Dry goods & essentials', image: '/templates/gr-pantry.jpg', link: '/shop?cat=pantry' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'weekly-deals',
                    type: 'banner',
                    title: 'Weekly Deals Banner',
                    enabled: true,
                    content: {
                        heading: '🌿 Weekly Fresh Deals — Up to 25% Off',
                        text: 'Seasonal picks at their freshest and most affordable',
                        buttonText: 'View Deals',
                        buttonLink: '/shop?sale=true',
                        bgColor: '#2D9648',
                    },
                },
                {
                    id: 'farm-story',
                    type: 'content',
                    title: 'Farm Story',
                    enabled: true,
                    content: {
                        heading: 'Straight from Our Partner Farms',
                        text: 'We work with 30+ small-scale farms within 100km of Nairobi. Every Thursday morning, our team visits the farms, hand-selects the harvest, and packs your orders by Friday for same-day Saturday delivery.',
                        image: '/templates/grocery-farm.jpg',
                        layout: 'image-right',
                        buttonText: 'Meet Our Farmers',
                        buttonLink: '/about',
                    } satisfies ContentSection,
                },
                {
                    id: 'why-us',
                    type: 'features',
                    title: 'Why Farm Fresh',
                    enabled: true,
                    content: {
                        heading: 'The Farm Fresh Difference',
                        items: [
                            { title: 'Harvested Weekly', description: 'All produce is less than 48 hours from farm to your door', icon: '🌱' },
                            { title: 'No Chemicals', description: 'Pesticide-free and naturally grown — we verify every farm', icon: '🌿' },
                            { title: 'Fair Prices', description: 'Buying direct from farmers means better prices for you', icon: '💚' },
                            { title: 'Zero Waste Packaging', description: 'Delivered in compostable packaging — your groceries and the planet', icon: '♻️' },
                        ],
                    },
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Reviews',
                    enabled: true,
                    content: {
                        heading: 'Happy Families',
                        items: [
                            { name: 'Clara N.', role: 'Subscriber, 14 months', text: 'I\'ve cancelled my supermarket membership. Farm Fresh vegetables taste completely different — vivid flavor, every single time.', rating: 5 },
                            { name: 'Mike O.', role: 'Home Chef', text: 'The tomatoes alone have changed how I cook. I never knew vegetables could taste this good. Loyal customer for life.', rating: 5 },
                            { name: 'Priya L.', role: 'Verified Buyer', text: 'My kids now actually ask for vegetables. I attribute it entirely to how fresh and good everything from Farm Fresh tastes.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'subscription-cta',
                    type: 'cta',
                    title: 'Subscription CTA',
                    enabled: true,
                    content: {
                        heading: 'Subscribe & Never Run Out',
                        text: 'Get weekly deliveries at 15% off. Pause or cancel anytime.',
                        buttonText: 'Start Your Box',
                        bgColor: '#2D9648',
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
                        heading: 'Growing a Better Food System',
                        subheading: 'Fresh, fair, and connected — from the people who grow it to the people who love it',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Impact Stats',
                    enabled: true,
                    content: {
                        heading: 'Freshness in Numbers',
                        stats: [
                            { label: 'Partner Farms', value: '30+' },
                            { label: 'Weekly Orders', value: '1,200+' },
                            { label: 'Tonnes Saved from Waste', value: '15' },
                            { label: 'Families Served', value: '8,500+' },
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
                        left: { type: 'form', heading: 'Get in Touch', fields: ['name', 'email', 'phone', 'subject', 'message'], buttonText: 'Send Message' },
                        right: { type: 'contact-info', heading: 'Support', email: 'fresh@farmfresh.ke', phone: '+254 700 000 009', address: 'Westlands, Nairobi', hours: 'Mon–Sat: 6AM – 6PM' },
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
                        heading: 'Grocery FAQs',
                        items: [
                            { question: 'What days do you deliver?', answer: 'We deliver Monday through Saturday. Orders placed before 2PM are eligible for same-day delivery.' },
                            { question: 'How far do you deliver?', answer: 'We currently deliver within Nairobi and select Nairobi suburbs. Enter your location at checkout to confirm.' },
                            { question: 'What if something is out of stock?', answer: 'We\'ll contact you and either offer a substitute of equal value or refund you immediately.' },
                            { question: 'Is the packaging recyclable?', answer: 'Yes! All packaging is either compostable or recyclable. We also collect packaging on your next delivery.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
