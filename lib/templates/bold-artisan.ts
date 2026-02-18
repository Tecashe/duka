import { WebsiteTemplate } from './types'
//
export const boldArtisanTemplate: WebsiteTemplate = {
  id: 'bold-artisan',
  name: 'Bold Artisan',
  enabled: true,
  description: 'Strong typography and dramatic visuals for handcrafted goods',
  category: 'handcraft',
  preview: '/templates/preview-artisan.jpg',
  colors: {
    primary: '#2C1810',
    secondary: '#D4A373',
    accent: '#8B4513',
    background: '#FAF8F5',
    text: '#1A1A1A',
  },
  typography: {
    headingFont: 'Playfair Display',
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
          enabled: true,
          content: {
            heading: 'Handcrafted with Heart',
            subheading: 'Authentic artisan goods made with passion and precision',
            buttonText: 'Shop Collection',
            buttonLink: '/shop',
            image: '/templates/hero-artisan.jpg',
            layout: 'split',
          },
        },
        {
          id: 'featured-categories',
          type: 'grid',
          enabled: true,
          content: {
            heading: 'Explore Our Craft',
            items: [
              {
                title: 'Pottery',
                description: 'Hand-thrown ceramics',
                image: '/templates/cat-pottery.jpg',
                link: '/shop?cat=pottery',
              },
              {
                title: 'Textiles',
                description: 'Woven with tradition',
                image: '/templates/cat-textiles.jpg',
                link: '/shop?cat=textiles',
              },
              {
                title: 'Woodwork',
                description: 'Carved masterpieces',
                image: '/templates/cat-wood.jpg',
                link: '/shop?cat=wood',
              },
            ],
          },
        },
        {
          id: 'story',
          type: 'content',
          enabled: true,
          content: {
            heading: 'The Story Behind Each Piece',
            text: 'Every item we create carries a story—of skilled hands, time-honored techniques, and dedication to quality. We believe in slow craft, where each piece is made to last a lifetime.',
            image: '/templates/story-artisan.jpg',
            layout: 'image-right',
          },
        },
        {
          id: 'testimonials',
          type: 'testimonials',
          enabled: true,
          content: {
            heading: 'What Our Customers Say',
            testimonials: [
              {
                text: 'The quality is unmatched. You can feel the care in every detail.',
                author: 'Sarah K.',
                role: 'Interior Designer',
              },
              {
                text: 'These pieces have transformed my home. True artistry.',
                author: 'Michael T.',
                role: 'Collector',
              },
            ],
          },
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
          id: 'hero',
          type: 'hero',
          enabled: true,
          content: {
            heading: 'Crafted with Purpose',
            subheading: 'Meet the artisans behind your favorite pieces',
            image: '/templates/about-artisan.jpg',
            layout: 'centered',
          },
        },
        {
          id: 'mission',
          type: 'content',
          enabled: true,
          content: {
            heading: 'Our Mission',
            text: 'We exist to preserve traditional craftsmanship while creating beautiful, functional pieces for modern living. Each artisan in our collective brings decades of experience and a deep respect for their craft.',
            layout: 'centered',
          },
        },
        {
          id: 'values',
          type: 'grid',
          enabled: true,
          content: {
            heading: 'Our Values',
            items: [
              {
                title: 'Quality',
                description: 'No shortcuts, no compromises',
              },
              {
                title: 'Sustainability',
                description: 'Ethically sourced materials',
              },
              {
                title: 'Heritage',
                description: 'Preserving traditional techniques',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'shop',
      name: 'Shop',
      slug: '/shop',
      enabled: true,
      sections: [],
    },
    {
      id: 'contact',
      name: 'Contact',
      slug: '/contact',
      enabled: true,
      sections: [
        {
          id: 'contact-hero',
          type: 'hero',
          enabled: true,
          content: {
            heading: 'Get in Touch',
            subheading: 'Have questions? We\'d love to hear from you.',
            layout: 'centered',
          },
        },
        {
          id: 'contact-form',
          type: 'form',
          enabled: true,
          content: {
            heading: 'Send Us a Message',
            fields: ['name', 'email', 'phone', 'message'],
            buttonText: 'Send Message',
          },
        },
        {
          id: 'contact-info',
          type: 'contact-info',
          enabled: true,
          content: {
            email: 'hello@artisan.ke',
            phone: '+254 712 345 678',
            address: 'Westlands, Nairobi, Kenya',
            hours: 'Mon-Sat: 9AM - 6PM',
          },
        },
      ],
    },
  ],
}
