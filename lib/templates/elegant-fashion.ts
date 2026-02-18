import { WebsiteTemplate } from './types'

export const elegantFashionTemplate: WebsiteTemplate = {
  id: 'elegant-fashion',
  name: 'Elegant Fashion',
  description: 'Sophisticated design perfect for fashion boutiques, jewelry stores, and premium retail brands',
  category: 'elegant',
  thumbnail: '/templates/elegant-fashion-thumb.jpg',
  colors: {
    primary: '#1a1a1a',
    secondary: '#f5f5f5',
    accent: '#d4af37',
    background: '#ffffff',
    text: '#333333'
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter'
  },
  previewImages: {
    desktop: '/templates/elegant-fashion-desktop.jpg',
    mobile: '/templates/elegant-fashion-mobile.jpg'
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
            heading: 'Timeless Elegance',
            subheading: 'Curated Fashion for the Modern Woman',
            description: 'Discover our exclusive collection of handpicked styles that blend classic sophistication with contemporary flair.',
            buttonText: 'Shop Collection',
            buttonLink: '/shop',
            image: '/templates/hero-fashion.jpg'
          }
        },
        {
          id: 'featured-products',
          type: 'products',
          title: 'Featured Collection',
          content: {
            heading: 'New Arrivals',
            description: 'Explore our latest curated pieces',
            items: []
          }
        },
        {
          id: 'about-preview',
          type: 'about',
          title: 'Our Story',
          content: {
            heading: 'Crafted with Passion',
            description: 'Every piece in our collection is carefully selected to bring you the perfect blend of quality, style, and affordability. We believe fashion should be accessible without compromising on elegance.',
            image: '/templates/about-fashion.jpg',
            buttonText: 'Learn More',
            buttonLink: '/about'
          }
        },
        {
          id: 'testimonials',
          type: 'testimonials',
          title: 'Customer Reviews',
          content: {
            heading: 'Loved by Customers',
            items: [
              {
                name: 'Sarah Mwangi',
                role: 'Nairobi',
                rating: 5,
                text: 'Beautiful pieces! The quality exceeded my expectations. Delivery was super fast too.',
                avatar: ''
              },
              {
                name: 'Grace Akinyi',
                role: 'Mombasa',
                rating: 5,
                text: 'I love the attention to detail. These are pieces I will treasure for years.',
                avatar: ''
              },
              {
                name: 'Faith Wanjiku',
                role: 'Kisumu',
                rating: 5,
                text: 'Finally, a Kenyan store that understands elegance! The customer service is outstanding.',
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
            heading: 'Start Your Style Journey',
            description: 'Join thousands of satisfied customers across Kenya',
            buttonText: 'Browse Collection',
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
            heading: 'Our Story',
            subheading: 'Redefining Kenyan Fashion',
            description: 'Founded with a passion for bringing world-class fashion to Kenya',
            image: '/templates/about-hero-fashion.jpg'
          }
        },
        {
          id: 'mission',
          type: 'about',
          title: 'Our Mission',
          content: {
            heading: 'Quality Meets Affordability',
            description: 'We started with a simple mission: to make premium fashion accessible to every Kenyan woman. Today, we curate collections from the best local and international designers, ensuring every piece meets our high standards of quality and style.',
            image: '/templates/mission-fashion.jpg'
          }
        },
        {
          id: 'values',
          type: 'features',
          title: 'Our Values',
          content: {
            heading: 'What We Stand For',
            items: [
              {
                icon: 'Sparkles',
                title: 'Premium Quality',
                description: 'Every item is handpicked and quality-checked'
              },
              {
                icon: 'Heart',
                title: 'Customer First',
                description: 'Your satisfaction is our top priority'
              },
              {
                icon: 'Truck',
                title: 'Fast Delivery',
                description: 'Delivery within 24-48 hours in Nairobi'
              },
              {
                icon: 'Shield',
                title: 'Secure Shopping',
                description: 'Safe M-Pesa payments and data protection'
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
            heading: 'Shop Our Collection',
            description: 'Browse our curated selection of premium fashion',
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
            heading: 'Get In Touch',
            description: 'Have questions? We would love to hear from you. Send us a message and we will respond within 24 hours.',
            items: [
              {
                icon: 'Phone',
                title: 'Phone',
                value: '+254 700 000 000'
              },
              {
                icon: 'Mail',
                title: 'Email',
                value: 'hello@yourstore.co.ke'
              },
              {
                icon: 'MapPin',
                title: 'Location',
                value: 'Nairobi, Kenya'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'faq',
      name: 'FAQ',
      enabled: false,
      sections: [
        {
          id: 'faq-list',
          type: 'faq',
          title: 'FAQ List',
          content: {
            heading: 'Frequently Asked Questions',
            description: 'Everything you need to know about ordering from us',
            items: [
              {
                question: 'How do I place an order?',
                answer: 'Simply browse our products, add items to your cart, and proceed to checkout. You can pay via M-Pesa and we will deliver to your doorstep.'
              },
              {
                question: 'What are your delivery times?',
                answer: 'We deliver within 24-48 hours in Nairobi and 3-5 days countrywide.'
              },
              {
                question: 'Do you accept returns?',
                answer: 'Yes! You can return items within 7 days if they are unworn and in original condition.'
              },
              {
                question: 'How can I track my order?',
                answer: 'After placing your order, you will receive updates via SMS with your order status and tracking information.'
              }
            ]
          }
        }
      ]
    }
  ]
}
