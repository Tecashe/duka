import { WebsiteTemplate } from './types'
//
export const sleekMinimalTemplate: WebsiteTemplate = {
  id: 'sleek-minimal',
  name: 'Sleek Minimal',
  description: 'Clean lines and maximum whitespace for a sophisticated look',
  category: 'professional',
  enabled: true,
  preview: '/templates/preview-minimal.jpg',
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#F5F5F5',
    background: '#FFFFFF',
    text: '#000000',
  },
  typography: {
    headingFont: 'Inter',
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
            heading: 'Less is More',
            subheading: 'Curated essentials for modern living',
            buttonText: 'Explore',
            buttonLink: '/shop',
            image: '/templates/hero-minimal.jpg',
            layout: 'full-height',
          },
        },
        {
          id: 'featured',
          type: 'grid',
          enabled: true,
          content: {
            heading: 'Featured Products',
            layout: 'masonry',
            items: [],
          },
        },
        {
          id: 'philosophy',
          type: 'content',
          enabled: true,
          content: {
            heading: 'Design Philosophy',
            text: 'We believe in quality over quantity. Each piece in our collection is chosen for its timeless design, exceptional craftsmanship, and ability to enhance your daily life.',
            layout: 'centered',
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
          id: 'about-intro',
          type: 'content',
          enabled: true,
          content: {
            heading: 'About Us',
            text: 'Founded on the principle that good design should be accessible, we curate products that combine form and function.',
            layout: 'centered',
          },
        },
        {
          id: 'team',
          type: 'grid',
          enabled: true,
          content: {
            heading: 'Our Team',
            items: [
              {
                title: 'Design',
                description: 'Curating timeless pieces',
              },
              {
                title: 'Quality',
                description: 'Ensuring excellence',
              },
              {
                title: 'Service',
                description: 'Supporting your experience',
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
          id: 'contact-simple',
          type: 'form',
          enabled: true,
          content: {
            heading: 'Contact',
            fields: ['name', 'email', 'message'],
            buttonText: 'Submit',
            layout: 'minimal',
          },
        },
      ],
    },
  ],
}
