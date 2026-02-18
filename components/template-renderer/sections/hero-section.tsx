// import { TemplateSection } from '@/lib/templates/types'
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import Link from 'next/link'
// //
// interface HeroSectionProps {
//   section: TemplateSection
//   colors: any
// }

// export function HeroSection({ section, colors }: HeroSectionProps) {
//   const { heading, subheading, buttonText, buttonLink, image, layout } = section.content

//   if (layout === 'centered' || layout === 'full-height') {
//     return (
//       <section
//         className="relative flex items-center justify-center min-h-[80vh] text-center px-4"
//         style={{
//           backgroundColor: colors.background,
//           color: colors.text,
//         }}
//       >
//         {image && (
//           <div className="absolute inset-0 z-0">
//             <Image
//               src={image}
//               alt={heading}
//               fill
//               className="object-cover opacity-20"
//               priority
//             />
//           </div>
//         )}
//         <div className="relative z-10 max-w-4xl mx-auto space-y-6">
//           <h1
//             className="text-5xl md:text-7xl font-bold text-balance"
//             style={{ color: colors.primary }}
//           >
//             {heading}
//           </h1>
//           {subheading && (
//             <p className="text-xl md:text-2xl text-muted-foreground text-balance">
//               {subheading}
//             </p>
//           )}
//           {buttonText && buttonLink && (
//             <div className="pt-4">
//               <Button
//                 asChild
//                 size="lg"
//                 className="text-lg px-8"
//                 style={{
//                   backgroundColor: colors.primary,
//                   color: colors.background,
//                 }}
//               >
//                 <Link href={buttonLink}>{buttonText}</Link>
//               </Button>
//             </div>
//           )}
//         </div>
//       </section>
//     )
//   }

//   if (layout === 'split') {
//     return (
//       <section
//         className="grid md:grid-cols-2 min-h-[70vh]"
//         style={{ backgroundColor: colors.background }}
//       >
//         <div
//           className="flex flex-col justify-center px-8 md:px-16 py-12"
//           style={{ color: colors.text }}
//         >
//           <h1
//             className="text-4xl md:text-6xl font-bold mb-6 text-balance"
//             style={{ color: colors.primary }}
//           >
//             {heading}
//           </h1>
//           {subheading && (
//             <p className="text-lg md:text-xl text-muted-foreground mb-8">
//               {subheading}
//             </p>
//           )}
//           {buttonText && buttonLink && (
//             <div>
//               <Button
//                 asChild
//                 size="lg"
//                 style={{
//                   backgroundColor: colors.primary,
//                   color: colors.background,
//                 }}
//               >
//                 <Link href={buttonLink}>{buttonText}</Link>
//               </Button>
//             </div>
//           )}
//         </div>
//         {image && (
//           <div className="relative min-h-[400px] md:min-h-full">
//             <Image
//               src={image}
//               alt={heading}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//         )}
//       </section>
//     )
//   }

//   // Default banner layout
//   return (
//     <section
//       className="relative py-24 px-4 text-center"
//       style={{ backgroundColor: colors.primary, color: colors.background }}
//     >
//       {image && (
//         <div className="absolute inset-0 z-0">
//           <Image src={image} alt={heading} fill className="object-cover opacity-30" />
//         </div>
//       )}
//       <div className="relative z-10 max-w-4xl mx-auto space-y-6">
//         <h1 className="text-4xl md:text-6xl font-bold text-balance">{heading}</h1>
//         {subheading && <p className="text-xl md:text-2xl text-balance">{subheading}</p>}
//         {buttonText && buttonLink && (
//           <div className="pt-4">
//             <Button
//               asChild
//               size="lg"
//               variant="secondary"
//               style={{
//                 backgroundColor: colors.background,
//                 color: colors.primary,
//               }}
//             >
//               <Link href={buttonLink}>{buttonText}</Link>
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }
import type { TemplateSection, HeroContent } from '@/lib/templates/types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
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

export function HeroSection({ section, colors }: HeroSectionProps) {
  const { heading, subheading, buttonText, buttonLink, image, layout } =
    section.content as HeroContent

  if (layout === 'centered' || layout === 'fullscreen') {
    return (
      <section
        className="relative flex items-center justify-center min-h-[80vh] text-center px-4"
        style={{ backgroundColor: colors.background, color: colors.text }}
      >
        {image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={image}
              alt={heading}
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h1
            className="text-5xl md:text-7xl font-bold text-balance"
            style={{ color: colors.primary }}
          >
            {heading}
          </h1>
          {subheading && (
            <p className="text-xl md:text-2xl text-muted-foreground text-balance">
              {subheading}
            </p>
          )}
          {buttonText && buttonLink && (
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8"
                style={{ backgroundColor: colors.primary, color: colors.background }}
              >
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    )
  }

  if (layout === 'split') {
    return (
      <section
        className="grid md:grid-cols-2 min-h-[70vh]"
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="flex flex-col justify-center px-8 md:px-16 py-12"
          style={{ color: colors.text }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-balance"
            style={{ color: colors.primary }}
          >
            {heading}
          </h1>
          {subheading && (
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {subheading}
            </p>
          )}
          {buttonText && buttonLink && (
            <div>
              <Button
                asChild
                size="lg"
                style={{ backgroundColor: colors.primary, color: colors.background }}
              >
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            </div>
          )}
        </div>
        {image && (
          <div className="relative min-h-[400px] md:min-h-full">
            <Image
              src={image}
              alt={heading}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </section>
    )
  }

  // Default: banner layout
  return (
    <section
      className="relative py-24 px-4 text-center"
      style={{ backgroundColor: colors.primary, color: colors.background }}
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={heading}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      )}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-balance">{heading}</h1>
        {subheading && (
          <p className="text-xl md:text-2xl text-balance opacity-90">{subheading}</p>
        )}
        {buttonText && buttonLink && (
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              style={{ backgroundColor: colors.background, color: colors.primary }}
            >
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}