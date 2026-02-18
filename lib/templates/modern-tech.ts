import { WebsiteTemplate } from './types'

export const modernTechTemplate: WebsiteTemplate = {
  id: 'modern-tech',
  name: 'Modern Tech',
  description: 'Bold, contemporary design ideal for electronics, gadgets, and tech accessories',
  category: 'modern',
  thumbnail: '/templates/modern-tech-thumb.jpg',
  colors: {
    primary: '#0f172a',
    secondary: '#64748b',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b'
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  previewImages: {
    desktop: '/templates/modern-tech-desktop.jpg',
    mobile: '/templates/modern-tech-mobile.jpg'
  },
  pages: [
    {
      id: 'home',
      name: 'Home',
      enabled: true,
      sections: [
        {
          id: 'hero',
          type: 'hero',
          title: 'Hero Section',
          content: {
            heading: 'Next-Gen Technology',
            subheading: 'Premium Electronics & Gadgets',
            description: 'Discover the latest in tech innovation. From smartphones to smart home devices, we bring you cutting-edge technology at competitive prices.',
            buttonText: 'Shop Now',
            buttonLink: '/shop',
            image: '/templates/hero-tech.jpg'
          }
        },
        {
          id: 'stats',
          type: 'stats',
          title: 'Statistics',
          content: {
            items: [
              { value: '10,000+', label: 'Happy Customers' },
              { value: '500+', label: 'Products' },
              { value: '24/7', label: 'Support' },
              { value: '99.9%', label: 'Satisfaction' }
            ]
          }
        },
        {
          id: 'featured-products',
          type: 'products',
          title: 'Featured Products',
          content: {
            heading: 'Best Sellers',
            description: 'Most popular tech products this month',
            items: []
          }
        },
        {
          id: 'features',
          type: 'features',
          title: 'Why Choose Us',
          content: {
            heading: 'The Tech Store Difference',
            description: 'Why thousands of Kenyans trust us for their tech needs',
            items: [
              {
                icon: 'Zap',
                title: 'Latest Technology',
                description: 'Always stocked with the newest gadgets and innovations'
              },
              {
                icon: 'Shield',
                title: 'Genuine Products',
                description: 'All products come with manufacturer warranty'
              },
              {
                icon: 'Truck',
                title: 'Fast Delivery',
                description: 'Same-day delivery available in Nairobi'
              },
              {
                icon: 'HeadphonesIcon',
                title: '24/7 Support',
                description: 'Expert technical support whenever you need it'
              },
              {
                icon: 'CreditCard',
                title: 'Secure Payment',
                description: 'Safe M-Pesa and card payment options'
              },
              {
                icon: 'RefreshCw',
                title: '30-Day Returns',
                description: 'Easy returns and exchanges policy'
              }
            ]
          }
        },
        {
          id: 'testimonials',
          type: 'testimonials',
          title: 'Customer Reviews',
          content: {
            heading: 'What Our Customers Say',
            items: [
              {
                name: 'James Kamau',
                role: 'Software Developer',
                rating: 5,
                text: 'Best tech store in Kenya! Got my laptop delivered the same day. Genuine products and great prices.',
                avatar: ''
              },
              {
                name: 'David Ochieng',
                role: 'Photographer',
                rating: 5,
                text: 'Excellent service! They helped me choose the perfect camera for my needs. Very knowledgeable staff.',
                avatar: ''
              },
              {
                name: 'Michael Njoroge',
                role: 'Entrepreneur',
                rating: 5,
                text: 'Reliable and professional. I have ordered multiple times and the experience is always top-notch.',
                avatar: ''
              }
            ]
          }
        },
        {
          id: 'cta',
          type: 'cta',
          title: 'Call to Action',
          content: {
            heading: 'Ready to Upgrade?',
            description: 'Browse our collection of premium electronics and gadgets',
            buttonText: 'Start Shopping',
            buttonLink: '/shop'
          }
        }
      ]
    },
    {
      id: 'about',
      name: 'About Us',
      enabled: true,
      sections: [
        {
          id: 'about-hero',
          type: 'hero',
          title: 'About Hero',
          content: {
            heading: 'About Us',
            subheading: 'Your Trusted Tech Partner',
            description: 'Bringing the latest technology to Kenya since 2020',
            image: '/templates/about-hero-tech.jpg'
          }
        },
        {
          id: 'story',
          type: 'about',
          title: 'Our Story',
          content: {
            heading: 'Innovation at Your Fingertips',
            description: 'Founded by tech enthusiasts who were tired of limited options and high prices in Kenya, we set out to create the ultimate destination for electronics and gadgets. Today, we serve thousands of customers across the country, offering authentic products, expert advice, and unbeatable customer service.',
            image: '/templates/story-tech.jpg'
          }
        },
        {
          id: 'values',
          type: 'features',
          title: 'Our Values',
          content: {
            heading: 'What Drives Us',
            items: [
              {
                icon: 'Target',
                title: 'Customer Focus',
                description: 'Your satisfaction is our success metric'
              },
              {
                icon: 'Award',
                title: 'Quality Assurance',
                description: 'Only genuine, tested products make it to our store'
              },
              {
                icon: 'TrendingUp',
                title: 'Innovation',
                description: 'Always ahead with the latest tech trends'
              },
              {
                icon: 'Users',
                title: 'Expert Team',
                description: 'Knowledgeable staff ready to help you choose'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'shop',
      name: 'Shop',
      enabled: true,
      sections: [
        {
          id: 'shop-hero',
          type: 'hero',
          title: 'Shop Hero',
          content: {
            heading: 'Browse Our Collection',
            description: 'Find the perfect tech for your needs',
          }
        },
        {
          id: 'products-grid',
          type: 'products',
          title: 'All Products',
          content: {
            items: []
          }
        }
      ]
    },
    {
      id: 'contact',
      name: 'Contact',
      enabled: true,
      sections: [
        {
          id: 'contact-form',
          type: 'contact',
          title: 'Contact Form',
          content: {
            heading: 'Need Help?',
            description: 'Our tech experts are here to assist you. Reach out anytime!',
            items: [
              {
                icon: 'Phone',
                title: 'Call Us',
                value: '+254 700 000 000'
              },
              {
                icon: 'Mail',
                title: 'Email Us',
                value: 'support@yourstore.co.ke'
              },
              {
                icon: 'MessageCircle',
                title: 'WhatsApp',
                value: '+254 700 000 000'
              },
              {
                icon: 'MapPin',
                title: 'Visit Us',
                value: 'Westlands, Nairobi'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'faq',
      name: 'FAQ',
      enabled: true,
      sections: [
        {
          id: 'faq-list',
          type: 'faq',
          title: 'FAQ List',
          content: {
            heading: 'Common Questions',
            description: 'Find answers to frequently asked questions',
            items: [
              {
                question: 'Are your products genuine?',
                answer: 'Absolutely! All our products come directly from authorized distributors and include manufacturer warranty.'
              },
              {
                question: 'Do you offer installation services?',
                answer: 'Yes, we provide free installation guidance and paid professional installation for select products.'
              },
              {
                question: 'What is your warranty policy?',
                answer: 'All products come with manufacturer warranty ranging from 6 months to 2 years depending on the item.'
              },
              {
                question: 'Can I trade in my old device?',
                answer: 'Yes! We have a trade-in program for select devices. Contact us for a valuation.'
              },
              {
                question: 'Do you deliver countrywide?',
                answer: 'Yes, we deliver to all counties in Kenya. Same-day delivery available in Nairobi.'
              }
            ]
          }
        }
      ]
    }
  ]
}
