// import { TemplateSection } from '@/lib/templates/types'
// import Image from 'next/image'

// export function ContentSection({ section, colors }: { section: TemplateSection; colors: any }) {
//   const { heading, text, image, layout } = section.content

//   if (layout === 'centered') {
//     return (
//       <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
//         <div className="max-w-3xl mx-auto text-center space-y-6">
//           <h2 className="text-3xl md:text-5xl font-bold text-balance" style={{ color: colors.primary }}>
//             {heading}
//           </h2>
//           <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
//         </div>
//       </section>
//     )
//   }
//   //
//   return (
//     <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
//       <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center ${layout === 'image-left' ? 'md:flex-row-reverse' : ''}`}>
//         <div className="space-y-6">
//           <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.primary }}>
//             {heading}
//           </h2>
//           <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
//         </div>
//         {image && (
//           <div className="relative h-96 rounded-lg overflow-hidden">
//             <Image src={image} alt={heading} fill className="object-cover" />
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }


import type { TemplateSection, ContentSection as ContentSectionType } from '@/lib/templates/types'
import Image from 'next/image'

interface ContentSectionProps {
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

export function ContentSection({ section, colors }: ContentSectionProps) {
  const { heading, text, image, layout } = section.content as ContentSectionType

  if (layout === 'centered') {
    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {heading && (
            <h2
              className="text-3xl md:text-5xl font-bold text-balance"
              style={{ color: colors.primary }}
            >
              {heading}
            </h2>
          )}
          {text && (
            <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
      <div
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center ${layout === 'image-left' ? 'md:[&>*:first-child]:order-2' : ''
          }`}
      >
        <div className="space-y-6">
          {heading && (
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.primary }}
            >
              {heading}
            </h2>
          )}
          {text && (
            <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
          )}
        </div>
        {image && (
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image src={image} alt={heading ?? 'Content image'} fill className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}