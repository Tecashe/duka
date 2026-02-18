import { WebsiteTemplate } from './types'

export const freshOrganicTemplate: WebsiteTemplate = {
  id: 'fresh-organic',
  name: 'Fresh & Organic',
  description: 'Warm, inviting design perfect for food, organic products, and wellness brands',
  category: 'vibrant',
  thumbnail: '/templates/fresh-organic-thumb.jpg',
  colors: {
    primary: '#16a34a',
    secondary: '#f0fdf4',
    accent: '#ea580c',
    background: '#ffffff',
    text: '#1c1c1c'
  },
  fonts: {
    heading: 'Merriweather',
    body: 'Inter'
  },
  previewImages: {
    desktop: '/templates/fresh-organic-desktop.jpg',
    mobile: '/templates/fresh-organic-mobile.jpg'
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
            heading: 'Farm Fresh, Naturally Delicious',
            subheading: '100% Organic Products Delivered to Your Door',
            description: 'Experience the taste of real food. Our organic farm brings you fresh, pesticide-free produce straight from our fields to your table.',
            buttonText: 'Order Now',
            buttonLink: '/shop',
            image: '/templates/hero-organic.jpg'
          }
        },
        {
          id: 'features',
          type: 'features',
          title: 'Why Choose Organic',
          content: {
            heading: 'The Organic Difference',
            description: 'Discover what makes our products special',
            items: [
              {
                icon: 'Leaf',
                title: '100% Organic',
                description: 'No pesticides, no chemicals, just pure nature'
              },
              {
                icon: 'Sprout',
                title: 'Farm Fresh',
                description: 'Harvested and delivered within 48 hours'
              },
              {
                icon: 'Heart',
                title: 'Nutrient Rich',
                description: 'Maximum nutritional value in every bite'
              },
              {
                icon: 'Handshake',
                title: 'Fair Trade',
                description: 'Supporting local farmers and communities'
              }
            ]
          }
        },
        {
          id: 'featured-products',
          type: 'products',
          title: 'This Week\'s Harvest',
          content: {
            heading: 'Fresh Picks',
            description: 'Handpicked organic produce available this week',
            items: []
          }
        },
        {
          id: 'about-preview',
          type: 'about',
          title: 'Our Farm Story',
          content: {
            heading: 'From Our Farm to Your Family',
            description: 'For three generations, our family has been cultivating the rich soil of Kenya with love and care. We practice sustainable farming methods that protect the earth while producing the healthiest, most flavorful food possible. Every product you receive is a testament to our commitment to quality and your well-being.',
            image: '/templates/about-organic.jpg',
            buttonText: 'Our Story',
            buttonLink: '/about'
          }
        },
        {
          id: 'testimonials',
          type: 'testimonials',
          title: 'Customer Reviews',
          content: {
            heading: 'What Families Are Saying',
            items: [
              {
                name: 'Mary Njeri',
                role: 'Mother of 3',
                rating: 5,
                text: 'The vegetables are so fresh! My kids actually enjoy eating greens now. The taste is incomparable to supermarket produce.',
                avatar: ''
              },
              {
                name: 'Peter Kimani',
                role: 'Fitness Enthusiast',
                rating: 5,
                text: 'As someone who cares about what I put in my body, this organic delivery service is a blessing. Quality is consistently excellent.',
                avatar: ''
              },
              {
                name: 'Ann Wangari',
                role: 'Chef',
                rating: 5,
                text: 'The flavor is outstanding! You can taste the difference organic makes. My restaurant customers love it.',
                avatar: ''
              }
            ]
          }
        },
        {
          id: 'gallery',
          type: 'gallery',
          title: 'Farm Gallery',
          content: {
            heading: 'See Where Your Food Grows',
            description: 'A glimpse into our sustainable farming practices',
            items: [
              { image: '/templates/farm-1.jpg', caption: 'Our organic vegetable fields' },
              { image: '/templates/farm-2.jpg', caption: 'Hand-picking fresh produce' },
              { image: '/templates/farm-3.jpg', caption: 'Sustainable farming methods' },
              { image: '/templates/farm-4.jpg', caption: 'Preparing your delivery' }
            ]
          }
        },
        {
          id: 'cta',
          type: 'cta',
          title: 'Call to Action',
          content: {
            heading: 'Start Your Healthy Journey',
            description: 'Subscribe to weekly organic deliveries and save 15%',
            buttonText: 'Browse Products',
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
            subheading: 'Three Generations of Organic Farming',
            description: 'Cultivating health and sustainability since 1985',
            image: '/templates/about-hero-organic.jpg'
          }
        },
        {
          id: 'story',
          type: 'about',
          title: 'Our Journey',
          content: {
            heading: 'Rooted in Tradition, Growing with Purpose',
            description: 'What started as a small family farm has blossomed into a thriving organic community. Our grandfather taught us that healthy soil produces healthy food, and healthy food creates healthy people. Today, we continue his legacy by providing families across Kenya with the freshest, most nutritious organic produce. Every seed we plant and every harvest we gather honors his wisdom and your health.',
            image: '/templates/story-organic.jpg'
          }
        },
        {
          id: 'certifications',
          type: 'features',
          title: 'Our Certifications',
          content: {
            heading: 'Certified Organic Excellence',
            items: [
              {
                icon: 'BadgeCheck',
                title: 'Organic Certified',
                description: 'Certified by Kenya Organic Agriculture Network'
              },
              {
                icon: 'Award',
                title: 'Quality Assured',
                description: 'KEBS approved and quality tested'
              },
              {
                icon: 'Trees',
                title: 'Eco-Friendly',
                description: 'Carbon-neutral farming practices'
              },
              {
                icon: 'Users',
                title: 'Fair Trade',
                description: 'Supporting local farming communities'
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
            heading: 'Fresh Organic Produce',
            description: 'Browse our current harvest selection',
          }
        },
        {
          id: 'products-grid',
          type: 'products',
          title: 'Available Products',
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
            heading: 'Visit Our Farm',
            description: 'Come see where your food grows! Farm tours available on weekends.',
            items: [
              {
                icon: 'Phone',
                title: 'Call Us',
                value: '+254 700 000 000'
              },
              {
                icon: 'Mail',
                title: 'Email',
                value: 'hello@yourfarm.co.ke'
              },
              {
                icon: 'MapPin',
                title: 'Farm Location',
                value: 'Limuru, Kiambu County'
              },
              {
                icon: 'Clock',
                title: 'Farm Tours',
                value: 'Saturdays 10AM - 3PM'
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
            heading: 'Frequently Asked Questions',
            description: 'Everything you need to know about our organic products',
            items: [
              {
                question: 'How do I know your products are truly organic?',
                answer: 'We are certified by the Kenya Organic Agriculture Network (KOAN) and follow strict organic farming standards. We welcome farm visits so you can see our practices firsthand!'
              },
              {
                question: 'How fresh are the products?',
                answer: 'We harvest to order! Products are picked within 24-48 hours of delivery, ensuring maximum freshness and nutrition.'
              },
              {
                question: 'What areas do you deliver to?',
                answer: 'We currently deliver to Nairobi, Kiambu, and surrounding areas. Free delivery on orders above KES 2,000.'
              },
              {
                question: 'Can I subscribe for weekly deliveries?',
                answer: 'Yes! Our subscription service saves you 15% and ensures you never run out of fresh organic produce.'
              },
              {
                question: 'Do you offer cooking tips or recipes?',
                answer: 'Absolutely! Each delivery includes seasonal recipe cards and cooking tips to help you make the most of your organic produce.'
              }
            ]
          }
        }
      ]
    }
  ]
}
