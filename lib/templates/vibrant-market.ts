// import { WebsiteTemplate } from './types'
// //
// export const vibrantMarketTemplate: WebsiteTemplate = {
//   id: 'vibrant-market',
//   name: 'Vibrant Market',
//   description: 'Energetic and colorful design perfect for local markets and bazaars',
//   category: 'marketplace',
//   preview: '/templates/preview-market.jpg',
//   colors: {
//     primary: '#FF6B35',
//     secondary: '#F7931E',
//     accent: '#004E89',
//     background: '#FFF8F0',
//     text: '#2D3142',
//   },
//   typography: {
//     headingFont: 'Poppins',
//     bodyFont: 'Open Sans',
//   },
//   pages: [
//     {
//       id: 'home',
//       name: 'Home',
//       slug: '/',
//       enabled: true,
//       sections: [
//         {
//           id: 'hero',
//           type: 'hero',
//           enabled: true,
//           content: {
//             heading: 'Fresh from Our Market',
//             subheading: 'Quality products from local vendors, delivered to your door',
//             buttonText: 'Start Shopping',
//             buttonLink: '/shop',
//             image: '/templates/hero-market.jpg',
//             layout: 'banner',
//           },
//         },
//         {
//           id: 'categories',
//           type: 'grid',
//           enabled: true,
//           content: {
//             heading: 'Shop by Category',
//             items: [
//               {
//                 title: 'Fresh Produce',
//                 description: 'Farm-fresh vegetables and fruits',
//                 image: '/templates/cat-produce.jpg',
//                 link: '/shop?cat=produce',
//               },
//               {
//                 title: 'Dairy & Eggs',
//                 description: 'Fresh from local farms',
//                 image: '/templates/cat-dairy.jpg',
//                 link: '/shop?cat=dairy',
//               },
//               {
//                 title: 'Bakery',
//                 description: 'Freshly baked daily',
//                 image: '/templates/cat-bakery.jpg',
//                 link: '/shop?cat=bakery',
//               },
//               {
//                 title: 'Groceries',
//                 description: 'Pantry essentials',
//                 image: '/templates/cat-groceries.jpg',
//                 link: '/shop?cat=groceries',
//               },
//             ],
//           },
//         },
//         {
//           id: 'deals',
//           type: 'banner',
//           enabled: true,
//           content: {
//             heading: 'Today's Special Deals',
//             text: 'Save up to 30% on selected items',
//             buttonText: 'View Deals',
//             buttonLink: '/shop?sale=true',
//             bgColor: '#FF6B35',
//           },
//         },
//         {
//           id: 'vendors',
//           type: 'content',
//           enabled: true,
//           content: {
//             heading: 'Supporting Local Vendors',
//             text: 'Every purchase supports local farmers and small business owners in our community. We're proud to bring you the freshest products while helping our local economy thrive.',
//             image: '/templates/vendors-market.jpg',
//             layout: 'image-left',
//           },
//         },
//       ],
//     },
//     {
//       id: 'about',
//       name: 'About',
//       slug: '/about',
//       enabled: true,
//       sections: [
//         {
//           id: 'about-hero',
//           type: 'hero',
//           enabled: true,
//           content: {
//             heading: 'Bringing the Market to You',
//             subheading: 'Connecting communities through fresh, local products',
//             image: '/templates/about-market.jpg',
//             layout: 'centered',
//           },
//         },
//         {
//           id: 'mission',
//           type: 'content',
//           enabled: true,
//           content: {
//             heading: 'Our Mission',
//             text: 'We believe everyone deserves access to fresh, quality products at fair prices. By connecting local vendors with customers, we create a thriving marketplace that benefits everyone.',
//             layout: 'centered',
//           },
//         },
//         {
//           id: 'stats',
//           type: 'stats',
//           enabled: true,
//           content: {
//             stats: [
//               { label: 'Local Vendors', value: '50+' },
//               { label: 'Happy Customers', value: '5,000+' },
//               { label: 'Daily Deliveries', value: '200+' },
//               { label: 'Years in Business', value: '10+' },
//             ],
//           },
//         },
//       ],
//     },
//     {
//       id: 'shop',
//       name: 'Shop',
//       slug: '/shop',
//       enabled: true,
//       sections: [],
//     },
//     {
//       id: 'contact',
//       name: 'Contact',
//       slug: '/contact',
//       enabled: true,
//       sections: [
//         {
//           id: 'contact-hero',
//           type: 'hero',
//           enabled: true,
//           content: {
//             heading: 'We're Here to Help',
//             subheading: 'Questions? Feedback? Let us know!',
//             layout: 'centered',
//           },
//         },
//         {
//           id: 'contact-split',
//           type: 'split',
//           enabled: true,
//           content: {
//             left: {
//               type: 'form',
//               heading: 'Send a Message',
//               fields: ['name', 'email', 'phone', 'subject', 'message'],
//               buttonText: 'Send Message',
//             },
//             right: {
//               type: 'contact-info',
//               heading: 'Get in Touch',
//               email: 'hello@market.ke',
//               phone: '+254 700 123 456',
//               address: 'Kilimani, Nairobi, Kenya',
//               hours: 'Every Day: 7AM - 7PM',
//             },
//           },
//         },
//       ],
//     },
//     {
//       id: 'faq',
//       name: 'FAQ',
//       slug: '/faq',
//       enabled: true,
//       sections: [
//         {
//           id: 'faq-list',
//           type: 'faq',
//           enabled: true,
//           content: {
//             heading: 'Frequently Asked Questions',
//             items: [
//               {
//                 question: 'What are your delivery areas?',
//                 answer: 'We currently deliver to all areas within Nairobi and surrounding counties.',
//               },
//               {
//                 question: 'When do you deliver?',
//                 answer: 'We deliver 7 days a week from 7 AM to 7 PM. Choose your preferred delivery time at checkout.',
//               },
//               {
//                 question: 'What payment methods do you accept?',
//                 answer: 'We accept M-Pesa, cash on delivery, and card payments.',
//               },
//               {
//                 question: 'Can I return items?',
//                 answer: 'Yes, if you're not satisfied with your order, contact us within 24 hours for a refund or replacement.',
//               },
//             ],
//           },
//         },
//       ],
//     },
//   ],
// }


