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

export const restaurantTemplate: WebsiteTemplate = {
    id: 'restaurant',
    enabled: true,
    name: 'Restaurant & Café',
    description: 'Warm, food-first template for restaurants, cafés, and catering businesses',
    category: 'food',
    preview: '/templates/preview-restaurant.jpg',

    colors: {
        primary: '#8B1A1A',      // Deep burgundy
        secondary: '#D4A853',    // Warm gold
        accent: '#F9F3E3',       // Warm cream
        background: '#FEFBF6',   // Off-white warm
        text: '#2C1810',         // Dark brown
        muted: '#9C7B60',
        border: '#E8D5B7',
    },

    typography: {
        headingFont: 'Playfair Display',
        bodyFont: 'Lato',
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
                        heading: 'Good Food. Good Life.',
                        subheading: 'Fresh ingredients, bold flavors, unforgettable experiences',
                        buttonText: 'View Menu',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Book a Table',
                        secondaryButtonLink: '/contact',
                        image: '/templates/restaurant-hero.jpg',
                        layout: 'banner',
                    } satisfies HeroContent,
                },
                {
                    id: 'menu-categories',
                    type: 'grid',
                    title: 'Menu Categories',
                    enabled: true,
                    content: {
                        heading: 'Our Menu',
                        subheading: 'Crafted daily from locally sourced ingredients',
                        columns: 4,
                        items: [
                            { title: 'Starters', description: 'Light bites to begin', image: '/templates/rest-starters.jpg', link: '/shop?cat=starters' },
                            { title: 'Mains', description: 'Hearty, satisfying dishes', image: '/templates/rest-mains.jpg', link: '/shop?cat=mains' },
                            { title: 'Desserts', description: 'Sweet indulgences', image: '/templates/rest-desserts.jpg', link: '/shop?cat=desserts' },
                            { title: 'Drinks', description: 'Curated beverages', image: '/templates/rest-drinks.jpg', link: '/shop?cat=drinks' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'daily-special',
                    type: 'banner',
                    title: 'Daily Special Banner',
                    enabled: true,
                    content: {
                        heading: "Chef's Special Today",
                        text: 'Slow-braised lamb shank with rosemary jus — only 20 servings daily',
                        buttonText: 'Order Now',
                        buttonLink: '/shop',
                        bgColor: '#8B1A1A',
                    },
                },
                {
                    id: 'story',
                    type: 'content',
                    title: 'Our Story',
                    enabled: true,
                    content: {
                        heading: 'From Farm to Table',
                        text: 'We source our ingredients directly from small-scale farmers within 50km of our kitchen. Every dish is a celebration of local produce, prepared with French technique and East African soul.',
                        layout: 'image-left',
                        buttonText: 'Meet the Chef',
                        buttonLink: '/about',
                    } satisfies ContentSection,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Reviews',
                    enabled: true,
                    content: {
                        heading: 'What Our Guests Say',
                        items: [
                            { name: 'Jasmine W.', role: 'Food Critic', text: 'The lamb shank is transcendent. The space is intimate without being cramped. A must-visit.', rating: 5 },
                            { name: 'Marcus T.', role: 'Regular Guest', text: 'Been coming every Sunday for two years. The consistency and quality never wavers.', rating: 5 },
                            { name: 'Priya R.', role: 'Wedding Planner', text: 'Catered our client\'s wedding reception. 200 guests, all delighted. Impeccable service.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'reservation-cta',
                    type: 'cta',
                    title: 'Reservation CTA',
                    enabled: true,
                    content: {
                        heading: 'Reserve Your Table',
                        text: 'We\'re open Tuesday–Sunday, 11AM–10PM. Walk-ins welcome, reservations recommended.',
                        buttonText: 'Make a Reservation',
                        bgColor: '#D4A853',
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
                        heading: 'A Passion for Hospitality',
                        subheading: 'Founded in 2010, rooted in love for food and community',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Restaurant Stats',
                    enabled: true,
                    content: {
                        heading: 'Our Journey',
                        stats: [
                            { label: 'Years Open', value: '14+' },
                            { label: 'Dishes on Menu', value: '80+' },
                            { label: 'Happy Diners', value: '50,000+' },
                            { label: 'Local Suppliers', value: '12' },
                        ],
                    } satisfies StatsContent,
                },
                {
                    id: 'team',
                    type: 'features',
                    title: 'Our Team',
                    enabled: true,
                    content: {
                        heading: 'The Faces Behind the Food',
                        items: [
                            { title: 'Chef Amara', description: 'Executive Chef — Trained in Paris, inspired by Nairobi', icon: '👨‍🍳' },
                            { title: 'Kezia M.', description: 'Pastry Chef — 10 years of crafting showstopping desserts', icon: '🎂' },
                            { title: 'Samuel O.', description: 'Sommelier — Curating our award-winning wine list', icon: '🍷' },
                        ],
                    },
                },
            ],
        },
        { id: 'shop', name: 'Menu / Order', slug: '/shop', enabled: true, sections: [] },
        {
            id: 'contact',
            name: 'Contact',
            slug: '/contact',
            enabled: true,
            sections: [
                {
                    id: 'contact-split',
                    type: 'split',
                    title: 'Contact & Reservations',
                    enabled: true,
                    content: {
                        left: { type: 'form', heading: 'Book a Table', fields: ['name', 'email', 'phone', 'date', 'guests', 'message'], buttonText: 'Reserve Now' },
                        right: { type: 'contact-info', heading: 'Find Us', email: 'reservations@restaurant.ke', phone: '+254 700 000 002', address: 'Karen, Nairobi, Kenya', hours: 'Tue–Sun: 11AM – 10PM' },
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
                        heading: 'Everything You Need to Know',
                        items: [
                            { question: 'Do you cater for events?', answer: 'Yes! We offer full catering for private events, weddings, and corporate functions. Contact us for a custom quote.' },
                            { question: 'Is parking available?', answer: 'Yes, we have free parking for up to 30 cars within the premises.' },
                            { question: 'Do you have vegetarian/vegan options?', answer: 'Absolutely. We have a dedicated plant-based section on our menu.' },
                            { question: 'Can I order for delivery?', answer: 'Yes, through our online store. We deliver within a 15km radius.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
