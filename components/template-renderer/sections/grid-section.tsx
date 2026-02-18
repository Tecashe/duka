// import { TemplateSection } from '@/lib/templates/types'
// import Image from 'next/image'
// import Link from 'next/link'
// //
// export function GridSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   const { heading, items } = section.content
//   return (
//     <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
//       <div className="max-w-7xl mx-auto">
//         {heading && <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.primary }}>{heading}</h2>}
//         <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {items?.map((item: any, idx: number) => (
//             <Link key={idx} href={item.link || '#'} className="group">
//               {item.image && (
//                 <div className="relative h-64 rounded-lg overflow-hidden mb-4">
//                   <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
//                 </div>
//               )}
//               <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>{item.title}</h3>
//               {item.description && <p className="text-muted-foreground">{item.description}</p>}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export function FormSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   return <section className="py-20 px-4"><div className="max-w-2xl mx-auto"><h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>{section.content.heading}</h2><p className="text-muted-foreground">Form functionality coming soon</p></div></section>
// }

// export function TestimonialsSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   return <section className="py-20 px-4" style={{ backgroundColor: colors.secondary }}><div className="max-w-5xl mx-auto"><h2 className="text-4xl font-bold text-center mb-12">{section.content.heading}</h2></div></section>
// }

// export function FAQSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   return <section className="py-20 px-4"><div className="max-w-3xl mx-auto"><h2 className="text-4xl font-bold mb-12" style={{ color: colors.primary }}>{section.content.heading}</h2></div></section>
// }

// export function StatsSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   return <section className="py-20 px-4 bg-primary text-white"><div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">{section.content.stats?.map((stat: any, idx: number) => (<div key={idx}><div className="text-5xl font-bold mb-2">{stat.value}</div><div className="text-lg">{stat.label}</div></div>))}</div></section>
// }

// export function BannerSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   return <section className="py-16 px-4" style={{ backgroundColor: section.content.bgColor || colors.accent }}><div className="max-w-4xl mx-auto text-center text-white"><h2 className="text-3xl font-bold mb-4">{section.content.heading}</h2><p className="text-xl mb-6">{section.content.text}</p></div></section>
// }

// export function ContactInfoSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   return <section className="py-12 px-4"><div className="max-w-xl mx-auto space-y-4">{section.content.email && <p>Email: {section.content.email}</p>}{section.content.phone && <p>Phone: {section.content.phone}</p>}{section.content.address && <p>Address: {section.content.address}</p>}</div></section>
// }


import type {
  TemplateSection,
  GridContent,
  BannerContent,
  StatsContent,
  FaqContent,
  TestimonialsContent,
  SplitContactInfo,
} from '@/lib/templates/types'
import Image from 'next/image'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// Shared prop type
// ─────────────────────────────────────────────────────────────────────────────

interface SectionProps {
  section: TemplateSection
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted?: string
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Grid Section
// ─────────────────────────────────────────────────────────────────────────────

export function GridSection({ section, colors }: SectionProps) {
  const { heading, items } = section.content as GridContent

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {heading && (
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: colors.primary }}
          >
            {heading}
          </h2>
        )}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items?.map((item, idx) => (
            <Link key={idx} href={item.link || '#'} className="group">
              {item.image && (
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: colors.primary }}
              >
                {item.title}
              </h3>
              {item.description && (
                <p className="text-muted-foreground">{item.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Banner Section
// ─────────────────────────────────────────────────────────────────────────────

export function BannerSection({ section, colors }: SectionProps) {
  const { heading, text, buttonText, buttonLink, bgColor } =
    section.content as BannerContent

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: bgColor || colors.accent }}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        {text && <p className="text-xl mb-6">{text}</p>}
        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="inline-block bg-white px-8 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
            style={{ color: bgColor || colors.accent }}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats Section
// ─────────────────────────────────────────────────────────────────────────────

export function StatsSection({ section, colors }: SectionProps) {
  const { heading, stats } = section.content as StatsContent

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            {heading}
          </h2>
        )}
        <div className="grid md:grid-cols-4 gap-8 text-center text-white">
          {stats?.map((stat, idx) => (
            <div key={idx}>
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Section
// ─────────────────────────────────────────────────────────────────────────────

export function FAQSection({ section, colors }: SectionProps) {
  const { heading, items } = section.content as FaqContent

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {heading && (
          <h2
            className="text-4xl font-bold mb-12"
            style={{ color: colors.primary }}
          >
            {heading}
          </h2>
        )}
        <div className="space-y-6">
          {items?.map((item, idx) => (
            <div key={idx} className="border-b pb-6">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: colors.text }}
              >
                {item.question}
              </h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials Section
// ─────────────────────────────────────────────────────────────────────────────

export function TestimonialsSection({ section, colors }: SectionProps) {
  const { heading, items } = section.content as TestimonialsContent

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-5xl mx-auto">
        {heading && (
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: colors.text }}
          >
            {heading}
          </h2>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {items?.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
              {item.rating && (
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} style={{ color: colors.primary }}>★</span>
                  ))}
                </div>
              )}
              <p className="text-muted-foreground mb-4">{item.text}</p>
              <div className="flex items-center gap-3">
                {item.avatar && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-semibold" style={{ color: colors.text }}>{item.name}</p>
                  {item.role && <p className="text-sm text-muted-foreground">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Form Section
// ─────────────────────────────────────────────────────────────────────────────

export function FormSection({ section, colors }: SectionProps) {
  const { heading } = section.content as { heading?: string }

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {heading && (
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            {heading}
          </h2>
        )}
        <p className="text-muted-foreground">Form functionality coming soon.</p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Info Section
// ─────────────────────────────────────────────────────────────────────────────

export function ContactInfoSection({ section, colors }: SectionProps) {
  const { heading, email, phone, address, hours } =
    section.content as SplitContactInfo

  return (
    <section className="py-12 px-4">
      <div className="max-w-xl mx-auto space-y-4">
        {heading && (
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            {heading}
          </h2>
        )}
        {email && (
          <p style={{ color: colors.text }}>
            <span className="font-medium">Email: </span>
            <a href={`mailto:${email}`} className="hover:underline">{email}</a>
          </p>
        )}
        {phone && (
          <p style={{ color: colors.text }}>
            <span className="font-medium">Phone: </span>
            <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
          </p>
        )}
        {address && (
          <p style={{ color: colors.text }}>
            <span className="font-medium">Address: </span>{address}
          </p>
        )}
        {hours && (
          <p style={{ color: colors.text }}>
            <span className="font-medium">Hours: </span>{hours}
          </p>
        )}
      </div>
    </section>
  )
}