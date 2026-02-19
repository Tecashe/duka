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

export const fitnessGymTemplate: WebsiteTemplate = {
    id: 'fitness-gym',
    enabled: true,
    name: 'Iron & Sweat',
    description: 'Bold, high-energy template for gyms, fitness studios, personal trainers, and sports brands',
    category: 'modern',
    preview: '/templates/preview-fitness.jpg',

    colors: {
        primary: '#FF2D20',      // Power red
        secondary: '#FF6B2B',    // Orange fire
        accent: '#FACC15',       // Electric yellow
        background: '#0A0A0A',   // Near-black
        text: '#F5F5F5',
        muted: '#6B7280',
        border: '#1F1F1F',
    },

    typography: {
        headingFont: 'Barlow Condensed',
        bodyFont: 'Barlow',
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
                        heading: 'No Excuses. Only Results.',
                        subheading: 'Elite training programs, expert coaches, and a community that pushes you beyond your limits',
                        buttonText: 'Start Training',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Free Trial Class',
                        secondaryButtonLink: '/contact',
                        image: '/templates/fitness-hero.jpg',
                        layout: 'banner',
                    } satisfies HeroContent,
                },
                {
                    id: 'programs',
                    type: 'grid',
                    title: 'Programs',
                    enabled: true,
                    content: {
                        heading: 'Training Programs',
                        subheading: 'Designed by elite coaches for real transformations',
                        columns: 3,
                        items: [
                            { title: 'Strength & Power', description: 'Build raw strength with compound lifts and progressive overload', image: '/templates/fit-strength.jpg', link: '/shop?cat=strength' },
                            { title: 'HIIT & Cardio', description: 'Torch calories and build endurance with high-intensity intervals', image: '/templates/fit-hiit.jpg', link: '/shop?cat=hiit' },
                            { title: 'Yoga & Mobility', description: 'Restore, recover, and move better — the foundation of performance', image: '/templates/fit-yoga.jpg', link: '/shop?cat=yoga' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Gym Stats',
                    enabled: true,
                    content: {
                        heading: 'The Numbers Don\'t Lie',
                        stats: [
                            { label: 'Active Members', value: '2,400+' },
                            { label: 'Classes Per Week', value: '150+' },
                            { label: 'Certified Coaches', value: '28' },
                            { label: 'Avg. Weight Lost (kg)', value: '12' },
                        ],
                    } satisfies StatsContent,
                },
                {
                    id: 'why-us',
                    type: 'features',
                    title: 'Why Iron & Sweat',
                    enabled: true,
                    content: {
                        heading: 'More Than a Gym',
                        items: [
                            { title: 'Expert Coaches', description: 'Every trainer is certified and has competed at the national level', icon: '🏋️' },
                            { title: 'State-of-Art Equipment', description: '5,000 sqm of premium, regularly serviced equipment', icon: '⚙️' },
                            { title: 'Nutrition Coaching', description: 'Personalized meal plans built around your goals', icon: '🥗' },
                            { title: 'Community', description: 'Join a tribe of 2,400+ members who show up and show out every day', icon: '💪' },
                        ],
                    } satisfies FeaturesContent,
                },
                {
                    id: 'transformation-banner',
                    type: 'banner',
                    title: 'Transformation Banner',
                    enabled: true,
                    content: {
                        heading: '12-Week Transformation Challenge',
                        text: 'Sign up before month end and get 2 months free. Limited spots.',
                        buttonText: 'Claim Your Spot',
                        buttonLink: '/shop',
                        bgColor: '#FF2D20',
                    },
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Testimonials',
                    enabled: true,
                    content: {
                        heading: 'Transformation Stories',
                        items: [
                            { name: 'Ken O.', role: 'Member, 18 months', text: 'Lost 25kg in 6 months. The coaches here push you, hold you accountable, and celebrate every win with you.', rating: 5 },
                            { name: 'Aisha M.', role: 'Member, 2 years', text: 'I came in barely able to deadlift 30kg. Now I\'m competing regionally at 80kg. Life-changing.', rating: 5 },
                            { name: 'Bryan T.', role: 'Member, 8 months', text: 'The HIIT classes are brutal in the best possible way. I\'ve lost 15kg and gained confidence I never had.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'join-cta',
                    type: 'cta',
                    title: 'Join CTA',
                    enabled: true,
                    content: {
                        heading: 'Ready to Transform?',
                        text: 'First class is free. No commitment. Just show up.',
                        buttonText: 'Book Free Trial',
                        bgColor: '#FF2D20',
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
                        heading: 'Built for Champions',
                        subheading: 'Founded by athletes, for athletes — and everyone who wants to become one',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'coaches',
                    type: 'grid',
                    title: 'Coaches',
                    enabled: true,
                    content: {
                        heading: 'Meet Your Coaches',
                        columns: 3,
                        items: [
                            { title: 'Coach Mike D.', description: 'Strength & Conditioning — Former national powerlifting champion', image: '/templates/fit-coach1.jpg' },
                            { title: 'Coach Nia K.', description: 'HIIT & Cardio — 10x marathon finisher', image: '/templates/fit-coach2.jpg' },
                            { title: 'Coach Sam L.', description: 'Yoga & Mobility — 200hr Certified Yoga Teacher', image: '/templates/fit-coach3.jpg' },
                        ],
                    } satisfies GridContent,
                },
            ],
        },
        { id: 'shop', name: 'Memberships', slug: '/shop', enabled: true, sections: [] },
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
                        left: { type: 'form', heading: 'Book a Free Trial', fields: ['name', 'email', 'phone', 'goal', 'preferred_class'], buttonText: 'Book Now' },
                        right: { type: 'contact-info', heading: 'Find Us', email: 'train@ironandsweat.ke', phone: '+254 700 000 006', address: 'Industrial Area, Nairobi', hours: 'Mon–Sun: 5AM – 10PM' },
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
                        heading: 'Got Questions?',
                        items: [
                            { question: 'Is the first trial class really free?', answer: 'Yes! No credit card, no commitment. Just come in, pick a class, and train.' },
                            { question: 'What membership options do you offer?', answer: 'We offer monthly, quarterly, and annual memberships. Check our pricing page for full details.' },
                            { question: 'Do you offer personal training?', answer: 'Yes. Personal training sessions can be booked separately or added to any membership plan.' },
                            { question: 'Is there equipment rental?', answer: 'We provide all essential equipment. Specialized gear like wraps and belts can be rented at reception.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