import type {
  WebsiteTemplate,
  HeroContent,
  GridContent,
  BannerContent,
  ContentSection,
  SplitContent,
  FaqContent,
  StatsContent,
} from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Vibrant Market Template
// ─────────────────────────────────────────────────────────────────────────────

export const vibrantMarketTemplate: WebsiteTemplate = {
  id: 'vibrant-market',
  name: 'Vibrant Market',
  description: 'Energetic and colorful design perfect for local markets and bazaars',
  category: 'marketplace',
  preview: '/templates/preview-market.jpg',

  colors: {
    primary: '#FF6B35',
    secondary: '#F7931E',
    accent: '#004E89',
    background: '#FFF8F0',
    text: '#2D3142',
  },

  typography: {
    headingFont: 'Poppins',
    bodyFont: 'Open Sans',
  },

  pages: [
    // ─── Home ───────────────────────────────────────────────────────────────
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
            heading: 'Fresh from Our Market',
            subheading: 'Quality products from local vendors, delivered to your door',
            buttonText: 'Start Shopping',
            buttonLink: '/shop',
            image: '/templates/hero-market.jpg',
            layout: 'banner',
          } satisfies HeroContent,
        },
        {
          id: 'categories',
          type: 'grid',
          enabled: true,
          content: {
            heading: 'Shop by Category',
            columns: 4,
            items: [
              {
                title: 'Fresh Produce',
                description: 'Farm-fresh vegetables and fruits',
                image: '/templates/cat-produce.jpg',
                link: '/shop?cat=produce',
              },
              {
                title: 'Dairy & Eggs',
                description: 'Fresh from local farms',
                image: '/templates/cat-dairy.jpg',
                link: '/shop?cat=dairy',
              },
              {
                title: 'Bakery',
                description: 'Freshly baked daily',
                image: '/templates/cat-bakery.jpg',
                link: '/shop?cat=bakery',
              },
              {
                title: 'Groceries',
                description: 'Pantry essentials',
                image: '/templates/cat-groceries.jpg',
                link: '/shop?cat=groceries',
              },
            ],
          } satisfies GridContent,
        },
        {
          id: 'deals',
          type: 'banner',
          enabled: true,
          content: {
            heading: "Today's Special Deals",
            text: 'Save up to 30% on selected items',
            buttonText: 'View Deals',
            buttonLink: '/shop?sale=true',
            bgColor: '#FF6B35',
          } satisfies BannerContent,
        },
        {
          id: 'vendors',
          type: 'content',
          enabled: true,
          content: {
            heading: 'Supporting Local Vendors',
            text: "Every purchase supports local farmers and small business owners in our community. We're proud to bring you the freshest products while helping our local economy thrive.",
            image: '/templates/vendors-market.jpg',
            layout: 'image-left',
          } satisfies ContentSection,
        },
      ],
    },

    // ─── About ──────────────────────────────────────────────────────────────
    {
      id: 'about',
      name: 'About',
      slug: '/about',
      enabled: true,
      sections: [
        {
          id: 'about-hero',
          type: 'hero',
          enabled: true,
          content: {
            heading: 'Bringing the Market to You',
            subheading: 'Connecting communities through fresh, local products',
            image: '/templates/about-market.jpg',
            layout: 'centered',
          } satisfies HeroContent,
        },
        {
          id: 'mission',
          type: 'content',
          enabled: true,
          content: {
            heading: 'Our Mission',
            text: 'We believe everyone deserves access to fresh, quality products at fair prices. By connecting local vendors with customers, we create a thriving marketplace that benefits everyone.',
            layout: 'centered',
          } satisfies ContentSection,
        },
        {
          id: 'stats',
          type: 'stats',
          enabled: true,
          content: {
            stats: [
              { label: 'Local Vendors', value: '50+' },
              { label: 'Happy Customers', value: '5,000+' },
              { label: 'Daily Deliveries', value: '200+' },
              { label: 'Years in Business', value: '10+' },
            ],
          } satisfies StatsContent,
        },
      ],
    },

    // ─── Shop ───────────────────────────────────────────────────────────────
    {
      id: 'shop',
      name: 'Shop',
      slug: '/shop',
      enabled: true,
      sections: [],
    },

    // ─── Contact ────────────────────────────────────────────────────────────
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
            heading: "We're Here to Help",
            subheading: 'Questions? Feedback? Let us know!',
            layout: 'centered',
          } satisfies HeroContent,
        },
        {
          id: 'contact-split',
          type: 'split',
          enabled: true,
          content: {
            left: {
              type: 'form',
              heading: 'Send a Message',
              fields: ['name', 'email', 'phone', 'subject', 'message'],
              buttonText: 'Send Message',
            },
            right: {
              type: 'contact-info',
              heading: 'Get in Touch',
              email: 'hello@market.ke',
              phone: '+254 700 123 456',
              address: 'Kilimani, Nairobi, Kenya',
              hours: 'Every Day: 7AM – 7PM',
            },
          } satisfies SplitContent,
        },
      ],
    },

    // ─── FAQ ────────────────────────────────────────────────────────────────
    {
      id: 'faq',
      name: 'FAQ',
      slug: '/faq',
      enabled: true,
      sections: [
        {
          id: 'faq-list',
          type: 'faq',
          enabled: true,
          content: {
            heading: 'Frequently Asked Questions',
            items: [
              {
                question: 'What are your delivery areas?',
                answer: 'We currently deliver to all areas within Nairobi and surrounding counties.',
              },
              {
                question: 'When do you deliver?',
                answer: 'We deliver 7 days a week from 7 AM to 7 PM. Choose your preferred delivery time at checkout.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept M-Pesa, cash on delivery, and card payments.',
              },
              {
                question: "Can I return items?",
                answer: "Yes, if you're not satisfied with your order, contact us within 24 hours for a refund or replacement.",
              },
            ],
          } satisfies FaqContent,
        },
      ],
    },
  ],
}