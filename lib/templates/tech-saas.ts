import type {
    WebsiteTemplate,
    HeroContent,
    GridContent,
    FeaturesContent,
    TestimonialsContent,
    CtaContent,
    FaqContent,
    StatsContent,
    SplitContent,
} from './types'

export const techSaasTemplate: WebsiteTemplate = {
    id: 'tech-saas',
    enabled: true,
    name: 'TechLaunch',
    description: 'Modern feature-first template for SaaS, software, and tech products',
    category: 'electronics',
    preview: '/templates/preview-tech-saas.jpg',

    colors: {
        primary: '#2563EB',      // Electric blue
        secondary: '#7C3AED',    // Purple
        accent: '#06B6D4',       // Cyan
        background: '#020817',   // Dark navy
        text: '#F1F5F9',
        muted: '#64748B',
        border: '#1E293B',
    },

    typography: {
        headingFont: 'Plus Jakarta Sans',
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
                        heading: 'Ship Faster. Scale Smarter.',
                        subheading: 'The all-in-one platform that powers modern teams. Automate workflows, collaborate in real-time, and ship with confidence.',
                        buttonText: 'Start Free Trial',
                        buttonLink: '/shop',
                        secondaryButtonText: 'Watch Demo',
                        secondaryButtonLink: '#demo',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'features',
                    type: 'features',
                    title: 'Core Features',
                    enabled: true,
                    content: {
                        heading: 'Everything You Need to Ship',
                        subheading: 'Built for modern engineering teams of all sizes',
                        items: [
                            { title: 'Real-time Collaboration', description: 'Work together seamlessly with live editing, commenting, and presence indicators', icon: '⚡' },
                            { title: 'AI-Powered Automation', description: 'Let AI handle repetitive tasks so your team focuses on what matters', icon: '🤖' },
                            { title: 'Enterprise Security', description: 'SOC2 compliant with end-to-end encryption and SSO support', icon: '🔒' },
                            { title: 'Advanced Analytics', description: 'Deep insights into performance, usage, and team productivity', icon: '📊' },
                            { title: 'API-First Architecture', description: 'Connect to 500+ integrations or build your own with our REST API', icon: '🔌' },
                            { title: '99.9% Uptime SLA', description: 'Enterprise-grade infrastructure with global CDN and redundancy', icon: '✅' },
                        ],
                    } satisfies FeaturesContent,
                },
                {
                    id: 'stats',
                    type: 'stats',
                    title: 'Social Proof Stats',
                    enabled: true,
                    content: {
                        heading: 'Trusted by Teams Everywhere',
                        stats: [
                            { label: 'Teams Using TechLaunch', value: '15,000+' },
                            { label: 'Tasks Automated Daily', value: '2M+' },
                            { label: 'Uptime', value: '99.99%' },
                            { label: 'NPS Score', value: '72' },
                        ],
                    } satisfies StatsContent,
                },
                {
                    id: 'integrations',
                    type: 'grid',
                    title: 'Integrations',
                    enabled: true,
                    content: {
                        heading: 'Connects to Your Stack',
                        subheading: 'Works with the tools your team already loves',
                        columns: 4,
                        items: [
                            { title: 'Slack', description: 'Real-time notifications', icon: '💬' },
                            { title: 'GitHub', description: 'Code sync and deploys', icon: '🐱' },
                            { title: 'Jira', description: 'Issue tracking', icon: '📋' },
                            { title: 'Zapier', description: '3000+ automations', icon: '⚙️' },
                        ],
                    } satisfies GridContent,
                },
                {
                    id: 'testimonials',
                    type: 'testimonials',
                    title: 'Testimonials',
                    enabled: true,
                    content: {
                        heading: 'Loved by Engineering Teams',
                        items: [
                            { name: 'CTO, Finova', role: 'Fintech Scale-up', text: 'We cut our deployment time by 60% in the first month. The automation features alone paid for itself 10x over.', rating: 5 },
                            { name: 'VP Engineering, Loopify', role: 'Series B SaaS', text: 'TechLaunch is the glue that holds our distributed team together. The real-time collaboration is flawless.', rating: 5 },
                            { name: 'Founder, DevKraft', role: 'Dev Tools', text: 'Migrated from five different tools to TechLaunch. Our team is happier, faster, and more aligned than ever.', rating: 5 },
                        ],
                    } satisfies TestimonialsContent,
                },
                {
                    id: 'pricing-cta',
                    type: 'cta',
                    title: 'Pricing CTA',
                    enabled: true,
                    content: {
                        heading: 'Start Building Today',
                        text: 'Free for teams under 5. No credit card required. Cancel anytime.',
                        buttonText: 'Get Started Free',
                        bgColor: '#2563EB',
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
                        heading: 'Built by Engineers, for Engineers',
                        subheading: 'We\'ve been in your shoes. We built the tool we always needed.',
                        layout: 'centered',
                    } satisfies HeroContent,
                },
                {
                    id: 'mission',
                    type: 'features',
                    title: 'Mission & Values',
                    enabled: true,
                    content: {
                        heading: 'Our Values',
                        items: [
                            { title: 'Transparency', description: 'We publish our roadmap, uptime stats, and lessons learned openly', icon: '🌐' },
                            { title: 'Speed', description: 'Ship fast, learn fast, iterate fast — we believe in momentum', icon: '🚀' },
                            { title: 'Reliability', description: 'Your business depends on us. We take that responsibility seriously', icon: '🎯' },
                        ],
                    } satisfies FeaturesContent,
                },
            ],
        },
        { id: 'shop', name: 'Pricing', slug: '/shop', enabled: true, sections: [] },
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
                        left: { type: 'form', heading: 'Talk to Sales', fields: ['name', 'company', 'email', 'team_size', 'message'], buttonText: 'Book a Demo' },
                        right: { type: 'contact-info', heading: 'Support', email: 'hello@techlaunch.io', phone: '+254 700 000 004', address: 'Nairobi Tech District', hours: '24/7 Support Available' },
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
                        heading: 'Product FAQs',
                        items: [
                            { question: 'Is there a free plan?', answer: 'Yes! Teams of up to 5 members can use TechLaunch completely free forever with access to core features.' },
                            { question: 'Can I migrate my data from other tools?', answer: 'Absolutely. We provide CSV imports and native migrations from Jira, Trello, Asana, and more.' },
                            { question: 'Is the API rate-limited?', answer: 'Free plans get 10,000 API calls/day. Paid plans start at 1M calls/day with burst capabilities.' },
                            { question: 'Do you offer SOC2 compliance?', answer: 'Yes, we are SOC2 Type II certified. Security documentation available on request for enterprise plans.' },
                        ],
                    } satisfies FaqContent,
                },
            ],
        },
    ],
}
